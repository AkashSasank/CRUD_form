var database = "student_data";//default database in local storage
const num_fields = 5;
let searchFlag = false;// to know an ongoing seach operation
let x,y;
function loadDatabase(entity){
  document.getElementById("form_input").reset();
  if(entity === 'student'){
    database = "student_data";
    document.getElementById("id_label").innerHTML = "Student ID:";
    document.getElementById("form_name").innerHTML = "Student Portal"
  }
  else{
    database = "employee_data";
    document.getElementById("id_label").innerHTML = "Employee ID:";
    document.getElementById("form_name").innerHTML = "Employee Portal"
  }
  loadTable();
  return true;
}
function init(){
  loadTable();//load table data from local storage
  document.getElementById("form_input").reset();
  document.getElementById("searchWindow").reset();
  }

function check(myform){
 if (myform[0].value == "" || myform[0].value == null)
 {
   alert("Enter a valid ID");
   return false;
 }
 if (myform[1].value == "" || myform[1].value == null)
 {
   alert("Name is mandatory");
   return false;
 }
 var nameRegex = /^[a-zA-Z]+$/;
 if (nameRegex.test(myform[1].value) === false)
 {
   alert("Enter a valid name");
   return false;
 }
 var emailRegex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
 if ( emailRegex.test(myform[4].value)===false)
 {
   alert("Enter a valid email");
   return false;
 }
 var contactRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
 if(contactRegex.test(myform[3].value)===false){
  alert("Enter a valid contact number");
  return false;
 }
    else{
      return true;
    }
  }
function readForm () {
    let formData = $(document.getElementById("form_input")).serializeArray();
    if(check(formData)){
        document.getElementById("form_input").reset();
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
    loadTable();
    // window.scrollTo(0,0);
  }
function loadTable(array){   
    var container = document.getElementById ("table1");
    container.innerHTML = '';
    let tableData = JSON.parse(localStorage.getItem(database));
    if(tableData.length === 0 ){
      document.getElementById ("main-table").style.display = "none";//hide the search output div
    }
    else{
      document.getElementById ("main-table").style.display = "revert";//hide the search output div
      if(array !== undefined){
        tableData = array;   
      }
      if (tableData!== null){
        for(let employee = 0;employee < tableData.length;employee++){
          const data = tableData[employee];
          let row = document.createElement('tr');
          let newRow = container.appendChild(row);
          for(let i =0;i<num_fields ;i++){
            let col =  document.createElement('td');
            if(!isNaN(data[i].value)||!isNaN(data[i].value.split("-")[0])){
              col.style.textAlign = "right";
            }
            newRow.appendChild(col).innerHTML= data[i].value;
          }
          let col =  document.createElement('td');
          let d = document.createElement("div");
          d.setAttribute("class","modal-cont");
          let del = document.createElement("button");
          let edit = document.createElement("button");
          del.setAttribute("class","btn btn-warning");
          edit.setAttribute("class","btn btn-danger");
          edit.innerHTML = '<span class="glyphicon glyphicon-pencil">';
          del.innerHTML = '<span class="glyphicon glyphicon-trash">';
          edit.onclick = function() {
            if(confirm("Do you want to continue?")){
                window.scrollTo(0,0);//scroll to form
                editTable(employee);
                
              }
          }            
          del.onclick = function() {
            if(confirm("Data will be lost forever!! Do you want to continue? ")){
                  deleteRow(employee);
                  window.scrollTo(0,0);//scroll to form
                }
          }
          d.appendChild(edit);
          d.appendChild(del);
          newRow.appendChild(d);
      }
      }
    }
}
function editTable(index){  
  
  let tableData = JSON.parse(localStorage.getItem(database));
  let currentRow = tableData[index];
  document.getElementById("ID").value = currentRow[0].value;
  document.getElementById("name").value = currentRow[1].value;
  document.getElementById("dob").value = currentRow[2].value;
  document.getElementById("phone").value = currentRow[3].value;
  document.getElementById("Email").value = currentRow[4].value;
  document.getElementById("submitButton").onclick = function(){
      x = event.clientX;
      y = event.clientY;   
      console.log(x)
      console.log(y)   
      let status = updateTable(index);
      if(status){
        document.getElementById("submitButton").setAttribute("onclick",null);
        document.getElementById("submitButton").setAttribute("onclick","readForm()");
        loadTable();
        window.scrollTo(x,y+200);//scroll back to row
      }
      };  
}
function updateTable(index){
  let formData = $(document.getElementById("form_input")).serializeArray();
  if(check(formData)){
    let tableData = JSON.parse(localStorage.getItem(database));
    tableData[index]=formData;
    document.getElementById("form_input").reset();
    let newData = JSON.stringify(tableData);
    localStorage.setItem(database,newData);
    return true;
  }  
}
//To delete a row of given index
function deleteRow(index){
  let tableData = JSON.parse(localStorage.getItem(database));
  tableData.splice(index,1);
  let newData = JSON.stringify(tableData);
  localStorage.setItem(database,newData);
  loadTable();
}
  //Sort each field in table by clicking on corresponding table heading
function sortData(field,type){
    let tableData = JSON.parse(localStorage.getItem(database));
    let table_ids = ["idh","nameh","dobh","phoneh","emailh"];
    let table_head =  document.getElementById(table_ids[field]);
    let data = []; 
    let index = [];  
    let f = field.toString(); 
    // alert(f)
    for(let i = 0;i<tableData.length;i++){
      data.push([tableData[i][field].value,i]);
    }
    let sortedData = data.sort();
    for( i =0;i<tableData.length;i++){
      index.push(sortedData[i][1]);
    }
    let newData = [];
    if(type === 'ascending'){
      for( i =0 ; i<tableData.length ; i++){
        newData.push(tableData[index[i]]);
      }
     table_head.setAttribute("onclick",null);
     table_head.setAttribute("onclick","sortData("+f+")");
     table_head.lastElementChild.setAttribute("class","glyphicon glyphicon-chevron-down");
    }
    else if(type === undefined){
      for( i =0 ; i<tableData.length ; i++){
        newData.unshift(tableData[index[i]]);
      } 
      table_head.setAttribute("onclick",null);
      table_head.setAttribute("onclick","sortData("+f+",'ascending')");
      table_head.lastElementChild.setAttribute("class","glyphicon glyphicon-chevron-up");
    }
    else{
      document.getElementById(table_ids[field]).setAttribute("onclick",null);
      document.getElementById(table_ids[field]).setAttribute("onclick","sortData("+f+")");
    }
   loadTable(newData);
   localStorage.setItem(database,JSON.stringify(newData));
  }
function searchTable() {
    searchFlag = true;
    let input, filter, table, tr, td, i,j, txtValue;
    let index = [];
    input = document.getElementById("search");
    // console.log(input.value);
    filter = input.value.toUpperCase();
    table = document.getElementById("table1");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      for(j = 0;j<num_fields;j++){
      td = tr[i].getElementsByTagName("td")[j];     
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) === -1) {
          index.push(i);
          tr[i].style.display = "none";
        } else {
          tr[i].style.display = "";
        }
      }       
    }
  }
}
  

 

