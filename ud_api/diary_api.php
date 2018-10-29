<?php
    include 'DBConnection.php';
    $raw_post_data = json_decode(file_get_contents('php://input'), true);
    
    $content =  $raw_post_data['content'];
    $today = date("Y-m-d H:i:s");

    $sql = "INSERT INTO diary (username, content, created_at)
    VALUES (1, '".$content."', '".$today."')";

    if ($conn->query($sql) === true) {
        echo "New record created successfully";
        header('Location: http://172.20.10.2:5000/jieba');
        exit;
    // $url = "localhost:5000/jieba";
        // echo "<script type='text/javascript'>";
        // echo "window.location.href='$url'";
        // echo "</script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
    
    //echo $location." , ".$narrative;
