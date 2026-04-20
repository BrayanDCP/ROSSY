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

// Verificar que está autenticado en admin
if (!isset($_SESSION['admin_authenticated']) || $_SESSION['admin_authenticated'] !== true) {
    jsonResponse(['success' => false, 'error' => 'Acceso denegado'], 403);
}

$pdo = obtenerConexion();
if (!$pdo) {
    jsonResponse(['success' => false, 'error' => 'Error de conexión a la base de datos'], 500);
}

try {
    // Traer todos los usuarios con información básica
    $stmt = $pdo->prepare('
        SELECT 
            id, nombre, email, telefono, direccion, role, estado, 
            verificado, ultimo_login, creado_at,
            (SELECT COUNT(*) FROM pedidos WHERE usuario_id = usuarios.id) as total_compras
        FROM usuarios 
        ORDER BY creado_at DESC
    ');
    $stmt->execute();
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Registrar acceso a usuarios
    $stmt = $pdo->prepare('
        INSERT INTO admin_logs (tipo, descripcion, ip_address, usuario_id, creado_at)
        VALUES (:tipo, :desc, :ip, :uid, NOW())
    ');
    $stmt->execute([
        'tipo' => 'VER_USUARIOS',
        'desc' => 'Vista de lista de usuarios',
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'uid' => $_SESSION['usuario_id'] ?? null,
    ]);
    
    jsonResponse(['success' => true, 'usuarios' => $usuarios]);
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => 'Error al obtener usuarios'], 500);
}
