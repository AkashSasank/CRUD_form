function loadTable(){//load the data to table
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
      // if (tableData!== null){//check is table data have any values
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
      // }
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