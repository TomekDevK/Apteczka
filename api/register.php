<?php

$conn = new mysqli ("localhost","id6205530_tomalhunter","Tomal112","id6205530_tomal_hunter");

        if ($conn->connect_error) {
            die("Connection failed: " . "Try again alter");
            echo 'error';
        }  

    
    $stmt = $conn->prepare('SELECT userName FROM users WHERE userName = ? OR userEmail = ?');
    $stmt->bind_param("ss", $_POST['userName'], $_POST['userEmail']);
    
    $stmt -> execute();

    $data = $stmt->get_result();
    $data = $data->fetch_assoc();


    $stmt->free_result();

    if($data >0) {

        $return = 0;
        
    }else {
        $count = $conn->query('SELECT COUNT(id) FROM users');
        $count = $count->fetch_assoc();
        $count = $count['COUNT(id)']+1;
        $stmt1 = $conn->prepare('INSERT INTO users (id, userName, userPass, userEmail, userAdmin) VALUES (?,?,MD5(?),?,?) ');
        $stmt1->bind_param('isssi',$count,$_POST['userName'],$_POST['userPass'],$_POST['userEmail'],$_POST['userAdmin']);
        $stmt1->execute();
        $stmt1->free_result();
        $stmt1->close();
        $return = 1;

    }
    echo $return;
    $stmt->close();
    $conn->close();
    
        

?>