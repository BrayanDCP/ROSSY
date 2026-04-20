/* ============================================
   ADMIN PANEL - admin-panel.js
   ============================================ */

let usuariosData = [];
let comprasData = [];

/* ============================================================
   INICIALIZACIÓN
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  cargarUsuarios();
  cargarCompras();
  
  // Listeners para filtros
  document.getElementById('filtroCompras')?.addEventListener('input', filtrarCompras);
  document.getElementById('filtroEstado')?.addEventListener('change', filtrarCompras);
});

/* ============================================================
   CAMBIAR TAB
   ============================================================ */
function cambiarTab(tabName) {
  // Ocultar todos los tabs
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Mostrar el tab seleccionado
  const tabElement = document.getElementById(`tab-${tabName}`);
  if (tabElement) {
    tabElement.classList.add('active');
  }

  // Actualizar botones de navegación
  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
    }
  });

  // Cargar datos según la pestaña
  if (tabName === 'estadisticas') {
    calcularEstadisticas();
  }
}

/* ============================================================
   CARGAR USUARIOS
   ============================================================ */
async function cargarUsuarios() {
  try {
    const res = await fetch('php/admin-users.php');
    const json = await res.json();
    
    if (json.success) {
      usuariosData = json.usuarios || [];
      renderizarUsuarios();
    } else {
      mostrarError('No se pudieron cargar los usuarios: ' + (json.error || 'Error desconocido'));
      renderizarUsuariosVacio('Error al cargar usuarios');
    }
  } catch (error) {
    mostrarError('Error de conexión al cargar usuarios');
    renderizarUsuariosVacio('Error de conexión');
  }
}

function renderizarUsuariosVacio(mensaje) {
  const tbody = document.getElementById('usuariosTableBody');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:2rem;color:#999">${mensaje}</td></tr>`;
}

function renderizarUsuarios() {
  const tbody = document.getElementById('usuariosTableBody');
  if (!tbody) return;

  if (usuariosData.length === 0) {
    renderizarUsuariosVacio('No hay usuarios registrados');
    return;
  }

  tbody.innerHTML = usuariosData.map(user => `
    <tr>
      <td><strong>#${user.id}</strong></td>
      <td>${esc(user.nombre)}</td>
      <td>${esc(user.email)}</td>
      <td>${user.telefono || '-'}</td>
      <td>
        <span class="badge ${user.role}">
          ${user.role === 'admin' ? '👑 Admin' : 'Usuario'}
        </span>
      </td>
      <td>
        <span class="badge ${user.estado}">
          ${user.estado === 'activo' ? '✓ Activo' : '✕ Bloqueado'}
        </span>
      </td>
      <td><strong>${user.total_compras}</strong></td>
      <td>${formatearFecha(user.creado_at)}</td>
      <td>
        <button class="btn btn-sm btn-view" onclick="verComprasDelUsuario(${user.id}, '${esc(user.nombre)}')">
          Ver compras
        </button>
      </td>
    </tr>
  `).join('');
}
}

/* ============================================================
   CARGAR COMPRAS
   ============================================================ */
async function cargarCompras() {
  try {
    const res = await fetch('php/admin-orders.php');
    const json = await res.json();
    
    if (json.success) {
      comprasData = json.pedidos || [];
      renderizarCompras(comprasData);
    } else {
      mostrarError('No se pudieron cargar las compras: ' + (json.error || 'Error desconocido'));
      renderizarComprasVacio('Error al cargar compras');
    }
  } catch (error) {
    mostrarError('Error de conexión al cargar compras');
    renderizarComprasVacio('Error de conexión');
  }
}

function renderizarComprasVacio(mensaje) {
  const tbody = document.getElementById('comprasTableBody');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:2rem;color:#999">${mensaje}</td></tr>`;
}

