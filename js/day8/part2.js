const fs = require('fs');
 
var contents = fs.readFileSync('./input.txt', 'utf8');
// var contents = fs.readFileSync('./input.txt', 'utf8');
// write function to grab all attendees
// example parse
// Format
const input = contents.split(/\r?\n/).map((x)=> x.split(' | '));
// top down, a b c d e f g
//           0 1 2 3 4 5 6 
let clockMap = [7]

let sortedNumMap = new Map()

// need to find intersection between values
// 1,7 share c f
// 4 reduces to d b has all
// 8 has all

let total = 0
for(line of input) {
  let numberMap = {}
  let values = line[0].split(' ').sort((a,b) => a.length>b.length)
  values = values.map(val => val.split('').sort().join(''))

  const oneVal = values.find(value => value.length == 2).split('')
  const sevenVal = values.find(value => value.length == 3).split('')
  const fourVal = values.find(value => value.length == 4).split('')
  const eightVal = values.find(value => value.length == 7).split('')
  numberMap[oneVal.join('')] = '1'
  numberMap[sevenVal.join('')] = '7'
  numberMap[fourVal.join('')] = '4'
  numberMap[eightVal.join('')] = '8'
  // 2 & 3 & 5 have length of 5
  const fiveLength = values.filter(value => value.length == 5)
  // 0 & 6 & 9 have length of 6
  const sixLength = values.filter(value => value.length == 6)

  // find 0 position, correct
  clockMap[0] = sevenVal.filter(x => !oneVal.includes(x))[0];
  
  // find 3 position (0) by finding where 8 four and one of the six length intersections
  // create a set from each of these after split
  let eightOptions = []
  sixLength.forEach(val => {
    eightOptions.push(eightVal.filter(x => !val.includes(x))[0])
  })
  //
  // console.log("Diff between 8, 0, 6 and 9", eightOptions)
  
  // find intersect with 4
  clockMap[6] = eightOptions.filter(val => !fourVal.includes(val))[0]
  // console.log(clockMap[6])
  // position 6 found can now know what combo is 0 by finding
  const nine = sixLength.filter(x => !x.split('').filter(char => char == clockMap[6]).join())[0]
  // console.log('nine', nine)
  numberMap[nine] = '9'

  clockMap[2] = eightOptions.filter(val => oneVal.includes(val))[0]
  clockMap[5] = oneVal.filter(val => !eightOptions.includes(val))[0]
  const six = sixLength.filter(x => !x.split('').filter(char => char == clockMap[2]).join())[0]
  numberMap[six] = '6'
  // console.log('six', six)

  const zero = sixLength.filter(x => x != six && x != nine)[0]
  // console.log('zero', zero)
  numberMap[zero] = '0'


  // intersect 2 and 5 then find match for pos [2] & [5]
  // find intersect with 
  const five = fiveLength.filter(x => !x.split('').filter(char => char == clockMap[2]).join())[0]
  // console.log('five', five)
  numberMap[five] = '5'


  const two = fiveLength.filter(x => !x.split('').filter(char => char == clockMap[5]).join())[0]
  // console.log('two', two)
  numberMap[two] = '2'


  const three = fiveLength.filter(x => x != two && x != five)[0]
  // console.log('three', three)
  numberMap[three] = '3'

  // lol at the code above, w.e it works
  console.log(numberMap)
  let stringNum = ''
  const sumMe = line[1].split(' ')
  sumMe.forEach(val => {
    const sorted = val.split('').sort().join('')
    stringNum += numberMap[sorted]
  })
  console.log(stringNum)
  total += parseInt(stringNum)
}

console.log("pt2:", total)