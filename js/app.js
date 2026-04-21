/* ============================================
   R.O.S.S.Y – app.js
   ✅ Modal producto con galería deslizable
   ✅ Selector de talla y color
   ✅ Resumen de compra actualizado en tiempo real
   ✅ Carrito con detalle de talla/color elegidos
   ✅ Checkout completo → WhatsApp
   ============================================ */

/* ---- Estado global ---- */
let carrito        = JSON.parse(localStorage.getItem('rossy_carrito') || '[]');
let productosTodos = [];

/* Producto activo en modal */
let modalProductoActual = null;
let modalImagenes       = [];
let modalImgIndex       = 0;
let modalTallaSeleccionada = '';
let modalColorSeleccionado = '';

const WA_NUMERO = '51993304046';

/* ============================================================
   COLORES PREDEFINIDOS (para botones de color visualmente bonitos)
   ============================================================ */
const MAPA_COLORES = {
  'rosa':       '#E1999F',
  'rosado':     '#E1999F',
  'rosewater':  '#E1999F',
  'blanco':     '#FFFFFF',
  'crema':      '#F9E1E0',
  'ivory':      '#F9E1E0',
  'negro':      '#1a1a1a',
  'azul':       '#4a7bb5',
  'azul marino':'#0a1f44',
  'turquesa':   '#4ecdc4',
  'dorado':     '#c9a36a',
  'gris':       '#9e9e9e',
  'nude':       '#e8c9a0',
  'beige':      '#e8d5b7',
  'verde':      '#6aab6a',
  'rojo':       '#c94a4a',
  'lila':       '#b49fc8',
  'morado':     '#7a4f8a',
  'naranja':    '#e8944a',
  'celeste':    '#87ceeb',
  'azul/blanco':'linear-gradient(135deg,#4a7bb5 50%,#FFFFFF 50%)',
  'rosa palo':  '#DEB3AD',
  'dusty rose': '#DEB3AD',
};

function getColorCSS(nombre) {
  const key = nombre.toLowerCase().trim();
  for (const k in MAPA_COLORES) {
    if (key.includes(k)) return MAPA_COLORES[k];
  }
  return '#DEB3AD'; // dusty rose como fallback
}

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
});

/* ============================================================
   HEADER – efecto scroll
   ============================================================ */
function iniciarHeader() {
  const header = document.getElementById('header');
  if (!header) return;
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
   CARGAR PRODUCTOS
   ============================================================ */
async function cargarProductos() {
  try {
    const res = await fetch('php/productos.php?activo=1');
    if (!res.ok) throw new Error('no-backend');
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) throw new Error('vacío');
    productosTodos = data;
  } catch (_) {
    productosTodos = obtenerProductosDemo();
  }
  renderizarProductos(productosTodos);
}

