
let base_url = "restaurant.php";
//let base_url = "http://edutechclsx.000webhostapp.com/api/test/";
let dropDown = document.getElementById('food-items');
let option;
let food = null;

dropDown.addEventListener("change",getFoodData);

        $("document").ready(function(){
        	console.log("In script");
             getFoodNameList();                   
        });

        function getFoodNameList() {
            let List_url = base_url + "?req=menu_items";
            // 	console.log(List_url);
            $.get(List_url,function(foodData,success){
                console.log(foodData.length);
                console.log(foodData[0].name);
                food = foodData;
                for(i=0; i<foodData.length; i++){
            		option = document.createElement('option');
            		option.text = foodData[i].name;
            		option.value = i;
            		dropDown.appendChild(option);
         		}      			
            });
        }

		function getFoodData(e){

   			var selected = $(this).children("option:selected").val();
   			console.log(food[selected].id);
   			let foodId = food[selected].id;
   			let url = base_url + "?req=Food_Data&foodId="+foodId;
            	$.get(url,function(data,success){
                	console.log(data.name);

                document.querySelector(".output").innerHTML=`<div class="panel panel-default">
				<div class="panel-heading">
				<h3 class="panel-title center">Your Selected Food</h3>
				</div>
				<div class="panel-body">
				<div class="row">
				<div class="col-md-2">
				</div>
				<div class="col-md-8">
					<ul class="list-group">
						<li class="list-group-item"><b>Id</b>: `+data.id+`</li>
						<li class="list-group-item"><b>Short name</b>: `+data.short_name+`</li>
						<li class="list-group-item"><b>Name</b>: `+data.name+`</li>
						<li class="list-group-item"><b>Description</b>: `+data.description+`</li>
						<li class="list-group-item"><b>Price_small</b>: `+data.price_small+`</li>
						<li class="list-group-item"><b>Price_large</b>: `+data.price_large+`</li>
						<li class="list-group-item"><b>Small Portion Name</b>: `+data.small_portion_name+`</li>
						<li class="list-group-item"><b>Large Portion Name</b>:`+data.large_portion_name+` </li>
					</ul>
					
				</div>
				<div class="col-md-2">
				</div>
				</div>
				</div>
		</div>`;

           		 });	
       }
