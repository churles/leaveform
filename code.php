<?php
    session_start();
    $con = mysqli_connect("localhost","root","","leave_form_db");

    if(isset($_POST['submit']))
    {
        
        $user_id = 1;
        $leaveType = $_POST['leave'];
        $dayType = $_POST['day'];
        $dateFrom = date('Y-m-d', strtotime($_POST['leaveFrom']));
        $dateTo = date('Y-m-d', strtotime($_POST['leaveTo']));
        $reason = $_POST['reason'];

        $query = "INSERT INTO leaves (user_id, leaveType, dayType, dateFrom, dateTo, reason) VALUES ('$user_id','$leaveType' ,'$dayType','$dateFrom','$dateTo','$reason');
        $query_run = mysqli_query($con, $query);

        if($query_run)
        {
            $_SESSION['status'] = "Leave request sent";
            header
        }else
        {
            
        }
    }
?>