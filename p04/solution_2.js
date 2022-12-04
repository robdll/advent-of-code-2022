const fs = require('fs');
const filename = './input.txt';
const lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/);

const containedCases = lines
    .map(toElfSections)
    .map(toCompareResult)
    .reduce(toSum, 0);

console.log(containedCases);

function toElfSections(line) {
    return line.split(',')                                // [ '7-24', '8-8']
        .map(sections => sections.split('-'))                   // [ ['7', '24'], ['8', '8']
        .map(sections => sections.map(item => parseInt(item) )) // [ [7, 24], [8, 8]
        .map(sections => ({ min: sections[0], max: sections[1] })) // [ { min: 7, max: 24 }, { min: 8, max: 8 } ]
}

function toCompareResult([section1, section2]) {
    const isFirstMinCointained = section1.min >= section2.min && section1.min <= section2.max;
    const isFirstMaxCointained = section1.max >= section2.min && section1.max <= section2.max;
    const isFirstOverlapping = isFirstMinCointained || isFirstMaxCointained;
    const isSecondMinCointained = section2.min >= section1.min && section2.min <= section1.max;
    const isSecondMaxCointained = section2.max >= section1.min && section2.min <= section1.max;
    const isSecondOverlapping = isSecondMinCointained || isSecondMaxCointained;
    return isFirstOverlapping || isSecondOverlapping ? 1 : 0;
}

function toSum(sum, value) {
    return sum + value;
}