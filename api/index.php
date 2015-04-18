<?php
require 'vendor/autoload.php';

$app =  new \Slim\Slim();

$app->get('/participants', "getParticipants");
$app->get('/participant/view/:id', "getParticipant");
$app->get('/categories/', "getCategories");
$app->post('/beobachtung/', "addBeobachtung");
$app->delete('/beobachtung/:id', "deleteBeobachtung");

$app->run();


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
function getParticipants(){
    $sql = "SELECT participant.participantId, participant.prename, participant.scoutname, participant.image, COUNT(beobachtung.beobachtungId) numBeobachtungen FROM participant LEFT OUTER JOIN beobachtung ON beobachtung.participantId = participant.participantId GROUP BY participant.participantId ORDER BY participant.scoutname, participant.prename";
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
function getCategories(){
       	$sql = "SELECT "
                . " *  "
                . " FROM category category"
                . " ORDER BY categoryId ";
        
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->execute();
		$categories = $stmt->fetchAll(PDO::FETCH_OBJ);
                
		$db = null;
                
		echo json_encode($categories);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}


}
function getCategoriesForParticipant($participantId){
    	$sql = "SELECT "
                . " *  "
                . " FROM category category"
                . " ORDER BY categoryId ";
        
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->execute();
		$categories = $stmt->fetchAll(PDO::FETCH_OBJ);
                
		$db = null;
                
                foreach ($categories as $category) {
                    $category->beobachtungen= getBeobachtungenPerCategories($participantId, $category->categoryId);
                }
                
		return $categories;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

}
function getBeobachtungenPerCategories($participantId, $categoryId){
    	$sql = "SELECT "
                . " beobachtung.beobachtungId, beobachtung.datetime, beobachtung.beobachtung,   "
                . " leader.prename, leader.name, leader.scoutname leaderScoutName, "
                . " activity.activityNumber, activity.title activityTitle "
                . " FROM beobachtung beobachtung"
                . " JOIN leader leader ON leader.leaderId = beobachtung.leaderId "
                . " LEFT OUTER JOIN activity activity ON activity.activityId = beobachtung.activityId "
                . " WHERE categoryId = ". $categoryId
                . " AND participantId = ". $participantId
                . " ORDER BY datetime  ";
        
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->execute();
		$beobachtungen = $stmt->fetchAll(PDO::FETCH_OBJ);
                
		$db = null;
		return $beobachtungen;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

}
function addBeobachtung(){
    global $app;
    
    $request = $app->request();
    $beobachtung = json_decode($request->getBody());
    
    $leaderId = 1;
    
    $sql = "INSERT INTO beobachtung (participantId, leaderId, categoryId, activityId, datetime, beobachtung) VALUES (:participantId, :leaderId, :categoryId, :activityId, :datetime, :beobachtung)";

   
    try{
        $db = getConnection();
        $s = $db->prepare($sql);
        $s->bindParam("participantId",  $beobachtung->participantId);     
        $s->bindParam("leaderId",  $leaderId);
        $s->bindParam("categoryId",  $beobachtung->categoryId);
        $s->bindParam("activityId",  $beobachtung->activityId);
        $s->bindParam("datetime",  $beobachtung->datetime);
        $s->bindParam("beobachtung",  $beobachtung->beobachtung);
        $s->execute();       
    } catch (PDOException $ex) {
        echo '{"error":{"text":'. $ex->getMessage() .'}}'; 
    }
}

function deleteBeobachtung($id){
    global $app;
    try{  
        $sql = "DELETE FROM beobachtung WHERE beobachtungId = :id ";
        $db = getConnection();
        $s = $db->prepare($sql);
        $s->bindParam("id", intval($id));
        $s->execute();
    } catch (PDOException $ex) {
        echo '{"error":{"text":'. $ex->getMessage() .'}}'; 
    }
}


function getParticipant($id) {
	$sql = "SELECT "
                . " participant.participantId, participant.prename, participant.name, participant.scoutname, participant.image  "
                . " FROM participant participant"
                . " WHERE participant.participantId=:id";
        
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$user = $stmt->fetch(PDO::FETCH_OBJ);
                
                
                $user->categories = getCategoriesForParticipant($id);
                
		$db = null;
		echo json_encode($user);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
