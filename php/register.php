<?php
declare(strict_types=1);
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Método incorrecto'], 405);
}

$nombre = trim((string) ($_POST['nombre'] ?? ''));
$apellido = trim((string) ($_POST['apellido'] ?? ''));
$email = strtolower(trim((string) ($_POST['email'] ?? '')));
$telefono = trim((string) ($_POST['telefono'] ?? ''));
$dni = trim((string) ($_POST['dni'] ?? ''));
$edad = trim((string) ($_POST['edad'] ?? ''));
$pais = trim((string) ($_POST['pais'] ?? ''));
$provincia = trim((string) ($_POST['provincia'] ?? ''));
$distrito = trim((string) ($_POST['distrito'] ?? ''));
$direccion = trim((string) ($_POST['direccion'] ?? ''));
$password = trim((string) ($_POST['password'] ?? ''));

if ($nombre === '' || $apellido === '' || $email === '' || $password === '') {
    jsonResponse(['success' => false, 'error' => 'Completa los datos obligatorios.'], 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(['success' => false, 'error' => 'El correo no es válido.'], 422);
}

if (strlen($password) < 6) {
    jsonResponse(['success' => false, 'error' => 'La contraseña debe tener al menos 6 caracteres.'], 422);
}

if ($dni !== '' && !preg_match('/^[0-9]{6,12}$/', $dni)) {
    jsonResponse(['success' => false, 'error' => 'El DNI debe contener solo números de 6 a 12 dígitos.'], 422);
}

if ($edad !== '' && (!is_numeric($edad) || (int)$edad < 13)) {
    jsonResponse(['success' => false, 'error' => 'Debes tener al menos 13 años para registrarte.'], 422);
}

if (findUserByEmail($email)) {
    jsonResponse(['success' => false, 'error' => 'Ya existe una cuenta con ese correo.'], 409);
}

try {
    $usuario = createUser(
        $nombre,
        $apellido,
        $email,
        $password,
        $telefono,
        $dni,
        $edad !== '' ? (int)$edad : null,
        $pais,
        $provincia,
        $distrito,
        $direccion
    );
    loginUser($usuario);
    jsonResponse(['success' => true, 'message' => 'Registro exitoso. Ya puedes iniciar sesión.']);
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => 'Error en el servidor. Intenta más tarde.'], 500);
}
