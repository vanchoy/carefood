<?php
    function cors() {
        
        // Allow from any origin
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
            // you want to allow, and if so:
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }
        
        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                // may also be using PUT, PATCH, HEAD etc
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
            
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        
            exit(0);
        }
        
    }
    
    cors();
    include_once("../classes/MySQL.php");

    $request_method = $_SERVER['REQUEST_METHOD'];
    $mySQL = new MySQL(true);

    // NEW USER PASSWORD
    if ($request_method === 'PUT' && isset($_GET['id'])) {
        $userId = $_GET['id'];
        $user = json_decode(file_get_contents('php://input'));
        $password = $user->password;
        $passwordCheck = $user->passwordCheck;
        $userMail = $user->mail;

        if (strlen($password) > 0 && strlen($passwordCheck) > 0) {
            if ($password == $passwordCheck) {
                $passEncrypt = password_hash($user->password, PASSWORD_DEFAULT);
                $sql = "UPDATE users SET password = '$passEncrypt' WHERE id = '$userId'";
                $mySQL->Query($sql, false);
                $response['passwordChangeSuccess'] = TRUE;
                $response['success'] = "Your password has been changed successfully";

                echo json_encode($response);
            }
            else {
                $response['passwordChangeSuccess'] = FALSE;
                $response['error'] = "Passwords do not match!";
                echo json_encode($response);
            }
        }
        else {
            $response['passwordChangeSuccess'] = FALSE;
            $response['warning'] = "Password field cannot be empty!";
            echo json_encode($response);
        }
    }
        
?>