<?php
    $all_product = null;

    function get_all_products() {        
        $url = 'http://localhost:8080/api/product';
        $json_products = file_get_contents($url);
        global $all_product;
        $all_product = json_decode($json_products);
        return $all_product;
    }

    function get_product( $product_id ) {
        $url = "http://localhost:8080/api/product" . '/' . $product_id;
        $json_product = file_get_contents($url);
        $product = json_decode($json_product, $associative = true);
        if ($product == null) {
            $product = ["NameProduct"=>"None", "TypeProduct"=>null, "DescriptionProduct"=>null, "Price"=>null, "StatusProduct"=>null ];
        }
        if ($product["DescriptionProduct"] != null) { 
            // yes, we have string that are actually a json inside the json. If it works don't fix it
            $description_json =  $product["DescriptionProduct"];
            $product["DescriptionProduct"] = json_decode($description_json, $associative = true);  #{Image : "http", Description : "description", Tags : "tag1, tag2"}
        }
        return $product;
    }
