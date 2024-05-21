<?php

        // do not allow not admin users
        if (!isset($_COOKIE["userCookie"])) {
            header('Location: ../../index.php');
        } else if (!json_decode($_COOKIE["userCookie"], true)["admin"]) {
            header('Location: ../../index.php');
        }

        $url = "http://localhost:8080/api/product/" . $_GET["id"];
        $options = array(
            'http' => array(
            'method'  => 'DELETE',
            'content' => Null,
            )
        );
        
        $context  = stream_context_create( $options );
        $result = file_get_contents( $url, false, $context );
        $response = json_decode( $result );

        header('Location: ../../index.php');