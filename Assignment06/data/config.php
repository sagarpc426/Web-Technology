<?php

$conn = null;

try {
    $conn = new PDO("mysql:host=localhost;dbname=garba", "root", "");
} catch(PDOException $e) {
    echo "Connection to data failed: " . $e->getMessage();
}

?>