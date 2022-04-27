<?php
    $user_id = 1;
    $leaveType = $_POST['leave'];
    $dayType = $_POST['day'];
    $dateFrom =date('Y-m-d', strtotime($_POST['leaveFrom']));
    $dateTo = date('Y-m-d', strtotime($_POST['leaveTo']));
    $reason = $_POST['reason'];

    if(!empty($leaveType) || !empty($dayType) || !empty($dateFrom) || !empty($dateTo)){
        $host = "localhost";
        $dbUsername = "root";
        $dbPassword = "";
        $dbname = "leave_form_db";

        $conn = new mysqli($host, $dbUsername, $dbPassword, $dbname);

        if(mysqli_connect_error()){
            die('Connection Error(' .mysqli_connect_errno().')'.mysqli_connect_error());
        }else{
            $INSERT = "INSERT INTO leaves (user_id, leaveType, dayType, dateFrom, dateTo, reason) VALUES (?, ?, ?, ?, ?, ?)";

            $stmt = $conn->prepare($INSERT);
            $stmt->bind_param("isssss", $user_id, $leaveType, $dayType, $dateFrom, $dateTo, $reason);
            $stmt->execute();
            echo "Leave request sent.";
        }
        $stmt->close();
        $conn->close();
    }
?>