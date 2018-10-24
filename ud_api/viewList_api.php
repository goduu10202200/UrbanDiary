<?php
    include 'DBConnection.php';
    
    $sql = "SELECT * FROM scheduled";
    $result = $conn->query($sql);
    if ($result->num_rows >0) {
        while ($row_chat = $result -> fetch_assoc()) {
            $response_data[] = array(
                "id"            =>$row_chat['id'],
                "date"         =>$row_chat['date'],
                "time"	       =>$row_chat['time'],
                "location"   =>$row_chat['location'],
                "content"     =>$row_chat['title'],
                "status"        => $row_chat['status'] ,
            );
        }
    } else {
        echo "No Results Found.";
    }
    echo json_encode($response_data);
    $conn->close();
    //{"id":"1","date":"2018-10-24","time":"14:00","location":"操場","content":"跑步", "status":"0"}
