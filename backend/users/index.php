<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Content-Type: application/json; charset=UTF-8");
    include_once("../classes/MySQL.php");

    $request_method = $_SERVER['REQUEST_METHOD'];
    $mySQL = new MySQL(true);

    //get specific user by id
    if ($request_method === 'GET' && isset($_GET['id'])) {
        $userId = $_GET['id'];
        $sql = "SELECT id, username, name, mail, phone, city, bio, image, coverImage, createdAt, fbUsername, igUsername, twUsername, ytUsername FROM users WHERE id = '$userId'";
        echo $mySQL->Query($sql, true);
    } 
    //get specific user by username
    else if ($request_method === 'GET' && isset($_GET['username'])) {
        $userName = $_GET['username'];
        $sql = "SELECT id, username, name, mail, phone, city, bio, image, coverImage, createdAt, fbUsername, igUsername, twUsername, ytUsername FROM users WHERE username = '$userName'";
        echo $mySQL->Query($sql, true);
    } 
    //get all users
    else if ($request_method === 'GET') {
        $sql = "SELECT id, username, name, image, coverImage, bio, city, fbUsername, igUsername, twUsername, ytUsername FROM users";
        echo $mySQL->Query($sql, true);
    } 
    //update user
    else if ($request_method === 'PUT' && isset($_GET['id'])) {
        $userId = $_GET['id'];
        $user = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE users 
                SET username = '$user->username', name = '$user->name', mail = '$user->mail', phone = '$user->phone', city = '$user->city', bio = '$user->bio', coverImage = '$user->coverImage', image = '$user->image', fbUsername = '$user->fbUsername', igUsername = '$user->igUsername', twUsername = '$user->twUsername', ytUsername = '$user->ytUsername'
                WHERE id = '$userId'";
        $mySQL->Query($sql, false);
        $sql = "SELECT id, username, name, mail, phone, city, bio, image, coverImage, createdAt, fbUsername, igUsername, twUsername, ytUsername FROM users WHERE id = '$userId'";
        echo $mySQL->Query($sql, true);
    }
    //delete user
    else if ($request_method === 'DELETE' && isset($_GET['id'])) {
        $userId = $_GET['id'];
        $sql = "DELETE FROM users WHERE id = '$userId'";
        $mySQL->Query($sql, false);

        if ($mySQL->Query($sql, false) === TRUE) {
            $response['accountDeleteSuccess'] = TRUE;
            $response['success'] = "Your account has been deleted successfully";
            echo json_encode($response);
        }
        else {
            $response['accountDeleteSuccess'] = FALSE;
            $response['error'] = "Something went wrong. You account wasn't deleted!";
            echo json_encode($response);
        }

    }    
?>