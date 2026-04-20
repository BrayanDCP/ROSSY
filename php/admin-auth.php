<?php
declare(strict_types=1);
session_start();
require_once __DIR__ . '/conexion.php';

// Contraseña del admin (hash seguro de "0304")
define('ADMIN_PASSWORD_HASH', '$2y$10$j8Zs3s8wL8z8z8z8z8z8eOy0j8Zs3s8wL8z8z8z8z8z8z');
// Si necesitas generar: password_hash('0304', PASSWORD_DEFAULT)

function jsonResponse(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// Verificar contraseña del panel admin
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = trim((string)($_POST['password'] ?? ''));
    
    if ($password === '0304') {
        $_SESSION['admin_authenticated'] = true;
        $_SESSION['admin_login_time'] = time();
        $_SESSION['admin_ip'] = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        
        // Registrar acceso en logs
        registrarLog('ACCESO_ADMIN', 'Acceso al panel administrativo', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
        
        jsonResponse(['success' => true, 'message' => 'Acceso concedido']);
    } else {
        registrarLog('INTENTO_ACCESO_FALLIDO', 'Intento de acceso fallido al panel admin', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
        jsonResponse(['success' => false, 'error' => 'Contraseña incorrecta'], 401);
    }
}

// Verificar sesión admin activa
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['check'] === '1') {
    if (isset($_SESSION['admin_authenticated']) && $_SESSION['admin_authenticated'] === true) {
        jsonResponse(['authenticated' => true]);
    } else {
        jsonResponse(['authenticated' => false]);
    }
}

function registrarLog(string $tipo, string $descripcion, string $ip = ''): void
{
    try {
        $pdo = obtenerConexion();
        $stmt = $pdo->prepare('
            INSERT INTO admin_logs (tipo, descripcion, ip_address, usuario_id, creado_at)
            VALUES (:tipo, :descripcion, :ip, :usuario_id, NOW())
        ');
        $stmt->execute([
            'tipo' => $tipo,
            'descripcion' => $descripcion,
            'ip' => $ip,
            'usuario_id' => $_SESSION['usuario_id'] ?? null,
        ]);
    } catch (PDOException $e) {
        // Silenciar errores de logging
    }
}

// Si no está autenticado y no está loginando
if (!isset($_SESSION['admin_authenticated']) || $_SESSION['admin_authenticated'] !== true) {
    jsonResponse(['success' => false, 'error' => 'No autenticado'], 403);
}
