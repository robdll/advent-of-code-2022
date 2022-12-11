const fs = require('fs');
const filename = './input.txt';

const device = {
    strengh: 0,
    cycle: 1,
    x: 1,
}
const instruction = fs
        .readFileSync(filename, 'utf-8')
        .split(/\r?\n/)
        .forEach( (instruction, index) => {
            device.strengh += addStrenght(device)
            device.cycle++;
            if(instruction !== 'noop') {
                device.strengh += addStrenght(device)
                const toAdd = parseInt(instruction.split(' ')[1]);
                device.x += toAdd;
                device.cycle++;
            }
        })

function addStrenght({ cycle, x }) {
    return cycle === 20 || cycle % 40 === 20
        ? cycle * x 
        : 0
}

console.log(device.strengh)
