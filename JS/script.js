
 function readForm () {
    let formData = $(document.getElementById("form_input")).serializeArray();
    if(formData[0].value && formData[1].value){
        let storedData = null;
        if(localStorage.getItem("table_data") === null){
          storedData = [];
        }
        else{
          storedData = JSON.parse(localStorage.getItem("table_data")); 
        }
          storedData.unshift(formData);
          let newData = JSON.stringify(storedData);
          localStorage.setItem("table_data",newData);
    }  
  }
function loadTable(){
    var container = document.getElementById ("table1");
    let tableData = JSON.parse(localStorage.getItem("table_data"));
    for(let employee = 0;employee < tableData.length;employee++){
        let row = document.createElement('tr');
        let col1 =  document.createElement('td');
        let col2 =  document.createElement('td');
        let col3 =  document.createElement('td');
        let col4 =  document.createElement('td');
        let col5 =  document.createElement('td');
        console.log(employee);
        const newRow = container.appendChild(row);
        const data = tableData[employee];
        newRow.appendChild(col1).innerHTML = data[0].value;
        newRow.appendChild(col2).innerHTML = data[1].value;
        newRow.appendChild(col3).innerHTML = data[2].value;
        newRow.appendChild(col4).innerHTML = data[3].value;
        newRow.appendChild(col5).innerHTML = data[4].value;
    }
    addRowHandlers();
}
function searchTable(){
    let tableData = JSON.parse(localStorage.getItem("table_data"));
    var container = document.getElementById ("table2");
    container.C
    container.innerHTML = '';
    var index = null;
    for(let i = 0;i < tableData.length;i++){
        for(let j = 0;j < tableData[i].length;j++){
            if(tableData[i][j].value === document.getElementById("search").value){
                index = i;
                break;
            }
        }
    }
    if(index == null){
        alert("Oops! no result")
    }
    if(index !== null){
        let row = document.createElement('tr');
        let col1 =  document.createElement('td');
        let col2 =  document.createElement('td');
        let col3 =  document.createElement('td');
        let col4 =  document.createElement('td');
        let col5 =  document.createElement('td');
        const newRow = container.appendChild(row);
        const data = tableData[index];
        newRow.appendChild(col1).innerHTML = data[0].value;
        newRow.appendChild(col2).innerHTML = data[1].value;
        newRow.appendChild(col3).innerHTML = data[2].value;
        newRow.appendChild(col4).innerHTML = data[3].value;
        newRow.appendChild(col5).innerHTML = data[4].value;
    }
}
function DeleteData(){
    var container = document.getElementById ("table1");
    container.innerHTML = '';
    localStorage.clear();
    var container = document.getElementById ("table2");
    container.innerHTML = '';
}
function addRowHandlers() {
    var table = document.getElementById("table1");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
      var currentRow = table.rows[i];
      var createClickHandler = function(row) {
        return function() {
          var cell = row.getElementsByTagName("td")[0];
          var id = cell.innerHTML;
          alert("id:" + id);
        };
      };
      currentRow.onclick = createClickHandler(currentRow);
    }
  }

