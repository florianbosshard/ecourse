<?php

function getConnection(){
    $servername = "localhost";
    $username = "kurs";
    $password = "CDPJDWQq6pKfrqD7";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=kurs;charset=utf8", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    }catch(PDOException $e)
    {
        echo "Connection failed: " . $e->getMessage();
    }
    
}

?>