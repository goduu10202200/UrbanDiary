<?php
    include 'DBConnection.php';
    $raw_post_data = json_decode(file_get_contents('php://input'), true);
    
    $content =  $raw_post_data['content'];
    $today = date("Y-m-d H:i:s");

    $sql = "INSERT INTO diary (username, content, created_at)
    VALUES (1, '".$content."', '".$today."')";

    if ($conn->query($sql) === true) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
    
    //echo $location." , ".$narrative;
