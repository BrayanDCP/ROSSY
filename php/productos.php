<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/conexion.php';

try {
    $pdo = obtenerConexion();
    if (!$pdo) {
        echo json_encode([]);
        exit;
    }
    $sql = 'SELECT p.id, p.sku, p.nombre, p.descripcion, c.nombre AS categoria, p.precio, p.precio_original, p.stock, p.imagen_principal, p.activo, GROUP_CONCAT(pi.ruta ORDER BY pi.orden SEPARATOR ";") AS imagenes
            FROM productos p
            LEFT JOIN categorias c ON c.id = p.categoria_id
            LEFT JOIN producto_imagenes pi ON pi.producto_id = p.id
            WHERE p.activo = 1
            GROUP BY p.id
            ORDER BY p.id ASC';
    $stmt = $pdo->query($sql);
    $productos = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $imagenes = [];
        if (!empty($row['imagenes'])) {
            $imagenes = array_filter(explode(';', $row['imagenes']));
        }
        $productos[] = [
            'id' => (int) $row['id'],
            'sku' => $row['sku'],
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion'],
            'categoria' => $row['categoria'] ?? '',
            'precio' => $row['precio'],
            'precio_original' => $row['precio_original'],
            'stock' => (int) $row['stock'],
            'imagen_principal' => $row['imagen_principal'],
            'imagenes' => $imagenes,
            'activo' => (int) $row['activo'],
        ];
    }
    echo json_encode($productos, JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    echo json_encode([]);
}
