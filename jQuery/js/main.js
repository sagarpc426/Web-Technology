let foodData = null;
let i;
let dropDown = document.getElementById('food-items');
let option;

$(document).ready(function() {
   $.getJSON('https://davids-restaurant.herokuapp.com/menu_items.json', function(jd,success) {
      foodData = jd.menu_items;
      createList();
   });
});

function createList(e){
   for(i=0; i<foodData.length; i++){
            option = document.createElement('option');
            option.text = foodData[i].name;
            option.value = i;
            dropDown.appendChild(option);
         }
}

$('#food-items').change(function(e){

   var selected = $(this).children("option:selected").val();
   console.log(selected);
   document.querySelector(".output").innerHTML=`<div class="panel panel-default">
      <div class="panel-heading">
         <h3 class="panel-title">Menu_items</h3>
      </div>
      <div class="panel-body">
         <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">
               <ul class="list-group">
                  <li class="list-group-item"><b>Id</b>: `+foodData[selected].id+`</li>
                  <li class="list-group-item"><b>Short name</b>: `+foodData[selected].short_name+`</li>
                  <li class="list-group-item"><b>Name</b>: `+foodData[selected].name+`</li>
                  <li class="list-group-item"><b>Description</b>: `+foodData[selected].description+`</li>
                  <li class="list-group-item"><b>Price_small</b>: `+foodData[selected].price_small+`</li>
                  <li class="list-group-item"><b>Price_large</b>: `+foodData[selected].price_large+`</li>
                  <li class="list-group-item"><b>Small Portion Name</b>: `+foodData[selected].small_portion_name+`</li>
                  <li class="list-group-item"><b>Large Portion Name</b>:`+foodData[selected].large_portion_name+` </li>
               </ul>
               
            </div>
            <div class="col-md-2">
            </div>
            </div>
            </div>
      </div>`;
         //console.log(foodData[selected].name);
         //console.log(selected);
      });

