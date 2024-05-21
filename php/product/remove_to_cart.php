<?php

if (isset($_COOKIE["cart_products"])) {
    $product_list = json_decode($_COOKIE["cart_products"], true);

    if (($key = array_search($_GET["id"], $product_list)) !== false) {  // remove first occurence of id
        unset($product_list[$key]);
    }

} else {
    header('Location: ../../cart.php');
}
setcookie("cart_products", json_encode($product_list), time() + 86400, "/");

header('Location: ../../cart.php');
