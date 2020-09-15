<?php

$conn = null;

try {
    $conn = new PDO("mysql:host=localhost;dbname=trip", "root", "");
} catch(PDOException $e) {
    echo "Connection to data failed: " . $e->getMessage();
}

?>