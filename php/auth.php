<?php
/* ============================================
   php/auth.php
   Login y Registro – COMPLETAMENTE OPCIONAL
   La compra/venta funciona siempre como invitado.
   El registro solo sirve para guardar historial.

   POST { accion: 'login' | 'registro' | 'logout' | 'estado' }
   ============================================ */

require_once 'conexion.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

// Iniciar sesión
if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'lifetime' => 86400 * 7,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

/* ---- GET: consultar estado de sesión ---- */
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $usuario = usuarioSesion();
    responderJSON(['logueado' => $usuario !== null, 'usuario' => $usuario]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responderJSON(['error' => 'Método no permitido'], 405);
}

$entrada = obtenerBodyJSON();
$accion  = sanitizar($entrada['accion'] ?? '');
$pdo     = obtenerConexion();

/* ============ ESTADO ============ */
if ($accion === 'estado') {
    $usuario = usuarioSesion();
    responderJSON(['logueado' => $usuario !== null, 'usuario' => $usuario]);
}

/* ============ REGISTRO ============ */
if ($accion === 'registro') {
    $nombre = sanitizar($entrada['nombre'] ?? '');
    $correo = filter_var(trim($entrada['correo'] ?? ''), FILTER_SANITIZE_EMAIL);
    $pass   = $entrada['pass'] ?? '';

    if (empty($nombre) || empty($correo) || empty($pass)) {
        responderJSON(['error' => 'Completa todos los campos', 'campo' => 'general'], 400);
    }
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        responderJSON(['error' => 'El correo no es válido', 'campo' => 'correo'], 400);
    }
    if (mb_strlen($pass) < 6) {
        responderJSON(['error' => 'La contraseña debe tener al menos 6 caracteres', 'campo' => 'pass'], 400);
    }

    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE correo = :correo LIMIT 1");
    $stmt->execute([':correo' => $correo]);
    if ($stmt->fetch()) {
        responderJSON(['error' => 'Este correo ya está registrado. ¿Quieres iniciar sesión?', 'campo' => 'correo'], 409);
    }

    $hash = password_hash($pass, PASSWORD_BCRYPT, ['cost' => 12]);
    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (:n, :c, :h, 'cliente')");
    $stmt->execute([':n' => $nombre, ':c' => $correo, ':h' => $hash]);
    $nuevoId = (int)$pdo->lastInsertId();

    $_SESSION['usuario_id']     = $nuevoId;
    $_SESSION['usuario_nombre'] = $nombre;
    $_SESSION['usuario_rol']    = 'cliente';

    responderJSON([
        'ok'      => true,
        'mensaje' => "¡Bienvenida, $nombre! Tu cuenta fue creada.",
        'usuario' => ['id' => $nuevoId, 'nombre' => $nombre, 'rol' => 'cliente'],
    ], 201);
}

/* ============ LOGIN ============ */
if ($accion === 'login') {
    $correo = filter_var(trim($entrada['correo'] ?? ''), FILTER_SANITIZE_EMAIL);
    $pass   = $entrada['pass'] ?? '';

    if (empty($correo) || empty($pass)) {
        responderJSON(['error' => 'Ingresa tu correo y contraseña'], 400);
    }

    $stmt = $pdo->prepare("SELECT id, nombre, contrasena, rol, activo FROM usuarios WHERE correo = :correo LIMIT 1");
    $stmt->execute([':correo' => $correo]);
    $usuario = $stmt->fetch();

    if (!$usuario) {
        responderJSON(['error' => 'No encontramos una cuenta con ese correo'], 401);
    }
    if (!$usuario['activo']) {
        responderJSON(['error' => 'Tu cuenta está desactivada. Contáctanos por WhatsApp.'], 403);
    }
    if (!password_verify($pass, $usuario['contrasena'])) {
        responderJSON(['error' => 'La contraseña es incorrecta'], 401);
    }

    $_SESSION['usuario_id']     = $usuario['id'];
    $_SESSION['usuario_nombre'] = $usuario['nombre'];
    $_SESSION['usuario_rol']    = $usuario['rol'];

    if (password_needs_rehash($usuario['contrasena'], PASSWORD_BCRYPT, ['cost' => 12])) {
        $nuevoHash = password_hash($pass, PASSWORD_BCRYPT, ['cost' => 12]);
        $pdo->prepare("UPDATE usuarios SET contrasena = ? WHERE id = ?")->execute([$nuevoHash, $usuario['id']]);
    }

    responderJSON([
        'ok'      => true,
        'mensaje' => "¡Bienvenida de nuevo, {$usuario['nombre']}!",
        'usuario' => ['id' => $usuario['id'], 'nombre' => $usuario['nombre'], 'rol' => $usuario['rol']],
    ]);
}

/* ============ LOGOUT ============ */
if ($accion === 'logout') {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    session_destroy();
    responderJSON(['ok' => true, 'mensaje' => 'Sesión cerrada']);
}

responderJSON(['error' => 'Acción no reconocida'], 400);