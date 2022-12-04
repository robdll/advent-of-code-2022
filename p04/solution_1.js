const fs = require('fs');
const filename = './input.txt';
const lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/);

const containedCases = lines
    .map(toElfSections)
    .map(toCompareResult)
    .reduce(toSum, 0);

function toElfSections(line) {
    return line.split(',')                                // [ '7-24', '8-8']
        .map(sections => sections.split('-'))                   // [ ['7', '24'], ['8', '8']
        .map(sections => sections.map(item => parseInt(item) )) // [ [7, 24], [8, 8]
        .map(sections => ({ min: sections[0], max: sections[1] })) // [ { min: 7, max: 24 }, { min: 8, max: 8 } ]
}

function toCompareResult([section1, section2]) {
    const isFirstContained = section2.min <= section1.min && section2.max >= section1.max;
    const isSecondContained = section1.min <= section2.min && section1.max >= section2.max;
    return isFirstContained || isSecondContained ? 1 : 0;
}

function toSum(sum, value) {
    return sum + value;
}

console.log(containedCases); // 562