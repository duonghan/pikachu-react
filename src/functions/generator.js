/**
 * Generate unique random items function
 * @param row
 * @param col
 * @param amount
 * @returns {*[][]}
 */
//Return an array such as: [0,1,2,...,n]
function range(n){
    return [...Array(n+1).keys()];
};

function getRandom(a,b){
    return Math.floor(Math.random()*(b-a)) + a;
};

//Convert position of item in 1 dimensional array to 2 dimensional array
//e.g: arr1[15] -> arr2[2][1] (2d array width 7 rows and 14 columns)
function getRow(n,col){
    return Math.ceil(n/col);
};

function getCol(n,col){
    return n%col === 0 ? col: n%col;
};

export function getBoard(row, col, amount){
  
    var list = range(row*col);  //store values as index of items.
    var remain = row*col;
    var table = [...Array(row+2)].fill(0).map((_)=> [...Array(col+2)].fill(0));
    var pos, pairpos, index;

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

            table[getRow(pos,col)][getCol(pos,col)]  = table[getRow(pairpos,col)][getCol(pairpos,col)] = i;
        }
    }

    return table;
}

/**
 * 
 * @param {[][]: 2-dim array is source array]} source 
 */
export function reloadBoard(sourceArr, row, col){
    var tmp = [];
    var list = range(row*col);
    var index;

    sourceArr.map(item =>{
        let arr = item.filter(value => {
            return value !== 0;
        });
        tmp.push(...arr);
    });

    var table = sourceArr.slice().map(value => value.fill(0));

    for(let i = 0; i< tmp.length; i++){
        index = getRandom(1, list.length-1);
        table[getRow(list[index],col)][getCol(list[index],col)] = tmp[i];
        list[index] = list.pop();
    }
    
    return table;
}


