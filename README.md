# 🛍️ ROSSY - Tienda Online de Moda

Tienda online premium para mujeres con sistema administrativo completo.

## � Instalación y Configuración

### Prerrequisitos
- **XAMPP** (o similar) con Apache y MySQL activados
- Navegador web moderno

### Pasos de Instalación

1. **Clona o descarga** este proyecto en `C:\xampp\htdocs\rossy\` (o tu directorio web)

2. **Inicia XAMPP**:
   - Abre XAMPP Control Panel
   - Inicia Apache y MySQL

3. **Configura la Base de Datos**:
   - Abre phpMyAdmin: `http://localhost/phpmyadmin`
   - Crea la base de datos ejecutando los archivos SQL en orden:
     - `sql/rossy_schema.sql` (estructura)
     - `sql/rossy_seed.sql` (datos de ejemplo)
   
   **O usa el script automático**:
   - Ejecuta `init_db.bat` como administrador
   - Ingresa la contraseña de root de MySQL (por defecto vacía)

4. **Accede a la tienda**:
   - Abre `http://localhost/rossy/` en tu navegador

### Credenciales de Prueba
- **Admin**: admin@rossy.pe / Admin2026!
- **Usuario**: cliente@rossy.pe / Cliente2026!

---

## �📋 Características

✅ Catálogo de productos con filtros
✅ Carrito de compra y checkout
✅ Registro e inicio de sesión opcional
✅ Perfil de usuario editable
✅ **Panel Administrativo con 3 pestañas**:
   - 👥 Ver usuarios y sus contraseñas
   - 🛒 Ver todas las compras realizadas
   - 📊 Estadísticas del negocio

---

## 🔑 Acceso al Panel Admin

### Para Acceder al Panel Administrativo:

**URL Directa:**
```
admin-panel.html
```

**O desde tu perfil** (si eres admin):
1. Haz clic en tu cuenta (👤)
2. Selecciona "📊 Panel Admin"

---

## 📑 Las 3 Hojas (Pestañas) del Panel Admin

### 1️⃣ **👥 USUARIOS** 
Ver todos los clientes registrados con:
- Nombre y email
- Teléfono
- Total de compras
- Fecha de registro
- Estado (Activo/Bloqueado)
- Rol (Usuario/Admin)

👉 **Acción**: Haz clic en "Ver compras" para ver todos los pedidos de ese usuario

---

### 2️⃣ **🛒 COMPRAS**
Ver todos los pedidos realizados con:
- Número de pedido
- Nombre y email del cliente
- Total pagado
- Estado (Pendiente/Confirmado/Enviado/Cancelado)
- Tipo de entrega (Envío/Retiro)
- Método de pago
- Fecha del pedido

**Buscar**: Usa la barra de búsqueda para filtrar por nombre, email o ID
**Filtrar**: Selecciona un estado para ver solo esos pedidos

👉 **Acción**: Haz clic en "Detalles" para ver los productos específicos de esa compra

---

### 3️⃣ **📊 ESTADÍSTICAS**
Ver un resumen del negocio:
- Total de usuarios registrados
- Total de compras realizadas
- Ingresos totales (en Soles)
- Pedidos confirmados o enviados

---

## 📊 Modal de Detalles

Al hacer clic en "Detalles" de una compra, verás:
- Todos los datos del pedido
- Nombre y contacto del cliente
- Lista de productos comprados (talla, color, cantidad, precio)
- Total final

---

## 🗂️ Estructura de Carpetas

```
rossy/
├── index.html              # Página principal de la tienda
├── admin-panel.html        # Panel administrativo
├── ADMIN_GUIDE.md          # Guía de uso del panel admin
├── css/
│   ├── styles.css          # Estilos de la tienda
│   └── admin-styles.css    # Estilos del panel admin
├── js/
│   ├── app.js              # Lógica de la tienda
│   └── admin-panel.js      # Lógica del panel admin
├── php/
│   ├── conexion.php        # Conexión a BD
│   ├── auth.php            # Funciones de autenticación
│   ├── login.php           # Endpoint de login
│   ├── register.php        # Endpoint de registro
│   ├── logout.php          # Endpoint de logout
│   ├── profile.php         # Endpoint para editar perfil
│   ├── session.php         # Endpoint de sesión
│   ├── admin-users.php     # Endpoint: listar usuarios
│   ├── admin-orders.php    # Endpoint: listar compras
│   └── admin-order-detail.php  # Endpoint: detalles de compra
├── sql/
│   ├── rossy_schema.sql    # Estructura de BD
│   ├── rossy_seed.sql      # Datos iniciales
│   └── rossy_admin_queries.sql # Queries útiles
└── img/                    # Imágenes de productos
```

---

## 🚀 Primeros Pasos

1. **Instala MySQL** y crea la base de datos
2. **Importa el SQL** desde `sql/rossy_schema.sql`
3. **Coloca los archivos** en tu servidor web
4. **Accede** a `index.html` en tu navegador

---

## 💻 Tecnologías

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP con PDO
- **Base de Datos**: MySQL
- **Responsive**: Adaptado para móvil, tablet y desktop

---

## 📞 Panel Admin - Funcionalidades

### Vista de Usuarios
Aquí ves **TODOS los usuarios registrados**:
- ID único
- Nombre completo
- Email
- Teléfono
- Rol (Usuario/Admin)
- Estado
- **Cantidad de compras** (automático)
- Fecha de registro
- Botón para ver sus compras

### Vista de Compras
Aquí ves **TODOS los pedidos del sistema**:
- Buscar por nombre, email o ID
- Filtrar por estado
- Ver todos los detalles de cada pedido
- Información de entrega
- Forma de pago

### Vista de Estadísticas
Resumen en tiempo real:
- Usuarios activos
- Ingresos totales
- Pedidos confirmados

---

## 🔒 Seguridad

✅ Verifica que eres ADMIN antes de acceder
✅ Sesión segura con cookies
✅ Contraseñas hasheadas
✅ Datos desde la base de datos en tiempo real

---

## 📚 Más Información

Para más detalles sobre el panel administrativo, lee: [ADMIN_GUIDE.md](ADMIN_GUIDE.md)

---

**R.O.S.S.Y © 2026 - Moda para Mujeres Reales** 👗✨
