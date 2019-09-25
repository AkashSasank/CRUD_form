let database;
let table_ids = ["idh","nameh","dobh","phoneh","emailh"];//id of table heads
let form_ids = ["ID","name","dob","phone","Email"];//id of form elements
const num_fields = form_ids.length;
let x,y;
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