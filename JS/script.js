function init(){
  loadTable();//load table data from local storage
  document.getElementById("search_out").style.display = "none";//hide the search output div
  addRowHandlers();
}
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
    container.innerHTML = '';
    let tableData = JSON.parse(localStorage.getItem("table_data"));
    if (tableData!== null){
      for(let employee = 0;employee < tableData.length;employee++){
        const data = tableData[employee];
        let row = document.createElement('tr');
        let newRow = container.appendChild(row);
        for(let i =0;i<=4;i++){
          let col =  document.createElement('td');
          newRow.appendChild(col).innerHTML= data[i].value;
        }
    }
    }
    
}
function searchOutput(){
  var container = document.getElementById ("table2");
  let tableData = JSON.parse(localStorage.getItem("table_data"));
  let searchInput = document.getElementById("search").value;
  let index = searchTable(searchInput,tableData,"table2"); 
  if(index == null){
      alert("Oops! no result")
  }
  if(index !== null){
      const data = tableData[index];
      createRow(data,container);
  }
  document.getElementById("search_out").style.display = "block";//show the search output div
  document.getElementById("search_out").onclick = function(){
    document.getElementById("search_out").style.display = "none";//show the search output div
  }

}
function searchTable(searchInput,tableData,outputTableID){
    if(outputTableID!== null){
      var container = document.getElementById (outputTableID);
      container.innerHTML = '';
    }
    var index = null;
    for(let i = 0;i < tableData.length;i++){
        for(let j = 0;j < tableData[i].length;j++){
            if(tableData[i][j].value === searchInput){
                index = i;
                break;
            }
        }
    }
    return index;
  }
function createRow(data,container){
    let row = document.createElement('tr');
    let newRow = container.appendChild(row);
    newRow.setAttribute("data-toggle","modal");
    newRow.setAttribute("data-target","#myModal");
    for(let i =0;i<=4;i++){
      let col =  document.createElement('td');
      newRow.appendChild(col).innerHTML= data[i].value;
    }
}
function deleteData(){
    localStorage.clear();
    var container = document.getElementById ("table1");
    container.innerHTML = '';
    var container = document.getElementById ("table2");
    container.innerHTML = '';
}

function editTable(index){
  let tableData = JSON.parse(localStorage.getItem("table_data"));
  let currentRow = tableData[index];
  document.getElementById("ID").value = currentRow[0].value;
  document.getElementById("name").value = currentRow[1].value;
  document.getElementById("dob").value = currentRow[2].value;
  document.getElementById("phone").value = currentRow[3].value;
  document.getElementById("Email").value = currentRow[4].value;
  document.getElementById("submitButton").onclick = function(){
  updateTable(index);
  };
}
function updateTable(index){
  let formData = $(document.getElementById("form_input")).serializeArray();
  let tableData = JSON.parse(localStorage.getItem("table_data"));
  tableData[index]=formData;
  let newData = JSON.stringify(tableData);
  localStorage.setItem("table_data",newData);
  loadTable();
  document.getElementById("submitButton").setAttribute("onclick","readForm()");
}
function deleteRow(index){
  let tableData = JSON.parse(localStorage.getItem("table_data"));
  tableData.splice(index,1);
  let newData = JSON.stringify(tableData);
  localStorage.setItem("table_data",newData);
  loadTable();
}
function addRowHandlers() {
    var table = document.getElementById("table1");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
      var currentRow = table.rows[i];
      var createClickHandler = function(row,index) {
        return function() {
          if(confirm("Do you want to edit the row?")){
            editTable(index);
          }
          else{
            if(confirm("Do you want to delete the row?")){
              deleteRow(index);
            }
          }
          
        };
      };
      currentRow.onclick = createClickHandler(currentRow,i);
    }
  }


