const fs = require('fs');
const Monkey = require('../p11/Monkey');
const filename = './input.txt';

// Read the input
const monkeyData = fs.readFileSync(filename, 'utf-8').split(/\n\n/);
const monkeys = monkeyData
    .map(toMonkey);
const divisorsProduct = monkeys.map( m => m.divisor ).reduce( (a,b) => a * b, 1);

// Rounds logic
let completedRounds = 0;
do {
    monkeys.forEach((monkey, idx) => {
        while(monkey.items.length > 0) {
            const itemValue = monkey.items[0];
            playTurn(monkey, itemValue);
        }
    })
    completedRounds++;
} while(completedRounds < 10000)

const inspections = monkeys.map(monkey => monkey.inspection);
inspections.sort((a, b) => b - a);
const monkeyBusiness = inspections[0] * inspections[1];
console.log(monkeyBusiness)

// Monkey turn
function playTurn(monkey, itemValue) {
    let anxiety = monkey.affectAnxiety(itemValue);
    anxiety = anxiety % divisorsProduct;
    const friendIndex = monkey.chooseFriend(anxiety);
    monkey.throwItemTo(monkeys[friendIndex], anxiety);
}

// Helper function
function toMonkey(lines) {
    const [
        _,
        itemsLine,
        opLine,
        divisorLine,
        friend1Line,
        friend2Line
    ] = lines.split(/\n/);

    const items = itemsLine
        .replace(/[^0-9,]/g, "")
        .split(',')
        .map(item => parseInt(item))

    const op = opLine.split(' = ')[1];

    const divisor = parseInt(
        divisorLine.replace(/[^0-9,]/g, "")
    )

    const friend1 = parseInt(
        friend1Line.replace(/[^0-9,]/g, "")
    )

    const friend2 = parseInt(
        friend2Line.replace(/[^0-9,]/g, "")
    )

    return new Monkey(
        items, 
        op, 
        divisor,
        friend1,
        friend2
    );
}
