<?php
session_start();

include('api/dbConnection.php');
function getLogin($username, $password){
    $sql = "SELECT leaderID FROM leader WHERE scoutname = :username AND password = :password";
    
    try{
        $db = getConnection();
        $s = $db->prepare($sql);
        $s->bindParam("username",  $username);     
        $s->bindParam("password",  md5($password));
        $s->execute();
        
        
        $leader = $s->fetch(PDO::FETCH_OBJ);
        
    } catch(PDOException $e) {
        echo 'Error'. $e->getMessage(); 
    }
        
        if($leader){
            return $leader->leaderID;
        } 
        return false;
        
    
}    

if(isset($_POST['password'])){
        $username = $_POST["username"]; 
        $password = $_POST["password"]; 
        
        
        $leaderID = getLogin($username, $password);
        
        if($leaderID > 0){
            $_SESSION['leaderID'] = $leaderID;
            header('location: /ecourse/');      
        } else{
            echo "Login nicht korrekt!";
        }
    
 } 

?>
<html>
    <head>
        <title>Login</title>
    </head>
    <body>
        
        <form action="login.php" method="post">
Pfadiname:<br>
<input type="text" size="24" maxlength="50"
name="username"><br><br>

Passwort:<br>
<input type="password" size="24" maxlength="50"
name="password"><br>

<input type="submit" value="Login">
</form>
        
        
        
    </body>
    
</html>
