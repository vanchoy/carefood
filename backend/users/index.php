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

    $mySQL = new MySQL(true);   
    $request_method = $_SERVER['REQUEST_METHOD'];
    
    //get specific user by id
    if ($request_method === 'GET' && isset($_GET['id'])) {
        $userId = $_GET['id'];
        $sql = "SELECT id, username, name, mail, phone, city, bio, image, coverImage, createdAt, fbUsername, igUsername, twUsername, ytUsername FROM users WHERE id = '$userId'";
        $result = $mySQL->Query($sql, true);
        echo html_entity_decode($result); // decoding special characters like (') so they appear properly on the frontend and not as encoded symbols 
    } 
    //get specific user by username
    else if ($request_method === 'GET' && isset($_GET['username'])) {
        $userName = $_GET['username'];
        $sql = "SELECT id, username, name, mail, phone, city, bio, image, coverImage, createdAt, fbUsername, igUsername, twUsername, ytUsername FROM users WHERE username = '$userName'";
        $result = $mySQL->Query($sql, true);
        echo html_entity_decode($result); // decoding special characters like (') so they appear properly on the frontend and not as encoded symbols 
    } 
    //get all users
    else if ($request_method === 'GET') {
        $sql = "SELECT id, username, name, image, coverImage, bio, city, fbUsername, igUsername, twUsername, ytUsername FROM users ORDER BY createdAt DESC";
        $result = $mySQL->Query($sql, true);
        echo html_entity_decode($result); // decoding special characters like (') so they appear properly on the frontend and not as encoded symbols 
    } 
    //update user by id
    else if ($request_method === 'PUT' && isset($_GET['id'])) {
        $userId = $_GET['id'];
        $user = json_decode(file_get_contents('php://input'));

        //encoding user input fields - encoding special characters like (') to prevent from sql injections and breaking the query 
            $userName = htmlentities($user->username, ENT_QUOTES);
            $userPersonalName = htmlentities($user->name, ENT_QUOTES);
            $userEmail = htmlentities($user->mail, ENT_QUOTES);
            $userPhone = htmlentities($user->phone, ENT_QUOTES);
            $userCity = htmlentities($user->city, ENT_QUOTES);
            $userBio = htmlentities($user->bio, ENT_QUOTES); 
            $userImage = $user->image;
            $userCoverImage = $user->coverImage;
            $userFbUsername = htmlentities($user->fbUsername, ENT_QUOTES);
            $userIgUsername = htmlentities($user->igUsername, ENT_QUOTES);
            $userTwUsername = htmlentities($user->twUsername, ENT_QUOTES);
            $userYtUsername = htmlentities($user->ytUsername, ENT_QUOTES);
        //

        // Check if username already exists and update it with the new one from the user input
            $sql = "SELECT id FROM users WHERE username = '$userName'";
            $result = $mySQL->Query($sql, true);

            if ($result->num_rows == 0) {
                $sql = "UPDATE users SET username = '$userName' WHERE id = '$userId'";
                $result = $mySQL->Query($sql, false);

                // sending an email to the user with a successfull message on username change; the message contains the new username
                    $to = $user->mail; 
                    $from = 'info@carefood.store'; 
                    $fromName = 'Carefood'; 
                    $subject = "Carefood - username change successfull"; 
                    $message = 'Your username has been successfully changed' . 'Your new username is' . ' ' . $user->username . '.'; 
                    // Additional headers 
                    $headers = 'From: ' . $fromName . '<' . $from . '>'; 
                    // Send email 
                    mail($to, $subject, $message, $headers);
                //
            } 
        //

        // Check if email already exists and update it with the new one from the user input
            $sql = "SELECT id FROM users WHERE mail = '$userEmail'";
            $result = $mySQL->Query($sql, true);

            if ($result->num_rows == 0) {
                $sql = "UPDATE users SET mail = '$userEmail' WHERE id = '$userId'";
                $mySQL->Query($sql, false);

                // sending an email to the user with a successfull message on username change; the message contains the new username
                    $to = $user->mail; 
                    $from = 'info@carefood.store'; 
                    $fromName = 'Carefood'; 
                    $subject = "Carefood - email change successfull"; 
                    $message = 'Your email has been successfully changed' . 'Your new email is' . ' ' . $user->username . '.'; 
                    // Additional headers 
                    $headers = 'From: ' . $fromName . '<' . $from . '>'; 
                    // Send email 
                    mail($to, $subject, $message, $headers);
                //
            }
        //

        // update user details
            $sql = "UPDATE users SET name = '$userPersonalName', phone = '$userPhone', city = '$userCity', bio = '$userBio', image = '$userImage', coverImage = '$userCoverImage', fbUsername = '$userFbUsername', igUsername = '$userIgUsername', twUsername = '$userTwUsername', ytUsername = '$userYtUsername' WHERE id = '$userId'";
            $mySQL->Query($sql, false);
        //

        $sql = "SELECT id, username, name, mail, phone, city, bio, image, coverImage, createdAt, fbUsername, igUsername, twUsername, ytUsername FROM users WHERE id = '$userId'";
        $result = $mySQL->Query($sql, true);

        echo html_entity_decode($result); // decoding special characters like (') so they appear properly on the frontend and not as encoded symbols 
    }
    //delete user by id
    else if ($request_method === 'DELETE' && isset($_GET['id'])) {
        $userId = $_GET['id'];

        //get user email to send an email if the deletion of the account is successful
        $sql = "SELECT mail FROM users WHERE id = '$userId'";
        $userMail = $mySQL->Query($sql, true);

        $sql = "DELETE * FROM users INNER JOIN posts WHERE users.id = '$userId' AND posts.uid = '$userId'";
        $mySQL->Query($sql, false);

        if ($mySQL->Query($sql, false)) {
            $response['accountDeleteSuccess'] = TRUE;
            $response['success'] = "Account deletion successfull!";
        }
        else {
            $response['accountDeleteSuccess'] = FALSE;
            $response['error'] = "Something went wrong. You account wasn't deleted!";          
        }
        echo json_encode($response);
    }    
?>