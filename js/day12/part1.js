const fs = require('fs')
 
var contents = fs.readFileSync('./test.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split('-'));
console.log(input)

// Build DFS from start to end to hit all nodes
// lowercase cover to charcode "str".charCodeAt(0) returns s, check charcode less than 97 (a)
// build graph and vertices

// create a map each value and then create set off of those values
const start = input.filter(val => val[0] == 'start' || val[1] == 'start')
const end = input.filter(val => val[0] == 'end' ||  val[1] == 'end')
const middle = input.filter(val => !start.includes(val) && !end.includes(val))

let caveMap = new Map()

let tempSet = new Set()
caveMap.set('start', tempSet)
start.forEach(s => {
  if(s[0] == 'start') caveMap.get('start').add(s[1])
  else if(s[1] == 'start') caveMap.get('start').add(s[0])
})

tempSet = new Set()
caveMap.set('end', tempSet)
end.forEach(s => {
  if(s[0] == 'end') caveMap.get('end').add(s[1])
  else if(s[1] == 'end') caveMap.get('end').add(s[0])
})

middle.forEach(s => {
  // check for either then add if path exists
  if(caveMap.has(s[0])) {
    caveMap.get(s[0]).add(s[1])
  } else if (caveMap.has(s[1])) {
    caveMap.get(s[1]).add(s[0])
  } else {
    caveMap.set(s[0], new Set(s[1]))
  }
})

console.log(caveMap)