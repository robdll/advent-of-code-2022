const fs = require('fs');
const filename = './input.txt';
const LinkedNode = require('./LinkedNode');
const LinkedList = require('./LinkedList');


// Read the input file and split it into an array of steps
const steps = fs
        .readFileSync(filename, 'utf-8')
        .split(/\r?\n/)
        .map((step) => step.split(' '))
        .map(([direction, distance]) => ({ direction, distance: parseInt(distance) }));


// Initial Configuration
const H_steps = new LinkedList(new LinkedNode(0, 0, true));
const tail = { row: 0, column: 0};

/**
 * For each step:
 * 1. create next step node
 * 2. set current node next to next node
 * 3. if tail is not adjacent to next node, update tail  position and set node visited
 */ 
function manageStep({direction, distance}) {
    switch(direction) {
        case 'R': {
            for(let i=0; i<distance; i++) {
                const node = H_steps.getLast();
                node.next = new LinkedNode(node.row, node.column+1);
                if(isTailFarAway(node.next)) { 
                    updateNodeAndTail(node)
                }
            }
            break;
        }
        case 'D': {
            for(let i=0; i<distance; i++) {
                const node = H_steps.getLast();
                node.next = new LinkedNode(node.row+1, node.column);
                if(isTailFarAway(node.next)) { 
                    updateNodeAndTail(node)
                }
            }
            break;
        }
        case 'L': {
            for(let i=distance; i>0; i--) {
                const node = H_steps.getLast();
                node.next = new LinkedNode(node.row, node.column-1);
                if(isTailFarAway(node.next)) { 
                    updateNodeAndTail(node)
                }
            }
            break;
        }
        case 'U': {
            for(let i=distance; i>0; i--) {
                const node = H_steps.getLast();
                node.next = new LinkedNode(node.row-1, node.column);
                if(isTailFarAway(node.next)) { 
                    updateNodeAndTail(node)
                }
            }
            break;
        }
    }
}

function updateNodeAndTail(node) {
    node.visited = true;
    tail.column = node.column;
    tail.row = node.row;
}

function isTailFarAway(node) {
    const isTooFarLeftOrRight = Math.abs(tail.column - node.column) > 1;
    const isTooFarUpOrDown = Math.abs(tail.row - node.row) > 1;
    return isTooFarLeftOrRight || isTooFarUpOrDown;
}

// Main thread
steps.forEach(manageStep)

console.log(H_steps.getTotalVisited())