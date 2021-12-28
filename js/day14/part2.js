const fs = require('fs')
 
var contents = fs.readFileSync('./input.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/);

let polyTemplate = input.shift()

input.shift()
const pairInsertion = input.map(val => val.split(" -> "))

let pairMap = new Map()

pairInsertion.forEach(val => {
  const key = JSON.parse(JSON.stringify(val[0]))
  let insertVal = val[0].split('')
  insertVal.splice(1,0,val[1])
  const temp = insertVal.join('')
  // console.log(`Key ${key}, inserVal: ${temp}`)
  pairMap.set(key, temp)
})


// console.log(polyTemplate)
// console.log(pairInsertion)

// Note that these pairs overlap: the second element of one pair is the first element of the next pair.
// Also, because all pairs are considered simultaneously, 
// inserted elements are not considered to be part of a pair until the next step


// take the most element subtract least element 

// originally do 10 steps
// do 40 for part 2 brute force may be a awhile
for(let i = 0; i < 40; i++) {
  let index = 0;
  while(index < polyTemplate.length) {
    const twoChar = polyTemplate[index] + polyTemplate[index+1]
    if(pairMap.has(twoChar)) {
      let polySplit = polyTemplate.split('')
      polySplit.splice(index,2,pairMap.get(twoChar))
      polyTemplate = polySplit.join('')
      index+=2
    } else {
      index++
    }
    // console.log("updated poly", polyTemplate)
  }
  // console.log("updated poly after turn ",i, polyTemplate)
}

polyTemplate = polyTemplate.split('')
let alphabetCounter = {}

polyTemplate.forEach(val => {
  if(alphabetCounter?.[val]) {
    alphabetCounter[val]++
  } else {
    alphabetCounter[val] = 1
  }
})

console.log(alphabetCounter)
let min = 1000000000000000;
let max = 0;
Object.entries(alphabetCounter).forEach((keyVal) => {
  max = Math.max(keyVal[1], max)
  min = Math.min(keyVal[1], min)
})

console.log("part 1 ", max-min)