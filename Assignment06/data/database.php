<?php


include "config.php";

if($conn == true){

	if ($_POST['functionname'] != '') {

	switch ($_POST['functionname']) {
		
		case 'insertdata':
			$name = $_POST['name'];
			$email = $_POST['email'];
			$phone = $_POST['phone'];

			$sql1 = "SELECT `email` from `garba`.`garba` where `email` LIKE '$email';";
			$sql2 = "SELECT `phone` from `garba`.`garba` where `phone` LIKE '$phone';";

			if ($conn->query($sql1) || $conn->query($sql2)) {
				echo json_encode("User Already Registered");
			}
			else
			{
				if ($name!="" && $email!="" && $phone!="") {
				$sql = "INSERT INTO `garba`.`garba`( `name`, `email`, `phone`,`dt`) VALUES ('$name','$email','$phone', current_timestamp());";
			if ($conn->query($sql))
				echo json_encode("Registered Successfully");
			else
				echo json_encode("Error occured..!!");
			}
			}

	break;

case 'getData':

	$sql = "SELECT * FROM `garba`.`garba` ORDER BY dt;";
	$stmt = $conn->prepare($sql);
	$stmt->execute();

	$data_arr = array();	
	$data_arr['records'] = array();

	if ($stmt->rowCount() > 0) {
  			while($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
      			array_push($data_arr['records'],$row);
  			}
	}
	echo json_encode($data_arr);

break;

case 'deleteRecord':
	$phoneupdate = $_POST['phoneupdate'];
	$sql3 = "DELETE from `garba`.`garba` where `phone` = '$phoneupdate';";
	if ($conn->query($sql3))
		echo json_encode("Record Deleted");
	else
		echo json_encode("Error occured..!!");
	break;

default:
	echo json_encode("Invalid Input");
	break;
	
	}


	}
	}
	else
		echo json_encode("Connection failed..!!");	
?>
