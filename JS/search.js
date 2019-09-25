function searchTable() {//search a given input in the table  
    let input, filter, table, tr, td, i,j, txtValue;
    let index = [];
    input = document.getElementById("search");
    filter = input.value.toString().toUpperCase();
      while(filter.endsWith(" ")){//removes white spaces at end of filter
        filter = filter.slice(0,filter.length-1)
      }
      table = document.getElementById("table1");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        let status = false;
        for(j = 0;j<num_fields;j++){
        td = tr[i].getElementsByTagName("td")[j];     
        txtValue = (td.textContent || td.innerText).toString().slice(0,filter.length);        
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          status = status||true;
          } 
        else {
            tr[i].style.display = "none";
          }    
      }
      if(status){
        index.push(i);
      }
    }
    index.forEach((val)=>{tr[val].style.display = "";})
    if((/^\s+$/).test(filter)){//no action for space bar, simply load the tables
      loadTable();
    } 
}