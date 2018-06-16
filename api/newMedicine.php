<?php
    header('Access-Control-Allow-Origin: *');

    function sprawdzanie($conn,$number){
        $sql="SELECT id FROM {$_POST['yourAidKit']} WHERE id ={$number}";
        $result = $conn->query($sql);
        if($result->num_rows >0){
            $number++;
            $number=sprawdzanie($conn,$number);
        }
        //echo $number;
        return $number;
    }

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
    
    if( $return === 'Access granted'){
        //Sprawdzanie ilosci rekordów w apteczce - generowanie id jako kolejny rekord
        $sql="SELECT COUNT(id) FROM {$_POST['yourAidKit']}";
        $count = $conn->query($sql);
        if($count->num_rows >0){
            $count = $count->fetch_assoc();
            $count = $count["COUNT(id)"];
            $count++;
        }else {
            $count = 1;
        }
       
        // sprawdzanie czy rekord o podanym id istnieje
        $count=sprawdzanie($conn,$count);
        $date=date("Y-m-d");
        $stmt1 = $conn->prepare("INSERT INTO {$_POST['yourAidKit']} (medicinename, amount, price, expdate, date, id, userName) VALUES (?,?,?,?,?,?,?) ");
        $stmt1->bind_param("siissis", $_POST['medicineName'], $_POST['medicineAmount'], $_POST['medicinePrice'], $_POST['medicineDate'],$date,$count,$_POST['userName']);
        
        $stmt1 -> execute();

        $stmt1->close();
        $conn->close();

        echo 'Access granted but if u dont see anything i failed';
    }else {
        echo $return;
    }
        

?>