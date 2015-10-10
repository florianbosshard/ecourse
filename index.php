<?php
session_start();
if(!isset($_SESSION["leaderID"])) 
{ 
    header("location: login.php");
   } 
?> 

<!doctype html>
<html lang="en" ng-app="ecourse">
<head>
  <meta charset="utf-8">
  <title>ECourse</title>
  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
  
  <link rel="stylesheet" href="css/app.css">
  </head>
<body>
<strong><font color="red">Bei längerer Pause (z.B. Nacht) bitte <a href="logout.php">ausloggen</a> und neu einloggen. Sonst kann es sein, dass eure Beobachtungen verloren gehen! Sorry!</font></strong>
    <div class="container">
        <div ng-view></div>
    </div>


    
  <script src="bower_components/angular/angular.js"></script>
  <script src="bower_components/angular-resource/angular-resource.js"></script>
  <script src="bower_components/angular-route/angular-route.js"></script>
  
  <script src="js/controllers.js"></script>
  <script src="js/app.js"></script>
  <script src="js/services.js"></script>  
</body>
</html>
