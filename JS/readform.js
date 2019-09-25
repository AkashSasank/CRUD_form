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