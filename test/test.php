<?php
    $raw_post_data = json_decode(file_get_contents('php://input'), true);
   
    $location = $raw_post_data['location'];
     $narrative =  $raw_post_data['narrative'];
    echo $location." , ".$narrative;
