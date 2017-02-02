var Xray = require('x-ray');
var fs = require('fs');
var XRegExp = require('xregexp');
var x = Xray({
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
            


            return value;
        }
    }
});
x('http://dining.gmu.edu/dining-choices/hours-of-operation/', {
    title: ['.storename | trim'],
    location: ['.location | trim'],
    operationHours: ['.open-closed-sign | parse_op_hrs']


    //   operation:''
})
// this fixes the json so each element in the array has a title location and oparation hours 
(function (err, obj) {
    let newObj = [];

    for (let i = 0; i < obj.title.length; i++) {

        let entry = {
            title: obj.title[i],
            location: obj.location[i],
            operationHours: obj.operationHours[i]
        }

        newObj.unshift(entry);
    }

    fs.writeFile("results.json", JSON.stringify(newObj, null, "\t"), function (err) {
        if (err) throw err;
    });

})
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
