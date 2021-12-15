const fs = require('fs');
const { connected } = require('process');
 
var contents = fs.readFileSync('./input.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split(' | '));
let oneFourSevenEight = []

for(line of input) {
  const values = line[1].split(' ')
  values.forEach(code => {
    // 1 , 4, 7, 8
    if(code.length == 2 || code.length == 4 || code.length == 3 || code.length == 7) {
      oneFourSevenEight.push(code)
    }
  })
}

console.log(oneFourSevenEight.length)