const fs = require('fs');

let max = 0;
let currentElfTotal = 0;
const allFileContents = fs.readFileSync('./input.txt', 'utf-8');
allFileContents
    .split(/\r?\n/)
    .forEach(line =>  {
        const isEmptyLine = line === '';
        if(isEmptyLine) {
            max = Math.max(max, currentElfTotal);
            currentElfTotal = 0;
        } else {
            currentElfTotal += Number.parseInt(line);
        }
    });
console.log(max)
