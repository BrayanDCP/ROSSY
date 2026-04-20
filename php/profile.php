<?php
declare(strict_types=1);
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Método incorrecto'], 405);
}

$user = getCurrentUser();
if (!$user) {
    jsonResponse(['success' => false, 'error' => 'No estás autenticada.'], 401);
}

$nombre = trim((string) ($_POST['nombre'] ?? ''));
$apellido = trim((string) ($_POST['apellido'] ?? ''));
$telefono = trim((string) ($_POST['telefono'] ?? ''));
$direccion = trim((string) ($_POST['direccion'] ?? ''));
$pais = trim((string) ($_POST['pais'] ?? ''));
$provincia = trim((string) ($_POST['provincia'] ?? ''));
$distrito = trim((string) ($_POST['distrito'] ?? ''));
$dni = trim((string) ($_POST['dni'] ?? ''));
$edad = trim((string) ($_POST['edad'] ?? ''));

if ($nombre === '' || $apellido === '') {
    jsonResponse(['success' => false, 'error' => 'Ingresa nombre y apellido.'], 422);
}

if ($dni !== '' && !preg_match('/^[0-9]{6,12}$/', $dni)) {
    jsonResponse(['success' => false, 'error' => 'El DNI debe contener solo números de 6 a 12 dígitos.'], 422);
}

try {
    $pdo = obtenerConexion();
    $stmt = $pdo->prepare('UPDATE usuarios SET nombre = :nombre, apellido = :apellido, telefono = :telefono, direccion = :direccion, pais = :pais, provincia = :provincia, distrito = :distrito, dni = :dni, edad = :edad WHERE id = :id');
    $stmt->execute([
        'nombre' => $nombre,
        'apellido' => $apellido,
        'telefono' => $telefono,
        'direccion' => $direccion,
        'pais' => $pais,
        'provincia' => $provincia,
        'distrito' => $distrito,
        'dni' => $dni,
        'edad' => $edad !== '' ? (int)$edad : null,
        'id' => $user['id'],
    ]);
    $_SESSION['usuario_nombre'] = $nombre;
    $updatedUser = getCurrentUser();
    jsonResponse(['success' => true, 'message' => 'Perfil actualizado con éxito.', 'user' => $updatedUser]);
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => 'Error en el servidor. Intenta más tarde.'], 500);
}
