<?php
    if(isset($_POST['password'])){
        session_start();
        $username = $_POST["username"]; 
        $password = $_POST["password"]; 
        
        if($username == 'Prusik' && $password == 'Test123'){
            $_SESSION['leaderID'] = 1;
            header('location: /ecourse/');      
        }
    
    } {
        
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
