<!DOCTYPE html>

<?php
        // do not allow not admin users
        if (!isset($_COOKIE["userCookie"])) {
            header('Location: ./index.php');
        } else if (!json_decode($_COOKIE["userCookie"], true)["admin"]) {
            header('Location: ./index.php');
        }
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="./php/product/new_product.php" method="post">
    Name : <input type="text" name="NameProduct"><br>
    Type : <input type="text" name="TypeProduct"><br>
    Image link : <input type="text" name="ImageLink"><br>
    Description : <input type="text" name="Description"><br>
    Price : <input type="text" name="Price"><br>
    Status : <input type="text" name="StatusProduct"><br>
    <input type="submit">
    </form>

    <a href="./index.php">Back</a>
</body>
</html>