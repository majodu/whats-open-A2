var Xray = require('x-ray');
var fs = require('fs');
var XRegExp = require('xregexp');
var time = XRegExp('((?<closed> closed) | (?<all_day> 24(\\s?)*hours) | (?<open_hour>  [01][0-9] ) :    \n\
                    (?<open_minute> [0-9][0-9] ) (\\s?)*   \n\
                    (?<open_ampm>   [ap]m )     \n\
                    (\\s?)*\\W(\\s?)* \n\
                    (?<close_hour>  [01][0-9] ) :    \n\
                    (?<close_minute> [0-9][0-9] ) (\\s?)*   \n\
                    (?<close_ampm>   [ap]m ))     ', 'ix');
// x-filters are like pipes in Angular 2. if you put a "| functionName" after data it runs that data through the funciton
var x = Xray({
    filters: {
        parse_op_hrs: function (value) {
            var operation_hours = [];
            XRegExp.forEach(value, time, function (match) {
                var op_hours_obj = {
                    "special_status": "",
                    "is_closed": false,
                    "open_all_day": false,
                    "open_time": false,
                    "close_time": false
                };
                if (match.closed !== undefined) {
                    op_hours_obj.is_closed = true;
                    operation_hours.push(op_hours_obj);
                }
                else if (match.all_day !== undefined) {
                    operation_hours.push({
                        "special_status": "",
                        "is_closed": false,
                        "open_all_day": true,
                        "open_time": false,
                        "close_time": false
                    });
                }
                else {
                    operation_hours.push({
                        "special_status": "",
                        "is_closed": false,
                        "open_all_day": false,
                        "open_time": to_24_hour_arr(Number(match.open_hour), Number(match.open_minute), match.open_ampm),
                        "close_time": to_24_hour_arr(Number(match.close_hour), Number(match.close_minute), match.close_ampm)
                    });
                }
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
})(function (err, obj) {
    var newObj = [];
    for (var i = 0; i < obj.title.length; i++) {
        // this next line fixes the problem with the .storename tag putting the title and location in
        // the same string
        obj.title[i] = obj.title[i].replace(obj.location[i], '');
        var entry = {
            title: obj.title[i].trim(),
            date_modified: new Date(),
            location: obj.location[i].trim(),
            operation_hours: obj.operation_hours[i]
        };
        newObj.unshift(entry);
    }
    fs.writeFile('results.json', JSON.stringify(newObj, null, "\t"), function (err) {
        if (err) {
            throw err;
        }
    });
});
var to_24_hour_arr = function (hour, minute, ampm) {
    var new_hour;
    (ampm === 'pm') ? new_hour = hour + 12 : new_hour = hour;
    return [new_hour, minute];
};
