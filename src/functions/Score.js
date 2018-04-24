
const numScore = 5;



export function add(score) {

}

export function readScore(filename) {
    let fs = require('fs');
    let obj = JSON.parse(fs.readFileSync(filename, 'utf8'));

    return obj;
}