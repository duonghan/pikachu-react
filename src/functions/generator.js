/**
 * Generate unique random items function
 * @param row
 * @param col
 * @param amount
 * @returns {*[][]}
 */

let listPosItems = [];

// Return an array such as: [0,1,2,...,n]
function range(n) {
    return [...Array(n + 1).keys()];
}

function getRandom(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

// Convert position of item in 1 dimensional array to 2 dimensional array
// e.g: arr1[15] -> arr2[2][1] (2d array width 7 rows and 14 columns)
function getRow(n, col) {
    return Math.ceil(n / col);
}

function getCol(n, col) {
    return n % col === 0 ? col : n % col;
}

export function getBoard(row, col, amount) {
    const list = range(row * col);  // store values as index of items.
    let remain = row * col;
    const table = [...Array(row + 2)].fill(0).map((_)=> [...Array(col + 2)].fill(0));
    listPosItems = [...Array(amount + 1)].fill(null).map((_) => new Array());
    let pos, pairpos, index;

    while(remain > 0) {
        const pokemon = (remain / 2) > amount ? amount : remain / 2;
        remain -= pokemon * 2;

        for (let i = 1; i <= pokemon; i++) {
            // pick a first position
            index = getRandom(1, list.length - 1);
            pos = list[index];
            list[index] = list.pop();

            // pick a pair position
            index = getRandom(1, list.length - 1);
            pairpos = list[index];
            list[index] = list.pop();

            table[getRow(pos, col)][getCol(pos, col)] = table[getRow(pairpos, col)][getCol(pairpos, col)] = i;

            // add position to listPosItems
            listPosItems[i].push({x: getRow(pos, col), y: getCol(pos, col)}, {x: getRow(pairpos, col), y: getCol(pairpos, col)});
        }
    }

    return table;
}

/**
 *
 * @param {[][]: 2-dim array is source array]} source
 */
export function reloadBoard(sourceArr, row, col, amount) {
    const tmpIndex = []; // Contains index of items which has value
    const tmpItems = [];  // Contains value of above items
    let index;
    listPosItems = [...Array(amount + 1)].fill(null).map((_) => new Array());

    for(let i = 1; i <= row; i++) {
        for(let j = 1; j <= col; j++ ) {
            if(sourceArr[i][j] !== 0) {
                tmpIndex.push({i, j});
                tmpItems.push(sourceArr[i][j]);
            }
        }
    }

    const table = sourceArr.slice().map(value => value.fill(0));

    for(let k = 0; k < tmpIndex.length; k++) {
        index = getRandom(0, tmpItems.length - 1);

        // rearrange
        table[tmpIndex[k].i][tmpIndex[k].j] = tmpItems[index];

        try{
            // update listPosItems array
            listPosItems[tmpItems[index]].push({x: tmpIndex[k].i, y: tmpIndex[k].j});
        }catch(ex) {
            console.log('==============ERROR=============');
            console.log('listPosItems: ' + listPosItems);
            console.log('tmpItems: ' + tmpItems);
            console.log('index: ' + index);
            console.log('k: ' + k);
            console.log('tmpIndex[k]: ' + tmpIndex[k]);

            console.log('Exception: ' + ex.message);
        }

        tmpItems[index] = tmpItems.pop();
    }

    return table;
}

export function getListPosItem() {
    return listPosItems;
}


