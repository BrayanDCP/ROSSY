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

$pedido_id = isset($_GET['pedido_id']) ? (int)$_GET['pedido_id'] : 0;

if (!$pedido_id) {
    jsonResponse(['success' => false, 'error' => 'ID de pedido requerido'], 422);
}

try {
    $pdo = obtenerConexion();
    
    // Traer detalles del pedido
    $stmt = $pdo->prepare('
        SELECT 
            id, pedido_id, producto_id, nombre, talla, color, cantidad, 
            precio_unitario, creado_at
        FROM pedido_detalle
        WHERE pedido_id = :pedido_id
        ORDER BY creado_at ASC
    ');
    $stmt->execute(['pedido_id' => $pedido_id]);
    $detalle = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Registrar vista de detalle de pedido
    $stmtLog = $pdo->prepare('
        INSERT INTO admin_logs (tipo, descripcion, ip_address, usuario_id, datos, creado_at)
        VALUES (:tipo, :desc, :ip, :uid, :datos, NOW())
    ');
    $stmtLog->execute([
        'tipo' => 'VER_DETALLE_PEDIDO',
        'desc' => 'Vista de detalle de pedido específico',
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'uid' => $_SESSION['usuario_id'] ?? null,
        'datos' => json_encode(['pedido_id' => $pedido_id]),
    ]);
    
    jsonResponse(['success' => true, 'detalle' => $detalle]);
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => 'Error al obtener detalles'], 500);
}
