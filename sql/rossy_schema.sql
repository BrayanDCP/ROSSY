-- rossy_schema.sql
-- Estructura de base de datos para R.O.S.S.Y

CREATE DATABASE IF NOT EXISTS rossy_store
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE rossy_store;

-- Categorías de productos
CREATE TABLE IF NOT EXISTS categorias (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  icono VARCHAR(255) DEFAULT NULL,
  descripcion VARCHAR(255) DEFAULT NULL,
  orden SMALLINT UNSIGNED DEFAULT 0,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  creado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Productos básicos
CREATE TABLE IF NOT EXISTS productos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(80) UNIQUE,
  nombre VARCHAR(180) NOT NULL,
  descripcion TEXT DEFAULT NULL,
  categoria_id INT UNSIGNED DEFAULT NULL,
  precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  precio_original DECIMAL(10,2) DEFAULT NULL,
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  imagen_principal VARCHAR(255) DEFAULT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  creado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS producto_imagenes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  producto_id INT UNSIGNED NOT NULL,
  orden SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  ruta VARCHAR(255) NOT NULL,
  alt_text VARCHAR(180) DEFAULT NULL,
  creado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Usuarios y sesiones
CREATE TABLE IF NOT EXISTS usuarios (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(140) NOT NULL,
  apellido VARCHAR(140) DEFAULT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  password_hash VARCHAR(128) NOT NULL,
  telefono VARCHAR(30) DEFAULT NULL,
  dni VARCHAR(20) DEFAULT NULL,
  edad SMALLINT UNSIGNED DEFAULT NULL,
  pais VARCHAR(80) DEFAULT NULL,
  provincia VARCHAR(120) DEFAULT NULL,
  distrito VARCHAR(120) DEFAULT NULL,
  direccion TEXT DEFAULT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user',
  estado ENUM('activo','bloqueado') NOT NULL DEFAULT 'activo',
  verificado TINYINT(1) NOT NULL DEFAULT 0,
  ultimo_login DATETIME DEFAULT NULL,
  creado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS user_sessions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NOT NULL,
  token VARCHAR(128) NOT NULL,
  ip VARCHAR(45) DEFAULT NULL,
  user_agent VARCHAR(255) DEFAULT NULL,
  creado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expiracion DATETIME DEFAULT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  UNIQUE KEY uq_user_token (usuario_id, token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Pedidos y detalles de carrito
CREATE TABLE IF NOT EXISTS pedidos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED DEFAULT NULL,
  nombre_cliente VARCHAR(140) NOT NULL,
  email VARCHAR(180) DEFAULT NULL,
  telefono VARCHAR(40) NOT NULL,
  direccion TEXT DEFAULT NULL,
  distrito VARCHAR(120) DEFAULT NULL,
  entrega ENUM('envio','retiro') NOT NULL DEFAULT 'envio',
  pago ENUM('Yape','Plin','Transferencia','Efectivo') NOT NULL DEFAULT 'Yape',
  total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  estado ENUM('pendiente','confirmado','enviado','cancelado') NOT NULL DEFAULT 'pendiente',
  nota TEXT DEFAULT NULL,
  creado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS pedido_detalle (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT UNSIGNED NOT NULL,
  producto_id INT UNSIGNED DEFAULT NULL,
  nombre VARCHAR(180) NOT NULL,
  precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  cantidad INT UNSIGNED NOT NULL DEFAULT 1,
  subtotal DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  talla VARCHAR(60) DEFAULT NULL,
  color VARCHAR(80) DEFAULT NULL,
  creado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Auditoría e interacciones de usuarios
CREATE TABLE IF NOT EXISTS interacciones (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED DEFAULT NULL,
  tipo VARCHAR(80) NOT NULL,
  referencia VARCHAR(120) DEFAULT NULL,
  descripcion TEXT DEFAULT NULL,
  metadata JSON DEFAULT NULL,
  ip VARCHAR(45) DEFAULT NULL,
  user_agent VARCHAR(255) DEFAULT NULL,
  creado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_tipo (tipo),
  INDEX idx_creado_at (creado_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Para un administrador: vista rápida de interacciones
CREATE VIEW IF NOT EXISTS vw_admin_interacciones AS
SELECT
  i.id,
  i.usuario_id,
  u.nombre AS usuario_nombre,
  u.email AS usuario_email,
  i.tipo,
  i.referencia,
  i.descripcion,
  i.metadata,
  i.ip,
  i.user_agent,
  i.creado_at
FROM interacciones i
LEFT JOIN usuarios u ON u.id = i.usuario_id;

-- Logs de administrador
CREATE TABLE IF NOT EXISTS admin_logs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(80) NOT NULL,
  descripcion TEXT DEFAULT NULL,
  ip_address VARCHAR(45) DEFAULT NULL,
  usuario_id INT UNSIGNED DEFAULT NULL,
  creado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_tipo (tipo),
  INDEX idx_creado_at (creado_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
