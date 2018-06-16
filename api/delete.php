<?php
    header('Access-Control-Allow-Origin: *');

    //Łączenie z bazą
    $conn = new mysqli ("localhost","id6205530_tomalhunter","Tomal112","id6205530_tomal_hunter");

        if ($conn->connect_error) {
            die("Connection failed: " . "Try again alter");
            echo 'error';
        }  
    // Sprawdzanie jaki/jacy uzytkownicy mają dostęp do tej apteczki
    $stmt = $conn->prepare('SELECT access FROM aidKit WHERE kitname = ? ');
    $stmt->bind_param("s", $_POST['yourAidKit']);
    
    $stmt -> execute();

    $data = $stmt->get_result();
    $data = $data->fetch_assoc();


    $stmt->free_result();
    // sprawdzanie dostępu - czy cookie był zapisany po logowaniu
    if($data >0) {
        $result = explode(';',$data['access']);
        for($i = 0; $i < count($result); $i++) {
            if( $result[$i]== $_POST['userName'] ) {
                $return = 'Access granted';
                break;
            }else {

                $return = 'No access';
            }
        }
    }else {
        $return = 'No aidKit found';
    }
    $stmt->close();
    
    //Jesli przyznano dostęp wyszukaj lek o podanym ID
    if( $return === 'Access granted'){
        $sql="SELECT * FROM {$_POST['yourAidKit']} WHERE id = {$_POST['medicineId']}";
        $lek = $conn->query($sql);
        $lek = $lek->fetch_assoc();
        if($lek['amount']<$_POST['medicineAmount']){
            $return = "AmountError";
        }else{
            $date=date("Y-m-d");
            $sql="SELECT COUNT(id) FROM medOut ";
            $count = $conn->query($sql);
            if($count->num_rows >0){
                $count = $count->fetch_assoc();
                $count = $count["COUNT(id)"];
                $count++;
            }else {
                $count = 1;
            }
            //jeli różnica leków jest różna od 0 ( czyli lek zostaje w apteczce to wted update jego wartosci i zapisanie transakcji)
            if($lek['amount']-$_POST['medicineAmount']){
                $medicineAmount = $lek['amount']-$_POST['medicineAmount'];
                $sql="UPDATE {$_POST['yourAidKit']} SET amount = {$medicineAmount} WHERE id = {$_POST['medicineId']};";
                $sql.="INSERT INTO medOut (id, userName, idleku, medicinename, amount, price, expdate, addDate, act, delUser, delDate) VALUES ( $count,  '{$lek['userName']}','{$lek['id']}', '{$lek['medicinename']}', '{$_POST['medicineAmount']}', '{$lek['price']}', '{$lek['expdate']}', '{$lek['date']}', '{$_POST['act']}', '{$_POST['userName']}', '$date')";
                $conn->multi_query($sql);
                $return = 'true';
            }
            // jesli nie zostaje juz leku po jego wyciagnieciu/utylizacji to usuwamy rekord i zapisujemy info o transakcji
            else {
                $sql="DELETE FROM {$_POST['yourAidKit']} WHERE id = {$_POST['medicineId']};";
                $sql.="INSERT INTO medOut (id, userName, idleku, medicinename, amount, price, expdate, addDate, act, delUser, delDate) VALUES ( $count,  '{$lek['userName']}','{$lek['id']}', '{$lek['medicinename']}', '{$_POST['medicineAmount']}', '{$lek['price']}', '{$lek['expdate']}', '{$lek['date']}', '{$_POST['act']}', '{$_POST['userName']}', '$date')";
                $conn->multi_query($sql);
                $return = 'false';
            }
        }
    }

    echo $return;
        

?>