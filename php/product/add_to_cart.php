<?php

if (isset($_COOKIE["cart_products"])) {
    $product_list = json_decode($_COOKIE["cart_products"], true);
    array_push($product_list, $_GET["id"]);
} else {
    $product_list = array();
    array_push($product_list, $_GET["id"]);
}
setcookie("cart_products", json_encode($product_list), time() + 86400, "/");

header('Location: ../../cart.php');
