const { Resolver } = require('dns');
const fs = require('fs');
const filename = './input.txt';

const lines = fs.readFileSync(filename, 'utf-8').split(/\r?\n/);

const tree = {
    name: '/',
    children: [],
    files: [],
    totalSize: 0
}
let currentTarget = tree;
let solution = 0;

lines.forEach(line => {
    const lineType = line[0] === '$' ? 'command' : 'data';
    resolver(lineType, line);
});

function resolver(type, line) {
    if(type === 'command') {
        commandResolver(line);
    }   else {
        dataResolver(line);
    }
}


function commandResolver(line) {
    if(line === '$ cd /' || line === '$ ls' ) return
    if(line === '$ cd ..') {
        currentTarget = currentTarget.parent;
    } else {
        const targetName = line.split(' ')[2]
        currentTarget = currentTarget.children.find( item => item.name === targetName);
    }
}

function dataResolver(line) {
    const [word1, word2] = line.split(' ');
    if(word1 === 'dir') {
        addChildren(word2);
    }   else {
        addFile({name: word2, size: parseInt(word1)});
    }
}

function addChildren(name) {
    currentTarget.children.push({
        name,
        children: [],
        files: [],
        totalSize: 0,
        parent: currentTarget
    });
}

function addFile(file) {
    currentTarget.files.push(file);
    let target = currentTarget
    do {
        target.totalSize += file.size;
        target = target.parent;
    } while(target) 
}

function printSize(node) {
    if(node.totalSize <= 100000 ) {
        solution += node.totalSize; 
    }
    for (const child of node.children) {
        printSize(child)
    };
}
  
printSize(tree)
console.log(solution)