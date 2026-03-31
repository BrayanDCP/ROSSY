/* ============================================
   COMERCIAL ROSSY – app.js  (versión mejorada)
   ✅ Compra como INVITADO siempre disponible
   ✅ Login/Registro OPCIONAL (solo para historial)
   ✅ Carrito persistente en localStorage
   ✅ Conexión a PHP+MySQL real
   ✅ Fallback a datos demo si no hay backend
   ============================================ */

/* ---- Estado global ---- */
let carrito        = JSON.parse(localStorage.getItem('rossy_carrito') || '[]');
let productosTodos = [];
let usuarioActual  = null;     // null = invitado (puede comprar igual)

const WA_NUMERO = '51993304046';

/* ============================================================
   INICIALIZACIÓN
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  iniciarHeader();
  iniciarMenuMobile();
  cargarProductos();
  actualizarCarritoUI();
  iniciarFiltros();
  iniciarFormularios();
  iniciarScrollAnimaciones();
  iniciarNavLinks();
  verificarSesion();          // opcional, sin bloquear nada
});

/* ============================================================
   HEADER – efecto scroll
   ============================================================ */
function iniciarHeader() {
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   MENÚ MOBILE
   ============================================================ */
function iniciarMenuMobile() {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('navMenu');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const abierto = nav.classList.toggle('open');
    toggle.classList.toggle('open', abierto);
    document.body.style.overflow = abierto ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   NAV LINKS – active state por scroll
   ============================================================ */
function iniciarNavLinks() {
  const secciones = document.querySelectorAll('section[id]');
  const links     = document.querySelectorAll('.nav-link');

  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const lk = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (lk) lk.classList.add('active');
      }
    });
  }, { threshold: 0.35 }).observe.bind(
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const lk = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
          if (lk) lk.classList.add('active');
        }
      });
    }, { threshold: 0.35 })
  );

  // Usar un solo observer limpio
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.remove('active'));
      const lk = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (lk) lk.classList.add('active');
    });
  }, { threshold: 0.3 });

  secciones.forEach(s => obs.observe(s));
}

/* ============================================================
   VERIFICAR SESIÓN (OPCIONAL – no bloquea nada)
   ============================================================ */
async function verificarSesion() {
  try {
    const res  = await fetch('php/auth.php', { method: 'GET' });
    const data = await res.json();
    if (data.logueado && data.usuario) {
      usuarioActual = data.usuario;
      actualizarUIUsuario();
    }
  } catch (_) {
    // Sin backend o sin sesión – modo invitado, todo funciona igual
  }
}

function actualizarUIUsuario() {
  // Actualizar botón "Mi cuenta" en el footer
  const btnAuth = document.querySelector('.btn-auth-footer');
  if (btnAuth && usuarioActual) {
    btnAuth.textContent = `👤 ${usuarioActual.nombre.split(' ')[0]}`;
  }
}

/* ============================================================
   CARGAR PRODUCTOS (PHP → demo si no hay backend)
   ============================================================ */
async function cargarProductos() {
  try {
    const res = await fetch('php/productos.php?activo=1');
    if (!res.ok) throw new Error('no-backend');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('vacío');
    productosTodos = data;
  } catch (_) {
    productosTodos = obtenerProductosDemo();
  }
  renderizarProductos(productosTodos);
}