function renderizarCompras(lista = comprasData) {
  const tbody = document.getElementById('comprasTableBody');
  if (!tbody) return;

  if (lista.length === 0) {
    renderizarComprasVacio('No hay compras registradas');
    return;
  }

  tbody.innerHTML = lista.map(pedido => `
    <tr>
      <td><strong>#${pedido.id}</strong></td>
      <td>${esc(pedido.nombre_cliente)}</td>
      <td>${esc(pedido.email || '-')}</td>
      <td>${pedido.telefono}</td>
      <td><strong>S/ ${formatearPrecio(pedido.total)}</strong></td>
      <td>
        <span class="badge ${pedido.estado}">
          ${estadoLabel(pedido.estado)}
        </span>
      </td>
      <td>${pedido.entrega === 'envio' ? '📦 Envío' : '🏪 Retiro'}</td>
      <td>${pedido.pago}</td>
      <td>${formatearFecha(pedido.creado_at)}</td>
      <td>
        <button class="btn btn-sm btn-view" onclick="verDetallesCompra(${pedido.id})">
          Detalles
        </button>
      </td>
    </tr>
  `).join('');
}

function filtrarCompras() {
  const filtro = document.getElementById('filtroCompras')?.value.toLowerCase() || '';
  const estado = document.getElementById('filtroEstado')?.value || '';

  const filtrada = comprasData.filter(p => {
    const coincideTexto = !filtro || 
      p.nombre_cliente.toLowerCase().includes(filtro) ||
      p.email?.toLowerCase().includes(filtro) ||
      p.id.toString().includes(filtro);
    
    const coincideEstado = !estado || p.estado === estado;
    
    return coincideTexto && coincideEstado;
  });

  renderizarCompras(filtrada);
}

/* ============================================================
   VER DETALLES DE COMPRA (MODAL)
   ============================================================ */
