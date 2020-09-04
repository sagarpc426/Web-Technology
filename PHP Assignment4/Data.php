<?php

class RestaurantData {
    
    private $foodList;

    function __construct(array $foodList) {
        if (sizeof($foodList)>0) {
            $this->foodList = $foodList;
        } else {
            throw new Exception("No record available");
        }
    }

    public function getFoodName() {
        $foodNameList = [];

        foreach($this->foodList as $food) {
            $foodNameList[] = array(
                "id"=>$food['id'],
                "name"=>$food['name']
            );
        }

        return json_encode($foodNameList);
    }

    public function getfoodById($selectedFood) {
        $response = ["In-Valid Request"];
        if($selectedFood) {
            foreach($this->foodList as $food) {
                if ($selectedFood == $food['id']) {
                    $response = $food;
                    break;
                }
            }
        }
        return json_encode($response);
    }

    // public function getTopperfood() {
    //     $food = null;
    //     // Write your logic;
    //     $food['grade'] = getGrade($per);
    // }

    // private function getGrade($per) {
    //     return "A";
    // }

}
?>