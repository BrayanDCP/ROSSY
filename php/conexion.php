<?php
/* ============================================
   php/conexion.php
   Comercial Rossy – Conexión a MySQL
   Credenciales configuradas para MySQL Workbench 8.0
   Puerto: 3306  |  Host: localhost
   ============================================ */

define('DB_HOST',    'localhost');
define('DB_PORT',    '3306');
define('DB_USER',    'root');
define('DB_PASS',    'Locaperu12.');
define('DB_NAME',    'rossy_db');
define('DB_CHARSET', 'utf8mb4');

/* ---- Conexión PDO singleton ---- */
function obtenerConexion(): PDO {
    static $pdo = null;

    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=%s',
            DB_HOST, DB_PORT, DB_NAME, DB_CHARSET
        );
        $opciones = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $opciones);
        } catch (PDOException $e) {
            // Registra el error real en log del servidor, no lo expone al cliente
            error_log('[Rossy DB Error] ' . $e->getMessage());
            http_response_code(500);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['error' => 'No se pudo conectar a la base de datos. Intenta más tarde.'], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    return $pdo;
}

/* ---- Helper: respuesta JSON con headers CORS ---- */
function responderJSON($data, int $codigo = 200): void {
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/* ---- Helper: sanitizar string de entrada ---- */
function sanitizar(string $valor): string {
    return htmlspecialchars(strip_tags(trim($valor)), ENT_QUOTES, 'UTF-8');
}

/* ---- Helper: obtener body JSON del request ---- */
function obtenerBodyJSON(): array {
    $raw = file_get_contents('php://input');
    if (empty($raw)) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

/* ---- Helper: verificar sesión activa (opcional, no bloquea compra) ---- */
function sesionActiva(): bool {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    return !empty($_SESSION['usuario_id']);
}

/* ---- Helper: obtener usuario de sesión (null si es invitado) ---- */
function usuarioSesion(): ?array {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    if (empty($_SESSION['usuario_id'])) return null;
    return [
        'id'     => $_SESSION['usuario_id'],
        'nombre' => $_SESSION['usuario_nombre'] ?? 'Usuario',
        'rol'    => $_SESSION['usuario_rol']    ?? 'cliente',
    ];
}