<?php
    include 'DBConnection.php';
    $raw_post_data = json_decode(file_get_contents('php://input'), true);
   
    $location = $raw_post_data['location'];
    $narrative =  $raw_post_data['narrative'];
    $today = date("Y-m-d H:i:s");

    $sql = "INSERT INTO scheduled (username, content,location,type,created_at)
    VALUES (1,'".$narrative."','".$location."','感情','".$today."')";

    if ($conn->query($sql) === true) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
    
    //echo $location." , ".$narrative;
