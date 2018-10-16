<?php
    $raw_post_data = json_decode(file_get_contents('php://input'), true);
   
    $account = $raw_post_data['account'];
     $password =  $raw_post_data['password'];
    echo $account." , ".$password;
