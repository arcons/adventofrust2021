const fs = require('fs')
 
var contents = fs.readFileSync('./input.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split(''));
// grid loop
let lowPoints = []
let sum = 0

let checkedAlready = []
let totalBasinSize = 0
const basinSearch = (coordinates) => {
  let basinPart = []
  // console.log("searching current", coordinates);
  checkedAlready.push(JSON.stringify(coordinates))
  // console.log(checkedAlready)
    let {x, y} = coordinates
    totalBasinSize++;
    // console.log(x,y)
    const up = input?.[y-1]?.[x] ? input?.[y-1][x] : 10
    if(up < 9) {
      let current = y-1
      if(!checkedAlready.includes(JSON.stringify({x, y:current})))
        basinSearch({x, y:current})
    }
    const right = input?.[y]?.[x+1] ? input?.[y]?.[x+1] : 10
    if(right < 9) {
      let current = x+1
      if(!checkedAlready.includes(JSON.stringify({x:current, y})))
        basinSearch({x:current, y})
    }
    const down = input?.[y+1]?.[x] ? input?.[y+1]?.[x] : 10
    if(down < 9) {
      let current = y+1
      if(!checkedAlready.includes(JSON.stringify({x, y:current})))
        basinSearch({x, y:current})
    }
    const left = input?.[y]?.[x-1] ? input?.[y]?.[x-1] : 10
    if(left < 9) {
      let current = x-1
      if(!checkedAlready.includes(JSON.stringify({x:current, y})))
        basinSearch({x:current, y})
    }
    
  return totalBasinSize
}

let position = {x: 1, y:0}
console.log("All searched", basinSearch(position))

for(let y=0; y < input.length; y++) {
  for(let x=0; x < input[0].length; x++) {
    // check if val is lower than all adjacent positions
    const current = input[y][x]
    const left = input?.[y-1]?.[x] ? input?.[y-1][x] : 10
    const up = input?.[y]?.[x+1] ? input?.[y]?.[x+1] : 10
    const right = input?.[y+1]?.[x] ? input?.[y+1]?.[x] : 10
    const down = input?.[y]?.[x-1] ? input?.[y]?.[x-1] : 10
    // console.log(current, left, right, up, down)
    if(current < left && current < right && current < up && current < down) {
      // console.log("current, lower than freinds", current)
      sum += (parseInt(current)+1)
      lowPoints.push({x,y})
    }
  }
}

// for each low point, perform BFS for 9 or empty and track traversals
let allBasinSizes = []
lowPoints.forEach(low => {
  allBasinSizes.push(basinSearch(low))
  totalBasinSize = 0
  checkedAlready = []
})

const sortedallBasinSizes = allBasinSizes.sort((a,b) => a-b)
let topThreeMult = 1
for(let i = sortedallBasinSizes.length-1; i > sortedallBasinSizes.length-4; i--){
  topThreeMult *= sortedallBasinSizes[i]
}
console.log(topThreeMult)


