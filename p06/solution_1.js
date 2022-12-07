const fs = require('fs');
const filename = './input.txt';

// split input into cranes and procedure
const input = fs.readFileSync(filename, 'utf-8').split('');

// read cranes input and initialize stacks
for(let i=0; i<input.length-4; i++) {
    const set = new Set(input.slice(i, i+4));
    if(set.size === 4) {
        console.log(i+4);
        break;
    }
}