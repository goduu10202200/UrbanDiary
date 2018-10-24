<?php
    include 'DBConnection.php';
    $raw_post_data = json_decode(file_get_contents('php://input'), true);
    
    $content =  $raw_post_data['content'];
    $location = $raw_post_data['location'];

    $sql = "INSERT INTO diary (username, content, location, created_at)
    VALUES (1, '".$content."','".$location."', '".$today."')";

    if ($conn->query($sql) === true) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
    
    //echo $location." , ".$narrative;
