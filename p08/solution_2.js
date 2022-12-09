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

const patchClone = []
for(let i = 0; i < patchHeight; i++){
    patchClone.push([]);
    for(let j = 0; j < patchWidth; j++){
        const currentTree = patch[i][j];
        const visibleTreesN = countTrees(i, j, 'N');
        const visibleTreesE = countTrees(i, j, 'E');
        const visibleTreesS = countTrees(i, j, 'S');
        const visibleTreesW = countTrees(i, j, 'W');
        patchClone[i][j] = visibleTreesN * visibleTreesE * visibleTreesS * visibleTreesW
    }
}

let highestScenicScore = 0;
 for(let i = 0; i < patchHeight; i++) {
     for(let j = 0; j < patchWidth; j++) {
        highestScenicScore = Math.max(highestScenicScore, patchClone[i][j])
     }
 }

console.log(highestScenicScore)

function countTrees(i, j, dir) {
    let count = 0;
    switch(dir) {
        case 'N':
            for(let k = i - 1; k >= 0; k--) {
                if(patch[k][j].value <= patch[i][j].value) {
                    count++;
                }
                if(patch[k][j].value >= patch[i][j].value) {
                    break;
                }
            }
            break;
        case 'E':
            for(let k = j + 1; k < patchWidth; k++) {
                if(patch[i][k].value <= patch[i][j].value) {
                    count++;
                }
                if(patch[i][k].value >= patch[i][j].value) {
                    break;
                }
            }
            break;
        case 'S':
            for(let k = i + 1; k < patchHeight; k++) {
                if(patch[k][j].value <= patch[i][j].value) {
                    count++;
                }
                if(patch[k][j].value >= patch[i][j].value) {
                    break;
                }
            }
            break;
        case 'W':
            for(let k = j - 1; k >= 0; k--) {
                if(patch[i][k].value <= patch[i][j].value) {
                    count++;
                }
                if(patch[i][k].value >= patch[i][j].value) {
                    break;
                }
            }
            break;
    }
    return count;
}
