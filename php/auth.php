<?php
declare(strict_types=1);

session_start();
require_once __DIR__ . '/conexion.php';

function jsonResponse(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function getCurrentUser(): ?array
{
    if (empty($_SESSION['usuario_id'])) {
        return null;
    }

    try {
        $pdo = obtenerConexion();
        if (!$pdo) {
            return null;
        }
        $stmt = $pdo->prepare('SELECT id, nombre, apellido, email, telefono, direccion, pais, provincia, distrito, dni, edad, role FROM usuarios WHERE id = :id AND estado = "activo"');
        $stmt->execute(['id' => $_SESSION['usuario_id']]);
        $user = $stmt->fetch();
        return $user ?: null;
    } catch (PDOException $e) {
        return null;
    }
}

function findUserByEmail(string $email): ?array
{
    $pdo = obtenerConexion();
    if (!$pdo) {
        return null;
    }
    $stmt = $pdo->prepare('SELECT * FROM usuarios WHERE email = :email LIMIT 1');
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();
    return $user ?: null;
}

function createUser(string $nombre, string $apellido, string $email, string $password, string $telefono = '', string $dni = '', ?int $edad = null, string $pais = '', string $provincia = '', string $distrito = '', string $direccion = ''): array
{
    $pdo = obtenerConexion();
    if (!$pdo) {
        throw new Exception('Error de conexión a la base de datos');
    }
    $stmt = $pdo->prepare('INSERT INTO usuarios (nombre, apellido, email, password_hash, telefono, dni, edad, pais, provincia, distrito, direccion, role, estado, verificado) VALUES (:nombre, :apellido, :email, :password_hash, :telefono, :dni, :edad, :pais, :provincia, :distrito, :direccion, :role, :estado, :verificado)');
    $stmt->execute([
        'nombre' => $nombre,
        'apellido' => $apellido,
        'email' => $email,
        'password_hash' => password_hash($password, PASSWORD_DEFAULT),
        'telefono' => $telefono,
        'dni' => $dni,
        'edad' => $edad,
        'pais' => $pais,
        'provincia' => $provincia,
        'distrito' => $distrito,
        'direccion' => $direccion,
        'role' => 'user',
        'estado' => 'activo',
        'verificado' => 0,
    ]);

    return [
        'id' => (int) $pdo->lastInsertId(),
        'nombre' => $nombre,
        'apellido' => $apellido,
        'email' => $email,
        'telefono' => $telefono,
        'dni' => $dni,
        'edad' => $edad,
        'pais' => $pais,
        'provincia' => $provincia,
        'distrito' => $distrito,
        'direccion' => $direccion,
        'role' => 'user',
    ];
}

function loginUser(array $user): void
{
    session_regenerate_id(true);
    $_SESSION['usuario_id'] = (int) $user['id'];
    $_SESSION['usuario_nombre'] = $user['nombre'];
    $_SESSION['usuario_email'] = $user['email'];

    $pdo = obtenerConexion();
    if ($pdo) {
        $stmt = $pdo->prepare('UPDATE usuarios SET ultimo_login = NOW() WHERE id = :id');
        $stmt->execute(['id' => $user['id']]);
    }
}

function logoutUser(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params['path'], $params['domain'],
            $params['secure'], $params['httponly']
        );
    }
    session_destroy();
}
