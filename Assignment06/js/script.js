document.querySelector("#register").addEventListener("click", display);
document.querySelector("#showlist").addEventListener("click", display);
document.querySelector("#home").addEventListener("click", display);
// document.querySelector("#firstname").addEventListener("keydown", validateName);
// document.querySelector("#lastname").addEventListener("keydown", validateName);
// document.querySelector("#email").addEventListener("focusout", ValidateEmail);

function display(e){
	console.log(e.target.id);
	var sec1 = document.getElementById('homeDiv');
	var sec2 = document.getElementById('registerDiv');
	var sec3 = document.getElementById('showlistDiv');
	
	if (e.target.id == "home") {
		sec1.style.display = "block";
		sec2.style.display = "none";
		sec3.style.display = "none";
	}
	else if (e.target.id == "register") {
		sec1.style.display = "none";
		sec2.style.display = "block";
		sec3.style.display = "none";
    sec2.style.background = "images/register.png";
	}
	else{
		sec1.style.display = "none";
		sec2.style.display = "none";
		sec3.style.display = "block";
	}
}

function validateName(e) {
  if (e.ctrlKey || e.altKey) {
    e.preventDefault();
  } else {
    var key = e.keyCode;

    if (
      !(
        key == 8 ||
        key == 32 ||
        key == 46 ||
        (key >= 35 && key <= 40) ||
        (key >= 65 && key <= 90)
      )
    ) {
      e.preventDefault();
    }
  }
}

function ValidateEmail() {
  var email = document.getElementById("email").value;
  var lblError = document.getElementById("lblError");
  var expr = /^[ [\w\.=-]+@([a-zA-Z]{2,4})+\.([a-zA-Z]{2,4})(\]?){2,3}$/;
  if (!expr.test(email)) {
    alert("Invalid email address.");
    document.getElementById("email").value = "";
  }
}

function validate(evt) {
  var key = evt.keyCode;
  key = String.fromCharCode(key);
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    evt.returnValue = false;
  }
}

let fetchedData = null;
let count = 0;
let newcount = 0;
let firstCall = true;

$(document).ready(function () {
  var table = document.getElementById("registrantList");

  $("#register-btn").click(function () {
    var fName = document.getElementById("firstname").value;
    var lName = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("phone").value;

    if (fName != "" && lName != "" && email != "" && number != "") {
      $.ajax({
        type: "POST",
        cache: "false",
        url: "data/database.php",
        data: {
          functionname: "insertdata",
          name: fName + " " + lName,
          email: email,
          phone: number,
        },
        success: function (html) {
          alert(html);
        },
      });
      document.getElementById("firstname").value = "";
      document.getElementById("lastname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    } else {
      alert("Enter All the Details...!!!");
    }
    return false;
  });

  $('#showlist').click(function(){
      $('#showlist').find("tr:not(:first)").remove();
      $.ajax({
        type: "POST",
        url: "data/database.php",
        data: {
          functionname:'getData',
        },
        success: function(data){
          console.log(data);
          fetchedData = JSON.parse(data);
          console.log(fetchedData.records.length);
          insertRowFun();
        }
      });
      return false;
    });

var phoneupdate = document.getElementById('phoneupdate').value;

  $('#delete').click(function(){
      $.ajax({
        type: "POST",
        url: "data/database.php",
        data: {
          functionname:'deleteRecord',
          phoneupdate: phoneupdate,
        },
        success: function(e){
          console.log(e);
          alert(e);
          insertRowFun();
        }
      });
      return false;
    });

  $('#update').click(function(){
      $.ajax({
        type: "POST",
        url: "data/database.php",
        data: {
          functionname:'updateRecord',
          phoneupdate: phoneupdate,
        },
        success: function(data){
          console.log(data);
          fetchedData = JSON.parse(data);
          console.log(fetchedData.records.length);
          insertRowFun();
        }
      });
      return false;
    });

});

function insertRowFun()
{
  var table = document.getElementById("customers");  //access the table

    if(firstCall && count == 0 && fetchedData.records.length>0){

      document.getElementById('noData').style.display = 'none';  //hide no data lable

    for (var i = 0; i < fetchedData.records.length; i++) {

      var row = table.insertRow(i);
      console.log(row);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = fetchedData.records[i].name;
      cell2.innerHTML = fetchedData.records[i].email;
      cell3.innerHTML = fetchedData.records[i].phone;
      table.appendChild(row);
      count++;
      }
    }
    console.log(count);

}
