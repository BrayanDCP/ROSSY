<?php
declare(strict_types=1);
require_once __DIR__ . '/auth.php';

// Verificar que sea admin
$user = getCurrentUser();
if (!$user || $user['role'] !== 'admin') {
    jsonResponse(['success' => false, 'error' => 'Acceso denegado'], 403);
}

$usuario_id = isset($_GET['usuario_id']) ? (int)$_GET['usuario_id'] : null;

$pdo = obtenerConexion();
if (!$pdo) {
    jsonResponse(['success' => false, 'error' => 'Error de conexión a la base de datos'], 500);
}

try {
    if ($usuario_id) {
        // Órdenes de un usuario específico
        $stmt = $pdo->prepare('
            SELECT 
                p.id, p.nombre_cliente, p.email, p.telefono, p.direccion, 
                p.distrito, p.entrega, p.pago, p.total, p.estado, p.nota, 
                p.creado_at, p.actualizado_at,
                u.nombre as usuario_nombre
            FROM pedidos p
            LEFT JOIN usuarios u ON p.usuario_id = u.id
            WHERE p.usuario_id = :usuario_id
            ORDER BY p.creado_at DESC
        ');
        $stmt->execute(['usuario_id' => $usuario_id]);
    } else {
        // Todas las órdenes
        $stmt = $pdo->prepare('
            SELECT 
                p.id, p.usuario_id, p.nombre_cliente, p.email, p.telefono, 
                p.direccion, p.distrito, p.entrega, p.pago, p.total, 
                p.estado, p.nota, p.creado_at, p.actualizado_at,
                u.nombre as usuario_nombre
            FROM pedidos p
            LEFT JOIN usuarios u ON p.usuario_id = u.id
            ORDER BY p.creado_at DESC
        ');
        $stmt->execute();
    }
    
    $pedidos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    jsonResponse(['success' => true, 'pedidos' => $pedidos]);
} catch (PDOException $e) {
    jsonResponse(['success' => false, 'error' => 'Error al obtener pedidos'], 500);
}
