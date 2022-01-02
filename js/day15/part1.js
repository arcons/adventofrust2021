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

// start at 0,0
// build object with vertices as list for other positions
let cavernMap = {}
for(let x = 0; x < input[0].length; x++) {
  for(let y = 0; y < input.length; y++) {
    let position = {x, y}
    let value = input[y][x];
    const leftVal = input?.[y-1]?.[x] ? input?.[y-1][x] : 99
    const upVal = input?.[y]?.[x+1] ? input?.[y]?.[x+1] : 99
    const rightVal = input?.[y+1]?.[x] ? input?.[y+1]?.[x] : 99
    const downVal = input?.[y]?.[x-1] ? input?.[y]?.[x-1] : 99
    cavernMap[JSON.stringify(position)] = value
  }
}
// max value is 9, start 0 and find sum, no diagonal allowed

//
