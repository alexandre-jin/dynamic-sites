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

export { checkCookie };