/* ---- 10 productos de demostración ---- */
function obtenerProductosDemo() {
  return [
    { id:1,  nombre:'Vestido Floral Primavera',  precio:'89.90',  precio_original:'120.00', imagen:'', talla:'S, M, L',    color:'Rosa, Blanco',    categoria:'vestidos',   badge:'oferta' },
    { id:2,  nombre:'Blusa Elegante Turquesa',   precio:'55.00',  precio_original:'',       imagen:'', talla:'XS, S, M, L',color:'Turquesa, Azul',  categoria:'blusas',     badge:'nuevo'  },
    { id:3,  nombre:'Conjunto Casual Dorado',    precio:'130.00', precio_original:'160.00', imagen:'', talla:'S, M, L, XL', color:'Dorado, Crema',   categoria:'conjuntos',  badge:'oferta' },
    { id:4,  nombre:'Vestido Noche Marina',      precio:'145.00', precio_original:'',       imagen:'', talla:'S, M, L',    color:'Azul Marino',     categoria:'vestidos',   badge:'nuevo'  },
    { id:5,  nombre:'Blusa Romántica Encaje',    precio:'68.00',  precio_original:'',       imagen:'', talla:'XS, S, M',   color:'Blanco, Crema',   categoria:'blusas',     badge:''       },
    { id:6,  nombre:'Conjunto Deportivo Chic',   precio:'110.00', precio_original:'140.00', imagen:'', talla:'S, M, L, XL', color:'Negro, Gris',     categoria:'conjuntos',  badge:'oferta' },
    { id:7,  nombre:'Collar Dorado Perlas',      precio:'35.00',  precio_original:'',       imagen:'', talla:'Única',      color:'Dorado',          categoria:'accesorios', badge:'nuevo'  },
    { id:8,  nombre:'Bolso Mini Elegante',       precio:'75.00',  precio_original:'95.00',  imagen:'', talla:'Única',      color:'Nude, Negro',     categoria:'accesorios', badge:'oferta' },
    { id:9,  nombre:'Vestido Casual Rayas',      precio:'95.00',  precio_original:'',       imagen:'', talla:'S, M, L',    color:'Azul/Blanco',     categoria:'vestidos',   badge:'nuevo'  },
    { id:10, nombre:'Blusa Off Shoulder',        precio:'72.00',  precio_original:'90.00',  imagen:'', talla:'XS, S, M, L',color:'Crema, Rosa Palo',categoria:'blusas',     badge:'oferta' },
  ];
}

