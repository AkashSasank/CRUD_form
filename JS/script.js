let database;
let table_ids = ["idh","nameh","dobh","phoneh","emailh"];//id of table heads
let form_ids = ["ID","name","dob","phone","Email"];//id of form elements
const num_fields = form_ids.length;
let x,y;
// let searchFlag = false;
function setDatabase(db){//to store the value of database variable while navigating from home page to form page
    localStorage.setItem("database", db); 
}
function loadDatabase(entity){//To navigate between student and emplyee forms 
  document.getElementById("form_input").reset();
  localStorage.setItem("database", entity);
  database = entity;
  if(entity === 'student_data'){//check if student portal is chosen
    document.body.style.backgroundImage = "url('./images/stud2.jpeg')"
    document.getElementById("id_label").innerHTML = "Student ID:";
    document.getElementById("form_name").innerHTML = "Student Portal"
  }
  else if(entity === 'employee_data'){//check if employee portal is chosen
    document.body.style.backgroundImage = "url('./images/stud3.jpeg')"
    document.getElementById("id_label").innerHTML = "Employee ID:";
    document.getElementById("form_name").innerHTML = "Employee Portal"
  }
  loadTable();//load the table from "database"
  // return true;
}
function init(){//initialization functions on page loading
  document.getElementById ("main-table").style.display = "none";//hide table
  document.getElementById ("search-div").style.display = "none";//hide  search  div
  database = localStorage.getItem("database");
  loadDatabase(database);
  document.getElementById("form_input").reset();
  document.getElementById("searchWindow").reset();
  }
