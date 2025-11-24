<?php
// logout.php - destruye la sesión y devuelve un texto simple
session_start();
// Limpiar y destruir sesión
$_SESSION = [];
if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params['path'],
        $params['domain'],
        $params['secure'],
        $params['httponly']
    );
}
session_destroy();
echo "✅ Sesión cerrada.";
?>