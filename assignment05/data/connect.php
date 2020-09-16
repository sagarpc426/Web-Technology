<?php

$conn = null;

try {
    $conn = new PDO("mysql:host=localhost;dbname=id14770885_trip", "id14770885_spchaudhari", "Sagar@PWAK#1029");
    // ithe server database cha host name lagel and ... root chay jage var username and "" madhe password 
} catch(PDOException $e) {
    echo "Connection to data failed: " . $e->getMessage();
}

?>
