const fs = require('fs');
const Stack = require('./stack');
const filename = './input.txt';

// split input into cranes and procedure
const [boxConfiguration, procedure] = fs.readFileSync(filename, 'utf-8').split(/\n\n/);

// read cranes input and initialize stacks
let craneStacks = [];
boxConfiguration
    .split(/\r?\n/)
    .reverse()
    .filter(removeFirstLine)
    .map(toBoxName)
    .forEach(addRowItemsToStack)

// read procedure and execute
procedure
    .split(/\r?\n/)
    .map(toStepInfo)
    .forEach(executeStep)

// get top crates
const topCrates = craneStacks
    .map( stack => stack.peek() )
    .join('')

console.log(topCrates) // HNSNMTLHQ

function removeFirstLine (_, index) { return  index > 0 }
function toBoxName (line) { 
    return line.match(/.{1,4}/g)
        .map( i => i.replace(/[^A-Za-z]/g, "") )
}
function addRowItemsToStack (line, idx)  {
    if (idx === 0) {
        craneStacks = line.map(item => new Stack())
    }
    line.forEach( (item, index) => {
        if(item !== '') {
            craneStacks[index].push(item);
        }
    })
}
function toStepInfo(line) {
    return line
        .match(/\d+/g)
        .map( i => parseInt(i) )
}
function executeStep([toMove, fromStack, toStack]) {
    while(toMove > 0) {
        craneStacks[toStack-1].push(craneStacks[fromStack-1].pop())
        toMove--
    }
}
