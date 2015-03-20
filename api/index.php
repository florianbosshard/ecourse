<?php
require 'vendor/autoload.php';

$app =  new \Slim\Slim();

$app->get('/participants', "getParticipants");
$app->get('/participant/view/:id', "getParticipant");

$app->run();


function getConnection(){
    $servername = "localhost";
    $username = "kurs";
    $password = "CDPJDWQq6pKfrqD7";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=kurs", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    }catch(PDOException $e)
    {
        echo "Connection failed: " . $e->getMessage();
    }
    
}
function getParticipants(){
    $sql = "select * FROM participants ORDER BY participantId";
    try {
            $db = getConnection();
            $stmt = $db->query($sql);  
            $users = $stmt->fetchAll(PDO::FETCH_OBJ);
            $db = null;
            echo json_encode($users);
    } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}
function getParticipant($id) {
	$sql = "SELECT * FROM participants WHERE participantId=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$user = $stmt->fetchObject();  
		$db = null;
		echo json_encode($user); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
