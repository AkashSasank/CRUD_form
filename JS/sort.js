function sortData(field,type){  //Sort each field in table by clicking on corresponding table heading
    let tableData = JSON.parse(localStorage.getItem(database));
    let l = tableData.length;
    let table_head =  document.getElementById(table_ids[field]);
    let data = []; 
    let index = [];  
    let f = field.toString(); 
    let sortedData = null;
    for(let i = 0;i<l;i++){
      data.push([tableData[i][field].value,i]);
    }
    if(isNaN(data[0][0])){
      sortedData = data.sort();//sorting strings
    }
    else{
      sortedData = data.sort(function(a, b){return a[0]-b[0]});//sorting numbers
    }
    for( i =0;i<l;i++){
      index.push(sortedData[i][1]);
    }
    let newData = [];
    if(type === 'ascending'){
      for( i =0 ; i<l ; i++){
        newData.push(tableData[index[i]]);
      }
     table_head.setAttribute("onclick",null);
     table_head.setAttribute("onclick","sortData("+f+",'descending')");
     table_head.lastElementChild.setAttribute("class","glyphicon glyphicon-chevron-down");
    }
    else if(type === 'descending'){
      for( i =0 ; i<l ; i++){
        newData.unshift(tableData[index[i]]);
      } 
      table_head.setAttribute("onclick",null);
      table_head.setAttribute("onclick","sortData("+f+",'ascending')");
      table_head.lastElementChild.setAttribute("class","glyphicon glyphicon-chevron-up");
    }
    localStorage.setItem(database,JSON.stringify(newData));
    loadTable();
  }
