const fs = require('fs');

const result = {
    'B X': 1,    // lose with rock
    'C Y': 2,    // lose with paper
    'A Z': 3,    // lose with scissors
    'A X': 4,    // ties with rock    
    'B Y': 5,    // ties with paper
    'C Z': 6,    // ties with scissors
    'A Y': 8,    // win with rock 
    'B Z': 9,    // win with paper
    'C X': 7,    // win with scissors
};

const filename = './input.txt';
const lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/);;

const totalPoints = lines.map( game => result[game] || 0 ).reduce( (a,b) => a + b, 0);
console.log(totalPoints); // 8933