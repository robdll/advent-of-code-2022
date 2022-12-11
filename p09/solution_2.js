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
const rope = new LinkedList();
for(let prevNode, i=0; i<10; i++) {
    const newNode = new LinkedNode(0, 0);
    if(i===0) {
        rope.head = newNode
    } else {
        prevNode.next = newNode;
    }
    prevNode = newNode
}
let tail = { ...rope.getLast() }
const set = new Set();
updateTail();

/**
 * For each step:
 * 1. move head
 * 2. update rope nodes
 */ 
function manageStep({direction, distance}) {
    const head = rope.getFirst();
    switch(direction) {
        case 'R': {
            for(let i=0; i<distance; i++) {
                head.column++;
                updateNodes();
                if(hasTailMoved()) {
                    updateTail();
                }
            }
            break;
        }
        case 'D': {
            for(let i=0; i<distance; i++) {
                head.row++;
                updateNodes();
                if(hasTailMoved()) {
                    updateTail();
                }
            }
            break;
        }
        case 'L': {
            for(let i=distance; i>0; i--) {
                head.column--;
                updateNodes();
                if(hasTailMoved()) {
                    updateTail();
                }
            }
            break;
        }
        case 'U': {
            for(let i=distance; i>0; i--) {
                head.row--;
                updateNodes();
                if(hasTailMoved()) {
                    updateTail();
                }
            }
            break;
        }
    }
}

function updateTail() {
    tail = { ...rope.getLast() }
    set.add(`${tail.row},${tail.column}`);
}

function hasTailMoved() {
    const ropeTail = rope.getLast();
    return ropeTail.row !== tail.row || ropeTail.column !== tail.column;
}

function updateNodes() {
    let node = rope.getFirst();
    do {
        const sideFar = isSidewayDistant(node, node.next)
        const vertFar = isVerticallyDistant(node, node.next)
        if(sideFar && vertFar) {
            node.next.column = node.next.column + (node.next.column > node.column ? -1 : 1);
            node.next.row = node.next.row + (node.next.row > node.row ? -1 : 1);
        } else if(sideFar) {
            node.next.column = node.next.column + (node.next.column > node.column ? -1 : 1);
            node.next.row = node.row;
        } else if(vertFar) {
            node.next.row = node.next.row + (node.next.row > node.row  ? -1 : 1);
            node.next.column = node.column;
        }
        node = node.next;
    } while(node.next)
}

function isSidewayDistant(n1, n2) {
    return Math.abs(n1.column - n2.column) > 1;
}

function isVerticallyDistant(n1, n2) {
    return Math.abs(n1.row - n2.row) > 1;
}

// Main thread
steps.forEach(manageStep)
console.log(set)
console.log(set.size)
