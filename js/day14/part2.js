const fs = require('fs')
 
var contents = fs.readFileSync('./test.txt', 'utf8');
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
let wholeWord = ''
const eachPosition = (currentWord, turn) => {
  if(turn === 0) {
    let twoChar = currentWord[0] + currentWord[1]
    let polySplit = currentWord.split('')
    polySplit.splice(0, 2, pairMap.get(twoChar))
    currentWord = polySplit[0]
    turn++
    currentWord = eachPosition(currentWord, turn)
  }
  else if(turn !== 9) {
    let twoChar = currentWord[1] + currentWord[2]
    let polySplit = currentWord.split('')
    polySplit.splice(0, 2, pairMap.get(twoChar))
    turn++
    currentWord += eachPosition(polySplit[0], turn)
  }
  return currentWord
}

// originally do 10 steps
// do 40 for part 2 brute force may be a awhile
// swap the forty swap, do each position the ten times
let index = 0;
while(index < polyTemplate.length) {
  let twoChar = polyTemplate[index] + polyTemplate[index+1]
  
  if(pairMap.has(twoChar)) {
    const positionWord = eachPosition(twoChar, 0)
    let polySplit = polyTemplate.split('')
    polySplit.splice(index, 2, positionWord)
    polyTemplate = polySplit.join('')
    wholeWord = ''
    index+=2
  } else {
    index++
  }
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

// started going to run overnight, start ~315PM 12/29
console.log("part 2 ", max-min)