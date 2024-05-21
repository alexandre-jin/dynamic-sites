<?php
    include '../product/product.php';
    $all_carts = null;

    function get_all_carts() {        
        $url = 'http://localhost:8080/api/cart';
        $json_cart = file_get_contents($url);
        global $all_carts;
        $all_carts = json_decode($json_cart);
        return $all_carts;
    }

    function put_product_in_cart($product_id, $user_id) {        
        $cart_id = find_user_cart($user_id);
        // let's add the price to the cart
        $cart = get_cart($cart_id);
        $product = get_product($product_id);

        $product_price = $product["Price"];
        $cart["Product"] = $cart["Product"] + $product_price;
        update_cart($cart);
    }

    
    function get_cart( $cart_id ) {
        $url = "http://localhost:8080/api/cart" . '/' . $cart_id;
        $json_cart = file_get_contents($url);
        $cart = json_decode($json_cart, $associative = true);
        if ($cart == null) {
            $cart = ["Price"=>0, "StatusProduct"=>0, "UserId"=>0];
        }
        return $cart;
    }

    function find_user_cart( $user_id ) {
        $acarts = get_all_carts();
        foreach ($acarts as $cart) {
            if ($cart["cart_id"] == $user_id) {
                return $cart["cart_id"];
            }
        }
        // we didn't find a cart with the user id, so we create one
        $data = '{"Price": 0'
                .', "StatusProduct": 0'
                .', "UserId":'.$user_id.'}';
        $url = "http://localhost:8080/api/product";
        $options = array(
            'http' => array(
            'method'  => 'POST',
            'content' => $data,
            )
        );
        $context  = stream_context_create( $options );
        $result = file_get_contents( $url, false, $context );

        // now we should find it
        find_user_cart($user_id);

    }
