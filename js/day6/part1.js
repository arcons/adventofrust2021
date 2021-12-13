const fs = require('fs')
 
var contents = fs.readFileSync('./test.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(',').map((x)=> parseInt(x));

// Brute force, loop through the entire list every time
// Math solution, keep track of each number in array and sum total at end
let currentFish = [9]
input.forEach(i => {
  currentFish[i]++;
})


for (i = 0; i < 80; i++) {
  let respawn = currentFish[0]
  // move all items over
  currentFish.push(0)
  for(j = 1; j < 9; j++) {
    currentFish[j-1] = currentFish[j]
  }
  // remove last item
  currentFish.pop()
  currentFish[6] += respawn
}

let totalFish = 0
currentFish.forEach(val => {
  totalFish += val
})

console.log("All the fish", totalFish)