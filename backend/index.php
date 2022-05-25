<?php
    $protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $url = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    echo "<h3>JSON API Running at $url</h3>";
    echo "<p><a href='/posts'>Posts</a></p>";
    echo "<p><a href='/users'>Users</a></p>";
?>