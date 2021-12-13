const fs = require('fs')
 
var contents = fs.readFileSync('./input.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(',').map((x)=> parseInt(x));
let valueMap = {}

for (num of input) {
  valueMap[num] = valueMap[num] ? valueMap[num] + 1 : 1
}
console.log(valueMap)
// valueMap now has counts of each values
// difference between each value?

let min = 9999999999
let position = 0
Object.keys(valueMap).forEach(val => {
  let horizontalPositionTotal = 0
  Object.keys(valueMap).forEach(otherValue => {
    horizontalPositionTotal += (valueMap[otherValue] * (Math.max(otherValue,val) - Math.min(otherValue,val)))
  })
  if(min > horizontalPositionTotal) {
    min = horizontalPositionTotal
    position = val
  }
})
console.log(position)
console.log(min)