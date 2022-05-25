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
    $action = $_GET['action'];


    if ($action == "logout") {
        session_destroy();
        $response['authenticated'] = FALSE;
        echo json_encode($response);
    }

    // LOGIN
    if ($action == "login") {
        $loginObject = json_decode(file_get_contents('php://input'));
        $username = $loginObject->username;
        $password = $loginObject->password;

        // Get the users login information
        $sql = "SELECT * FROM users WHERE username = '$username' LIMIT 1";
        $result = $mySQL->Query($sql, false);

        // Check if the username exists
        if ($result->num_rows == 1) {
            $user = $result->fetch_object();
            // Check if it is the right password for that username
            if (password_verify($password, $user->password)) {
                $sql = "SELECT id, username, name, mail, phone, city, bio, image, coverImage, createdAt, fbUsername, igUsername, twUsername, ytUsername FROM users WHERE id = '$user->id'";
                $user = $mySQL->Query($sql, false)->fetch_object();
                $response['authenticated'] = TRUE;
                $response['user'] = $user;
                echo json_encode($response);
            } else {
                $response['authenticated'] = FALSE;
                $response['error'] = "Wrong password";
                echo json_encode($response);
            }
        } else {
            $response['authenticated'] = FALSE;
            $response['error'] = "User doesn't exist";
            echo json_encode($response);
        }
    }

    // REGISTER
    if ($action == "register") {
        $newUser = json_decode(file_get_contents('php://input'));
        $username = $newUser->username;
        $mail = $newUser->mail;
        $password = $newUser->password;
        $passwordCheck = $newUser->passwordCheck;

        if (!empty($mail) && !empty($password) && !empty($username)) {
            // Check if passwords are the same
            if ($password == $passwordCheck) {

                // Check if username already exists
                $sql = "SELECT id FROM users WHERE username = '$username'";
                $result = $mySQL->Query($sql, false);

                if ($result->num_rows == 0) {

                    // Check if email already exists
                    $sql = "SELECT id FROM users WHERE mail = '$mail'";
                    $result = $mySQL->Query($sql, false);
                    
                    // If the email does not exist, then create a new user
                    if ($result->num_rows == 0) {
                        $passEncrypt = password_hash($newUser->password, PASSWORD_DEFAULT);

                        $sql = "INSERT INTO users
                               (mail, username, password)
                               VALUES
                                   ('$newUser->mail', '$newUser->username', '$passEncrypt')
                               ";
   
                       if ($mySQL->Query($sql, false) === TRUE) {
                           $sql = "SELECT id, username, name, mail, phone, city, bio, image, coverImage, createdAt, fbUsername, igUsername, twUsername, ytUsername FROM users WHERE mail = '$mail'";
                           $user = $mySQL->Query($sql, false)->fetch_object();
                           $response['registerSuccess'] = TRUE;
                           $response['user'] = $user;
                           
                            // sending an email to the registered user with a successfull message including his username and password (the password is already encrypted in the database)
                                $to = $newUser->mail; 
                                $from = 'info@carefood.store'; 
                                $fromName = 'Carefood'; 
                                $subject = "Carefood registration successfull"; 
                                $message = 'Your account has been successfully created' . 'Your account name is:' . ' ' . $newUser->username . ', ' . 'yor password is ' . ' ' . $newUser->password . 'Thank you for taking an action towards reducing food waste! We need more people like you :)'; 
                                // Additional headers 
                                $headers = 'From: ' . $fromName . '<' . $from . '>'; 
                                // Send email 
                                mail($to, $subject, $message, $headers);
                            //
                            
                            echo json_encode($response);
                       } 
                       else {
                           $response['registerSuccess'] = FALSE;
                           $response['error'] = "Register failed. Please try again.";
                           echo json_encode($response);
                       }
                    }
                    else {
                        $response['registerSuccess'] = FALSE;
                        $response['error'] = "Register failed. This email is in use.";
                        echo json_encode($response);
                    }

                }
                else {
                    $response['registerSuccess'] = FALSE;
                    $response['error'] = "Register failed. This username is in use.";
                    echo json_encode($response);
                }
            }
            else {
                $response['registerSuccess'] = FALSE;
                $response['error'] = "Register failed. Passwords not the same.";
                echo json_encode($response);
            }
        }
        else {
            $response['registerSuccess'] = FALSE;
            $response['error'] = "Register failed. Please fill out all fields.";
            echo json_encode($response);
        }
    }

    ?>