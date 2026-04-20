# 📊 Panel Administrativo R.O.S.S.Y

## ¿Cómo acceder?

### Opción 1: Directamente desde la URL
Abre tu navegador e ingresa a:
```
http://localhost/rossy/admin-panel.html
```

### Opción 2: Desde tu perfil (Si eres Admin)
1. Inicia sesión con tu cuenta admin
2. Haz clic en el icono de cuenta (👤) en la esquina superior derecha
3. Verás la opción **"📊 Panel Admin"**
4. Haz clic para acceder

---

## 📑 Secciones del Panel

### 👥 **Usuarios**
En esta hoja/pestaña puedes ver:
- **ID**: Número único de identificación
- **Nombre**: Nombre completo del usuario
- **Email**: Correo electrónico registrado
- **Teléfono**: Número de contacto
- **Rol**: Si es Usuario regular o Admin
- **Estado**: Activo o Bloqueado
- **Compras**: Total de compras realizadas
- **Registrado**: Fecha de registro
- **Acciones**: Botón para ver todas las compras del usuario

---

### 🛒 **Compras / Pedidos**
En esta hoja/pestaña puedes ver:
- **ID Pedido**: Número único del pedido
- **Cliente**: Nombre de quien compró
- **Email**: Correo del cliente
- **Teléfono**: Teléfono del cliente
- **Total**: Monto pagado (en Soles)
- **Estado**: Pendiente, Confirmado, Enviado, Cancelado
- **Entrega**: 📦 Envío o 🏪 Retiro
- **Pago**: Forma de pago (Yape, Plin, Transferencia, Efectivo)
- **Fecha**: Cuándo se realizó el pedido
- **Acciones**: Botón "Detalles" para ver todos los productos

#### Buscar y Filtrar:
- Usa la barra de búsqueda para encontrar por nombre, email o ID
- Usa el selector "Todos los estados" para filtrar por estado del pedido

---

### 📊 **Estadísticas**
En esta hoja/pestaña puedes ver:
- **Total Usuarios**: Cantidad de personas registradas
- **Total Compras**: Cantidad de pedidos realizados
- **Ingresos Totales**: Dinero total recaudado (en Soles)
- **Pedidos Confirmados**: Compras confirmadas o enviadas

---

## 🔍 Detalles de Compra

Al hacer clic en "Detalles" de una compra, verás un modal con:
- ID del pedido
- Datos del cliente (nombre, email, teléfono, dirección)
- Forma de entrega y pago
- Lista completa de productos comprados (con talla, color, cantidad)
- Total de la compra
- Estado actual del pedido

---

## 📱 Datos que se Registran

### De Usuarios:
- Nombre completo
- Email
- Teléfono
- Dirección
- Rol (Usuario o Admin)
- Estado (Activo o Bloqueado)
- Verificado (Sí/No)
- Último login
- Fecha de registro

### De Compras:
- Información del cliente
- Dirección de entrega
- Distrito
- Tipo de entrega (Envío o Retiro)
- Método de pago
- Total del pedido
- Estado del pedido
- Nota adicional (si la hay)

### De Productos en Cada Compra:
- Nombre del producto
- Talla seleccionada
- Color seleccionado
- Cantidad comprada
- Precio unitario

---

## 💾 Base de Datos

Todos los datos se guardan automáticamente en la base de datos MySQL:
- **Base de datos**: `rossy_store`
- **Tabla de usuarios**: `usuarios`
- **Tabla de pedidos**: `pedidos`
- **Tabla de detalles**: `pedido_detalle`

---

## 🔐 Seguridad

⚠️ **IMPORTANTE**:
- Solo los usuarios con rol **ADMIN** pueden acceder al panel
- Se verifica la sesión en cada solicitud
- Los datos se cargan desde la base de datos en tiempo real

---

## 🆘 Troubleshooting

### No veo el botón "Panel Admin"
- Verifica que hayas iniciado sesión
- Verifica que tu cuenta sea de tipo ADMIN en la base de datos

### No puedo acceder directo a admin-panel.html
- Necesitas estar registrado como ADMIN
- La aplicación verificará tu sesión

### Los datos no se actualizan
- Recarga la página (F5)
- Los datos se cargan automáticamente desde la base de datos

---

## 📝 Ejemplo de Uso

1. **Ver todos los usuarios**: Ve a la pestaña "👥 Usuarios"
2. **Buscar compras de un usuario**: Haz clic en "Ver compras" del usuario
3. **Ver detalles de un pedido**: Ve a "🛒 Compras" y haz clic en "Detalles"
4. **Revisar ingresos**: Ve a "📊 Estadísticas"

---

¡Listo! Ahora puedes gestionar toda tu tienda desde el panel administrativo. 🎉
