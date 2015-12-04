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
  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
  <link rel="stylesheet" href="bower_components/components-font-awesome/css/font-awesome.css" />

  <link rel="stylesheet" href="css/app.css">
  </head>
<body>

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#/">Ecourse</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a href="#/">TNFG</a></li>
        <li><a href="#/activities/">Aktivitäten</a></li>
        <li><a href="#/participants/">Teilnehmende</a></li>

      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="logout.php">Logout</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>

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
