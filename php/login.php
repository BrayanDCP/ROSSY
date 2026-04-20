<?php
declare(strict_types=1);
require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Método incorrecto'], 405);
}

$email = strtolower(trim((string) ($_POST['email'] ?? '')));
$password = trim((string) ($_POST['password'] ?? ''));

if ($email === '' || $password === '') {
    jsonResponse(['success' => false, 'error' => 'Completa el correo y la contraseña.'], 422);
}

$user = findUserByEmail($email);
if (!$user || !password_verify($password, $user['password_hash'])) {
    jsonResponse(['success' => false, 'error' => 'Email o contraseña incorrectos.'], 401);
}

if ($user['estado'] !== 'activo') {
    jsonResponse(['success' => false, 'error' => 'La cuenta está desactivada.'], 403);
}

loginUser($user);
jsonResponse(['success' => true, 'message' => 'Inicio de sesión exitoso.']);
