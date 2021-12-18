const fs = require('fs')
 
var contents = fs.readFileSync('./input.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split(''));
console.log(input[5])
// grid loop
let sum = 0
for(let y=0; y < input.length; y++) {
  for(let x=0; x < input[0].length; x++) {
    // check if val is lower than all adjacent positions
    // console.log(x,y)
    const current = input[y][x]
    const left = input?.[y-1]?.[x] ? input?.[y-1][x] : 10
    const up = input?.[y]?.[x+1] ? input?.[y]?.[x+1] : 10
    const right = input?.[y+1]?.[x] ? input?.[y+1]?.[x] : 10
    const down = input?.[y]?.[x-1] ? input?.[y]?.[x-1] : 10
    // console.log(current, left, right, up, down)
    if(current < left && current < right && current < up && current < down) {
      console.log("current, lower than freinds", current)
      sum += (parseInt(current)+1)
    }
  }
}

// sum with +1 for risk value
console.log(sum)

