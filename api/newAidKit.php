<?php
    $expire=$_POST['expdate'];
    $today = date("Y-m-d");
    echo $today.' '.$expire;
    echo '<br/>new Aid Kit</br>';
    $result=$expire>=$today?1:0;
    echo $result;
?>