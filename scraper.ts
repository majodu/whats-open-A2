let Xray = require('x-ray');
let fs = require('fs');
let XRegExp = require('xregexp');
let time = XRegExp('((?<closed> closed) | (?<all_day> 24(\\s?)*hours) | (?<open_hour>  [01][0-9] ) :    \n\
                    (?<open_minute> [0-9][0-9] ) (\\s?)*   \n\
                    (?<open_ampm>   [ap]m )     \n\
                    (\\s?)*\\W(\\s?)* \n\
                    (?<close_hour>  [01][0-9] ) :    \n\
                    (?<close_minute> [0-9][0-9] ) (\\s?)*   \n\
                    (?<close_ampm>   [ap]m ))     ', 'ix');

// x-filters are like pipes in Angular 2. if you put a "| functionName" after data it runs that data through the funciton
let x = Xray({
    filters: {
        parse_op_hrs: function (value) {
            let operation_hours = [];

            XRegExp.forEach(value, time, (match) => {
                let op_hours_obj = {
                    "special_status": "",
                    "is_closed": false,
                    "open_all_day": false,
                    "open_time": false,
                    "close_time": false
                }
                if (match.closed !== undefined) {

                    op_hours_obj.is_closed = true;

                } else if (match.all_day !== undefined) {

                    op_hours_obj.open_all_day = true;

                } else {

                    op_hours_obj.open_time = to_24_hour_arr(Number(match.open_hour), Number(match.open_minute), match.open_ampm);
                    op_hours_obj.close_time = to_24_hour_arr(Number(match.close_hour), Number(match.close_minute), match.close_ampm);

                }
                operation_hours.push(op_hours_obj);
            });
            return operation_hours;
        }
    }
});
// this is where xray scrapes the data and creates a json object out of it 
x('http://dining.gmu.edu/dining-choices/hours-of-operation/', {
    title: ['.storename'],
    location: ['.location'],
    operation_hours: ['.open-closed-sign | parse_op_hrs']
})
    // this fixes the json so each element in the array has a title location and oparation hours 
    (function (err, obj) {
        let newObj = [];
        for (let i = 0; i < obj.title.length; i++) {
            // this next line fixes the problem with the .storename tag putting the title and location in
            // the same string
            obj.title[i] = obj.title[i].replace(obj.location[i], '');
            let entry = {
                title: obj.title[i].trim(),
                date_modified: (new Date()).toISOString(),
                location: obj.location[i].trim(),
                operation_hours: obj.operation_hours[i]
            }
            newObj.unshift(entry);
        }
        fs.writeFile('results.json', JSON.stringify(newObj, null, "\t"), function (err) {
            if (err) { throw err; }
        });
    })
let to_24_hour_arr = function (hour, minute, ampm) {
    let new_hour;
    (ampm === 'pm') ? new_hour = hour + 12 : new_hour = hour;
    return [new_hour, minute];
}