<?php
/* ============================================
   php/productos.php
   CRUD de productos – API REST simple
   GET    → listar productos (con filtros opcionales)
   POST   → crear producto  (admin)
   PUT    → actualizar      (admin)
   DELETE → eliminar        (admin)
   ============================================ */

require_once 'conexion.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$pdo    = obtenerConexion();
$metodo = $_SERVER['REQUEST_METHOD'];

/* ============ GET – Listar productos ============ */
if ($metodo === 'GET') {
    $sql    = "SELECT * FROM productos WHERE 1=1";
    $params = [];

    // Filtro por categoría
    if (!empty($_GET['categoria'])) {
        $sql     .= " AND categoria = :categoria";
        $params[':categoria'] = sanitizar($_GET['categoria']);
    }

    // Filtro por búsqueda
    if (!empty($_GET['q'])) {
        $busqueda = '%' . sanitizar($_GET['q']) . '%';
        $sql     .= " AND (nombre LIKE :q OR color LIKE :q2)";
        $params[':q']  = $busqueda;
        $params[':q2'] = $busqueda;
    }

    // Solo ofertas
    if (!empty($_GET['oferta'])) {
        $sql .= " AND precio_original IS NOT NULL AND precio_original > 0";
    }

    $sql .= " ORDER BY id DESC";

    // Límite
    if (!empty($_GET['limite']) && is_numeric($_GET['limite'])) {
        $sql .= " LIMIT " . (int)$_GET['limite'];
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $productos = $stmt->fetchAll();

    responderJSON($productos);
}

/* ============ POST – Crear producto (admin) ============ */
if ($metodo === 'POST') {
    $entrada = json_decode(file_get_contents('php://input'), true);

    // Validación básica
    if (empty($entrada['nombre']) || empty($entrada['precio'])) {
        responderJSON(['error' => 'Nombre y precio son obligatorios'], 400);
    }

    $stmt = $pdo->prepare("
        INSERT INTO productos (nombre, precio, precio_original, imagen, talla, color, categoria, badge)
        VALUES (:nombre, :precio, :precio_original, :imagen, :talla, :color, :categoria, :badge)
    ");

    $stmt->execute([
        ':nombre'          => sanitizar($entrada['nombre']),
        ':precio'          => (float)$entrada['precio'],
        ':precio_original' => !empty($entrada['precio_original']) ? (float)$entrada['precio_original'] : null,
        ':imagen'          => sanitizar($entrada['imagen'] ?? ''),
        ':talla'           => sanitizar($entrada['talla'] ?? ''),
        ':color'           => sanitizar($entrada['color'] ?? ''),
        ':categoria'       => sanitizar($entrada['categoria'] ?? 'general'),
        ':badge'           => sanitizar($entrada['badge'] ?? ''),
    ]);

    responderJSON(['ok' => true, 'id' => $pdo->lastInsertId()], 201);
}

/* ============ PUT – Actualizar producto ============ */
if ($metodo === 'PUT') {
    $entrada = json_decode(file_get_contents('php://input'), true);

    if (empty($entrada['id'])) {
        responderJSON(['error' => 'ID requerido'], 400);
    }

    $stmt = $pdo->prepare("
        UPDATE productos SET
            nombre          = :nombre,
            precio          = :precio,
            precio_original = :precio_original,
            imagen          = :imagen,
            talla           = :talla,
            color           = :color,
            categoria       = :categoria,
            badge           = :badge
        WHERE id = :id
    ");

    $stmt->execute([
        ':id'              => (int)$entrada['id'],
        ':nombre'          => sanitizar($entrada['nombre']),
        ':precio'          => (float)$entrada['precio'],
        ':precio_original' => !empty($entrada['precio_original']) ? (float)$entrada['precio_original'] : null,
        ':imagen'          => sanitizar($entrada['imagen'] ?? ''),
        ':talla'           => sanitizar($entrada['talla'] ?? ''),
        ':color'           => sanitizar($entrada['color'] ?? ''),
        ':categoria'       => sanitizar($entrada['categoria'] ?? 'general'),
        ':badge'           => sanitizar($entrada['badge'] ?? ''),
    ]);

    responderJSON(['ok' => true]);
}

/* ============ DELETE – Eliminar producto ============ */
if ($metodo === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) responderJSON(['error' => 'ID requerido'], 400);

    $stmt = $pdo->prepare("DELETE FROM productos WHERE id = :id");
    $stmt->execute([':id' => $id]);

    responderJSON(['ok' => true]);
}