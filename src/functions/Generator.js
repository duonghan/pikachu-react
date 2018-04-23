
/**
 *
 * @param n
 * @returns {*[1,2,3,4,...,n]}
 */
function range(n) {
    return [...Array(n + 1).keys()];
}

/**
 *
 * @param a
 * @param b
 * @returns random value between (a,b)
 */
function getRandom(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

/**
 * @description Convert position of item in 1 dimensional array to 2 dimensional array
 * @example arr1[15] -> arr2[2][1] (2d array width 7 rows and 14 columns)
 * @param n
 * @param col
 * @returns {number: row index of table}
 */
function getRow(n, col) {
    return Math.ceil(n / col);
}

function getCol(n, col) {
    return n % col === 0 ? col : n % col;
}

/**
 * Generate unique random items function
 * @param row
 * @param col
 * @param amount
 * @returns {*[][]}
 */
export function getBoard(row, col, amount) {
    const list = range(row * col);  // store values as index of items.
    let remain = row * col;
    const table = [...Array(row + 2)].fill(0).map((_)=> [...Array(col + 2)].fill(0));
    let pos, pair_pos, index;

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
            pair_pos = list[index];
            list[index] = list.pop();

            table[getRow(pos, col)][getCol(pos, col)] = table[getRow(pair_pos, col)][getCol(pair_pos, col)] = i;
        }
    }

    return table;
}

/**
 * @description generate random board from source board
 * @param {[][]: 2-dim array is source array]} source
 */
export function reloadBoard(sourceArr, row, col, amount) {
    const tmpIndex = [];    // Contains index of items which has value
    const tmpItems = [];    // Contains value of above items
    let index;

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
        tmpItems[index] = tmpItems.pop();
    }

    return table;
}


