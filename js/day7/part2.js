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
let positionOptions = Math.max(...input) - Math.min(...input)

function sigma(diff, sigmaArray) {
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  sigmaArray.splice(diff)
  if(sigmaArray.length == 0) return 0
  const sum = sigmaArray.reduce((reducer))
  return sum
}

let sigmaArray = []
for(i = 0; i <= positionOptions; i++) {
  sigmaArray.push(i)
}

let oneTrueSigma = []
for(i = 0; i <= positionOptions; i++) {
  const sig = sigma(i, JSON.parse(JSON.stringify(sigmaArray)))
  oneTrueSigma.push(sig)
}
oneTrueSigma.shift()
console.log(oneTrueSigma)
// console.log(oneTrueSigma)

let position
for(i = 0; i < positionOptions; i++ ){
  let horizontalPositionTotal = 0
  Object.keys(valueMap).forEach(otherValue => {
    let diff = Math.max(otherValue,i) - Math.min(otherValue,i)
    horizontalPositionTotal += (valueMap[otherValue] * oneTrueSigma[diff])
  })
  if(min > horizontalPositionTotal) {
    position = i
    min = horizontalPositionTotal
  }
}

// Object.keys(valueMap).forEach(val => {
//   let horizontalPositionTotal = 0
//   Object.keys(valueMap).forEach(otherValue => {
//     horizontalPositionTotal += (valueMap[otherValue] * sigma((Math.max(otherValue,val) - Math.min(otherValue,val), sigmaArray)))
//   })
//   if(min > horizontalPositionTotal) {
//     min = horizontalPositionTotal
//     position = val
//   }
// })

console.log(min)
console.log(position)