function obtenerProductosDemo() {
  const preciosDemo = [
    35.90, 35.90, 35.90, 35.90, 35.90, 119.90, 179.90, 154.90, 139.90, 149.90,
    99.90, 109.90, 124.90, 114.90, 129.90, 139.90, 149.90, 132.90, 142.90, 119.90,
    179.90, 159.90, 169.90, 149.90, 139.90, 129.90, 124.90, 134.90, 144.90, 154.90,
    129.90, 119.90, 139.90, 149.90, 169.90, 159.90, 179.90, 189.90, 199.90
  ];

  const productos = [];
  for (let i = 1; i <= 39; i++) {
    let categoria;
    if (i <= 10) categoria = 'Casaca Jean';
    else if (i <= 20) categoria = 'blusas';
    else if (i <= 30) categoria = 'conjuntos';
    else categoria = 'Chompa';

    productos.push({
      id: i,
      nombre: `Prenda ${i}`,
      precio: preciosDemo[i - 1],
      precio_original: '',
      imagenes: [`imagen${i}.jpeg`],
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Rosa', 'Blanco', 'Negro'],
      categoria: categoria,
      badge: '',
      descripcion: `Descripción de la prenda ${i}.`
    });
  }
  return productos;
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

    const imgs     = normalizarImagenes(p);
    const imgPrin  = imgs[0];
    const badge    = p.badge ? `<span class="producto-badge ${p.badge === 'nuevo' ? 'nuevo' : ''}">${p.badge === 'nuevo' ? 'Nuevo' : 'Oferta'}</span>` : '';
    const original = p.precio_original ? `<span class="original">S/ ${fmtPrecio(p.precio_original)}</span>` : '';
    const tallas   = normalizarArray(p.tallas || p.talla).slice(0,4).join(', ');
    const colores  = normalizarArray(p.colores || p.color).slice(0,3).join(', ');

    card.innerHTML = `
      <div class="producto-img-wrap">
        ${imgPrin
          ? `<img src="img/${imgPrin}" alt="${esc(p.nombre)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''
        }
        <div class="img-placeholder" style="display:${imgPrin ? 'none' : 'flex'};width:100%;height:100%;background:linear-gradient(135deg,var(--ivory) 0%,var(--dusty-rose) 100%);align-items:center;justify-content:center;font-size:3.5rem;opacity:0.7">
          <img src="${iconoCategoria(p.categoria)}" alt="${p.categoria}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">
        </div>
        ${badge}
      </div>
      <div class="producto-body">
        <span class="producto-categoria">${esc(p.categoria)}</span>
        <h3 class="producto-nombre">${esc(p.nombre)}</h3>
        <div class="producto-meta">
          <span>📏 ${esc(tallas)}</span>
          <span>🎨 ${esc(colores)}</span>
        </div>
        <p class="producto-precio">${original}S/ ${fmtPrecio(p.precio)}</p>
        <div class="producto-btns">
          <button class="btn btn-primary" onclick="event.stopPropagation();abrirModalProducto(${p.id})">
            Ver producto
          </button>
          <button class="btn btn-outline" onclick="event.stopPropagation();comprarWhatsApp(${p.id})" title="Comprar por WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </button>
        </div>
      </div>`;

    // Click en card abre el modal
    card.addEventListener('click', () => abrirModalProducto(p.id));
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
   MODAL PRODUCTO – galería + selección de talla y color
   ============================================================ */
function abrirModalProducto(id) {
  const p = productosTodos.find(x => x.id === id);
  if (!p) return;

  modalProductoActual     = p;
  modalTallaSeleccionada  = '';
  modalColorSeleccionado  = '';
  modalImagenes           = normalizarImagenes(p);
  modalImgIndex           = 0;

  const modal = document.getElementById('modalProducto');
  if (!modal) return;

  // Badge
  const badgeEl = document.getElementById('modalBadge');
  if (p.badge) {
    badgeEl.textContent = p.badge === 'nuevo' ? 'Nuevo' : 'Oferta';
    badgeEl.className   = 'modal-badge' + (p.badge === 'nuevo' ? ' nuevo' : '');
    badgeEl.style.display = 'inline-block';
  } else {
    badgeEl.style.display = 'none';
  }

  // Nombre y precio
  document.getElementById('modalNombre').textContent = p.nombre;
  const original = p.precio_original ? `<span class="original">S/ ${fmtPrecio(p.precio_original)}</span>` : '';
  document.getElementById('modalPrecio').innerHTML = `${original}S/ ${fmtPrecio(p.precio)}`;

  // Galería
  actualizarGaleria();

  // Tallas
  const tallas   = normalizarArray(p.tallas || p.talla);
  const selTallas = document.getElementById('selectorTallas');
  selTallas.innerHTML = '';
  tallas.forEach(t => {
    const btn = document.createElement('button');
    btn.className   = 'opcion-btn';
    btn.textContent = t;
    btn.onclick = () => {
      selTallas.querySelectorAll('.opcion-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      modalTallaSeleccionada = t;
      actualizarResumenModal();
    };
    selTallas.appendChild(btn);
  });

  // Colores
  const colores  = normalizarArray(p.colores || p.color);
  const selColores = document.getElementById('selectorColores');
  selColores.innerHTML = '';
  colores.forEach(c => {
    const css = getColorCSS(c);
    const isGradient = css.startsWith('linear');
    const btn = document.createElement('button');
    btn.className = 'opcion-color-btn';
    btn.title     = c;
    btn.style.background = css;
    if (c.toLowerCase().includes('blanco') || c.toLowerCase().includes('ivory') || c.toLowerCase().includes('crema')) {
      btn.style.border = '2px solid var(--dusty-rose)';
    }
    btn.innerHTML = `<span>${c}</span>`;
    btn.onclick = () => {
      selColores.querySelectorAll('.opcion-color-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      modalColorSeleccionado = c;
      actualizarResumenModal();
    };
    selColores.appendChild(btn);
  });

  // Resumen inicial
  document.getElementById('resNombre').textContent  = p.nombre;
  document.getElementById('resTalla').textContent   = 'No seleccionada';
  document.getElementById('resColor').textContent   = 'No seleccionado';
  document.getElementById('resPrecio').textContent  = `S/ ${fmtPrecio(p.precio)}`;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function actualizarResumenModal() {
  document.getElementById('resTalla').textContent  = modalTallaSeleccionada  || 'No seleccionada';
  document.getElementById('resColor').textContent  = modalColorSeleccionado  || 'No seleccionado';
  document.getElementById('resTalla').style.color  = modalTallaSeleccionada  ? 'var(--marsala)' : 'var(--gris-texto)';
  document.getElementById('resColor').style.color  = modalColorSeleccionado  ? 'var(--marsala)' : 'var(--gris-texto)';
}

function actualizarGaleria() {
  const imgPrincipal   = document.getElementById('imgPrincipal');
  const placeholder    = document.getElementById('imgPlaceholderModal');
  const icono          = document.getElementById('iconoPlaceholderModal');
  const thumbsCont     = document.getElementById('galeriaThumbs');
  const contador       = document.getElementById('galeriaContador');
  const p              = modalProductoActual;

  if (!p) return;

  // Reset zoom and pan on image change
  imgPrincipal.classList.remove('zoomed');
  imgPrincipal.style.transform = 'scale(1) translate(0, 0)';
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let startX, startY;

  const updateTransform = () => {
    imgPrincipal.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
  };

  // Mouse wheel zoom
  imgPrincipal.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    scale = Math.max(1, Math.min(5, scale + delta));
    updateTransform();
  });

  // Touch zoom (pinch)
  let initialDistance = 0;
  let initialScale = 1;
  imgPrincipal.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      initialDistance = getDistance(e.touches[0], e.touches[1]);
      initialScale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      // Start pan
      isDragging = true;
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
    }
  });
  imgPrincipal.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      scale = initialScale * (currentDistance / initialDistance);
      scale = Math.max(1, Math.min(5, scale));
      updateTransform();
    } else if (e.touches.length === 1 && isDragging) {
      translateX = e.touches[0].clientX - startX;
      translateY = e.touches[0].clientY - startY;
      const maxPan = 150 * scale; // Scale pan limit with zoom
      translateX = Math.max(-maxPan, Math.min(maxPan, translateX));
      translateY = Math.max(-maxPan, Math.min(maxPan, translateY));
      updateTransform();
    }
  });
  imgPrincipal.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Mouse pan
  imgPrincipal.addEventListener('mousedown', (e) => {
    if (scale > 1) {
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      e.preventDefault();
    }
  });
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      const maxPan = 150 * scale;
      translateX = Math.max(-maxPan, Math.min(maxPan, translateX));
      translateY = Math.max(-maxPan, Math.min(maxPan, translateY));
      updateTransform();
    }
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Imagen principal
  if (modalImagenes.length > 0) {
    const src = `img/${modalImagenes[modalImgIndex]}`;
    imgPrincipal.src   = src;
    imgPrincipal.alt   = p.nombre;
    imgPrincipal.style.display = 'block';
    placeholder.style.display  = 'none';
    imgPrincipal.onclick = () => {
      // Reset zoom and pan on click
      scale = 1;
      translateX = 0;
      translateY = 0;
      updateTransform();
    };
    imgPrincipal.onerror = () => {
      imgPrincipal.style.display = 'none';
      placeholder.style.display  = 'flex';
      icono.src = iconoCategoria(p.categoria);
    };
  } else {
    imgPrincipal.style.display = 'none';
    placeholder.style.display  = 'flex';
    icono.src = iconoCategoria(p.categoria);
  }

  // Contador
  if (contador) contador.textContent = `${modalImgIndex + 1} / ${Math.max(modalImagenes.length, 1)}`;

  // Navegación
  const prevBtn = document.querySelector('.galeria-nav.prev');
  const nextBtn = document.querySelector('.galeria-nav.next');
  if (prevBtn) prevBtn.style.display = modalImagenes.length > 1 ? 'flex' : 'none';
  if (nextBtn) nextBtn.style.display = modalImagenes.length > 1 ? 'flex' : 'none';

  // Thumbnails
  thumbsCont.innerHTML = '';
  modalImagenes.forEach((img, idx) => {
    const thumb = document.createElement('img');
    thumb.src       = `img/${img}`;
    thumb.alt       = `${p.nombre} ${idx+1}`;
    thumb.className = 'galeria-thumb' + (idx === modalImgIndex ? ' active' : '');
    thumb.loading   = 'lazy';
    thumb.onerror   = () => { thumb.style.display = 'none'; };
    thumb.onclick   = () => {
      modalImgIndex = idx;
      actualizarGaleria();
    };
    thumbsCont.appendChild(thumb);
  });
}

function cambiarImagenModal(delta) {
  if (!modalImagenes.length) return;
  modalImgIndex = (modalImgIndex + delta + modalImagenes.length) % modalImagenes.length;
  // Fade transition
  const imgEl = document.getElementById('imgPrincipal');
  if (imgEl) { imgEl.style.opacity = '0'; setTimeout(() => { actualizarGaleria(); imgEl.style.opacity = '1'; }, 150); }
  else actualizarGaleria();
}

function cerrarModalProducto(e) {
  if (e && e.target !== document.getElementById('modalProducto') && e.type !== 'click') return;
  if (e && e.currentTarget === document.getElementById('modalProducto') && e.target !== e.currentTarget) return;
  const modal = document.getElementById('modalProducto');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
  modalProductoActual = null;
}

// Swipe en galería (mobile)
let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
document.addEventListener('touchend', e => {
  if (!modalProductoActual) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) cambiarImagenModal(dx < 0 ? 1 : -1);
});

/* ---- Agregar desde modal al carrito ---- */
function agregarDesdeModal() {
  const p = modalProductoActual;
  if (!p) return;

  if (!modalTallaSeleccionada) {
    mostrarToast('⚠️ Selecciona una talla', 'error');
    document.getElementById('selectorTallas').style.animation = 'none';
    setTimeout(() => document.getElementById('selectorTallas').style.animation = '', 100);
    return;
  }
  if (!modalColorSeleccionado) {
    mostrarToast('⚠️ Selecciona un color', 'error');
    return;
  }

  // ID único por producto+talla+color
  const uid = `${p.id}-${modalTallaSeleccionada}-${modalColorSeleccionado}`;
  const existente = carrito.find(i => i.uid === uid);
  if (existente) {
    existente.cantidad = (existente.cantidad || 1) + 1;
  } else {
    carrito.push({
      uid,
      id:       p.id,
      nombre:   p.nombre,
      precio:   p.precio,
      imagen:   normalizarImagenes(p)[0] || '',
      talla:    modalTallaSeleccionada,
      color:    modalColorSeleccionado,
      categoria: p.categoria,
      cantidad: 1,
    });
  }

  guardarCarrito();
  actualizarCarritoUI();
  mostrarToast(`✅ "${p.nombre}" (${modalTallaSeleccionada} · ${modalColorSeleccionado}) agregado`);

  // Animar contador nav
  const cnt = document.getElementById('carritoCount');
  if (cnt) { cnt.style.transform = 'scale(1.5)'; setTimeout(() => cnt.style.transform = '', 300); }

  cerrarModalProducto({});
  document.getElementById('modalProducto').style.display = 'none';
  document.body.style.overflow = '';
}

/* ---- Comprar directo por WhatsApp desde modal ---- */
function comprarDirectoModal() {
  const p = modalProductoActual;
  if (!p) return;

  const talla = modalTallaSeleccionada || '(consultar)';
  const color = modalColorSeleccionado || '(consultar)';
  const msg   = `Hola R.O.S.S.Y 🌸\n\nMe interesa este producto:\n• *${p.nombre}*\n• Precio: S/ ${fmtPrecio(p.precio)}\n• Talla: ${talla}\n• Color: ${color}\n\n¿Tienen disponibilidad? 😊`;
  window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ---- Comprar por WhatsApp directo desde card (sin selección) ---- */
function comprarWhatsApp(id) {
  const p = productosTodos.find(x => x.id === id);
  if (!p) return;
  const tallas  = normalizarArray(p.tallas || p.talla).join(', ');
  const colores = normalizarArray(p.colores || p.color).join(', ');
  const msg = `Hola R.O.S.S.Y 👗\n\nMe interesa:\n• *${p.nombre}*\n• Precio: S/ ${fmtPrecio(p.precio)}\n• Tallas disponibles: ${tallas}\n• Colores: ${colores}\n\n¿Tienen disponibilidad? 😊`;
  window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ============================================================
   CARRITO
   ============================================================ */
function eliminarDelCarrito(uid) {
  showConfirm(
    'Eliminar producto',
    '¿Deseas eliminar este producto de tu carrito? Esta acción no se puede deshacer.',
    'Eliminar',
    'Cancelar',
    () => {
      carrito = carrito.filter(i => i.uid !== uid);
      guardarCarrito();
      actualizarCarritoUI();
      mostrarToast('🗑 Producto eliminado');
    }
  );
}

function cambiarCantidad(uid, delta) {
  const item = carrito.find(i => i.uid === uid);
  if (!item) return;
  item.cantidad = Math.max(1, (item.cantidad || 1) + delta);
  guardarCarrito();
  actualizarCarritoUI();
}

function limpiarCarrito() {
  if (!carrito.length) return;
  showConfirm(
    'Vaciar carrito',
    '¿Deseas eliminar todos los productos de tu carrito? Puedes seguir comprando en la tienda.',
    'Vaciar carrito',
    'Cancelar',
    () => {
      carrito = [];
      guardarCarrito();
      actualizarCarritoUI();
      mostrarToast('🗑 Carrito vaciado');
    }
  );
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
    const disponibles = productosTodos.length;
    lista.innerHTML = `
      <div class="carrito-vacio">
        <span>🛍️</span>
        <p>Tu carrito aún no tiene productos</p>
        <p class="carrito-vacio-texto">Visita la tienda y elige tu primera prenda. Toca cualquier producto para ver tallas y colores.</p>
        ${disponibles ? `<p class="carrito-vacio-info">Actualmente hay ${disponibles} productos disponibles.</p>` : ''}
        <div class="carrito-vacio-acciones">
          <button class="btn btn-primary" type="button" onclick="irATienda()">Ir a la tienda</button>
          <a href="#ofertas" class="btn btn-outline">Ver ofertas</a>
        </div>
      </div>`;
    if (resumen) resumen.style.display = 'none';
    return;
  }

  if (resumen) resumen.style.display = 'block';

  // Items
  lista.innerHTML = `
    <div class="carrito-items-header">
      <div>
        <span class="carrito-items-label">Tu carrito</span>
        <strong>${totalItems} artículo${totalItems === 1 ? '' : 's'} listo${totalItems === 1 ? '' : 's'} para comprar</strong>
      </div>
      <span class="carrito-items-total">S/ ${fmtPrecio(calcularTotal())}</span>
    </div>
  ` + carrito.map(item => {
    const imgHtml = `<img src="img/${item.imagen}" alt="${esc(item.nombre)}">`;
    return `
    <div class="item-carrito" id="item-${item.uid}">
      <div class="item-thumb">${imgHtml}</div>
      <div class="item-info">
        <p class="item-nombre">${esc(item.nombre)}</p>
        <p class="item-meta">📏 ${esc(item.talla)} · 🎨 ${esc(item.color)}</p>
        <div class="item-cantidad">
          <button class="btn-cant" onclick="cambiarCantidad('${item.uid}', -1)">−</button>
          <span>${item.cantidad || 1}</span>
          <button class="btn-cant" onclick="cambiarCantidad('${item.uid}', 1)">+</button>
          <span class="item-precio">S/ ${fmtPrecio(parseFloat(item.precio) * (item.cantidad || 1))}</span>
        </div>
      </div>
      <button class="btn-eliminar" onclick="eliminarDelCarrito('${item.uid}')" title="Eliminar">✕</button>
    </div>`;
  }).join('');

  // Resumen con detalle de productos
  const resProd = document.getElementById('resumenProductos');
  if (resProd) {
    resProd.innerHTML = carrito.map(item => `
      <div class="resumen-prod-item">
        <div>
          <strong>${esc(item.nombre)} ×${item.cantidad || 1}</strong>
          <div class="resumen-prod-detalle">Talla: ${esc(item.talla)} · Color: ${esc(item.color)}</div>
        </div>
        <span class="resumen-prod-precio">S/ ${fmtPrecio(parseFloat(item.precio) * (item.cantidad || 1))}</span>
      </div>`).join('');
  }

  const total = calcularTotal();
  const stEl  = document.getElementById('subtotal');
  const ttEl  = document.getElementById('totalCarrito');
  if (stEl) stEl.textContent = `S/ ${fmtPrecio(total)}`;
  if (ttEl) ttEl.textContent = `S/ ${fmtPrecio(total)}`;
}

function calcularTotal() {
  return carrito.reduce((s, i) => s + parseFloat(i.precio) * (i.cantidad || 1), 0);
}

/* ---- Generar mensaje WhatsApp del carrito completo ---- */
function generarMensajeCarrito(extras = {}) {
  const lineas = carrito.map(i =>
    `• ${i.nombre} | Talla: ${i.talla} | Color: ${i.color} ×${i.cantidad || 1} = S/ ${fmtPrecio(parseFloat(i.precio) * (i.cantidad || 1))}`
  ).join('\n');
  const total = calcularTotal();
  let msg = `🛍️ *Pedido – R.O.S.S.Y*\n\n${lineas}\n\n💰 *Total: S/ ${fmtPrecio(total)}*`;
  if (extras.nombre)    msg += `\n\n👤 *Cliente:* ${extras.nombre}`;
  if (extras.telefono)  msg += `\n📱 *Teléfono:* ${extras.telefono}`;
  if (extras.entrega === 'envio') {
    msg += `\n🚚 *Entrega:* Envío a domicilio`;
    if (extras.direccion) msg += ` – ${extras.direccion}`;
    if (extras.distrito)  msg += `, ${extras.distrito}`;
  } else if (extras.entrega === 'retiro') {
    msg += `\n🏪 *Entrega:* Recojo en tienda (C.C. Apecosur, Interior 1121)`;
  }
  if (extras.pago)      msg += `\n💳 *Pago:* ${extras.pago}`;
  if (extras.nota)      msg += `\n📝 *Nota:* ${extras.nota}`;
  msg += `\n\n¿Pueden confirmar mi pedido? ¡Gracias! 🌸`;
  return msg;
}

/* ============================================================
   CHECKOUT
   ============================================================ */
let tipoEntrega = '';

function mostrarCheckout() {
  if (!carrito.length) {
    mostrarToast('⚠️ El carrito está vacío', 'error');
    return;
  }
  const sec = document.getElementById('checkout');
  if (!sec) return;
  sec.style.display = 'block';

  // Rellenar panel lateral
  const det   = document.getElementById('checkoutDetalle');
  const totEl = document.getElementById('checkoutTotal');
  if (det) {
    det.innerHTML = carrito.map(i => `
      <div class="item-det">
        <span>${esc(i.nombre)}<br><small style="font-size:0.75rem;color:var(--gris-texto)">${esc(i.talla)} · ${esc(i.color)} ×${i.cantidad||1}</small></span>
        <span>S/ ${fmtPrecio(parseFloat(i.precio)*(i.cantidad||1))}</span>
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