/* ---- Renderizar grid de productos ---- */
function renderizarProductos(lista) {
  const grid = document.getElementById('productosGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!lista.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--gris-texto);padding:3rem 1rem">No hay productos en esta categoría.</p>';
    return;
  }

  lista.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'producto-card';
    card.style.cssText = `animation: fadeInUp 0.5s ease ${i * 0.06}s both`;

    const badge    = p.badge ? `<span class="producto-badge ${p.badge === 'nuevo' ? 'nuevo' : ''}">${p.badge === 'nuevo' ? 'Nuevo' : 'Oferta'}</span>` : '';
    const original = p.precio_original ? `<span class="original">S/ ${fmtPrecio(p.precio_original)}</span>` : '';
    const fondo    = colorFondo(p.categoria);

    card.innerHTML = `
      <div class="producto-img-wrap">
        ${p.imagen
          ? `<img src="img/${p.imagen}" alt="${esc(p.nombre)}" loading="lazy" onerror="this.parentElement.querySelector('.img-placeholder').style.display='flex';this.style.display='none'">`
          : ''
        }
        <div class="img-placeholder" style="display:${p.imagen ? 'none' : 'flex'};width:100%;height:100%;background:${fondo};align-items:center;justify-content:center;font-size:3.5rem">
          ${iconoCategoria(p.categoria)}
        </div>
        ${badge}
      </div>
      <div class="producto-body">
        <h3 class="producto-nombre">${esc(p.nombre)}</h3>
        <div class="producto-meta">
          <span>📏 ${esc(p.talla)}</span>
          <span>🎨 ${esc(p.color)}</span>
        </div>
        <p class="producto-precio">${original}S/ ${fmtPrecio(p.precio)}</p>
        <div class="producto-btns">
          <button class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">🛒 Agregar</button>
          <button class="btn btn-whatsapp" onclick="comprarWhatsApp(${p.id})" title="Comprar por WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ============================================================
   FILTROS DE CATEGORÍA
   ============================================================ */
function iniciarFiltros() {
  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filtro;
      renderizarProductos(f === 'todos' ? productosTodos : productosTodos.filter(p => p.categoria === f));
    });
  });
}

/* ============================================================
   CARRITO
   ============================================================ */
function agregarAlCarrito(id) {
  const p = productosTodos.find(x => x.id === id);
  if (!p) return;

  const existente = carrito.find(i => i.id === id);
  if (existente) {
    existente.cantidad = (existente.cantidad || 1) + 1;
  } else {
    carrito.push({ ...p, cantidad: 1 });
  }

  guardarCarrito();
  actualizarCarritoUI();
  mostrarToast(`✅ "${p.nombre}" agregado al carrito`);

  // Animación en el botón del nav
  const contador = document.getElementById('carritoCount');
  if (contador) {
    contador.style.transform = 'scale(1.4)';
    setTimeout(() => contador.style.transform = '', 300);
  }
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(i => i.id !== id);
  guardarCarrito();
  actualizarCarritoUI();
  mostrarToast('🗑 Producto eliminado');
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;
  item.cantidad = Math.max(1, (item.cantidad || 1) + delta);
  guardarCarrito();
  actualizarCarritoUI();
}

function limpiarCarrito() {
  if (!carrito.length) return;
  carrito = [];
  guardarCarrito();
  actualizarCarritoUI();
  mostrarToast('🗑 Carrito vaciado');
}

function guardarCarrito() {
  localStorage.setItem('rossy_carrito', JSON.stringify(carrito));
}

/* ---- Actualizar toda la UI del carrito ---- */
function actualizarCarritoUI() {
  const lista   = document.getElementById('carritoLista');
  const resumen = document.getElementById('carritoResumen');
  const cont    = document.getElementById('carritoCount');
  if (!lista) return;

  const totalItems = carrito.reduce((s, i) => s + (i.cantidad || 1), 0);
  if (cont) cont.textContent = totalItems;

  if (!carrito.length) {
    lista.innerHTML = `
      <div class="carrito-vacio">
        <span>🛍️</span>
        <p>Tu carrito está vacío</p>
        <a href="#tienda" class="btn btn-primary">Ver productos</a>
      </div>`;
    if (resumen) resumen.style.display = 'none';
    return;
  }

  if (resumen) resumen.style.display = 'block';

  lista.innerHTML = carrito.map(item => `
    <div class="item-carrito" id="item-${item.id}">
      <div style="width:70px;height:70px;border-radius:8px;background:${colorFondo(item.categoria)};display:flex;align-items:center;justify-content:center;font-size:1.8rem;flex-shrink:0">
        ${iconoCategoria(item.categoria)}
      </div>
      <div class="item-info">
        <p class="item-nombre">${esc(item.nombre)}</p>
        <p class="item-meta">📏 ${esc(item.talla)} · 🎨 ${esc(item.color)}</p>
        <div class="item-cantidad">
          <button class="btn-cant" onclick="cambiarCantidad(${item.id}, -1)">−</button>
          <span>${item.cantidad || 1}</span>
          <button class="btn-cant" onclick="cambiarCantidad(${item.id}, 1)">+</button>
          <span class="item-precio">S/ ${fmtPrecio(parseFloat(item.precio) * (item.cantidad || 1))}</span>
        </div>
      </div>
      <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})" title="Eliminar">✕</button>
    </div>`
  ).join('');

  const total = calcularTotal();
  const stEl  = document.getElementById('subtotal');
  const ttEl  = document.getElementById('totalCarrito');
  if (stEl) stEl.textContent = `S/ ${fmtPrecio(total)}`;
  if (ttEl) ttEl.textContent = `S/ ${fmtPrecio(total)}`;

  actualizarBtnWACarrito();
}

function calcularTotal() {
  return carrito.reduce((s, i) => s + parseFloat(i.precio) * (i.cantidad || 1), 0);
}

/* ---- Generar mensaje WhatsApp del carrito completo ---- */
function generarMensajeCarrito(extras = {}) {
  const lineas = carrito.map(i =>
    `• ${i.nombre} (Talla: ${i.talla} | Color: ${i.color}) ×${i.cantidad || 1} = S/ ${fmtPrecio(parseFloat(i.precio) * (i.cantidad || 1))}`
  ).join('\n');
  const total = calcularTotal();
  let msg = `🛍️ *Pedido – Comercial Rossy*\n\n${lineas}\n\n💰 *Total: S/ ${fmtPrecio(total)}*`;
  if (extras.nombre)    msg += `\n\n👤 *Cliente:* ${extras.nombre}`;
  if (extras.telefono)  msg += `\n📱 *Teléfono:* ${extras.telefono}`;
  if (extras.direccion) msg += `\n📍 *Dirección:* ${extras.direccion}`;
  if (extras.pago)      msg += `\n💳 *Pago:* ${extras.pago}`;
  if (extras.nota)      msg += `\n📝 *Nota:* ${extras.nota}`;
  msg += `\n\n¿Pueden confirmar mi pedido? ¡Gracias! 🌸`;
  return msg;
}

function actualizarBtnWACarrito() {
  const btn = document.getElementById('btnWhatsappCarrito');
  if (!btn) return;
  btn.href = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(generarMensajeCarrito())}`;
}

