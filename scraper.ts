let Xray = require('x-ray');
let fs = require('fs');
let XRegExp = require('xregexp');
let time = XRegExp('((?<closed> closed) | (?<all_day> 24(\\s?)*hours) | (?<open_hour>  [01][0-9] ) :    \n\
                    (?<open_minute> [0-9][0-9] ) (\\s?)*   \n\
                    (?<open_ampm>   [ap]m )     \n\
                    (\\s?)*\\W(\\s?)* \n\
                    (?<close_hour>  [01][0-9] ) :    \n\
                    (?<close_minute> [0-9][0-9] ) (\\s?)*   \n\
                    (?<close_ampm>   [ap]m ))     ','ix');
let thing = {
            "is_closed":false,
            "open_all_day":false,
            "open_time":[9,40],
            "close_time":[14,30]
        }
let x = Xray({
    filters: {
        trim: function (value) {
            return value.trim()
        },
        reverse: function (value) {
            return typeof value === 'string' ? value.split('').reverse().join('') : value
        },
        slice: function (value, start, end) {
            return typeof value === 'string' ? value.slice(start, end) : value
        },
        parse_op_hrs: function (value) {
            let operation_hours = [];
            XRegExp.forEach(value,time,(match)=>{
                if(match.closed === undefined){
                    operation_hours.unshift()
                }else if(match.all_day === undefined){

                }else{
                    
                }
            });
            return operation_hours;
        }
    }
});
x('http://dining.gmu.edu/dining-choices/hours-of-operation/', {
    title: ['.storename | trim'],
    location: ['.location | trim'],
    operationHours: ['.open-closed-sign | parse_op_hrs']
})
// this fixes the json so each element in the array has a title location and oparation hours 
(function (err, obj) {
    let newObj = [];

    for (let i = 0; i < obj.title.length; i++) {

        let entry = {
            title: obj.title[i],
            location: obj.location[i],
            operation_hours: obj.operation_hours[i]
        }

        newObj.unshift(entry);
    }

    fs.writeFile("results.json", JSON.stringify(newObj, null, "\t"), function (err) {
        if (err) throw err;
    });

})