function check(myform){//form validation
  var nameRegex = /^[a-zA-Z\s]+$/;
  var emailRegex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
  var contactRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  myform.map((val)=>{  return (val.value == ""||val.value == null)})
  if(myform.map((val)=>{ return (val.value == ""||val.value == null)}).every((val)=>{return val == true}) === true){
    alert("Enter the details before submitting");
    return false;
  }
  else if (myform[0].value == "" || myform[0].value == null || myform[0].value < 0)//validation for ID
  {
    alert("Enter a valid ID");
    return false;
  }
  else if (myform[1].value == "" || myform[1].value == null)//validation for empty name
  {
    alert("Name is mandatory");
    return false;
  }
  else if (nameRegex.test(myform[1].value) === false)//validation for name format
  {
    alert("Enter a valid name");
    return false;
  }
  else if ( emailRegex.test(myform[4].value)===false)//validation for email
  {
    alert("Enter a valid email");
    return false;
  }
  else if(contactRegex.test(myform[3].value)===false){//validation for contact number - 10 digit
    alert("Enter a valid contact number");
    return false;
  }
  else{
    return true;
    }
}
function isUnique(value,data,field){//check if an entry is unique, value - input, data - the entire table data, field - the input field
  let status =  true;
  data.forEach(val => {
    if(val[field].value === value){
     status = status && false;
    }
  });
  return status;
}
function readForm () {//read data from the form elements
    let input = document.getElementById("form_input");
    let formData = $(input).serializeArray();
    if(check(formData)){//validation
        let storedData = null;
        if(localStorage.getItem(database) === null){//check if there is an existing data in local storage
          storedData = [];
        }
        else{
          storedData = JSON.parse(localStorage.getItem(database)); 
        }//check for uniqueness
          if(isUnique(formData[0].value,storedData,0)){//unique ID
            if(isUnique(formData[3].value,storedData,3)){//unique phone
              if(isUnique(formData[4].value,storedData,4)){//unique email
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
function loadTable(array){//load the data to table, array - input array tobe loaded, if array is undefined data from local storage is loaded  
    document.getElementById("form_input").reset();// data is pointed by database variable
    var container = document.getElementById ("table1");
    container.innerHTML = '';
    let tableData = JSON.parse(localStorage.getItem(database));
    if(tableData === null || tableData.length === 0 ){// check if there is a stored data
      document.getElementById ("main-table").style.display = "none";//hide table
      document.getElementById ("search-div").style.display = "none";//hide  search  div
    }
    else if(tableData.length > 0){// a stored data exists
      document.getElementById ("main-table").style.display = "block";//show table
      document.getElementById ("search-div").style.display = "block";//show search  div
      if(array !== undefined){//assign tableData as array in case an array is passed
        tableData = array;   
      }
      if (tableData!== null){//check is table data have any values
        for(let individual = 0;individual < tableData.length;individual++){// for every individual record construct a 
          const data = tableData[individual];//row and corresponding operations(edit, delete)
          let row = document.createElement('tr');
          let newRow = container.appendChild(row);
          for(let i =0;i<num_fields ;i++){
            let col =  document.createElement('td');
            if(!isNaN(data[i].value)||!isNaN(data[i].value.split("-")[0])){//text and number formatting
              col.style.textAlign = "right";
            }
            newRow.appendChild(col).innerHTML= data[i].value;
          }
          let col =  document.createElement('td');
          let d = document.createElement("div");
          d.setAttribute("class","modal-cont");
          let del = document.createElement("button");//delete button
          let edit = document.createElement("button");//edit button
          del.setAttribute("class","btn btn-danger");
          edit.setAttribute("class","btn btn-warning");
          edit.innerHTML = '<span class="glyphicon glyphicon-pencil">';
          del.innerHTML = '<span class="glyphicon glyphicon-trash">';
          edit.onclick = function() {
            if(confirm("Do you wish to continue?")){
                window.scrollTo(0,0);//scroll to form
                editTable(individual);
              }
          }            
          del.onclick = function() {
            if(confirm("Data will be lost forever!! Do you wish to continue? ")){
                  deleteRow(individual);
                  // window.scrollTo(0,0);//scroll to form
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
function editTable(index){// edit row of pointed by index
  let tableData = JSON.parse(localStorage.getItem(database));
  let submit = document.getElementById("submitButton");
  let currentRow = tableData[index];
  form_ids.forEach((val,i)=>{document.getElementById(val).value = currentRow[i].value;});//enter row details back to form
  submit.onclick = function(){
      x = event.clientX;
      y = event.clientY;   
      let status = updateTable(index);//update row pointed by index
      if(status){
        submit.setAttribute("onclick",null);
        submit.setAttribute("onclick","readForm()");
        loadTable();
        window.scrollTo(x,y+200);//scroll back to row
        document.getElementById("searchWindow").reset();
      }
      };      
}
function updateTable(index){//update row pointed by index
  let input = document.getElementById("form_input");
  let formData = $(input).serializeArray();
  if(check(formData)){//validation
    let tableData = JSON.parse(localStorage.getItem(database));
    let record = tableData.filter((val,i)=> i!== index )
    if(isUnique(formData[0].value,record,0)){//unique ID
      if(isUnique(formData[3].value,record,3)){//unique Phone
        if(isUnique(formData[4].value,record,4)){//Unique Email
          tableData[index]=formData;
          input.reset();
          let newData = JSON.stringify(tableData);
          localStorage.setItem(database,newData);
          return true;//return true if all conditions for uniqueness are satisfied
        }
        else{
          alert("email ID already exists!")
          return false;
        }
      }
      else{
        alert("Contact number already exists!")
        return false;
      }
    }
    else{
      alert("A record already exists for the given  ID!")
      return false;
    }  
  }  
}
function deleteRow(index){//To delete a row of given index
  let tableData = JSON.parse(localStorage.getItem(database));
  tableData.splice(index,1);//remove the row pointed by index
  let newData = JSON.stringify(tableData);
  localStorage.setItem(database,newData);
  loadTable();
}
function sortData(field,type){  //Sort each field in table by clicking on corresponding table heading
  // if(!searchFlag){
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
   loadTable(newData);
   localStorage.setItem(database,JSON.stringify(newData));
  // }
  }
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