/**
 * @description get position array from item's table
 * @author DuongHV
 * @param table
 * @param row
 * @param col
 * @param amount
 * @returns {any[][]}
 */
export function getListPosItem(table, row, col, amount) {
    //Declare and init 2d array
    let listPosItems = [...Array(amount + 1)].fill(null).map(() => new Array());

    for(let i = 1; i<= row; i++){
        for(let j = 1; j<= col; j++){
            if(table[i][j] !== 0){
                listPosItems[table[i][j]].push({x: i, y: j});
            }
        }
    }
    return listPosItems;
}