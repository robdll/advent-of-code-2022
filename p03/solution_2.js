const fs = require('fs');
const filename = './input.txt';
let lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/)

let elvesGroups = [];
let group = [];
lines.filter(emptyLines)
    .forEach((line) => {
        group.push(line);
        if (group.length == 3) {
            elvesGroups.push(group);
            group = [];
        }
    })


elvesGroups = elvesGroups
    .map(toTriplicateLetter)
    .map(toPriorityValue) 
    .reduce(toSum, 0) 

console.log(elvesGroups);
function emptyLines(line) {
    return line.length > 0;
}

function toTriplicateLetter(item) {
    const [ bag1, bag2, bag3] = item;
    const splittedBag = bag1.split('');
    return splittedBag.find( char => {
        const isInBag2 = bag2.includes(char);
        const isInBag3 = bag3.includes(char);
        return isInBag2 && isInBag3;
    });
}

function toPriorityValue(item) {
    const offset = item.charCodeAt(0) > 96 ? 96 : 38; // 97 = a, 64 = A
    return item.charCodeAt(0) - offset;
}

function toSum(sum, item) {
    return sum + item;
}