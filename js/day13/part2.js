const fs = require('fs')
 
var contents = fs.readFileSync('./input.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format

const input = contents.split(/\r?\n/).map((x)=> x.split(','));
const clonedArray = input.map(val => JSON.stringify(val)).indexOf('[""]')
let folds = input.slice(clonedArray).flat()
folds.shift()
input.splice(clonedArray)
folds = folds.map(val => val.split(' ')[2])
console.log("fold", folds)

const positions = input.map(val => val.map(x => parseInt(x)))
console.log(positions)

//get max x and y
let maxX = 0
let maxY = 0

positions.forEach(val => {
  maxX = Math.max(maxX, val[0])
  maxY = Math.max(maxY, val[1])
})

maxX++
maxY++

console.log("Dims", maxX, maxY)

let row = [maxX]
// setup board
let paper = []
for(let i = 0; i < maxX; i++) row[i] = '.'
for(let i = 0; i < maxY; i++) paper.push(JSON.parse(JSON.stringify(row)))

positions.forEach(val => {
  const x = val[0]
  const y = val[1]
  // console.log(x, y)
  if(paper?.[y]?.[x])
  paper[y][x] = '#'
  else {
    console.log("bad at", x, y)
  }
})


// fold display
// const foldAt = (fold) => {
//   let place = fold.split('=')
//   if(place[0] == 'x') {
//     for(let row = 0; row < paper.length; row++)
//     for(let i = 0; i < paper[0].length; i++) paper[row][parseInt(place[1])] = '|'
//   } else {
//     for(let i = 0; i < paper[0].length; i++) paper[parseInt(place[1])][i] = '-'
//   }
// }

const foldAt = (fold, updatedPaper) => {
  let place = fold.split('=')
  const val = parseInt(place[1])
  let copyPaper = JSON.parse(JSON.stringify(updatedPaper))

  if(place[0] == 'x') {
    for(let row = 0; row < copyPaper.length; row++)
    // for(let i = 0; i < place[1]; i++) {
      copyPaper[row].splice(val)
    // }
  } else {
    // for(let i = 0; i < copyPaper[0].length; i++) {
      copyPaper.splice(val)
    // }
  }

  positions.forEach(spot => {
    let x = spot[0]
    let y = spot[1]
    if(copyPaper?.[y]?.[x]) {
      copyPaper[y][x] = '#'
    }
    else {
      if(place[0] == 'x') {
        // find portion of the screen
        // 14%7
        // 13%7
        // y = max/x % 2 may have to check for not half folds
        if (x > val) {
          x = (val - (x - val))
          spot[0] = y
        }
        copyPaper[y][x] = '#'
      }
      else {
        // console.log('before adjust', y)
        if (y > val) {
          // if(y == 13) {
          //   console.log('check')
          // }
          y = val - (y - val)
          spot[1] = y
        }
        // console.log('changing to', y)
        // copyPaper[y][x] = '#'
      }
      // console.log("bad at", x, y)
    }
  })

  return copyPaper
}

// const afterFold =foldAt(folds[0], paper)

folds.forEach(fold => {
  paper = foldAt(fold, paper)
})

// let counter = 0
// for(let y=0; y < afterFold.length; y++) {
//   for(let x = 0; x < afterFold[0].length; x++)
//   if(afterFold[y][x] == '#') counter++
// }

// console.log("final", counter)
// folding, divide by 2 and subtract from greater value

for(let y=0; y < paper.length; y++) {
  console.log(paper[y].join(''))
}