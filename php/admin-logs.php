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

try {
    $pdo = obtenerConexion();
    
    // Traer logs del admin
    $stmt = $pdo->prepare('
        SELECT 
            id, tipo, descripcion, ip_address, usuario_id, 
            usuario_nombre, usuario_email, datos, creado_at
        FROM vw_admin_logs
        ORDER BY creado_at DESC
        LIMIT 1000
    ');
    $stmt->execute();
    $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Registrar que vio los logs
    $stmtLog = $pdo->prepare('
        INSERT INTO admin_logs (tipo, descripcion, ip_address, usuario_id, creado_at)
        VALUES (:tipo, :desc, :ip, :uid, NOW())
    ');
    $stmtLog->execute([
        'tipo' => 'VER_LOGS',
        'desc' => 'Vista de logs administrativos',
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'uid' => $_SESSION['usuario_id'] ?? null,
    ]);
    
    jsonResponse(['success' => true, 'logs' => $logs]);
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => 'Error al obtener logs'], 500);
}