function irATienda() {
  const sec = document.getElementById('tienda');
  if (!sec) return;
  sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function mostrarEnvio() {
  document.getElementById('envioBox').style.display  = 'block';
  document.getElementById('retiroBox').style.display = 'none';
  tipoEntrega = 'envio';
  document.getElementById('textoEnvio').textContent  = 'A coordinar';
}

function mostrarRetiro() {
  document.getElementById('envioBox').style.display  = 'none';
  document.getElementById('retiroBox').style.display = 'block';
  tipoEntrega = 'retiro';
  document.getElementById('textoEnvio').textContent  = 'Gratis (recojo)';
}

/* ============================================================
   FORMULARIOS
   ============================================================ */
function iniciarFormularios() {
  /* ---- Checkout ---- */
  document.getElementById('formCheckout')?.addEventListener('submit', e => {
    e.preventDefault();
    const nombre    = document.getElementById('chkNombre')?.value.trim()    || '';
    const telefono  = document.getElementById('chkTelefono')?.value.trim()  || '';
    const direccion = document.getElementById('chkDireccion')?.value.trim() || '';
    const distrito  = document.getElementById('chkDistrito')?.value.trim()  || '';
    const pago      = document.querySelector('input[name="pago"]:checked')?.value || 'Yape';
    const nota      = document.getElementById('chkNota')?.value.trim()      || '';

    if (!nombre || !telefono) {
      mostrarToast('⚠️ Completa tu nombre y teléfono', 'error');
      return;
    }
    if (tipoEntrega === 'envio' && !direccion) {
      mostrarToast('⚠️ Ingresa tu dirección de entrega', 'error');
      return;
    }

    const extras = { nombre, telefono, direccion, distrito, pago, nota, entrega: tipoEntrega };
    const msg    = generarMensajeCarrito(extras);
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
    const txt = `Hola R.O.S.S.Y 👋\n\nSoy *${nombre || 'una clienta'}*${telefono ? ` (${telefono})` : ''}.\n\n${mensaje}`;
    window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(txt)}`, '_blank');
    e.target.reset();
    mostrarToast('✅ ¡Abriendo WhatsApp!', 'exito');
  });
}

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

let _confirmCallback = null;
function showConfirm(titulo, texto, confirmText = 'Confirmar', cancelText = 'Cancelar', callback = null) {
  const modal = document.getElementById('confirmModal');
  if (!modal) return;
  document.getElementById('confirmTitulo').textContent = titulo;
  document.getElementById('confirmTexto').textContent = texto;
  const acceptBtn = modal.querySelector('.confirm-accept');
  const cancelBtn = modal.querySelector('.btn-outline');
  if (acceptBtn) acceptBtn.textContent = confirmText;
  if (cancelBtn) cancelBtn.textContent = cancelText;
  _confirmCallback = typeof callback === 'function' ? callback : null;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function cerrarConfirm() {
  const modal = document.getElementById('confirmModal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
  _confirmCallback = null;
}
function confirmarAccion() {
  if (typeof _confirmCallback === 'function') _confirmCallback();
  cerrarConfirm();
}

/* ============================================================
   ANIMACIONES SCROLL
   ============================================================ */
function iniciarScrollAnimaciones() {
  const selectores = '.testimonio-card, .envio-item, .contacto-item, .producto-card';
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

/* Normaliza campo de imágenes (puede ser string, array, etc.) */
function normalizarImagenes(p) {
  if (p.imagenes && Array.isArray(p.imagenes)) return p.imagenes.filter(Boolean);
  if (p.imagen && typeof p.imagen === 'string' && p.imagen.trim()) return [p.imagen.trim()];
  return [];
}

/* Normaliza tallas/colores: puede venir como array o string CSV */
function normalizarArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(v => String(v).trim()).filter(Boolean);
  return String(val).split(',').map(v => v.trim()).filter(Boolean);
}

function getDistance(t1, t2) {
  return Math.sqrt((t1.clientX - t2.clientX) ** 2 + (t1.clientY - t2.clientY) ** 2);
}

function iconoCategoria(cat = '') {
  const c = cat.toLowerCase();
  // Edita aquí las rutas de las imágenes representativas para cada categoría
  if (c.includes('casaca')) return 'img/imagen1.jpeg';
  if (c.includes('blusa'))  return 'img/imagen11.jpeg';
  if (c.includes('conjunto')) return 'img/imagen21.jpeg';
  if (c.includes('chompa')) return 'img/imagen31.jpeg';
  return 'img/imagen1.jpeg'; // Imagen por defecto
}
