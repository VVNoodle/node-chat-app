var moment = require('moment');

var createdAt = 1234;
var date = moment(createdAt);

console.log(moment().valueOf());
console.log(date.format('h:mm a'));
