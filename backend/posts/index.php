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
    $jsonResponse = [];

    // get posts
    if ($request_method === 'GET') {
        // get specific user posts by title
         if(isset($_GET['title'])) {
            $postTitle = $_GET['title'];
            $sql = "SELECT posts.id, posts.title, posts.body, posts.image, posts.uid, posts.createdAt, posts.geoLat, posts.geoLng, users.username FROM posts INNER JOIN users ON posts.uid = users.id WHERE posts.title = '$postTitle'";
            $jsonResponse = $mySQL->Query($sql, true);
         } 
         // get posts by userid
         else if (isset($_GET['id'])) {
            $userId = $_GET['id'];
            $sql = "SELECT posts.id, posts.title, posts.body, posts.image, posts.uid, posts.createdAt FROM posts INNER JOIN users ON posts.uid = users.id WHERE posts.uid = '$userId'";
            $jsonResponse = $mySQL->Query($sql, true);
         }
         // get posts with limit
         else if (isset($_GET['skip']) && isset($_GET['limit'])) {
             $skip = $_GET['skip'];
             $limit = $_GET['limit'];
             $sql = "SELECT * FROM posts ORDER BY createdAt DESC LIMIT $skip, $limit";
             $jsonResponse = $mySQL->Query($sql, true);
         }
         // get all posts
         else {
            //$sql = "SELECT * FROM posts ORDER BY createdAt DESC";
            $sql = "SELECT posts.id, posts.title, posts.body, posts.image, posts.uid, posts.createdAt, users.username FROM posts INNER JOIN users ON posts.uid = users.id ORDER BY createdAt DESC";
            $jsonResponse = $mySQL->Query($sql, true);
         }
    }

    // add a new post
    if ($request_method === 'POST') {
        $newPost = json_decode(file_get_contents('php://input'));

        $newPpostTitleField = htmlentities($newPost->postTitle, ENT_QUOTES);
        $newPostBodyField = htmlentities($newPost->postBody, ENT_QUOTES);
        $newPostImg = htmlentities($newPost->postImage, ENT_QUOTES);
        $newGeoLat = htmlentities($newPost->postGeoLat, ENT_QUOTES);
        $newGeoLng = htmlentities($newPost->postGeoLng, ENT_QUOTES);

        if ($newPost && $newPost->postImage) {
            $sql = "INSERT INTO posts
                        (title, body, image, geoLat, geoLng, uid)
                    VALUES
                        ('$newPost->postTitle', '$newPost->postBody', '$newPost->postImage', '$newPost->postGeoLat', '$newPost->postGeoLng' , '$newPost->uid')
                    ";
            if ($mySQL->Query($sql, false) === TRUE) {
                $sql = "SELECT * FROM posts WHERE title = '$newPost->postTitle'";
                $jsonResponse = $mySQL->Query($sql, true);
            }  
            else {
                $jsonResponse['status'] = "error";
                $jsonResponse['errorCode'] = "Missing parameters";
            }

        } 
        else{
            $jsonResponse['status'] = "error";
            $jsonResponse['errorCode'] = "Missing parameters";
        }
    }
    
    // update a post by id
    if ($request_method === 'PUT') {
        if (isset($_GET['id'])) {
            $postId = $_GET['id'];
            $updatePost = json_decode(file_get_contents('php://input'));
            $lastupdated = date('Y-m-d H:i:s'); // setting the update time of the post
            $postTitleField = htmlentities($updatePost->postTitle, ENT_QUOTES);
            $postBodyField = htmlentities($updatePost->postBody, ENT_QUOTES);
            $postImg = htmlentities($updatePost->postImage, ENT_QUOTES);
            $postGeoLat = htmlentities($updatePost->postGeoLat, ENT_QUOTES);
            $postGeoLng = htmlentities($updatePost->postGeoLng, ENT_QUOTES);

            $sql = "UPDATE posts 
                    SET title = '$postTitleField', body = '$postBodyField', image = '$postImg', updatedAt = '$lastupdated', geoLat = '$postGeoLat', geoLng = '$postGeoLng'
                    WHERE id = '$postId'";
            $response = $mySQL->Query($sql, false);

            if ($response) {
                $jsonResponse['status'] = "success";
            } 
            else {
                $jsonResponse['status'] = "failed";
                $jsonResponse['errorCode'] = "Bad connection to MySQL server";
            }
        } 
        else {
            $jsonResponse['status'] = "failed";
            $jsonResponse['errorCode'] = "Post id is missing";
        }
        $jsonResponse = json_encode($jsonResponse);
    }

    // delete a post by id
    if ($request_method === 'DELETE' && isset($_GET['id'])) {
        $postId = $_GET['id'];
        $sql = "DELETE FROM posts WHERE id = '$postId'";
        $mySQL->Query($sql, false);

        if ($mySQL->Query($sql, false)) {
            $jsonResponse['success'] = TRUE;
            $jsonResponse['status'] = "Your post has been deleted successfully";
        } 
        else {
            $jsonResponse['status'] = "Something went wrong";
            $jsonResponse['error'] = "Missing id parameter";
        }
        $jsonResponse = json_encode($jsonResponse);
    }

    echo html_entity_decode($jsonResponse);


?>