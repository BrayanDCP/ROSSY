-- Tabla de logs del panel administrativo
CREATE TABLE IF NOT EXISTS admin_logs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(100) NOT NULL,
  descripcion TEXT DEFAULT NULL,
  ip_address VARCHAR(45) DEFAULT NULL,
  usuario_id INT UNSIGNED DEFAULT NULL,
  datos JSON DEFAULT NULL,
  creado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_tipo (tipo),
  INDEX idx_creado_at (creado_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Vista para ver logs del admin
CREATE VIEW IF NOT EXISTS vw_admin_logs AS
SELECT
  l.id,
  l.tipo,
  l.descripcion,
  l.ip_address,
  l.usuario_id,
  u.nombre AS usuario_nombre,
  u.email AS usuario_email,
  l.datos,
  l.creado_at
FROM admin_logs l
LEFT JOIN usuarios u ON u.id = l.usuario_id
ORDER BY l.creado_at DESC;

-- Tabla de auditoría de cambios
CREATE TABLE IF NOT EXISTS auditoria (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tabla VARCHAR(100) NOT NULL,
  accion ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
  registro_id INT UNSIGNED DEFAULT NULL,
  usuario_id INT UNSIGNED DEFAULT NULL,
  datos_anterior JSON DEFAULT NULL,
  datos_nuevo JSON DEFAULT NULL,
  ip_address VARCHAR(45) DEFAULT NULL,
  creado_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_tabla (tabla),
  INDEX idx_accion (accion),
  INDEX idx_creado_at (creado_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
