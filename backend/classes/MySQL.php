<?php

// Ignores the default warnings (from connecting to MySQL)
set_error_handler(function() {  });

// Creates the MySQL class
class MySQL {
    public $error = null;
    private $server = "localhost"; // Change to domain name, e.g. www.iloveunicorns.com
    private $username = "root"; // Change to the admins username of the server
    private $password = "root"; // Change to the admins password of the server
    private $database = "carefood"; // Change to the name of the database you would like to connect to on the server

    public $mySQL;
    private $isConnected = false;

    // The constructor that allows for auto connecting when the class gets instantiated
    function __construct($autoConnect = false) {
        $this->SetDatabase($this->database);
        $this->SetServer($this->server, $this->username, $this->password);

        if($autoConnect) {
            return $this->Connect();
        }
    }

    // Change the database setting for the connection
    public function SetDatabase($database) {
        $this->database = $database;
    }

    // Change the server settings for the connection
    public function SetServer($server, $username, $password) {
        $this->server = $server;
        $this->username = $username;
        $this->password = $password;
    }

    // Establish a connection to the MySQL server, based on the server and database settings
    public function Connect() {
        $this->mySQL = new mysqli($this->server, $this->username, $this->password, $this->database);

        if(empty($this->mySQL->connect_error)) {
            $this->isConnected = true;
            return true;
        } else {
            $this->error = $this->mySQL->connect_error;
            return false;
        }
    }

    // Disconnect from the MySQL server
    public function Disconnect() {
        if(!empty($this->mySQL)) {
            if($this->mySQL->close()) {
                $this->isConnected = false;
                return true;
            } else {
                $this->error = "Something went wrong. Could not disconnect";
                return false;
            }
        } else {
            $this->error = "No connection has been established. Could not disconnect";
            return false;
        }
    }

    // Do a qeury call and give the option to return the result as an Object or in JSON (default: Object)
    public function Query($query, $returnAsJSON = false) {
        if(!$this->isConnected) {
            $this->error = "There is no connection established. Try and call the Connect() method";
            return false;
        }

        $result = $this->mySQL->query($query);

        // If the return should be in JSON format
        if($returnAsJSON) {
            // Create an array for the JSON response, and set the 'status' and 'errorCode' 
            $json = [];
            $json["status"] = $result ? "success" : "failed";
            $json["errorCode"] = $result ? "" : "Wrong query";

            // If the query was a success, then convert all the results to a data array
            if($result) {
                $data = [];
                while($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }

                $json["data"] = $data;
            }

            // Encode the result as JSON and return it
            return json_encode($json);

        // If the return should be an object
        } else {
            if($result) {
                return $result;
            } else {
                $this->error = "Error: Invalid SQL Query";
                return false;
            }
        }
    }
}

?>