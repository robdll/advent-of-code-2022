const fs = require('fs');
const filename = './input.txt';
const lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/);

const priorities = lines
    .filter(emptyLines)
    .map(toBags)
    .map(toDuplicateChar)
    .map(toPriorityValue) 
    .reduce(toSum, 0);

function emptyLines(line) {
    return line.length > 0;
}

function toBags(bag) {
    const half = bag.length / 2;
    return [ bag.substr(0, half), bag.substr(half) ];
}

function toDuplicateChar([bag1, bag2]) {
    return bag1.split('').find((item) => bag2.includes(item));
}

function toPriorityValue(item) {
    const offset = item.charCodeAt(0) > 96 ? 96 : 38; // 97 = a, 64 = A
    return item.charCodeAt(0) - offset;
}

function toSum(sum, item) {
    return sum + item;
}

console.log(priorities);   // 7701