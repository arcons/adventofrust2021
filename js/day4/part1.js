const fs = require('fs')
 
var contents = fs.readFileSync('./test.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
let input = contents.split(/\r?\n/);
const bingoCalls = input[0].split(',').map(x=>parseInt(x))
console.log("bingo", bingoCalls)

// remove first item
input.shift()
input.shift()
console.log(input)
let boards = []
let currentBoard = []
input.forEach(x => {
  console.log("current level", x)
  if(x == '') {
    boards.push(currentBoard)
    currentBoard = []
  } else {
    const splitEmpty = x.split(' ').filter(x => x != '').map(val => parseInt(val))
    currentBoard.push(splitEmpty)
  }
})
boards.push(currentBoard)

console.log("boards", boards)

// Brute force, loop through the entire list every time
// Math solution, keep track of each number in array and sum total at end

// use this to keep track of boards
let marked = [5][5]
console.log(marked)

let bingo = false;

const check

for(let i = 0; i < bingoCalls.length; i++) {
  if (bingo) break;

  // find winning board and sum all unmarked
  // mark pieces as 0, sum entire board when set
  boards.forEach(board => {
    board.forEach((row, index) =>
      {
        if (row.includes(bingoCalls[i])) {
          const rowIndex = row.indexOf(bingoCalls[i])
          board[index][rowIndex] = -1
        }
      })
      console.log(board)
  })

}