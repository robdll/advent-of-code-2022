const fs = require('fs');
const Stack = require('./stack');
const filename = './input.txt';

// split input into cranes and procedure
const input = fs.readFileSync(filename, 'utf-8').split('');

// read cranes input and initialize stacks
for(let i=0; i<input.length-14; i++) {
    const set = new Set(input.slice(i, i+14));
    if(set.size === 14) {
        console.log(i+14);
        break;
    }
}