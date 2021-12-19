const fs = require('fs')
 
var contents = fs.readFileSync('./input.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split(''));

const openChar = {
'(': ')',
'[': ']',
'{': '}',
'<': '>'
}

const closedChar = {
')': 3, 
']': 57, 
'}': 1197, 
'>': 25137
}

// first filter out incomplete lines
// opens can have any closes but that flags them as illegal, otherwise they're invalid
// use some to determine whether any of the matches work

// use a stack or recursion
let score = []
for(line of input) {
  // deep copy
  const lineCopy = JSON.parse(JSON.stringify(line))
  let stack = []
  for (element of lineCopy) {
    if(openChar?.[element]) {
      stack.push(element)
    } else {
      const prev = stack.pop()
      // check if the val exists
      if(openChar?.[prev]) {
        if(openChar[prev] != element) score.push(element)
      } else {
        // break out of loop and go to next line
        break;
      }
    }
  };
}

console.log(score)
let scoreSum = 0
score.forEach(x => {scoreSum += closedChar[x]})
console.log("part1 score", scoreSum)