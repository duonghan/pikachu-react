


/**
     * Kiem tra kha nang con co the an diem cua bang pokemon
     */
    isExist = () => {
        let tmp = this.state.items.slice(); //ban sao cua item
        let list = []; //mảng của cách 1,3
        let blackList = [];
        let listPosItem = new Array(amount+1); // mảng 2 chiều lưu vị trí theo từng pokemon, index là giá trị của pokemon
        let i,j,k; //các iterator
        let i1,j1,k1;

        //Cach 1: brute-force - vét cạn
        // for(i = 1; i <= row; i++)
        //     for(j = 1; j <= col; j++){
        //         if(tmp[i][j] === 0) continue;
        //         list.push({x: i, y: j});
        //     }
        
        // list.map((item, index, list)=>{
        //     list.map(pair =>{
        //         if(this.isPair(item, pair))
        //             return true;
        //     });
        // })

        //Cach 2: bubble - nổi bọt : tương tự cách 1 
        // for(i = 0; i < list.length; i++)
        //     for(j = i+1; j < list.length; j++){
        //         if(this.isPair(list[i], list[j]))
        //             return true;
        //     }

        //Cách 3: kiểm tra điều kiện của các pokemon cùng loại
        //Khởi tạo mảng 2 chiều
        for(i = 1; i < listPosItem.length; i++)
            listPosItem[i] = new Array();

        //duyệt các phần tử trong bảng game và lưu vị trí theo từng pokemon
        // for(i = 1; i <= row; i++){
        //     for(j = 1; j <= col; j++){
        //         if(tmp[i][j] === 0) continue;

        //         k = tmp[i][j];
        //         listPosItem[k].push({x: i, y: j});
        //     }
        // }
            

        //duyệt từng pokemon xem các vị trí của nó trên board có thể ăn được hay không
        // for(i = 1; i <= listPosItem.length; i++){
        //     //Case 1: 0 item
        //     if(!listPosItem[i] || listPosItem[i].length === 0) continue;

        //     //Case 2: 2, 4, 6... items
        //     for(j = 0; j < listPosItem[i].length ; j++){
        //         for(k = j+1; k < listPosItem[i].length; k++){
        //             if(this.isPair(listPosItem[i][j], listPosItem[i][k])) return true;
        //         }
        //     }
        // }

        //Cách 4: duyệt theo các hướng có thể ăn của từng item
        for(i = 1; i <= row; i++){
            for(j = 1; j <= col; j++){
                if(tmp[i][j] === 0) continue;
                
                //begin
                //Tu diem do len tren
                for(i1 = i; i1 > 0; i1--){
                    if(tmp[i1][j] === tmp[i][j]) return true;

                    if(tmp[i1][j] !== tmp[i][j] && tmp[i1][j] !== 0) break;

                    //Duyet tu diem iterator do sang trai
                    for(j1 = j ; j1 > 0; j1 --){
                        if(tmp[i1][j] === tmp[i][j]) return true;

                        if(tmp[i1][j1] !== tmp[i][j] && tmp[i1][j1] !== 0) break;
                    }
                    //trong ben trai
                    //TODO
                    if(j1 === 0){

                    }


                    //Duyet tu diem iterator do sang phai
                    for(j1 = j ; j1 <= col; j1 ++){
                        if(tmp[i1][j] === tmp[i][j]) return true;

                        if(tmp[i1][j1] !== tmp[i][j] && tmp[i1][j1] !== 0) break;
                    }
                    //trong ben phai
                    //TODO
                    if(j1 === col +1){
                        
                    }



                }

                if(i1 === 0){
                    //trong tu duoi len tren
                    //TODO
                }

                //Tu diem do xuong duoi
                for(i1 = i; i1 > 0; i1--){
                    if(tmp[i1][j] === tmp[i][j]) return true;

                    if(tmp[i1][j] !== tmp[i][j] && tmp[i1][j] !== 0) break;

                    //Duyet tu diem iterator do sang trai
                    for(j1 = j ; j1 > 0; j1 --){
                        if(tmp[i1][j] === tmp[i][j]) return true;

                        if(tmp[i1][j1] !== tmp[i][j] && tmp[i1][j1] !== 0) break;
                    }
                    //trong ben trai
                    //TODO
                    if(j1 === 0){

                    }

                    //Duyet tu diem iterator do sang phai
                    for(j1 = j ; j1 <= col; j1 ++){
                        if(tmp[i1][j] === tmp[i][j]) return true;

                        if(tmp[i1][j1] !== tmp[i][j] && tmp[i1][j1] !== 0) break;
                    }
                    //trong ben phai
                    //TODO
                    if(j1 === col +1){
                        
                    }



                }

                if(i1 === row + 1){
                    //trong tu tren xuong duoi
                    //TODO

                    
                }
                
            }
        }


            

        return false;
        
    };