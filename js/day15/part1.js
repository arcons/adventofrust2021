const fs = require('fs')
 
var contents = fs.readFileSync('./test.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split(''));

// verify read in
// for(let y=0; y < input.length; y++) {
//   console.log(input[y].join(''))
// }

//max value is 9, start 0 and find sum, no diagonal allowed
