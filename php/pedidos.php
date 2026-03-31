<?php
/* ============================================
   php/pedidos.php
   Guardar pedidos en base de datos
   POST → crear pedido desde checkout
   GET  → listar pedidos (admin)
   ============================================ */

require_once 'conexion.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$pdo    = obtenerConexion();
$metodo = $_SERVER['REQUEST_METHOD'];

/* ============ POST – Crear pedido ============ */
if ($metodo === 'POST') {
    $entrada  = json_decode(file_get_contents('php://input'), true);
    $productos = $entrada['productos'] ?? [];

    if (empty($productos)) {
        responderJSON(['error' => 'No hay productos en el pedido'], 400);
    }

    $nombre    = sanitizar($entrada['nombre']    ?? 'Invitado');
    $telefono  = sanitizar($entrada['telefono']  ?? '');
    $direccion = sanitizar($entrada['direccion'] ?? '');
    $pago      = sanitizar($entrada['pago']      ?? 'Yape');
    $nota      = sanitizar($entrada['nota']      ?? '');
    $total     = (float)($entrada['total']       ?? 0);

    // Insertar pedido principal
    $stmt = $pdo->prepare("
        INSERT INTO pedidos
            (nombre_cliente, telefono, direccion, metodo_pago, nota, total, estado)
        VALUES
            (:nombre, :telefono, :direccion, :pago, :nota, :total, 'pendiente')
    ");
    $stmt->execute([
        ':nombre'    => $nombre,
        ':telefono'  => $telefono,
        ':direccion' => $direccion,
        ':pago'      => $pago,
        ':nota'      => $nota,
        ':total'     => $total,
    ]);
    $pedidoId = (int)$pdo->lastInsertId();

    // Insertar detalle de cada producto
    $stmtDet = $pdo->prepare("
        INSERT INTO pedido_detalle
            (pedido_id, producto_id, nombre_producto, precio_unitario, cantidad)
        VALUES
            (:pedido_id, :producto_id, :nombre, :precio, :cantidad)
    ");

    foreach ($productos as $p) {
        $stmtDet->execute([
            ':pedido_id'  => $pedidoId,
            ':producto_id'=> (int)($p['id']       ?? 0),
            ':nombre'     => sanitizar($p['nombre'] ?? ''),
            ':precio'     => (float)($p['precio']  ?? 0),
            ':cantidad'   => (int)($p['cantidad']  ?? 1),
        ]);
    }

    responderJSON(['ok' => true, 'pedido_id' => $pedidoId], 201);
}

/* ============ GET – Listar pedidos (admin) ============ */
if ($metodo === 'GET') {
    // Aquí deberías verificar autenticación de admin
    $stmt = $pdo->query("
        SELECT p.*, 
               GROUP_CONCAT(d.nombre_producto ORDER BY d.id SEPARATOR ', ') AS productos_resumen
        FROM pedidos p
        LEFT JOIN pedido_detalle d ON d.pedido_id = p.id
        GROUP BY p.id
        ORDER BY p.fecha DESC
        LIMIT 100
    ");
    responderJSON($stmt->fetchAll());
}