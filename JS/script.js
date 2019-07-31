function AddAChild () {
    var container = document.getElementById ("table");
    var id = document.getElementById("ID").value
    var name =  document.getElementById("name").value
    var DoB =  document.getElementById("dob").value
    var phone =  document.getElementById("phone").value
   
        container.innerHTML += " <tr><td>"+id+"</td><td>"+name+"</td><td>"+DoB+"</td><td>"+phone+"</td></tr>";
 
}
function StoreTable(){
    var container = document.getElementById ("table");
    var data = container.innerHTML;
    localStorage.setItem("table_data",data);
}
function LoadTable(){
    var container = document.getElementById ("table");
    var data = localStorage.getItem("table_data");
    container.innerHTML = data;
}
function DeleteData(){
    var container = document.getElementById ("table");
    container.innerHTML = '';
    StoreTable();
}
