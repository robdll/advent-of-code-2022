const fs = require('fs');

let maxCalories = 0;
let currentElfTotal = 0;
const allFileContents = fs.readFileSync('./input.txt', 'utf-8');
allFileContents
    .split(/\r?\n/)
    .forEach(line =>  {
        const isEmptyLine = line === '';
        if(isEmptyLine) {
            maxCalories = Math.max(maxCalories, currentElfTotal);
            currentElfTotal = 0;
        } else {
            currentElfTotal += Number.parseInt(line);
        }
    });

// Consider last line too
maxCalories = Math.max(maxCalories, currentElfTotal);

console.log(maxCalories)
