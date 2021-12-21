const fs = require('fs');
const { json } = require('node:stream/consumers');
 
var contents = fs.readFileSync('./firstTest.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split('').map(val => parseInt(val)));

// find total number of flashes
let flashed = new Set()
const incrementAround = (y,x) => {
    // console.log("searching current", coordinates);
    // use an object and loop through all of these
    let current = JSON.stringify({y,x})

    const positions = {
    // 'current' : { flashCount: input[y][x], position: {y,x}},
    // corners are wrong down up left, up right, down left

    'left' : { flashCount: input?.[y-1]?.[x] ? input?.[y-1][x] : 99, position: {y:(y-1), x}},

    'upLeft' : { flashCount: input?.[y-1]?.[x-1] ? input?.[y-1][x-1] : 99, position: {y:(y-1),x:(x-1)}},

    'up' : { flashCount: input?.[y]?.[x+1] ? input?.[y]?.[x+1] : 99, position: {y, x:(x+1)}},

    'upRight' : { flashCount: input?.[y-1]?.[x+1] ? input?.[y-1]?.[x+1] : 99, position: {y:(y-1),x:(x+1)}},

    'right' : { flashCount: input?.[y+1]?.[x] ? input?.[y+1]?.[x] : 99, position: {y:(y+1), x}},

    'downLeft' : { flashCount: input?.[y+1]?.[x-1] ? input?.[y+1][x-1] : 99, position: {y: (y+1), x:(x-1)}},

    'down' : { flashCount: input?.[y]?.[x-1] ? input?.[y]?.[x-1] : 99, position: {y, x: (x-1)}},

    'downRight' : { flashCount: input?.[y+1]?.[x+1] ? input?.[y+1][x+1] : 99, position: {y:(y+1), x:(x+1)}}
    }

    let currentSum = 0
    if(!flashed.has(JSON.stringify(current)))
    Object.values(positions).forEach(val => {
      let posX = val.position.x
      let posY = val.position.y
      let current = {y: posY, x: posX}
      // check if the position has flashed and if the value exists
      if(val.flashCount != 99 && !flashed.has(JSON.stringify(current))) {
        // console.log("x,y", x,y)
        // console.log("current", input)
        // console.log('looking at x,y', posX, posY)
        if(input[posY][posX] >= 10) {
          // increment flashes
          flashed.add(JSON.stringify(current))
          currentSum++;
          input[posY][posX] = 0
          currentSum += incrementAround(posY,posX)
        } else {
          input[posY][posX]++
        }
      }
    })
    // console.log(x,y, input)
    return currentSum

}

// recursive solution is probably best option
// probably a away to do this with finding how often each position changes
let totalFlash = 0
for(let n = 0; n < 2; n++) {
  // increase all by 1
  for(let y=0; y < input[0].length; y++) {
    for(let x=0; x < input.length; x++) {
      input[y][x]++
    }
  }
  // console.log(incrementAround(2,2))
  console.log(input)

  for(let y=0; y < input[0].length; y++) {
    for(let x=0; x < input.length; x++) {
      totalFlash += incrementAround(y,x)
    }
  }
  flashed = new Set()
  console.log(input)
}
console.log("after flash", flashed)

console.log("Total flashes", totalFlash)