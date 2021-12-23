const fs = require('fs')
 
var contents = fs.readFileSync('./input.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
let input = contents.split(/\r?\n/);
const bingoCalls = input[0].split(',').map(x=>parseInt(x))
// console.log("bingoCalls", bingoCalls)

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

// console.log("boards", boards)

// Brute force, loop through the entire list every time
// Math solution, keep track of each number in array and sum total at end

// use this to keep track of boards
let marked = [5][5]
console.log(marked)

let bingo = false;

// only veritical and horizontal
const isBingo = (board, y,x) => {
  let bingoCount = 0
  // check horizontal 
  for(let i = 0; i < 5; i++){
    const marked = board?.[y]?.[i] == -1 ? true : false
    if(marked) bingoCount++
  }
  if(bingoCount == 5) {
    return true
  }
  bingoCount = 0
  for(let i = 0; i < 5; i++) {
    const marked = board?.[i]?.[x] == -1 ? true : false
    if(marked) bingoCount++
  }
  return (bingoCount == 5)
}

let winningBoard;
let winningNum;
let removeBoard = []
for(let i = 0; i < bingoCalls.length; i++) {
  if (bingo) break;

  // find winning board and sum all unmarked
  // mark pieces as 0, sum entire board when set
  boards.forEach((board, boardIndex) => {
    board.forEach((row, index) =>
      {
        if (row.includes(bingoCalls[i])) {
          const rowIndex = row.indexOf(bingoCalls[i])
          board[index][rowIndex] = -1
          if(bingoCalls[i] == 16) {
            console.log('break')
          }
          if(isBingo(board, index, rowIndex)) {
            if(boards.length != 1) {
              removeBoard.push(boardIndex)
            } else {
              winningBoard = board
              winningNum = bingoCalls[i]
              bingo = true
              return;
            }
          }
        }
        if(bingo) return
      })
      if(bingo) {
        console.log("Winner", board)
        return
      }
  })
  while(removeBoard.length != 0){
    boards.splice(removeBoard.pop(), 1)
  }
}
// reduce winning board to single array
let winningSum = winningBoard.flat().filter(val => val > 0).reduce((partial_sum, a) => partial_sum + a, 0)
console.log('winning sum', winningSum)
const sol = winningSum * winningNum
console.log('sol', sol)