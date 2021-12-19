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
')': 1, 
']': 2, 
'}': 3, 
'>': 4
}

// first filter out incomplete lines
// opens can have any closes but that flags them as illegal, otherwise they're invalid
// use some to determine whether any of the matches work

// use a stack or recursion
let score = []
for(line of input) {
  // deep copy
  const lineCopy = JSON.parse(JSON.stringify(line))
  let corrupted = false;
  let lineScore = 0
  let stack = []
  for (element of lineCopy) {
    if(openChar?.[element]) {
      stack.push(element)
    } else {
      const prev = stack.pop()
      // check if the val exists, this is always returning true
      if(openChar?.[prev]) {
        if(openChar[prev] != element) {
          stack = []
          break
        }
      } else {
        // break out of loop and go to next line
        break;
      }
    }
  };
  console.log(stack)
  if(stack.length != 0) {
    while(stack.length != 0 && !corrupted) {
      lineScore = (lineScore * 5) + closedChar[openChar[stack.pop()]]
    }
    score.push(lineScore)
  }
}
const sortedScore = score.sort((a,b) => a-b)
console.log("part2", sortedScore[Math.floor(sortedScore.length/2)])
// score.forEach(x => {scoreSum += closedChar[x]})
// console.log("part1 score", scoreSum)