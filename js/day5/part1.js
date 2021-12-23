const fs = require('fs');
 
var contents = fs.readFileSync('./input.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split(" -> ").map(val => val.split(',').map(x => parseInt(x))));

console.log(input)
const boardDim = 1000
let board = []
let row = [boardDim]

// setup board
for(let i = 0; i < boardDim; i++) row[i] = 0
for(let i = 0; i < boardDim; i++) board.push(JSON.parse(JSON.stringify(row)))

input.forEach(command => {
  // get moves
  const startX = command[0][0]
  const startY = command[0][1]
  const endX = command[1][0]
  const endY = command[1][1]

  let diffX = Math.abs(startX - endX)
  let diffY = Math.abs(startY - endY)
  
  if(diffX == 0 || diffY == 0) {
    const isY = diffX == 0 ? true : false
    const loopRange = diffX == 0 ? diffY : diffX
    const start = isY ? Math.min(startY, endY) : Math.min(startX, endX)
    //determine whether to loop x or y
    for(let i = 0; i < loopRange+1; i++) {
      if(isY) {
        // const test = board?.[startX]?.[i+start] ? 1 : 0
        if(Number.isInteger(board?.[i+start]?.[startX])) {
          board[i+start][startX]++
        }
      } else {
        // const test = board?.[i+start]?.[startY] ? 1 : 0
        if(Number.isInteger(board?.[startY]?.[i+start])) {
          board[startY][i+start]++
        }
        // if(board?.[i+start]?.[startY] != undefined) board?.[startX]?.[i+start]+=1
      }
    }
  } else {
    
  }
  // console.log(board)
})


// find number of 2 or more
let winningSum = board.flat().filter(val => val > 1).length
console.log('Danger zone', winningSum)