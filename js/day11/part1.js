const fs = require('fs')
 
var contents = fs.readFileSync('./firstTest.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split(''));

// find total number of flashes
const incrementAround = (x,y) => {
    // console.log("searching current", coordinates);
    // use an object and loop through all of these
    const positions = {
    // 'current' : { flashCount: input[y][x], position: {y,x}},
    'left' : { flashCount: input?.[y-1]?.[x] ? input?.[y-1][x] : 11, position: {y:(y-1), x}},
    'upLeft' : { flashCount: input?.[y-1]?.[x-1] ? input?.[y-1][x-1] : 11, position: {y:(y-1),x:(x-1)}},
    'up' : { flashCount: input?.[y]?.[x+1] ? input?.[y]?.[x+1] : 11, position: {y, x:(x+1)}},
    'upRight' : { flashCount: input?.[y+1]?.[x+1] ? input?.[y+1]?.[x+1] : 11, position: {y:(y+1),x:(x+1)}},
    'right' : { flashCount: input?.[y+1]?.[x] ? input?.[y+1]?.[x] : 11, position: {y:(y+1), x}},
    'downLeft' : { flashCount: input?.[y+1]?.[x-1] ? input?.[y+1][x-1] : 11, position: {y: (y+1), x:(x-1)}},
    'down' : { flashCount: input?.[y]?.[x-1] ? input?.[y]?.[x-1] : 11, position: {y, x: (x-1)}},
    'downRight' : { flashCount: input?.[y-1]?.[x-1] ? input?.[y-1][x-1] : 11, position: {y:(y-1), x:(x-1)}}
    }

    let currentSum = 0
    Object.values(positions).forEach(val => {
      val.flashCount++
      let posX = val.position.x
      let posY = val.position.y
      console.log('looking at x,y', posX, posY)
      if(val.flashCount == 10) {
        input[posX][posY] = 0
        currentSum++;
        currentSum += incrementAround(posX,posY)
      }
    })
    return currentSum

}
console.log(input)
incrementAround(2,2)
console.log(input)

// recursive solution is probably best option
// probably a away to do this with finding how often each position changes
// let totalFlash = 0
// for(let n = 0; n < 100; n++) {
//   for(let y=0; y < input.length; y++) {
//     for(let x=0; x < input[0].length; x++) {
//       totalFlashest += incrementAround(x,y)
//     }
//   }
// }

console.log("Total flashes")