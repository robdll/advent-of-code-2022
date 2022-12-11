const fs = require('fs');
const filename = './input.txt';

let ctr = '';
const device = {
    cycle: 1,
    sprite: {
        start: 1,
        end: 3,
    }
}

const instruction = fs
        .readFileSync(filename, 'utf-8')
        .split(/\r?\n/)
        .forEach( (instruction, index) => {
            addPixel(device)
            device.cycle++;
            if(instruction !== 'noop') {
                addPixel(device)
                const toAdd = parseInt(instruction.split(' ')[1]);
                device.sprite.start += toAdd;
                device.sprite.end += toAdd;
                device.cycle++;
            }
        })

function isEndOfLine({ cycle, x }) {
    return cycle % 40 === 0;
}

function isCycleInSpriteRange({ cycle, sprite }) {
    const lineOffset = cycle % 40;
    return lineOffset >= sprite.start && lineOffset <= sprite.end;
}

function addPixel(device) {
    ctr += isCycleInSpriteRange(device) ? '#' : '.';
    if(isEndOfLine(device)) {
        console.log(ctr);
        ctr = '';
    }
}