async function verDetallesCompra(pedidoId) {
  const pedido = comprasData.find(p => p.id === pedidoId);
  if (!pedido) return;

  const modal = document.getElementById('modalCompra');
  const body = document.getElementById('modalCompraBody');
  
  if (!modal || !body) return;

  try {
    const res = await fetch(`php/admin-order-detail.php?pedido_id=${pedidoId}`);
    const json = await res.json();
    
    if (json.success) {
      const detalle = json.detalle || [];
      
      body.innerHTML = `
        <div class="detail-row">
          <div class="detail-label">ID Pedido</div>
          <div class="detail-value">#${pedido.id}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Cliente</div>
          <div class="detail-value">${esc(pedido.nombre_cliente)}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Email</div>
          <div class="detail-value">${esc(pedido.email || '-')}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Teléfono</div>
          <div class="detail-value">${pedido.telefono}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Dirección</div>
          <div class="detail-value">${esc(pedido.direccion || '-')}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Distrito</div>
          <div class="detail-value">${pedido.distrito || '-'}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Entrega</div>
          <div class="detail-value">${pedido.entrega === 'envio' ? '📦 Envío' : '🏪 Retiro'}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Forma de pago</div>
          <div class="detail-value">${pedido.pago}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Total</div>
          <div class="detail-value"><strong>S/ ${formatearPrecio(pedido.total)}</strong></div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Estado</div>
          <div class="detail-value">
            <span class="badge ${pedido.estado}">${estadoLabel(pedido.estado)}</span>
          </div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Fecha</div>
          <div class="detail-value">${formatearFecha(pedido.creado_at)}</div>
        </div>
        ${pedido.nota ? `
          <div class="detail-row">
            <div class="detail-label">Nota</div>
            <div class="detail-value">${esc(pedido.nota)}</div>
          </div>
        ` : ''}
        
        ${detalle.length > 0 ? `
          <div style="margin-top:1.5rem;border-top:2px solid rgba(102,56,53,0.1);padding-top:1rem;">
            <h4 style="color:#664038;margin-bottom:0.75rem">Productos</h4>
            ${detalle.map(item => `
              <div style="padding:0.5rem 0;border-bottom:1px solid rgba(102,56,53,0.1)">
                <div><strong>${esc(item.nombre)}</strong></div>
                <div style="font-size:0.85rem;color:#999;">
                  Talla: ${item.talla || '-'} | Color: ${item.color || '-'} | Cantidad: ${item.cantidad}
                </div>
                <div style="color:#664038;font-weight:600">S/ ${formatearPrecio(item.precio_unitario)}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      `;
      
      modal.classList.add('active');
    }
  } catch (error) {
    mostrarError('Error al cargar detalles del pedido');
  }
}

function cerrarModalCompra() {
  const modal = document.getElementById('modalCompra');
  if (modal) {
    modal.classList.remove('active');
  }
}

/* ============================================================
   VER COMPRAS DE UN USUARIO
   ============================================================ */
async function verComprasDelUsuario(usuarioId, usuarioNombre) {
  try {
    const res = await fetch(`php/admin-orders.php?usuario_id=${usuarioId}`);
    const json = await res.json();
    
    if (json.success) {
      const comprasUsuario = json.pedidos || [];
      const modal = document.getElementById('modalCompra');
      const body = document.getElementById('modalCompraBody');
      
      if (!modal || !body) return;
      
      body.innerHTML = `
        <h4 style="color:#664038;margin-bottom:1rem">Compras de ${esc(usuarioNombre)}</h4>
        ${comprasUsuario.length === 0 
          ? '<p style="color:#999;text-align:center">Este usuario no tiene compras aún</p>'
          : `
            <div style="max-height:500px;overflow-y:auto">
              ${comprasUsuario.map(p => `
                <div style="padding:1rem;border:1px solid rgba(102,56,53,0.1);border-radius:8px;margin-bottom:0.75rem">
                  <div style="display:flex;justify-content:space-between;align-items:start">
                    <div>
                      <div><strong>Pedido #${p.id}</strong></div>
                      <div style="font-size:0.85rem;color:#999">${formatearFecha(p.creado_at)}</div>
                    </div>
                    <span class="badge ${p.estado}">${estadoLabel(p.estado)}</span>
                  </div>
                  <div style="margin-top:0.5rem;color:#664038;font-weight:600">
                    Total: S/ ${formatearPrecio(p.total)}
                  </div>
                </div>
              `).join('')}
            </div>
          `
        }
      `;
      
      modal.classList.add('active');
    }
  } catch (error) {
    mostrarError('Error al cargar compras del usuario');
  }
}

/* ============================================================
   ESTADÍSTICAS
   ============================================================ */
function calcularEstadisticas() {
  if (usuariosData.length === 0 || comprasData.length === 0) {
    return;
  }

  const totalUsuarios = usuariosData.length;
  const totalCompras = comprasData.length;
  const ingresosTotales = comprasData.reduce((sum, p) => sum + parseFloat(p.total || 0), 0);
  const comprasConfirmadas = comprasData.filter(p => p.estado === 'confirmado' || p.estado === 'enviado').length;

  document.getElementById('statUsuarios').textContent = totalUsuarios;
  document.getElementById('statCompras').textContent = totalCompras;
  document.getElementById('statIngresos').textContent = `S/ ${formatearPrecio(ingresosTotales)}`;
  document.getElementById('statConfirmados').textContent = comprasConfirmadas;
}

/* ============================================================
   LOGOUT
   ============================================================ */
async function handleAdminLogout() {
  try {
    const res = await fetch('php/logout.php');
    const json = await res.json();
    window.location.href = 'index.html';
  } catch (_) {
    mostrarError('Error al cerrar sesión');
  }
}

/* ============================================================
   UTILIDADES
   ============================================================ */
function formatearFecha(fecha) {
  if (!fecha) return '-';
  const date = new Date(fecha);
  return date.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatearPrecio(precio) {
  if (!precio) return '0.00';
  return parseFloat(precio).toFixed(2).replace('.', ',');
}

function esc(texto) {
  if (!texto) return '';
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function estadoLabel(estado) {
  const labels = {
    'pendiente': '⏳ Pendiente',
    'confirmado': '✓ Confirmado',
    'enviado': '📦 Enviado',
    'cancelado': '✕ Cancelado',
    'activo': '✓ Activo',
    'bloqueado': '✕ Bloqueado'
  };
  return labels[estado] || estado;
}

function mostrarError(msg) {
  console.error(msg);
  // En lugar de alert, mostrar mensaje en la UI
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = `<strong>Error:</strong> ${msg}`;
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ff4444;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    max-width: 400px;
  `;
  document.body.appendChild(errorDiv);
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 5000); // Desaparece en 5 segundos
}

// Cerrar modal al hacer click fuera
window.addEventListener('click', (e) => {
  const modal = document.getElementById('modalCompra');
  if (e.target === modal) {
    cerrarModalCompra();
  }
});
