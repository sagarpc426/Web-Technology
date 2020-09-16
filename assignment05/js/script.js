/** @format */

document.querySelector("#exampleInputEmail1").addEventListener("focusout", ValidateEmail);
document.querySelector("#register").addEventListener("click", addBackground);
document.querySelector("#showList").addEventListener("click", addBackground);
document.querySelector("#aboutUs").addEventListener("click", addBackground);
document.querySelector("#FirstName").addEventListener("keydown", validateName);
document.querySelector("#LastName").addEventListener("keydown", validateName);

function addBackground() {
  document.body.style.background = "gray";
}

//function to display respecitve pages
function disp(e) {
  var sec1 = document.getElementById("home_page");
  var sec2 = document.getElementById("registerBlock");
  var sec3 = document.getElementById("showListBlock");
  var sec4 = document.getElementById("aboutDiv");
  console.log(e);
  if (e == "home") {
    sec1.style.display = "block";
    sec2.style.display = "none";
    sec3.style.display = "none";
    sec4.style.display = "none";
  } else if (e == "register") {
    sec2.style.display = "block";
    sec1.style.display = "none";
    sec3.style.display = "none";
    sec4.style.display = "none";
  } else if (e == "aboutUs") {
    sec4.style.display = "block";
    sec1.style.display = "none";
    sec3.style.display = "none";
    sec2.style.display = "none";
  } else {
    sec3.style.display = "block";
    sec1.style.display = "none";
    sec2.style.display = "none";
    sec4.style.display = "none";
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
  var email = document.getElementById("exampleInputEmail1").value;
  var lblError = document.getElementById("lblError");
  var expr = /^[ [\w\.=-]+@([a-zA-Z]{2,4})+\.([a-zA-Z]{2,4})(\]?){2,3}$/;
  if (!expr.test(email)) {
    alert("Invalid email address.");
    document.getElementById("exampleInputEmail1").value = "";
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
    var fName = document.getElementById("FirstName").value;
    var lName = document.getElementById("LastName").value;
    var email = document.getElementById("exampleInputEmail1").value;
    var number = document.getElementById("mobileNumber").value;

    if (fName != "" && lName != "" && email != "" && number != "") {
      $.ajax({
        type: "POST",
        cache: "false",
        url: "../registration/data/trip.php",
        data: {
          functionname: "insertdata",
          name: fName + " " + lName,
          email: email,
          phone: number,
        },
        success: function (html) {
          console.log(html);
          alert(html);
        },
      });
      document.getElementById("FirstName").value = "";
      document.getElementById("LastName").value = "";
      document.getElementById("exampleInputEmail1").value = "";
      document.getElementById("mobileNumber").value = "";
    } else {
      alert("Enter All the Details...!!!");
    }
    return false;
  });

  $('#showList').click(function(){
      $('#showList').find("tr:not(:first)").remove();
      $.ajax({
        type: "POST",
        url: "../registration/data/trip.php",
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



});


function insertRowFun()
{
  var table = document.getElementById("registrantList");  //access the table

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

