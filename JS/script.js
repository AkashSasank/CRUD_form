var database = "student_data";//default database in local storage
function loadDatabase(entity){
  if(entity === 'student'){
    database = "student_data";
    document.getElementById("id_label").innerHTML = "Student ID:";
  }
  else{
    database = "employee_data";
    document.getElementById("id_label").innerHTML = "Employee ID:";
  }
  loadTable();
}
function init(){
  loadTable();//load table data from local storage
  document.getElementById("search_out").style.display = "none";//hide the search output div
  document.getElementById("form_input").reset();
  }
function readForm () {
    let formData = $(document.getElementById("form_input")).serializeArray();
    if(formData[0].value && formData[1].value){
        let storedData = null;
        if(localStorage.getItem(database) === null){
          storedData = [];
        }
        else{
          storedData = JSON.parse(localStorage.getItem(database)); 
        }
          storedData.unshift(formData);
          let newData = JSON.stringify(storedData);
          localStorage.setItem(database,newData);
    }  
    document.getElementById("form_input").reset();
    loadTable();
  }
function loadTable(array){
    var container = document.getElementById ("table1");
    container.innerHTML = '';
    let tableData;
    if (array === undefined){
      tableData = JSON.parse(localStorage.getItem(database));
    }
    else{
      tableData = array;
    }
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
    addRowHandlers();
    } 
}
function searchOutput(){
  var container = document.getElementById ("table2");
  let tableData = JSON.parse(localStorage.getItem(database));
  let searchInput = document.getElementById("search").value;
  let index = searchTable(searchInput,tableData,"table2"); 
  if(index === null){
      alert("Oops! no result")
  }
  else{
    for(let i = 0;i<index.length;i++){
      const data = tableData[i];
      createRow(data,container);
      document.getElementById("search_out").style.display = "block";//show the search output div
      document.getElementById("search_out").onclick = function(){
        document.getElementById("search_out").style.display = "none";//show the search output div
    }
   
  }
  }

}
function searchTable(searchInput,tableData,outputTableID){
    if(outputTableID!== null){
      var container = document.getElementById (outputTableID);
      container.innerHTML = '';
    }
    var index = [];
    for(let i = 0;i < tableData.length;i++){
        for(let j = 0;j < tableData[i].length;j++){
            if(tableData[i][j].value === searchInput){
                index.push(i);
            }
        }
    }
    document.getElementById("searchWindow").reset();
    return index;
  }
function createRow(data,container){
    let row = document.createElement('tr');
    let newRow = container.appendChild(row);
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
  let tableData = JSON.parse(localStorage.getItem(database));
  let currentRow = tableData[index];
  document.getElementById("ID").value = currentRow[0].value;
  document.getElementById("name").value = currentRow[1].value;
  document.getElementById("dob").value = currentRow[2].value;
  document.getElementById("phone").value = currentRow[3].value;
  document.getElementById("Email").value = currentRow[4].value;
  if(document.getElementById("ID").value && document.getElementById("name").value){
    document.getElementById("submitButton").onclick = function(){
      updateTable(index);
      document.getElementById("form_input").reset();
      document.getElementById("submitButton").setAttribute("onclick",null);
      document.getElementById("submitButton").setAttribute("onclick","readForm()");
      loadTable();
      };
  }  
}
function updateTable(index){
  let formData = $(document.getElementById("form_input")).serializeArray();
  let tableData = JSON.parse(localStorage.getItem(database));
  tableData[index]=formData;
  let newData = JSON.stringify(tableData);
  localStorage.setItem(database,newData);
}
//To delete a row of given index
function deleteRow(index){
  let tableData = JSON.parse(localStorage.getItem(database));
  tableData.splice(index,1);
  let newData = JSON.stringify(tableData);
  localStorage.setItem(database,newData);
  loadTable();
}
//To detect a click on a given row
function addRowHandlers() {
    var table = document.getElementById("table1");
    var rows = table.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
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
  //Sort each field in table by clicking on corresponding table heading
  function sortData(field){
    let tableData = JSON.parse(localStorage.getItem(database));
    let data = []; 
    let index = [];   
    for(let i = 0;i<tableData.length;i++){
      data.push([tableData[i][field].value,i]);
    }
    let sortedData = data.sort();
    for( i =0;i<tableData.length;i++){
      index.push(sortedData[i][1]);
    }
    let newData = [];
    for( i =0 ; i<tableData.length ; i++){
      newData.push(tableData[index[i]]);
    }
   loadTable(newData);
   localStorage.setItem(database,JSON.stringify(newData));
  }
 

