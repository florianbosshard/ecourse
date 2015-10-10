<?php
session_start();
require 'vendor/autoload.php';

$app =  new \Slim\Slim();

$app->get('/participants', "getParticipants");
$app->get('/participant/view/:id', "getParticipant");
$app->get('/categories/', "getCategories");
$app->get('/days/', "getDays");
$app->get('/activities', "getActivities");
$app->get('/activityPerDate/:dateShort', "getActivitiesPerDate");
$app->post('/beobachtung/', "addBeobachtung");
$app->delete('/beobachtung/:id', "deleteBeobachtung");
$app->post('/activity/', "addActivity");
$app->delete('/activity/:id', "deleteActivity");



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

function getDays(){
        setlocale(LC_ALL, "de_CH");
        $sql = "SELECT DISTINCT "
                . " DATE(datetime) as dateShort "
                . " FROM activity activity"
                . " ORDER BY datetime ";
        
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->execute();
		$days = $stmt->fetchAll(PDO::FETCH_OBJ);
                
                foreach ($days as $key => $value) {
                    $value->displayDate = strftime("%a, %e. %B", strtotime($value->dateShort));
                }
                
		$db = null;
                
		echo json_encode($days);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getActivities(){
        setlocale(LC_ALL, "de_CH");
        $sql = "SELECT * , "
                . "(SELECT COUNT(*) FROM beobachtung WHERE beobachtung.activityId = activity.activityId) AS AnzBeobachtungen "
                . " FROM activity activity"
                . " ORDER BY datetime ";
        
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->execute();
		$days = $stmt->fetchAll(PDO::FETCH_OBJ);
                
		$db = null;
                
		echo json_encode($days);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getActivitiesPerDate($date){
        setlocale(LC_ALL, "de_CH");
        $sql = "SELECT * "
                . " FROM activity activity"
                . " WHERE DATE(datetime) = '". $date ."'"
                . " ORDER BY datetime ";
        
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->execute();
		$days = $stmt->fetchAll(PDO::FETCH_OBJ);
                
		$db = null;
                
		echo json_encode($days);
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
                . " ORDER BY CASE 
                     WHEN activity.datetime is null THEN beobachtung.datetime 
                     WHEN activity.datetime is not null THEN activity.datetime 
                    END ASC  ";
        
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
    
    $leaderId = intval($_SESSION["leaderID"]);
    
    $sql = "INSERT INTO beobachtung (participantId, leaderId, categoryId, activityId, datetime, beobachtung) VALUES (:participantId, :leaderId, :categoryId, :activityId, :datetime, :beobachtung)";

   
    try{
        $db = getConnection();
        $s = $db->prepare($sql);
        $s->bindParam("participantId",  $beobachtung->participantId);     
        $s->bindParam("leaderId",  $leaderId);
        $s->bindParam("categoryId",  $beobachtung->categoryId);
        $s->bindParam("activityId",  $beobachtung->activityId);
        $datetime = '';
        if(isset($beobachtung->time)){
            $datetime = $beobachtung->date ." ". $beobachtung->time .":00";         
        }
        
        $s->bindParam("datetime",  $datetime);
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


function addActivity(){
    global $app;
    
    $request = $app->request();
    $activity = json_decode($request->getBody());
    
    
    $sql = "INSERT INTO activity (datetime, activityNumber, title) VALUES (:datetime, :activityNumber, :title)";

   
    try{
        $db = getConnection();
        $s = $db->prepare($sql);
        $s->bindParam("activityNumber",  $activity->activityNumber);
        $s->bindParam("title",  $activity->title);      
        $datetime = $activity->datetimeYYYY ."-". $activity->datetimeMon ."-". $activity->datetimeDD ." ". $activity->datetimeHH .":". $activity->datetimeMin .":00";
        echo $datetime;
        $s->bindParam("datetime", $datetime);
        $s->execute();       
    } catch (PDOException $ex) {
        echo '{"error":{"text":'. $ex->getMessage() .'}}'; 
    }
}

function deleteActivity($id){
    global $app;
    try{  
        $sql = "DELETE FROM activity WHERE activityId = :id ";
        
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
