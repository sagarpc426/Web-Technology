<?php
header("Content-type: application/json");
require 'Data.php';
//include 'Data.php';

$req = $_GET['req'] ?? null;


if ($req) {
    $jsonData = file_get_contents("menu_items.json");
    $dataList = json_decode($jsonData, true)['menu_items'];

    try {
        $restaurantData = new RestaurantData($dataList);
    } catch (Exception $th) {
        echo json_encode([$th->getMessage()]);
        return;
    }
}

switch ($req) {
    case 'menu_items':
        echo $restaurantData->getFoodName();
        break;

    case 'Food_Data':
        $selectedFood = $_GET['foodId'];
        echo $restaurantData->getfoodById($selectedFood);
        break;
    
    default:
        echo json_encode(["In-valid request"]);
        break;
}

?>