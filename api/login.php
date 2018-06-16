<?php
    
    header('Access-Control-Allow-Origin: *');
    //Łączenie się z bazą
    $conn = new mysqli ("localhost","id6205530_tomalhunter","Tomal112","id6205530_tomal_hunter");

        if ($conn->connect_error) {
            die("Connection failed: " . "Try again alter");
            echo 'error';
        }  

    // Przygotowywanie komendy którą wyślemy do MySQL - czyli wyszukanie hasła i loginu podanego przez POST(userName)
    $stmt = $conn->prepare('SELECT userName, userPass FROM users WHERE userName = ?');
    $stmt->bind_param("s", $_POST['userName']);

    // wykonanie komendy i połączenia z MySQL
    $stmt -> execute();
    // Otrzymywanie wyników + zapisanie ich w tablicy asocjacyjnej (czyli tab[0] - login -> king;tab[1] - haslo -> mojehaslo)
    $data = $stmt->get_result();
    $data = $data->fetch_assoc();

    // zwolnienie przestrzeni łączenia
    $stmt->free_result();
    //Jeśli hasło się zgadza z tym które wpisał uzytkownik w Post(userPass) to zwracam nazwe urzytkownika (linia 26) oraz access - cookie, który daje dostęp do aplikacji
    if($data >0) {
        if($data['userPass'] == md5($_POST['userPass'])) {
            echo $_POST['userName'].';access=226a318e0106d6a6cd1ea8fe016287ce';
        }else {
            echo 'Niepoprawne hasło';
        }
        
    // jak są jakieś błędy to zwracam teksty (linia 28 oraz 33) 
    }else {
        echo 'Nie znaleziono rekordu';
    }
    // zamkięcie połączenia komend MySQL i połączenia z bazą danych
    $stmt->close();
    $conn->close();
    
        

?>