/* ---- Comprar producto individual directo por WA ---- */
function comprarWhatsApp(id) {
  const p = productosTodos.find(x => x.id === id);
  if (!p) return;
  const msg = `Hola Comercial Rossy 👗\n\nMe interesa este producto:\n• *${p.nombre}*\n• Precio: S/ ${fmtPrecio(p.precio)}\n• Tallas: ${p.talla}\n• Colores: ${p.color}\n\n¿Tienen disponibilidad? 😊`;
  window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ============================================================
   CHECKOUT
   COMPRA LIBRE – no requiere login
   ============================================================ */
function mostrarCheckout() {
  if (!carrito.length) {
    mostrarToast('⚠️ El carrito está vacío', 'error');
    return;
  }
  const sec = document.getElementById('checkout');
  if (!sec) return;
  sec.style.display = 'block';

  // Pre-rellenar nombre si hay sesión
  if (usuarioActual) {
    const campo = document.getElementById('chkNombre');
    if (campo && !campo.value) campo.value = usuarioActual.nombre;
  }

  // Mostrar detalle en el panel lateral
  const det   = document.getElementById('checkoutDetalle');
  const totEl = document.getElementById('checkoutTotal');
  if (det) {
    det.innerHTML = carrito.map(i => `
      <div class="item-det">
        <span>${esc(i.nombre)} ×${i.cantidad || 1}</span>
        <span>S/ ${fmtPrecio(parseFloat(i.precio) * (i.cantidad || 1))}</span>
      </div>`).join('');
  }
  if (totEl) totEl.textContent = `S/ ${fmtPrecio(calcularTotal())}`;

  sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ocultarCheckout() {
  const sec = document.getElementById('checkout');
  if (sec) sec.style.display = 'none';
  document.getElementById('carrito')?.scrollIntoView({ behavior: 'smooth' });
}

/* ============================================================
   FORMULARIOS
   ============================================================ */
function iniciarFormularios() {
  /* ---- Checkout: enviar pedido ---- */
  document.getElementById('formCheckout')?.addEventListener('submit', async e => {
    e.preventDefault();
    const nombre    = document.getElementById('chkNombre')?.value.trim()    || '';
    const telefono  = document.getElementById('chkTelefono')?.value.trim()  || '';
    const direccion = document.getElementById('chkDireccion')?.value.trim() || '';
    const pago      = document.querySelector('input[name="pago"]:checked')?.value || 'yape';
    const nota      = document.getElementById('chkNota')?.value.trim()      || '';

    if (!nombre || !telefono || !direccion) {
      mostrarToast('⚠️ Completa nombre, teléfono y dirección', 'error');
      return;
    }

    const extras = { nombre, telefono, direccion, pago, nota };

    // 1) Guardar en base de datos (en segundo plano, sin bloquear)
    guardarPedidoBD(extras);

    // 2) Abrir WhatsApp con el pedido (acción principal)
    const msg = generarMensajeCarrito(extras);
    window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');

    mostrarToast('✅ ¡Pedido enviado! Redirigiendo a WhatsApp...', 'exito');
    setTimeout(() => { limpiarCarrito(); ocultarCheckout(); }, 1800);
  });

  /* ---- Contacto ---- */
  document.getElementById('formContacto')?.addEventListener('submit', e => {
    e.preventDefault();
    const nombre   = document.getElementById('ctcNombre')?.value.trim()   || '';
    const telefono = document.getElementById('ctcTelefono')?.value.trim() || '';
    const mensaje  = document.getElementById('ctcMensaje')?.value.trim()  || '';
    if (!mensaje) return;
    const txt = `Hola Comercial Rossy 👋\n\nSoy *${nombre || 'una clienta'}*${telefono ? ` (${telefono})` : ''}.\n\n${mensaje}`;
    window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(txt)}`, '_blank');
    e.target.reset();
    mostrarToast('✅ ¡Abriendo WhatsApp!', 'exito');
  });

  /* ---- Login ---- */
  document.getElementById('formLogin')?.addEventListener('submit', async e => {
    e.preventDefault();
    const correo = document.getElementById('loginCorreo')?.value.trim() || '';
    const pass   = document.getElementById('loginPass')?.value          || '';
    await autenticar('login', { correo, pass });
  });

  /* ---- Registro ---- */
  document.getElementById('formRegistro')?.addEventListener('submit', async e => {
    e.preventDefault();
    const nombre = document.getElementById('regNombre')?.value.trim()  || '';
    const correo = document.getElementById('regCorreo')?.value.trim()  || '';
    const pass   = document.getElementById('regPass')?.value           || '';
    await autenticar('registro', { nombre, correo, pass });
  });
}

/* ---- Guardar pedido en BD (silencioso, no bloquea) ---- */
async function guardarPedidoBD(extras) {
  try {
    const body = {
      ...extras,
      productos: carrito,
      total: calcularTotal(),
      usuario_id: usuarioActual?.id || null,
    };
    await fetch('php/pedidos.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (_) { /* sin backend – la compra va igual por WhatsApp */ }
}

/* ---- Autenticar (login / registro) ---- */
async function autenticar(accion, datos) {
  const btnEl = document.querySelector(`#form${accion === 'login' ? 'Login' : 'Registro'} button[type="submit"]`);
  if (btnEl) { btnEl.disabled = true; btnEl.textContent = 'Procesando...'; }

  try {
    const res  = await fetch('php/auth.php', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ accion, ...datos }),
    });
    const data = await res.json();

    if (data.ok) {
      usuarioActual = data.usuario;
      actualizarUIUsuario();
      mostrarToast(data.mensaje || '✅ ¡Bienvenida!', 'exito');
      cerrarModal();
    } else {
      mostrarToast(data.error || '⚠️ Ocurrió un error', 'error');
    }
  } catch (_) {
    mostrarToast('⚠️ Sin conexión al servidor. Puedes comprar sin cuenta.', 'error');
  } finally {
    if (btnEl) {
      btnEl.disabled    = false;
      btnEl.textContent = accion === 'login' ? 'Ingresar' : 'Registrarme';
    }
  }
}

