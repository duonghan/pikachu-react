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
    let tmpIndex = []; //Contains index of items which has value
    let tmpItems = [];  //Contains value of above items
    let index;


    for(let i = 1; i <= row; i++){
        for(let j = 1; j <= col; j++ ){
            if(sourceArr[i][j] !== 0){
                tmpIndex.push({i,j});
                tmpItems.push(sourceArr[i][j]);
            }
        }
    }

    let table = sourceArr.slice().map(value => value.fill(0));

    for(let k = 0; k < tmpIndex.length; k++){
        index = getRandom(0, tmpItems.length-1);

        //
        table[tmpIndex[k].i][tmpIndex[k].j] = tmpItems[index];
        tmpItems[index] = tmpItems.pop();
    }
    
    return table;
}

export function tmpBoard(){
    return [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,8,6,0,0,0,0,0,0,0],
        [0,0,0,0,0,5,6,7,5,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,13,9,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];
}


