<?php
    header('Access-Control-Allow-Origin: *');

    //Łączenie z bazą
    $conn = new mysqli ("localhost","id6205530_tomalhunter","Tomal112","id6205530_tomal_hunter");

    if ($conn->connect_error) {
        die("Connection failed: " . "Try again alter");
        echo 'error';
    }  

    //Sprawdzanie jakie parametry są ustawione i odpowiednie tworzenie zapytania do bazy
    $sql="SELECT * FROM medOut ";
    if(!empty($_POST['medicineName'])){
        $sql .= "WHERE medicinename = '{$_POST['medicineName']}' ";
    }
    if(!empty($_POST['medicineid'])){
        if(!empty($_POST['medicineName'])){
            $sql .= "AND ";
        }else{
            $sql .= "WHERE ";
        }
        $sql .= "idleku = '{$_POST['medicineid']}' ";
    }
    if(!empty($_POST['medicineUser'])){
        if(!empty($_POST['medicineName']) || !empty($_POST['medicineid'])){
            $sql .= "AND ";
        }else{
            $sql .= "WHERE ";
        }
        $sql .= "delUser = '{$_POST['medicineUser']}' ";
    }
    if(empty($_POST['medicineName']) && empty($_POST['medicineid']) && empty($_POST['medicineUser']))
    {
        $sql .='WHERE 1';
    }
    $i=0;
    $result = $conn->query($sql);
    while($row = $result->fetch_assoc()){
        $expire=$row['delDate'];
        //Sprawdzanie ktore leki sa wyjete
        if(!empty($_POST['medicineTo']) && !empty($_POST['medicineFrom'])){
            if($expire<=$_POST['medicineTo'] && $expire >=$_POST['medicineFrom']) {
                echo $expmedicines[$i] = $row['id'].':'.$row['idleku'].':'.$row['medicinename'].':'.$row['amount'].':'.$row['price'].':'.$row['act'].':'.$row['delUser'].':'.$row['delDate'].';';
                $i++;
            }
        }
        if(empty($_POST['medicineTo']) && !empty($_POST['medicineFrom'])){
            if($expire >=$_POST['medicineFrom']) {
                echo $expmedicines[$i] = $row['id'].':'.$row['idleku'].':'.$row['medicinename'].':'.$row['amount'].':'.$row['price'].':'.$row['act'].':'.$row['delUser'].':'.$row['delDate'].';';
                $i++;
            }
        }
        if(!empty($_POST['medicineTo']) && empty($_POST['medicineFrom'])){
            if($expire<=$_POST['medicineTo']) {
                echo $expmedicines[$i] = $row['id'].':'.$row['idleku'].':'.$row['medicinename'].':'.$row['amount'].':'.$row['price'].':'.$row['act'].':'.$row['delUser'].':'.$row['delDate'].';';
                $i++;
            }
        }
        if(empty($_POST['medicineTo']) && empty($_POST['medicineFrom'])){
            echo $expmedicines[$i] = $row['id'].':'.$row['idleku'].':'.$row['medicinename'].':'.$row['amount'].':'.$row['price'].':'.$row['act'].':'.$row['delUser'].':'.$row['delDate'].';';
            $i++;
        }
        
    }
        
   
    $conn->close();

?>