/* ============================================================
   MODAL AUTENTICACIÓN (COMPLETAMENTE OPCIONAL)
   ============================================================ */
function abrirModal() {
  const modal = document.getElementById('modalAuth');
  if (!modal) return;

  // Si ya tiene sesión, mostrar info de la cuenta
  if (usuarioActual) {
    mostrarToast(`👤 Sesión activa: ${usuarioActual.nombre}`);
    return;
  }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  const modal = document.getElementById('modalAuth');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function cambiarTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.style.display = 'none');
  document.querySelector(`.tab-btn[onclick="cambiarTab('${tab}')"]`)?.classList.add('active');
  document.getElementById(tab === 'login' ? 'formLogin' : 'formRegistro').style.display = 'block';
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', e => {
  if (e.target?.id === 'modalAuth') cerrarModal();
});

/* ============================================================
   TOAST
   ============================================================ */
let _toastTimer;
function mostrarToast(msg, tipo = '') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className   = `toast show ${tipo}`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.className = 'toast', 3400);
}

/* ============================================================
   ANIMACIONES SCROLL
   ============================================================ */
function iniciarScrollAnimaciones() {
  const selectores = '.pago-card, .testimonio-card, .envio-item, .cat-card, .contacto-item, .producto-card';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.animation = 'fadeInUp 0.55s ease both';
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(selectores).forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    obs.observe(el);
  });
}

/* ============================================================
   UTILIDADES
   ============================================================ */
function fmtPrecio(n) {
  return parseFloat(n).toFixed(2);
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

function colorFondo(cat) {
  return {
    vestidos:   'linear-gradient(135deg,#c9a36a22,#4ecdc433)',
    blusas:     'linear-gradient(135deg,#4ecdc433,#0a1f4422)',
    conjuntos:  'linear-gradient(135deg,#0a1f4433,#c9a36a22)',
    accesorios: 'linear-gradient(135deg,#c9a36a22,#4ecdc422)',
  }[cat] || 'linear-gradient(135deg,#f0ebe4,#e5ddd5)';
}

function iconoCategoria(cat) {
  return { vestidos:'👗', blusas:'👚', conjuntos:'🩱', accesorios:'👜' }[cat] || '🌸';
}