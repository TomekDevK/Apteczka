<?php
    header('Access-Control-Allow-Origin: *');

    //Łączenie z bazą
    $conn = new mysqli ("localhost","id6205530_tomalhunter","Tomal112","id6205530_tomal_hunter");

    if ($conn->connect_error) {
        die("Connection failed: " . "Try again alter");
        echo 'error';
    }  
    $sql="SELECT access FROM aidKit WHERE kitname = '{$_POST['yourAidKit']}'";
    $result=$conn->query($sql);
    $result=$result->fetch_assoc();
    $result=$result['access'];
    $return=$result.';'.$_POST['userName'];
    $sql="UPDATE aidKit SET access = '{$return}' WHERE kitname = '{$_POST['yourAidKit']}'";
    echo $sql;
    $conn->query($sql);

?>