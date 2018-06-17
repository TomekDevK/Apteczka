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
    
    if( $return === 'Access granted'){
        //Sprawdzanie jakie parametry są ustawione i odpowiednie tworzenie zapytania do bazy
        $sql="SELECT * FROM {$_POST['yourAidKit']} ";
        if(!empty($_POST['medicineName'])){
            $sql .= "WHERE medicinename = '{$_POST['medicineName']}' ";
        }
        if(!empty($_POST['medicineid'])){
            if(!empty($_POST['medicineName'])){
                $sql .= "AND ";
            }else{
                $sql .= "WHERE ";
            }
            $sql .= "id = '{$_POST['medicineid']}' ";
        }
        if(!empty($_POST['medicineUser'])){
            if(!empty($_POST['medicineName']) || !empty($_POST['medicineid'])){
                $sql .= "AND ";
            }else{
                $sql .= "WHERE ";
            }
            $sql .= "userName = '{$_POST['medicineUser']}' ";
        }
        if(empty($_POST['medicineName']) && empty($_POST['medicineid']) && empty($_POST['medicineUser']))
        {
            $sql .='WHERE 1';
        }
        $i=0;
        $result = $conn->query($sql);
        while($row = $result->fetch_assoc()){
            $resultmedicines[$i]=$row['medicinename'].':'.$row['amount'].':'.$row['price'].':'.$row['expdate'].':'.$row['date'].':'.$row['id'].':'.$row['userName'].';';
            echo $resultmedicines[$i];
            $i++;
        }
        
    }else {
        echo $return;
    }
    $conn->close();

?>