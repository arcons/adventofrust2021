const fs = require('fs');
 
var contents = fs.readFileSync('./input.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split('').map(val => parseInt(val)));

// find total number of flashes
let flashed = new Set()
const incrementAround = (y,x) => {
  if(y == 4 && x == 9) {
    let q = 0
  }

    const positions = {
    // 'current' : { flashCount: input[y][x], position: {y,x}},

    'left' : { flashCount: input?.[y]?.[x-1] ? input?.[y][x-1] : 99, position: {y:(y), x:(x-1)}},

    'upLeft' : { flashCount: input?.[y-1]?.[x-1] ? input?.[y-1][x-1] : 99, position: {y:(y-1),x:(x-1)}},

    'up' : { flashCount: input?.[y-1]?.[x] ? input?.[y-1]?.[x] : 99, position: {y:(y-1), x:(x)}},

    'upRight' : { flashCount: input?.[y-1]?.[x+1] ? input?.[y-1]?.[x+1] : 99, position: {y:(y-1),x:(x+1)}},

    'right' : { flashCount: input?.[y]?.[x+1] ? input?.[y]?.[x+1] : 99, position: {y:(y), x:(x+1)}},

    'downLeft' : { flashCount: input?.[y+1]?.[x-1] ? input?.[y+1][x-1] : 99, position: {y: (y+1), x:(x-1)}},

    'down' : { flashCount: input?.[y+1]?.[x] ? input?.[y+1]?.[x] : 99, position: {y:(y+1), x: (x)}},

    'downRight' : { flashCount: input?.[y+1]?.[x+1] ? input?.[y+1][x+1] : 99, position: {y:(y+1), x:(x+1)}},

    }

    let currentSum = 0
    // check if the value has flashed
    // if(!flashed.has(current)) {
      // if(input[y][x] >= 10) {
          //increment all non 10s and 
          Object.keys(positions).forEach(key => {
            console.log(key)
            val = positions[key]
            if(val.flashCount != 99) {
              let posX = val.position.x
              let posY = val.position.y
              let temp = {y: posY, x: posX}

              let evalPos = JSON.stringify(temp)
              // if(input[posY][posX] != 10 && input[posY][posX] != 0 && !flashed.has(evalPos)) {
                // input[posY][posX]++
              // }

              if (!flashed.has(evalPos)){
                // if(posX == 0 & posY == 0) {
                //   console.log('figure out double increment')
                // }
                // if(input[posY][posX] != 10 && input[posY][posX] != 0 && !flashed.has(evalPos)) {
                  input[posY][posX]++
                // }
              } 

              if(input[posY][posX] >= 10 && !flashed.has(evalPos)) {
                input[posY][posX] = 0
                if(posX == 1 & posY == 1) {
                  console.log('figure out double increment')
                }
                console.log(`Flash at with pos x:${posX} y:${posY}`)
                flashed.add(evalPos)
                incrementAround(posY,posX);
              } 
              else {
                console.log("Bad")
              }
            }
        })
      // }
    return currentSum

}

// recursive solution is probably best option
// probably a away to do this with finding how often each position changes
let totalFlash = 0
for(let n = 0; n < 100; n++) {
  // increase all by 1
  for(let y=0; y < input[0].length; y++) {
    for(let x=0; x < input.length; x++) {
      input[y][x]++
    }
  }
  // console.log(incrementAround(2,2))
  console.log("step ", (n+1))
  // console.log(input)

  for(let y=0; y < input[0].length; y++) {
    for(let x=0; x < input.length; x++) {
      if(input[y][x] >= 10) {
        let temp = {y, x}
        let evalPos = JSON.stringify(temp)
        flashed.add(evalPos)
        input[y][x] = 0
        incrementAround(y,x);
      }
    }
  }
  totalFlash += flashed.size
  flashed = new Set()


  // console.log(`step ${(n+1)} after flash`)
  // console.log(totalFlash)
  // console.log("Input after flash", input)
  for(let y=0; y < input[0].length; y++) {
    console.log(input[y].join(''))
  }
}

console.log("Total flashes", totalFlash)