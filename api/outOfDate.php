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
    //dzisiejsza data zeby sprawdzic waznosc
    $today = date("Y-m-d");
    
    //Pobieranie wszystkich leków z bazy
    $sql="SELECT * FROM {$_POST['yourAidKit']}";
    $medicines = $conn->query($sql);
    $i=0;
    while($row = $medicines->fetch_assoc()){
        $expire=$row['expdate'].'<br/>';
        //Sprawdzanie ktore leki sa przeterminowane i zwracanie ich
        if($expire<=$today) {
            echo $expmedicines[$i] = $row['medicinename'].':'.$row['amount'].':'.$row['price'].':'.$row['expdate'].':'.$row['date'].':'.$row['id'].':'.$row['userName'].';';
            $i++;
        }
    }

?>