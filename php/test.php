<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>

  <script>// Fonction pour vérifier si un cookie existe
    function checkCookie(cookieName) {
      // Séparez tous les cookies en tableau
      var cookies = document.cookie.split(';');

      // Parcourez tous les cookies pour rechercher le nom du cookie spécifié
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Si le cookie correspond au nom spécifié
        if (cookie.indexOf(cookieName) === 0) {
          // Le cookie existe
          return true;
        }
      }
      // Si le cookie n'est pas trouvé
      return false;
    }

    // Utilisation : Vérifie si le cookie nommé "votre_cookie" existe
    if (checkCookie('userCookie')) {
      console.log('Le cookie existe');
    } else {
      console.log('Le cookie n\'existe pas');
    }
  </script>

  <?php
  // ob_start();
  

  $url = "http://localhost:8080/api/user";

  $json_user = file_get_contents($url);

  echo $json_user;

  function login()
  {
    @$email = $_POST['email'];
    @$password = $_POST['password'];
    $url = "http://localhost:8080/api/user";

    $json_user = file_get_contents($url);
    $user = json_decode($json_user, $associative = true);

    $found = false;
    $admin = false;
    $id = Null;

    for ($i = 0; $i < sizeof($user); $i++) {
      if ($email == $user[$i]["Email"] and $password == $user[$i]["Password"]) {
        $found = true;
        $id = $user[$i]["UserId"];
        break;
      }
    }

    if ($email == "admin@gmail.com") {
      $admin = true;
    }

    if ($found) {
      $cookieValue = array(
        "userId" => $id,
        "admin" => $admin
      );
      echo "Bon";
      setcookie("userCookie", json_encode($cookieValue));
    } else {
      echo "Pas Bon";
    }
  }

  function register()
  {
    @$firstName = $_POST['firstName'];
    @$lastName = $_POST['lastName'];
    @$email = $_POST['email'];
    @$password = $_POST['password'];
    $url = "http://localhost:8080/api/user";

    $json_user = file_get_contents($url);
    $user = json_decode($json_user, $associative = true);

    $found = false;

    for ($i = 0; $i < sizeof($user); $i++) {
      if ($email == $user[$i]["Email"] and $password == $user[$i]["Password"]) {
        $found = true;
        break;
      }
    }

    if ($found) {
      
      
    } else {

    $data = array(
      'FirstName' => $firstName,
      'LastName' => $lastName,
      'Password' => $password, // Valeur statique
      'Email' => $email, // Valeur statique
    );
    $data_json = json_encode($data);
    $options = array(
      'http' => array(
        'method' => 'POST',
        'content' => $data_json,
        'header' => "Content-Type: application/json\r\n" . // Spécifier le type de contenu JSON
          "Accept: application/json\r\n" // Spécifier le type de contenu accepté
      )
    );

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $response = json_decode($result);
  }
}

  if (array_key_exists('button1', $_POST)) {
    login();
    header('Location: test.php'); //clears POST
  }

  if (array_key_exists('button2', $_POST)) {
    register();
    header('Location: test.php'); //clears POST
  }

  // ob_end_flush();
  ?>

  <form method="post">
    <input name="firstName" id="firstName" type="text">
    <input name="lastName" id="lastName" type="text">
    <input name="email" id="email" type="text">
    <input name="password" id="password" type="text">
    <!-- <input type="submit" name="button1" class="button" value="Button1" /> -->
    <input type="submit" name="button2" class="button" value="Button2" />
  </form>

</body>

</html>