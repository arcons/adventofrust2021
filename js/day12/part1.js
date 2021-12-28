const fs = require('fs')
 
var contents = fs.readFileSync('./test.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split('-'));
console.log(input)

// Build DFS from start to end to hit all nodes
// build graph and vertices

// create a map each value and then create set off of those values
const start = input.filter(val => val[0] == 'start' || val[1] == 'start')
const end = input.filter(val => val[0] == 'end' ||  val[1] == 'end')
const middle = input.filter(val => !start.includes(val))

let caveMap = new Map()

let tempSet = []
caveMap.set('start', tempSet)
start.forEach(s => {
  if(s[0] == 'start') {
    caveMap.get('start').push(s[1])
  }
  else if(s[1] == 'start') {
    caveMap.get('start').push(s[0])
  }
})

tempSet = []
// caveMap.set('end', tempSet)
// end.forEach(s => {
//   if(s[0] == 'end') {
//     caveMap.get('end').push(s[1])
//   }
//   else if(s[1] == 'end') {
//     caveMap.get('end').push(s[0])
//   }
// })

middle.forEach(s => {
  // check for either then add if path exists
  if(caveMap.has(s[0])) {
    caveMap.get(s[0]).push(s[1])
  } else {
    caveMap.set(s[0], [s[1]])
  }
  if (caveMap.has(s[1])) {
    caveMap.get(s[1]).push(s[0])
  } else {
    caveMap.set(s[1], [s[0]])
  }
})

console.log(caveMap)

// create a set of traversals?
const allTraversals = new Set()
const traverseToEnd = (currentNode, traversalList) => {
  // lowercase cover to charcode "str".charCodeAt(0) returns s, check charcode less than 97 (a)
  // deep copy
  let traversal = []
  traversal.push(currentNode)
  console.log(`current node ${currentNode}, ${traversalList}`)
  while(traversalList.length !== 0) {
    const next = traversalList.pop()
    console.log(`evaluation of route from ${currentNode} to ${next}`)
    if(next == 'end') {
      console.log("ending traversal", traversal)
      allTraversals.add(traversal)
      traversal = [currentNode]
    } else {
      const otherVert = caveMap.get(next)
      while(otherVert.length != 0) {
        traversal.shift(next)
        if(currentNode.charCodeAt(0) < 97) {
          // uppercase, don't pop
          otherVert.shift(currentNode)
          const currentTraversal = traverseToEnd(next, otherVert)
          console.log('traversing from', next, otherVert)
          if(currentTraversal && currentTraversal.length != 0) {
            if(currentTraversal[0] == 'c') {
              console.log('broke')}
            return currentTraversal
          }
        } else {
          // lowercase
          let currentTraversal = traverseToEnd(next, otherVert)
          if(!currentTraversal && currentTraversal.includes(next) && next.charCodeAt(0) > 97 ) {
            console.log('invalid', next)
            return false
          }
          currentTraversal.shift(next)
          traversal.concat(currentNode)
          return currentTraversal
        }
      }
      // return [currentNode]
    }
  }
  return traversal
  // otherwise return 1
} 
//could also use a stack
console.log("Starting map", caveMap)
caveMap.get('start').forEach(val => {
  const caveMapClone = new Map(caveMap)
  allTraversals.add(traverseToEnd(val, caveMap.get(val)))
  console.log("current", allTraversals)
  caveMap = new Map(caveMapClone)
})

