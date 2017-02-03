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
var thing = {
    "is_closed": false,
    "open_all_day": false,
    "open_time": [9, 40],
    "close_time": [14, 30]
};
var x = Xray({
    filters: {
        trim: function (value) {
            return value.trim();
        },
        reverse: function (value) {
            return typeof value === 'string' ? value.split('').reverse().join('') : value;
        },
        slice: function (value, start, end) {
            return typeof value === 'string' ? value.slice(start, end) : value;
        },
        parse_op_hrs: function (value) {
            var operation_hours = [];
            XRegExp.forEach(value, time, function (match) {
                if (match.closed === undefined) {
                    operation_hours.unshift();
                }
                else if (match.all_day === undefined) {
                }
                else {
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
})(function (err, obj) {
    var newObj = [];
    for (var i = 0; i < obj.title.length; i++) {
        var entry = {
            title: obj.title[i],
            location: obj.location[i],
            operation_hours: obj.operation_hours[i]
        };
        newObj.unshift(entry);
    }
    fs.writeFile("results.json", JSON.stringify(newObj, null, "\t"), function (err) {
        if (err)
            throw err;
    });
});
// let to_Date_Ob = function(time){
//     if(time[2] === 'pm'){
//         time[0]+= 12;
//     }
//     let date = new Date();
//     date.setHours(time[0]);
//     date.setMinutes(time[1]);
//     date.setSeconds(0);
//     date.setUTCMilliseconds(0);
//     return date;
// }
/*
value = value.replace('Hours of Operation', '');
            value = value.replace('Monday:', '');
            value = value.replace('Tuesday:', ',');
            value = value.replace('Wednesday:', ',');
            value = value.replace('Thursday:', ',')
            value = value.replace('Friday:', ',')
            value = value.replace('Saturday:', ',')
            value = value.replace('Sunday:', ',')
            value = value.split(' ').join('');
            value = value.split(',');
            for(let i = 0; i < value.length;i++){
                value[i] = value[i].replace('a',',a')
                value[i] = value[i].replace('p',',p')
                value[i] = value[i].replace(new RegExp(':','g'),',')
                value[i] = value[i].split('-');
                // value[i][0] = value[i][0].split(',');
                console.log(value[i][1]);
                value[i][1] = value[i][1].split(',');
                
            }
            


*/ 
