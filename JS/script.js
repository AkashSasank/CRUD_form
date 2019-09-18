// var database = "student_data";//default database in local storage
let database;
const num_fields = 5;
let table_ids = ["idh","nameh","dobh","phoneh","emailh"];
let x,y;
function setDatabase(db){
    sessionStorage.setItem("database", db); 
}
function loadDatabase(entity){
  document.getElementById("form_input").reset();
  sessionStorage.setItem("database", entity);
  database = entity;
  if(entity === 'student_data'){
    // database = "student_data";
    document.body.style.backgroundImage = "url('./images/stud2.jpeg')"
    document.getElementById("id_label").innerHTML = "Student ID:";
    document.getElementById("form_name").innerHTML = "Student Portal"
  }
  else{
    // database = "employee_data";
    document.body.style.backgroundImage = "url('./images/emp2.jpg')"
    document.getElementById("id_label").innerHTML = "Employee ID:";
    document.getElementById("form_name").innerHTML = "Employee Portal"
  }
  loadTable();
  return true;
}
function init(){
  // loadDatabase(database);
  database = sessionStorage.getItem("database");
  loadDatabase(database);
  // loadTable();//load table data from local storage
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
function isUnique(value,data,field){
  let status =  true;
  data.forEach(val => {
    if(val[field].value === value){
     status = status && false;
    }
  });
  return status;
}
function readForm () {
    let input = document.getElementById("form_input");
    let formData = $(input).serializeArray();
    if(check(formData)){
        let storedData = null;
        if(localStorage.getItem(database) === null){
          storedData = [];
        }
        else{
          storedData = JSON.parse(localStorage.getItem(database)); 
        }
          if(isUnique(formData[0].value,storedData,0)){
            if(isUnique(formData[3].value,storedData,3)){
              if(isUnique(formData[4].value,storedData,4)){
                storedData.unshift(formData);
                let newData = JSON.stringify(storedData);
                localStorage.setItem(database,newData);
                input.reset();
                loadTable();
              }
              else{
                alert("email ID already exists!")
              }
            }
            else{
              alert("Contact number already exists!")
            }
          }
          else{
            alert("A record already exists for the given  ID!")
          }      
    }    
  }
function loadTable(array){   
    var container = document.getElementById ("table1");
    container.innerHTML = '';
    let tableData = JSON.parse(localStorage.getItem(database));
    if(tableData === null || tableData.length === 0 ){
      document.getElementById ("main-table").style.display = "none";//hide table
      document.getElementById ("search-div").style.display = "none";//hide  search  div
    }
    else if(tableData.length > 0){
      document.getElementById ("main-table").style.display = "block";//show table
      document.getElementById ("search-div").style.display = "block";//show search  div
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
            if(confirm("Do you wish to continue?")){
                window.scrollTo(0,0);//scroll to form
                editTable(employee);
              }
          }            
          del.onclick = function() {
            if(confirm("Data will be lost forever!! Do you wish to continue? ")){
                  deleteRow(employee);
                  window.scrollTo(0,0);//scroll to form
                }
          }
          d.appendChild(edit);
          d.appendChild(del);
          col.appendChild(d)
          newRow.appendChild(col);
      }
      }
    }
}
function editTable(index){  
  let tableData = JSON.parse(localStorage.getItem(database));
  let submit = document.getElementById("submitButton");
  let currentRow = tableData[index];
  document.getElementById("ID").value = currentRow[0].value;
  document.getElementById("name").value = currentRow[1].value;
  document.getElementById("dob").value = currentRow[2].value;
  document.getElementById("phone").value = currentRow[3].value;
  document.getElementById("Email").value = currentRow[4].value;
  submit.onclick = function(){
      x = event.clientX;
      y = event.clientY;   
      let status = updateTable(index);
      if(status){
        submit.setAttribute("onclick",null);
        submit.setAttribute("onclick","readForm()");
        loadTable();
        window.scrollTo(x,y+200);//scroll back to row
      }
      };  
}
function updateTable(index){
  let input = document.getElementById("form_input");
  let formData = $(input).serializeArray();
  if(check(formData)){
    let tableData = JSON.parse(localStorage.getItem(database));
    let record = tableData.filter((val,i)=> i!== index )
    if(isUnique(formData[0].value,record,0)){
      if(isUnique(formData[3].value,record,3)){
        if(isUnique(formData[4].value,record,4)){
          tableData[index]=formData;
          input.reset();
          let newData = JSON.stringify(tableData);
          localStorage.setItem(database,newData);
          return true;
        }
        else{
          alert("email ID already exists!")
        }
      }
      else{
        alert("Contact number already exists!")
      }
    }
    else{
      alert("A record already exists for the given  ID!")
    }  
  }  
}
function deleteRow(index){//To delete a row of given index
  let tableData = JSON.parse(localStorage.getItem(database));
  tableData.splice(index,1);
  let newData = JSON.stringify(tableData);
  localStorage.setItem(database,newData);
  loadTable();
}
function sortData(field,type){  //Sort each field in table by clicking on corresponding table heading
    let tableData = JSON.parse(localStorage.getItem(database));
    let table_head =  document.getElementById(table_ids[field]);
    let data = []; 
    let index = [];  
    let f = field.toString(); 
    let sortedData = null;
    for(let i = 0;i<tableData.length;i++){
      data.push([tableData[i][field].value,i]);
    }
    if(isNaN(data[0][0])){
      sortedData = data.sort();
    }
    else{
      sortedData = data.sort(function(a, b){return a[0]-b[0]});
    }
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
function searchTable() {//search a given input in the table
    let input, filter, table, tr, td, i,j, txtValue;
    let index = [];
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table1");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      let status = false;
      for(j = 0;j<num_fields;j++){
      td = tr[i].getElementsByTagName("td")[j];     
      txtValue = td.textContent || td.innerText;  
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
}