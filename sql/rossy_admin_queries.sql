-- rossy_admin_queries.sql
-- Vistas y consultas recomendadas para el panel de administrador de R.O.S.S.Y
USE rossy_store;

CREATE OR REPLACE VIEW vw_admin_usuarios AS
SELECT
  id,
  nombre,
  email,
  role,
  estado,
  verificado,
  telefono,
  ultimo_login,
  creado_at
FROM usuarios
ORDER BY creado_at DESC;

CREATE OR REPLACE VIEW vw_admin_pedidos AS
SELECT
  p.id AS pedido_id,
  p.nombre_cliente,
  p.email,
  p.telefono,
  p.distrito,
  p.entrega,
  p.pago,
  p.total,
  p.estado,
  p.creado_at,
  u.nombre AS usuario_nombre,
  u.email AS usuario_email
FROM pedidos p
LEFT JOIN usuarios u ON u.id = p.usuario_id
ORDER BY p.creado_at DESC;

CREATE OR REPLACE VIEW vw_admin_pedido_detalle AS
SELECT
  d.id,
  d.pedido_id,
  d.producto_id,
  d.nombre AS producto_nombre,
  d.precio,
  d.cantidad,
  d.subtotal,
  d.talla,
  d.color,
  d.creado_at
FROM pedido_detalle d;

CREATE OR REPLACE VIEW vw_admin_interacciones_resumen AS
SELECT
  i.id,
  i.usuario_id,
  COALESCE(u.nombre, 'Invitado') AS usuario_nombre,
  COALESCE(u.email, i.referencia) AS usuario_email,
  i.tipo,
  i.referencia,
  i.descripcion,
  i.metadata,
  i.ip,
  i.user_agent,
  i.creado_at
FROM interacciones i
LEFT JOIN usuarios u ON u.id = i.usuario_id
ORDER BY i.creado_at DESC;

-- Consultas útiles
-- Total de pedidos por estado
SELECT estado, COUNT(*) AS total_pedidos
FROM pedidos
GROUP BY estado;

-- Actividad de usuarios recientes
SELECT usuario_id, tipo, descripcion, creado_at
FROM interacciones
ORDER BY creado_at DESC
LIMIT 50;

-- Productos más vistos por interacción
SELECT
  JSON_EXTRACT(metadata, '$.producto_id') AS producto_id,
  COUNT(*) AS veces_visto
FROM interacciones
WHERE tipo = 'vista_producto'
GROUP BY JSON_EXTRACT(metadata, '$.producto_id')
ORDER BY veces_visto DESC
LIMIT 10;
