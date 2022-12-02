const fs = require('fs');

const result = {
    'A X': 3,    // lose against rock    
    'B X': 1,    // lose against paper
    'C X': 2,    // lose against scissors
    'A Y': 4,    // draw against rock 
    'B Y': 5,    // draw against paper
    'C Y': 6,    // draw against scissors
    'A Z': 8,    // win against rock
    'B Z': 9,    // win against paper
    'C Z': 7,    // win against scissors
};

const filename = './input.txt';
const lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/);;

const totalPoints = lines.map( game => result[game] || 0 ).reduce( (a,b) => a + b, 0);
console.log(totalPoints); // 12387