const fs = require('fs');
const filename = './input.txt';


// generate a function to read a file, and split it into lines, then convert each line into an array of numbers
const patch = fs
        .readFileSync(filename, 'utf-8')
        .split(/\r?\n/)
        .map((line) => line
            .split('')
            .map( i => parseInt(i))
            .map( i => ({ value: i, visible: false}))
        )
const patchHeight = patch.length;
const patchWidth = patch[0].length;

let maximals = {
    top: [],
    left: 0,
    bottom: [],
    right: 0,
};
let totalVisibles = 0;

for(let i = 0; i < patchHeight; i++){
    for(let j = 0; j < patchWidth; j++){
        const currentTree = patch[i][j]
        // top line is always visible and are the maximal for north to south
        if(i === 0) {
            maximals.top.push(currentTree.value);
            currentTree.visible = true
        } 
        // first element of each line is always visible and is maximal for west to east
        if(j === 0) {
            maximals.left = currentTree.value;
            currentTree.visible = true
        } 
        // any other elements will be visible if can be visible from west to east or from north to south,
        if(!currentTree.visible) {
            currentTree.visible = currentTree.value > maximals.left || currentTree.value > maximals.top[j];
        }
        // update maximal if needed
        maximals.left = Math.max(maximals.left, currentTree.value);
        maximals.top[j] = Math.max(maximals.top[j], currentTree.value);
    }
}

for(let i = patchHeight -1; i >= 0; i--) {
    if(i === patchHeight -2) {
        maximals.bottom = maximals.bottom.reverse();
    }
    for(let j = patchWidth -1; j >= 0; j--){
        const currentTree = patch[i][j];
        // bottom line is always visible and each element is the maximal for south to north
        if(i === patchHeight -1) {
            maximals.bottom.push(currentTree.value);
            currentTree.visible = true
        }
        // rightmost element of each line is always visible and is maximal for west to east
        if(j === patchWidth -1) {
            maximals.right = currentTree.value;
            currentTree.visible = true
        }
        // any other elements will be visible if can be visible from east to west or from south to north
        if(!currentTree.visible) {
            currentTree.visible = currentTree.value > maximals.right || currentTree.value > maximals.bottom[j];
        }
        if(i !== patchHeight -1){
            maximals.bottom[j] = Math.max(maximals.bottom[j], currentTree.value);
        }
        maximals.right = Math.max(maximals.right, currentTree.value);
    }
}


 for(let i = 0; i < patchHeight; i++) {
     for(let j = 0; j < patchWidth; j++) {
         if(patch[i][j].visible) {
             totalVisibles++;
         }
     }
 }

console.log(totalVisibles)
