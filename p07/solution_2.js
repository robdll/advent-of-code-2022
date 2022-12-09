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

function addIfBigEnough(node) {
    if(node.totalSize >= neededSpace ) {
        bigEnoughFolders.push(node)
    }
    for (const child of node.children) {
        addIfBigEnough(child)
    };
}
  
const totalSpace = 70000000
const availableSpace = totalSpace - tree.totalSize;
const neededSpace = 30000000 - availableSpace
console.log('needed space: ', neededSpace)

const bigEnoughFolders = []
addIfBigEnough(tree)

const nodeToDelete = bigEnoughFolders.reduce( (smallerNode, node) => {
    if(!smallerNode) {
        return node
    } else {
        return smallerNode.totalSize < node.totalSize ? smallerNode : node
    }
}, undefined )

console.log(nodeToDelete.name, nodeToDelete.totalSize) // vvmwgngv 6999588
