<?php
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombres = $_POST['nombres'];
    $apellidos = $_POST['apellidos'];
    $edad = $_POST['edad'];
    $dni = $_POST['dni'];
    $puesto = $_POST['puesto'];

    $sql = "INSERT INTO postulaciones (nombres, apellidos, edad, dni, puesto)
            VALUES ('$nombres', '$apellidos', '$edad', '$dni', '$puesto')";

    if ($conn->query($sql) === TRUE) {
        echo "✅ Postulación enviada correctamente.";
    } else {
        echo "❌ Error: " . $conn->error;
    }

    $conn->close();
}
?>
