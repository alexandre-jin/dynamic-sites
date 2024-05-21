import { checkCookie } from './cookie.js';

// Vérifiez si le cookie existe
if (checkCookie('userCookie')) {
  // Le cookie existe, masquez la section
  document.getElementById('form').style.display = 'none';
  document.getElementById('login').style.display = 'block';
  document.getElementById('effacerCookie').style.display = 'block';
} else {
  // Le cookie n'existe pas, affichez la section
  document.getElementById('form').style.display = 'block';
  document.getElementById('login').style.display = 'none';
  document.getElementById('effacerCookie').style.display = 'none';
}

document.getElementById("effacerCookie").addEventListener("click", function (event) {
  event.preventDefault(); // Empêche le comportement par défaut de l'ancre

  // Effacer le cookie en définissant sa date d'expiration dans le passé
  document.cookie = "userCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.reload();
});
