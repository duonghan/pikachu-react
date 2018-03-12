/**
 * Generate unique random items function
 * @param row
 * @param col
 * @param amount
 * @returns {*[][]}
 */

export function getBoard(row, col, amount){

    //Return an array such as: [0,1,2,...,n]
    function range(n){
        return [...Array(n+1).keys()];
    }

    function getRandom(a,b){
        return Math.floor(Math.random()*(b-a)) + a;
    }

    //Convert position of item in 1 dimensional array to 2 dimensional array
    //e.g: arr1[15] -> arr2[2][1] (2d array with 7 rows and 14 columns)
    function getRow(n){
        return Math.ceil(n/col);
    }

    function getCol(n){
        return n%col === 0 ? col: n%col;
    }

    var list = range(row*col);  //store values as index of items.
    var table = [...Array(row+2)].fill(0).map((_)=> [...Array(col+2)].fill(0));
    var pos, pairpos, index;
    var remain = row*col;

    while(remain > 0){
        let pokemon = (remain/2)>amount ? amount: remain/2;
        remain -= pokemon*2;

        for (let i = 1; i <= pokemon; i++) {
            //pick a first position
            index = getRandom(1, list.length-1);
            pos = list[index];
            list[index] = list.pop();

            //pick a pair position
            index = getRandom(1, list.length-1);
            pairpos = list[index];
            list[index] = list.pop();

            table[getRow(pos)][getCol(pos)]  = table[getRow(pairpos)][getCol(pairpos)] = i;
        }
    }

    return table;
}


