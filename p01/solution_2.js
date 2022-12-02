const fs = require('fs');

const elvesTotal = [];
let currentElfTotal = 0;
const allFileContents = fs.readFileSync('./input.txt', 'utf-8');
allFileContents
    .split(/\r?\n/)
    .forEach(line =>  {
        const isEmptyLine = line === '';
        if(!isEmptyLine) {
            currentElfTotal += Number.parseInt(line);
        } else {
            elvesTotal.push(currentElfTotal);
            currentElfTotal = 0;
        }
    });

// push last elf total
elvesTotal.push(currentElfTotal);

elvesTotal.sort( (a,b) => b - a )
const topThree = elvesTotal[0] + elvesTotal[1] + elvesTotal[2] 
console.log(topThree)
