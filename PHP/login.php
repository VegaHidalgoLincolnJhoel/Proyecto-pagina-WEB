<?php
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM usuarios WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        if (password_verify($password, $usuario['password'])) {
            echo "✅ Bienvenido, " . $usuario['nombre'];
        } else {
            echo "❌ Contraseña incorrecta.";
        }
    } else {
        echo "❌ No existe una cuenta con ese correo.";
    }

    $conn->close();
}
?>
