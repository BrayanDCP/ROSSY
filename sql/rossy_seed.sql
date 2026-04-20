-- rossy_seed.sql
-- Datos de ejemplo para iniciar la base de datos R.O.S.S.Y
USE rossy_store;

-- Categorías de ejemplo
INSERT INTO categorias (nombre, slug, icono, descripcion, orden, activo)
VALUES
  ('Casacas', 'casacas', 'img/iconos/casaca.png', 'Casacas y abrigos para mujer', 10, 1),
  ('Blusas', 'blusas', 'img/iconos/blusa.png', 'Blusas modernas y versátiles', 20, 1),
  ('Conjuntos', 'conjuntos', 'img/iconos/conjunto.png', 'Conjuntos coordinados de tendencia', 30, 1),
  ('Chompas', 'chompas', 'img/iconos/chompa.png', 'Chompas cómodas para uso diario', 40, 1);

-- Productos de ejemplo
INSERT INTO productos (sku, nombre, descripcion, categoria_id, precio, precio_original, stock, imagen_principal, activo)
VALUES
  ('ROSSY-001', 'Casaca Jean Vintage', 'Casaca jean oversized con detalle lavado.', 1, 149.90, 179.90, 18, 'img/productos/1.jpeg', 1),
  ('ROSSY-002', 'Blusa Floral Elegante', 'Blusa ligera con estampado floral y mangas semi-transparentes.', 2, 99.90, 0, 25, 'img/productos/2.jpeg', 1),
  ('ROSSY-003', 'Conjunto Sport Chic', 'Conjunto deportivo con sudadera y jogger a juego.', 3, 189.90, 0, 12, 'img/productos/3.jpeg', 1),
  ('ROSSY-004', 'Chompa Oversize', 'Chompa suave y cálida ideal para capas.', 4, 129.90, 149.90, 22, 'img/productos/4.jpeg', 1);

-- Imágenes de producto de ejemplo
INSERT INTO producto_imagenes (producto_id, orden, ruta, alt_text)
VALUES
  (1, 1, 'img/productos/1.jpeg', 'Casaca Jean vintage frontal'),
  (1, 2, 'img/productos/1-2.jpeg', 'Casaca Jean vintage detalle'),
  (2, 1, 'img/productos/2.jpeg', 'Blusa floral elegante frontal'),
  (3, 1, 'img/productos/3.jpeg', 'Conjunto sport chic frontal'),
  (4, 1, 'img/productos/4.jpeg', 'Chompa oversize frontal');

-- Usuarios iniciales
ALTER TABLE usuarios
  ADD COLUMN IF NOT EXISTS apellido VARCHAR(140) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS dni VARCHAR(20) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS edad SMALLINT UNSIGNED DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS pais VARCHAR(80) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS provincia VARCHAR(120) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS distrito VARCHAR(120) DEFAULT NULL;

INSERT INTO usuarios (nombre, apellido, email, password_hash, telefono, dni, edad, pais, provincia, distrito, direccion, role, estado, verificado)
VALUES
  ('Admin R.O.S.S.Y', 'Admin', 'admin@rossy.pe', SHA2('Admin2026!', 256), '999304046', '12345678', 28, 'Perú', 'Lima', 'La Victoria', 'Av. Miguel Grau 580, La Victoria', 'admin', 'activo', 1),
  ('Cliente de Prueba', 'Prueba', 'cliente@rossy.pe', SHA2('Cliente2026!', 256), '999112233', '87654321', 25, 'Perú', 'Lima', 'San Isidro', 'Calle Falsa 123, Lima', 'user', 'activo', 1);

-- Pedidos de ejemplo
INSERT INTO pedidos (usuario_id, nombre_cliente, email, telefono, direccion, distrito, entrega, pago, total, estado, nota)
VALUES
  (2, 'Cliente de Prueba', 'cliente@rossy.pe', '999112233', 'Calle Falsa 123, Lima', 'Lima', 'envio', 'Yape', 249.80, 'confirmado', 'Entregar en horario de tarde.');

INSERT INTO pedido_detalle (pedido_id, producto_id, nombre, precio, cantidad, subtotal, talla, color)
VALUES
  (1, 1, 'Casaca Jean Vintage', 149.90, 1, 149.90, 'M', 'Azul'),
  (1, 2, 'Blusa Floral Elegante', 99.90, 1, 99.90, 'S', 'Rosa');

-- Interacciones de ejemplo
INSERT INTO interacciones (usuario_id, tipo, referencia, descripcion, metadata, ip, user_agent)
VALUES
  (2, 'registro_usuario', NULL, 'Registro de nuevo cliente en la tienda', JSON_OBJECT('origen','web','pagina','registro'), '190.100.50.12', 'Mozilla/5.0'),
  (2, 'inicio_sesion', NULL, 'Inicio de sesión exitoso', JSON_OBJECT('origen','web','pagina','login'), '190.100.50.12', 'Mozilla/5.0'),
  (2, 'vista_producto', '1', 'Vio la ficha de producto Casaca Jean Vintage', JSON_OBJECT('producto_id',1,'color','Azul'),'190.100.50.12', 'Mozilla/5.0'),
  (2, 'agregar_carrito', '1', 'Agregó Casaca Jean Vintage al carrito', JSON_OBJECT('producto_id',1,'cantidad',1,'talla','M'), '190.100.50.12', 'Mozilla/5.0'),
  (2, 'compra_confirmada', '1', 'Pedido confirmado por el cliente', JSON_OBJECT('pedido_id',1,'total','249.80'),'190.100.50.12', 'Mozilla/5.0');
