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
