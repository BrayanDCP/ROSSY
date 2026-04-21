/* ============================================
   R.O.S.S.Y – app.js
   ✅ Catálogo de prendas con nombres personalizados
   ✅ Modal producto con galería deslizable
   ✅ Selector de talla y color (sin guión)
   ✅ Resumen de compra actualizado en tiempo real
   ✅ Carrito con detalle de talla/color elegidos
   ✅ Checkout completo → WhatsApp
   ✅ Mapa COMERCIAL ROSSY integrado
   ============================================ */

/* ============================================================
   🛍️ CATÁLOGO DE PRENDAS
   ▸ Edita aquí los nombres, precios, tallas y colores de cada prenda.
   ▸ Para agregar una nueva prenda, copia un bloque { } y pégalo al final
     antes del último ]; Recuerda poner una coma después del bloque anterior.
   ▸ Categorías disponibles: 'Casaca Jean' | 'Blusas' | 'Conjuntos' | 'Chompa'
   ▸ El campo "imagenes" debe coincidir con los archivos en tu carpeta img/
   ▸ Si "precio_original" tiene valor, aparece tachado como oferta.
   ============================================================ */
const CATALOGO_PRENDAS = [
  /* ── CASACAS JEAN ───────────────────────────────────────── */
  {
    id: 1,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen1.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['crema', 'blanco', 'marron', 'verde', 'beige' , 'azul', 'gris', 'rojo', 'negro'],
    categoria: 'chompa',
    badge: 'oferta',
    descripcion: 'chompa abrigadora de tela'
  },
  {
    id: 2,
    nombre: 'conjuntos',
    precio: 85,
    precio_original: '100',
    imagenes: ['imagen2.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['negro', 'rojo' , 'beige' , 'blanco', 'marron' , 'verde' , 'gris' ],
    categoria: 'conjuntos',
    badge: 'nuevo',
    descripcion: 'Estilo oversize tendencia, perfecta para looks casuales y modernos.'
  },
  {
    id: 3,
    nombre: 'conjuntos',
    precio: 85,
    precio_original: '100',
    imagenes: ['imagen3.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['negro', 'rojo' , 'beige' , 'blanco', 'marron' , 'verde' , 'gris' ],
    categoria: 'conjuntos',
    badge: '',
    descripcion: 'Con detalles de bordado floral en la espalda. Edición limitada.'
  },
  {
    id: 4,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen4.jpeg'],
    tallas: ['XS', 'S', 'M'],
    colores: ['negro', 'rojo' , 'beige' , 'blanco', 'marron' , 'verde' , 'gris' ],
    categoria: 'chompa',
    badge: 'oferta',
    descripcion: 'Corte cropped moderno, ideal para combinar con faldas y vestidos.'
  },
  {
    id: 5,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen5.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['negro', 'rojo' , 'beige' , 'blanco', 'marron' , 'verde' , 'gris' ],
    categoria: 'chompa',
    badge: '',
    descripcion: 'Con rotos y desgastes estratégicos para un look urbano y actual.'
  },
  {
    id: 6,
    nombre: 'Casaca Jean',
    precio: 50,
    precio_original: '70',
    imagenes: ['imagen6.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['Negro', 'gris'],
    categoria: 'Casaca Jean',
    badge: 'oferta',
    descripcion: 'Material de alta calidad con acabado premium. Diseño atemporal.'
  },
  {
    id: 7,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen7.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['negro', 'rojo' , 'beige' , 'blanco', 'marron' , 'verde' , 'gris' ],
    categoria: 'chompa',
    badge: 'nuevo',
    descripcion: 'Inspirada en los años 90, con lavado vintage y parches decorativos.'
  },
  {
    id: 8,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen8.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['Azul', 'Negro', 'Gris'],
    categoria: 'chompa',
    badge: '',
    descripcion: 'Con capucha removible y bolsillos laterales con cierre.'
  },
  {
    id: 9,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen9.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Multicolor'],
    categoria: 'chompa',
    badge: 'oferta',
    descripcion: 'Diseño único con parches de diferentes telas y texturas.'
  },
  {
    id: 10,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen10.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['Azul', 'Negro'],
    categoria: 'chompa',
    badge: '',
    descripcion: 'Cómoda y abrigadora, perfecta para días frescos.'
  },

  /* ── BLUSAS ─────────────────────────────────────────────── */
  {
    id: 11,
    nombre: 'pantalon jean',
    precio: 50,
    precio_original: '70',
    imagenes: ['imagen11.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Rosa', 'Blanco', 'Lila'],
    categoria: 'pantalon jean',
    badge: 'oferta',
    descripcion: 'Estampado floral delicado, tela fluida y escote en V.'
  },
  {
    id: 12,
    nombre: 'Blusa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen12.jpeg'],
    tallas: ['XS', 'S', 'M', 'L'],
    colores: ['Negro', 'Nude', 'Dorado'],
    categoria: 'Blusas',
    badge: 'nuevo',
    descripcion: 'Tela satinada con caída perfecta, ideal para ocasiones especiales.'
  },
  {
    id: 13,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen13.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Blanco', 'Crema'],
    categoria: 'chompa',
    badge: '',
    descripcion: 'Bordados artesanales en el cuello y mangas. Estilo bohemio.'
  },
  {
    id: 14,
    nombre: 'Blusas',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen14.jpeg'],
    tallas: ['XS', 'S', 'M'],
    colores: ['Rosa', 'Negro', 'Celeste'],
    categoria: 'Blusas',
    badge: 'oferta',
    descripcion: 'Diseño cropped cómodo para el día a día, tela suave y transpirable.'
  },
  {
    id: 15,
    nombre: 'Casaca Jean',
    precio: 50,
    precio_original: '70',
    imagenes: ['imagen15.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Blanco', 'Rosa Palo', 'Negro'],
    categoria: 'Casaca Jean',
    badge: 'nuevo',
    descripcion: 'Con hombros descubiertos, perfecta para looks frescos y femeninos.'
  },
  {
    id: 16,
    nombre: 'Casaca Jean',
    precio: 50,
    precio_original: '70',
    imagenes: ['imagen16.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['Blanco', 'Lila', 'Rosa'],
    categoria: 'Casaca Jean',
    badge: 'oferta',
    descripcion: 'Mangas abullonadas de tendencia, muy cómoda y favorecedora.'
  },
  {
    id: 17,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen17.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['Celeste', 'Blanco', 'Turquesa'],
    categoria: 'chompa',
    badge: '',
    descripcion: 'Diseño amplio y fresco, ideal para el calor. Cuello redondo.'
  },
  {
    id: 18,
    nombre: 'conjunto',
    precio: 85,
    precio_original: '100',
    imagenes: ['imagen18.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Negro', 'Rojo', 'Blanco'],
    categoria: 'Conjuntos',
    badge: '',
    descripcion: 'Con lazo en el cuello como detalle decorativo. Muy elegante.'
  },
  {
    id: 19,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen19.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Blanco', 'Negro', 'Nude'],
    categoria: 'chompa',
    badge: 'oferta',
    descripcion: 'Tela semitransparente con detalles de encaje. Glamorosa y sofisticada.'
  },
  {
    id: 20,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen20.jpeg'],
    tallas: ['XS', 'S', 'M', 'L'],
    colores: ['Azul/Blanco', 'Rojo/Blanco'],
    categoria: 'chompa',
    badge: '',
    descripcion: 'Estampado de rayas marineras clásico, tela de algodón premium.'
  },

  /* ── CONJUNTOS ──────────────────────────────────────────── */
  {
    id: 21,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen21.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Beige', 'Blanco', 'Verde'],
    categoria: 'chompa',
    badge: 'oferta',
    descripcion: 'Blusa y pantalón de lino. Fresco, elegante y perfecto para el verano.'
  },
  {
    id: 22,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen22.jpeg'],
    tallas: ['XS', 'S', 'M', 'L'],
    colores: ['Negro', 'Gris', 'Rosa'],
    categoria: 'chompa',
    badge: 'nuevo',
    descripcion: 'Top y leggings a juego, cómodo y estilizado para el gym o paseos.'
  },
  {
    id: 23,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen23.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Rosa', 'Lila', 'Negro'],
    categoria: 'chompa',
    badge: '',
    descripcion: 'Top con escote cuadrado y falda midi a juego. Look completo y femenino.'
  },
  {
    id: 24,
    nombre: 'chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen24.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['Azul', 'Negro'],
    categoria: 'chompa',
    badge: 'oferta',
    descripcion: 'Falda y blusa de jean coordinados. Tendencia total denim.'
  },
  {
    id: 25,
    nombre: 'blusa',
    precio: 45,
    precio_original: '65',
    imagenes: ['imagen25.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Negro', 'Beige', 'Blanco'],
    categoria: 'blusa',
    badge: 'nuevo',
    descripcion: 'Blazer oversize con short a juego. Perfecto para salidas de día.'
  },
  {
    id: 26,
    nombre: 'blusa',
    precio: 45,
    precio_original: '65',
    imagenes: ['imagen26.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['Negro', 'Nude', 'Blanco'],
    categoria: 'blusa',
    badge: 'oferta',
    descripcion: 'Blusa y pantalón palazzo fluido. Elegante y muy cómodo.'
  },
  {
    id: 27,
    nombre: 'blusa',
    precio: 45,
    precio_original: '65',
    imagenes: ['imagen27.jpeg'],
    tallas: ['XS', 'S', 'M', 'L'],
    colores: ['Rosa', 'Celeste'],
    categoria: 'blusa',
    badge: '',
    descripcion: 'Estampado floral coordinado en top y pantalón. Romántico y fresco.'
  },
  {
    id: 28,
    nombre: 'Chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen28.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Negro', 'Morado', 'Rojo'],
    categoria: 'Chompa',
    badge: 'oferta',
    descripcion: 'En terciopelo suave, ideal para ocasiones especiales y noches elegantes.'
  },
  {
    id: 29,
    nombre: 'Chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen29.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['Negro', 'Blanco', 'Gris'],
    categoria: 'Conjuntos',
    badge: '',
    descripcion: 'Conjunto sencillo y versátil. Básico indispensable para el armario.'
  },
  {
    id: 30,
    nombre: 'capa',
    precio: 65,
    precio_original: '85',
    imagenes: ['imagen30.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Verde', 'Naranja'],
    categoria: 'Capas',
    badge: 'oferta',
    descripcion: 'Prints tropicales coloridos para un look lleno de energía y verano.'
  },

  /* ── CHOMPAS ────────────────────────────────────────────── */
 
  {
    id: 32,
    nombre: 'Chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen32.jpeg'],
    tallas: ['XS', 'S', 'M'],
    colores: ['Rosa', 'Lila', 'Blanco'],
    categoria: 'Chompa',
    badge: 'nuevo',
    descripcion: 'Corte cropped moderno con costillas en puños y bajo.'
  },
  {
    id: 33,
    nombre: 'Chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen33.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['Gris', 'Beige', 'Negro'],
    categoria: 'Chompa',
    badge: '',
    descripcion: 'Extra grande para máxima comodidad. Perfecta para días fríos en casa.'
  },
  {
    id: 34,
    nombre: 'Chompa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen34.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Crema', 'Beige', 'Gris'],
    categoria: 'Chompa',
    badge: 'oferta',
    descripcion: 'Diseño con trenzas artesanales al frente. Clásica y elegante.'
  },
  {
    id: 35,
    nombre: 'blusa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen35.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['Negro', 'Blanco', 'Rojo'],
    categoria: 'blusa',
    badge: '',
    descripcion: 'Con cuello alto enrollado, ideal para el invierno. Muy abrigadora.'
  },
  {
    id: 36,
    nombre: 'blusa',
    precio: 45,
    precio_original: '65',
    imagenes: ['imagen36.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Multicolor'],
    categoria: 'blusa',
    badge: 'oferta',
    descripcion: 'Rayas horizontales de colores vibrantes. Alegre y original.'
  },
  {
    id: 37,
    nombre: 'blusa',
    precio: 45,
    precio_original: '65',
    imagenes: ['imagen37.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Nude', 'Blanco', 'Negro'],
    categoria: 'blusa',
    badge: 'nuevo',
    descripcion: 'Tejido calado elegante, perfecta como capa sobre tops y vestidos.'
  },
  {
    id: 38,
    nombre: 'blusa',
    precio: 45,
    precio_original: '65',
    imagenes: ['imagen38.jpeg'],
    tallas: ['S', 'M', 'L', 'XL'],
    colores: ['Gris', 'Negro', 'Azul'],
    categoria: 'blusa',
    badge: 'oferta',
    descripcion: 'Capucha integrada y bolsillo canguro. Casual y muy práctica.'
  },
  {
    id: 39,
    nombre: 'blusa',
    precio: 45,
    precio_original: '60',
    imagenes: ['imagen39.jpeg'],
    tallas: ['S', 'M', 'L'],
    colores: ['Crema', 'Negro', 'Dorado'],
    categoria: 'blusa',
    badge: 'nuevo',
    descripcion: 'Lana de alta calidad, suave y duradera. Inversión para tu armario.'
  },
];
/* ──────────────────────────────────────────────────────────── */

/* ---- Estado global ---- */
let carrito        = JSON.parse(localStorage.getItem('rossy_carrito') || '[]');
let productosTodos = [];

/* Producto activo en modal */
let modalProductoActual    = null;
let modalImagenes          = [];
let modalImgIndex          = 0;
let modalTallaSeleccionada = '';
let modalColorSeleccionado = '';

const WA_NUMERO = '51993304046';

/* ============================================================
   COLORES PREDEFINIDOS (para botones de color visualmente bonitos)
   ============================================================ */
const MAPA_COLORES = {
  'rosa':         '#E1999F',
  'rosado':       '#E1999F',
  'rosewater':    '#E1999F',
  'blanco':       '#FFFFFF',
  'crema':        '#F9E1E0',
  'ivory':        '#F9E1E0',
  'negro':        '#1a1a1a',
  'azul':         '#4a7bb5',
  'azul marino':  '#0a1f44',
  'turquesa':     '#4ecdc4',
  'dorado':       '#c9a36a',
  'gris':         '#9e9e9e',
  'nude':         '#e8c9a0',
  'beige':        '#e8d5b7',
  'verde':        '#6aab6a',
  'rojo':         '#c94a4a',
  'lila':         '#b49fc8',
  'morado':       '#7a4f8a',
  'naranja':      '#e8944a',
  'celeste':      '#87ceeb',
  'azul/blanco':  'linear-gradient(135deg,#4a7bb5 50%,#FFFFFF 50%)',
  'rojo/blanco':  'linear-gradient(135deg,#c94a4a 50%,#FFFFFF 50%)',
  'rosa palo':    '#DEB3AD',
  'dusty rose':   '#DEB3AD',
  'multicolor':   'linear-gradient(135deg,#E1999F,#87ceeb,#6aab6a,#c9a36a)',
};

function getColorCSS(nombre) {
  const key = nombre.toLowerCase().trim();
  for (const k in MAPA_COLORES) {
    if (key.includes(k)) return MAPA_COLORES[k];
  }
  return '#DEB3AD';
}

/* ============================================================
   INICIALIZACIÓN
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  iniciarHeader();
  iniciarMenuMobile();
  renderizarProductos(CATALOGO_PRENDAS);
  cargarProductos();
  actualizarCarritoUI();
  iniciarFiltros();
  iniciarFormularios();
  iniciarAuthForms();
  cargarSesion();
  iniciarScrollAnimaciones();
  iniciarNavLinks();
  iniciarMapaContacto();
  document.addEventListener('click', () => {
    document.getElementById('accountMenu')?.classList.remove('open');
  });
});

/* ============================================================
   MAPA EN SECCIÓN CONTACTO
   ▸ Muestra la ubicación de COMERCIAL ROSSY en la sección de contacto.
   ▸ Para cambiar la ubicación: reemplaza el src del iframe con el embed de Google Maps.
   ============================================================ */
function iniciarMapaContacto() {
  const contenedorMapa = document.getElementById('mapaContacto');
  if (!contenedorMapa) return;

  contenedorMapa.innerHTML = `
    <div class="mapa-wrapper">
      <div class="mapa-header">
        <span class="mapa-icono">📍</span>
        <div>
          <strong>COMERCIAL ROSSY</strong>
          <p>Encuéntranos aquí</p>
        </div>
      </div>
      <div class="mapa-frame-wrap">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.86089609877524!2d-77.02711271051206!3d-12.059041739308881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c900701571a1%3A0xc75af35061eb54c8!2sCOMERCIAL%20ROSSY!5e0!3m2!1ses!2spe!4v1776742507431!5m2!1ses!2spe"
          width="100%"
          height="300"
          style="border:0; border-radius: 12px;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Ubicación COMERCIAL ROSSY">
        </iframe>
      </div>
      <a
        href="https://maps.google.com/?q=COMERCIAL+ROSSY"
        target="_blank"
        class="btn btn-outline mapa-link"
        style="margin-top:0.75rem; display:inline-flex; align-items:center; gap:0.4rem; font-size:0.85rem">
        📍 Ver en Google Maps
      </a>
    </div>
  `;
}

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
   CARGAR PRODUCTOS (desde backend o catálogo local)
   ============================================================ */
async function cargarProductos() {
  try {
    const res = await fetch('php/productos.php?activo=1');
    if (!res.ok) throw new Error('no-backend');
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) throw new Error('vacío');
    productosTodos = data;
  } catch (_) {
    // Sin backend → usa el catálogo definido arriba
    productosTodos = CATALOGO_PRENDAS;
  }
  renderizarProductos(productosTodos);
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

    const imgs    = normalizarImagenes(p);
    const imgPrin = imgs[0];
    const badge   = p.badge ? `<span class="producto-badge ${p.badge === 'nuevo' ? 'nuevo' : ''}">${p.badge === 'nuevo' ? 'Nuevo' : 'Oferta'}</span>` : '';
    const original = p.precio_original ? `<span class="original">S/ ${fmtPrecio(p.precio_original)}</span>` : '';
    const tallas  = normalizarArray(p.tallas || p.talla).slice(0, 4).join(' · ');

    // Mostrar puntos de color en la card (sin texto de color)
    const coloresArr = normalizarArray(p.colores || p.color).slice(0, 5);
    const coloresDots = coloresArr.map(c => {
      const css = getColorCSS(c);
      const isLight = c.toLowerCase().includes('blanco') || c.toLowerCase().includes('crema') || c.toLowerCase().includes('ivory');
      return `<span class="color-dot" style="background:${css};${isLight ? 'border:1.5px solid #ccc;' : ''}" title="${esc(c)}"></span>`;
    }).join('');

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
        <div class="card-hover-overlay">
          <button class="btn-hover-ver" onclick="event.stopPropagation();abrirModalProducto(${p.id})">Ver producto</button>
        </div>
      </div>
      <div class="producto-body">
        <span class="producto-categoria">${esc(p.categoria)}</span>
        <h3 class="producto-nombre">${esc(p.nombre)}</h3>
        <div class="producto-meta">
          <span class="tallas-meta">📏 ${esc(tallas)}</span>
          <div class="colores-dots">${coloresDots}</div>
        </div>
        <div class="producto-precio-row">
          <p class="producto-precio">${original}S/ ${fmtPrecio(p.precio)}</p>
          ${p.precio_original ? `<span class="descuento-badge">-${Math.round((1 - p.precio / p.precio_original) * 100)}%</span>` : ''}
        </div>
        <div class="producto-btns">
          <button class="btn btn-primary" onclick="event.stopPropagation();abrirModalProducto(${p.id})">
            Ver producto
          </button>
          <button class="btn btn-outline btn-wa-card" onclick="event.stopPropagation();comprarWhatsApp(${p.id})" title="Comprar por WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </button>
        </div>
      </div>`;

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

  modalProductoActual    = p;
  modalTallaSeleccionada = '';
  modalColorSeleccionado = '';
  modalImagenes          = normalizarImagenes(p);
  modalImgIndex          = 0;

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
  const descEl   = p.precio_original ? `<span class="modal-descuento">-${Math.round((1 - p.precio / p.precio_original) * 100)}%</span>` : '';
  document.getElementById('modalPrecio').innerHTML = `${original}S/ ${fmtPrecio(p.precio)} ${descEl}`;

  // Descripción del producto
  const descProd = document.getElementById('modalDescripcion');
  if (descProd) descProd.textContent = p.descripcion || '';

  // Galería
  actualizarGaleria();

  // Tallas
  const tallas    = normalizarArray(p.tallas || p.talla);
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

  // Colores – botones visuales con círculo de color + nombre (sin guión)
  const colores    = normalizarArray(p.colores || p.color);
  const selColores = document.getElementById('selectorColores');
  selColores.innerHTML = '';
  colores.forEach(c => {
    const css       = getColorCSS(c);
    const isLight   = c.toLowerCase().includes('blanco') || c.toLowerCase().includes('ivory') || c.toLowerCase().includes('crema');
    const btn       = document.createElement('button');
    btn.className   = 'opcion-color-btn';
    btn.title       = c;
    btn.innerHTML   = `
      <span class="color-swatch" style="background:${css};${isLight ? 'border:1.5px solid #ccc;' : ''}"></span>
      <span class="color-label">${c}</span>
    `;
    btn.onclick = () => {
      selColores.querySelectorAll('.opcion-color-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      modalColorSeleccionado = c;
      actualizarResumenModal();
    };
    selColores.appendChild(btn);
  });

  // Resumen inicial
  document.getElementById('resNombre').textContent = p.nombre;
  document.getElementById('resTalla').textContent  = 'No seleccionada';
  document.getElementById('resColor').textContent  = 'No seleccionado';
  document.getElementById('resPrecio').textContent = `S/ ${fmtPrecio(p.precio)}`;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function actualizarResumenModal() {
  document.getElementById('resTalla').textContent = modalTallaSeleccionada || 'No seleccionada';
  document.getElementById('resColor').textContent = modalColorSeleccionado || 'No seleccionado';
  document.getElementById('resTalla').style.color = modalTallaSeleccionada ? 'var(--marsala)' : 'var(--gris-texto)';
  document.getElementById('resColor').style.color = modalColorSeleccionado ? 'var(--marsala)' : 'var(--gris-texto)';
}

function actualizarGaleria() {
  const imgPrincipal = document.getElementById('imgPrincipal');
  const placeholder  = document.getElementById('imgPlaceholderModal');
  const icono        = document.getElementById('iconoPlaceholderModal');
  const thumbsCont   = document.getElementById('galeriaThumbs');
  const contador     = document.getElementById('galeriaContador');
  const p            = modalProductoActual;

  if (!p) return;

  imgPrincipal.classList.remove('zoomed');
  imgPrincipal.style.transform = 'scale(1) translate(0, 0)';
  let scale = 1, translateX = 0, translateY = 0;
  let isDragging = false, startX, startY;

  const updateTransform = () => {
    imgPrincipal.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
  };

  imgPrincipal.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale = Math.max(1, Math.min(5, scale + (e.deltaY > 0 ? -0.1 : 0.1)));
    updateTransform();
  });

  let initialDistance = 0, initialScale = 1;
  imgPrincipal.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      initialDistance = getDistance(e.touches[0], e.touches[1]);
      initialScale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      isDragging = true;
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
    }
  });
  imgPrincipal.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const curr = getDistance(e.touches[0], e.touches[1]);
      scale = Math.max(1, Math.min(5, initialScale * (curr / initialDistance)));
      updateTransform();
    } else if (e.touches.length === 1 && isDragging) {
      const maxPan = 150 * scale;
      translateX = Math.max(-maxPan, Math.min(maxPan, e.touches[0].clientX - startX));
      translateY = Math.max(-maxPan, Math.min(maxPan, e.touches[0].clientY - startY));
      updateTransform();
    }
  });
  imgPrincipal.addEventListener('touchend', () => { isDragging = false; });

  imgPrincipal.addEventListener('mousedown', (e) => {
    if (scale > 1) { isDragging = true; startX = e.clientX - translateX; startY = e.clientY - translateY; e.preventDefault(); }
  });
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const maxPan = 150 * scale;
      translateX = Math.max(-maxPan, Math.min(maxPan, e.clientX - startX));
      translateY = Math.max(-maxPan, Math.min(maxPan, e.clientY - startY));
      updateTransform();
    }
  });
  document.addEventListener('mouseup', () => { isDragging = false; });

  if (modalImagenes.length > 0) {
    const src = `img/${modalImagenes[modalImgIndex]}`;
    imgPrincipal.src   = src;
    imgPrincipal.alt   = p.nombre;
    imgPrincipal.style.display = 'block';
    placeholder.style.display  = 'none';
    imgPrincipal.onclick = () => { scale = 1; translateX = 0; translateY = 0; updateTransform(); };
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

  if (contador) contador.textContent = `${modalImgIndex + 1} / ${Math.max(modalImagenes.length, 1)}`;

  const prevBtn = document.querySelector('.galeria-nav.prev');
  const nextBtn = document.querySelector('.galeria-nav.next');
  if (prevBtn) prevBtn.style.display = modalImagenes.length > 1 ? 'flex' : 'none';
  if (nextBtn) nextBtn.style.display = modalImagenes.length > 1 ? 'flex' : 'none';

  thumbsCont.innerHTML = '';
  modalImagenes.forEach((img, idx) => {
    const thumb = document.createElement('img');
    thumb.src       = `img/${img}`;
    thumb.alt       = `${p.nombre} ${idx + 1}`;
    thumb.className = 'galeria-thumb' + (idx === modalImgIndex ? ' active' : '');
    thumb.loading   = 'lazy';
    thumb.onerror   = () => { thumb.style.display = 'none'; };
    thumb.onclick   = () => { modalImgIndex = idx; actualizarGaleria(); };
    thumbsCont.appendChild(thumb);
  });
}

function cambiarImagenModal(delta) {
  if (!modalImagenes.length) return;
  modalImgIndex = (modalImgIndex + delta + modalImagenes.length) % modalImagenes.length;
  const imgEl = document.getElementById('imgPrincipal');
  if (imgEl) { imgEl.style.opacity = '0'; setTimeout(() => { actualizarGaleria(); imgEl.style.opacity = '1'; }, 150); }
  else actualizarGaleria();
}

function cerrarModalProducto(e) {
  if (e && e.currentTarget === document.getElementById('modalProducto') && e.target !== e.currentTarget) return;
  const modal = document.getElementById('modalProducto');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
  modalProductoActual = null;
}

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
    const st = document.getElementById('selectorTallas');
    if (st) { st.style.animation = 'none'; setTimeout(() => { st.style.animation = ''; }, 100); }
    return;
  }
  if (!modalColorSeleccionado) {
    mostrarToast('⚠️ Selecciona un color', 'error');
    return;
  }

  const uid      = `${p.id}-${modalTallaSeleccionada}-${modalColorSeleccionado}`;
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

  const cnt = document.getElementById('carritoCount');
  if (cnt) { cnt.style.transform = 'scale(1.5)'; setTimeout(() => cnt.style.transform = '', 300); }

  const modal = document.getElementById('modalProducto');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
  modalProductoActual = null;
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

/* ---- Comprar por WhatsApp desde card ---- */
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
    '¿Deseas eliminar este producto de tu carrito?',
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
    '¿Deseas eliminar todos los productos del carrito?',
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
        ${disponibles ? `<p class="carrito-vacio-info">Hay ${disponibles} productos disponibles.</p>` : ''}
        <div class="carrito-vacio-acciones">
          <button class="btn btn-primary" type="button" onclick="irATienda()">Ir a la tienda</button>
          <a href="#ofertas" class="btn btn-outline">Ver ofertas</a>
        </div>
      </div>`;
    if (resumen) resumen.style.display = 'none';
    return;
  }

  if (resumen) resumen.style.display = 'block';

  lista.innerHTML = `
    <div class="carrito-items-header">
      <div>
        <span class="carrito-items-label">Tu carrito</span>
        <strong>${totalItems} artículo${totalItems === 1 ? '' : 's'} listo${totalItems === 1 ? '' : 's'} para comprar</strong>
      </div>
      <span class="carrito-items-total">S/ ${fmtPrecio(calcularTotal())}</span>
    </div>
  ` + carrito.map(item => {
    const colorCSS  = getColorCSS(item.color || '');
    const isLight   = (item.color || '').toLowerCase().includes('blanco') || (item.color || '').toLowerCase().includes('crema');
    return `
    <div class="item-carrito" id="item-${item.uid}">
      <div class="item-thumb"><img src="img/${item.imagen}" alt="${esc(item.nombre)}" onerror="this.style.opacity='0.3'"></div>
      <div class="item-info">
        <p class="item-nombre">${esc(item.nombre)}</p>
        <p class="item-meta">
          <span>📏 ${esc(item.talla)}</span>
          <span class="item-color-dot" style="background:${colorCSS};${isLight ? 'border:1px solid #ccc;' : ''}" title="${esc(item.color)}"></span>
          <span>${esc(item.color)}</span>
        </p>
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

/* ---- Generar mensaje WhatsApp del carrito ---- */
function generarMensajeCarrito(extras = {}) {
  const lineas = carrito.map(i =>
    `• ${i.nombre} | Talla: ${i.talla} | Color: ${i.color} ×${i.cantidad || 1} = S/ ${fmtPrecio(parseFloat(i.precio) * (i.cantidad || 1))}`
  ).join('\n');
  const total = calcularTotal();
  let msg = `🛍️ *Pedido – R.O.S.S.Y*\n\n${lineas}\n\n💰 *Total: S/ ${fmtPrecio(total)}*`;
  if (extras.nombre)   msg += `\n\n👤 *Cliente:* ${extras.nombre}`;
  if (extras.telefono) msg += `\n📱 *Teléfono:* ${extras.telefono}`;
  if (extras.entrega === 'envio') {
    msg += `\n🚚 *Entrega:* Envío a domicilio`;
    if (extras.direccion) msg += ` – ${extras.direccion}`;
    if (extras.distrito)  msg += `, ${extras.distrito}`;
  } else if (extras.entrega === 'retiro') {
    msg += `\n🏪 *Entrega:* Recojo en tienda (COMERCIAL ROSSY)`;
  }
  if (extras.pago) msg += `\n💳 *Pago:* ${extras.pago}`;
  if (extras.nota) msg += `\n📝 *Nota:* ${extras.nota}`;
  msg += `\n\n¿Pueden confirmar mi pedido? ¡Gracias! 🌸`;
  return msg;
}

/* ============================================================
   CHECKOUT
   ============================================================ */
let tipoEntrega = '';

function mostrarCheckout() {
  if (!carrito.length) { mostrarToast('⚠️ El carrito está vacío', 'error'); return; }
  const sec = document.getElementById('checkout');
  if (!sec) return;
  sec.style.display = 'block';

  const det   = document.getElementById('checkoutDetalle');
  const totEl = document.getElementById('checkoutTotal');
  if (det) {
    det.innerHTML = carrito.map(i => `
      <div class="item-det">
        <span>${esc(i.nombre)}<br><small style="font-size:0.75rem;color:var(--gris-texto)">${esc(i.talla)} · ${esc(i.color)} ×${i.cantidad || 1}</small></span>
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

function irATienda() {
  document.getElementById('tienda')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  document.getElementById('formCheckout')?.addEventListener('submit', e => {
    e.preventDefault();
    const nombre    = document.getElementById('chkNombre')?.value.trim()    || '';
    const telefono  = document.getElementById('chkTelefono')?.value.trim()  || '';
    const direccion = document.getElementById('chkDireccion')?.value.trim() || '';
    const distrito  = document.getElementById('chkDistrito')?.value.trim()  || '';
    const pago      = document.querySelector('input[name="pago"]:checked')?.value || 'Yape';
    const nota      = document.getElementById('chkNota')?.value.trim()      || '';

    if (!nombre || !telefono) { mostrarToast('⚠️ Completa tu nombre y teléfono', 'error'); return; }
    if (tipoEntrega === 'envio' && !direccion) { mostrarToast('⚠️ Ingresa tu dirección de entrega', 'error'); return; }

    const msg = generarMensajeCarrito({ nombre, telefono, direccion, distrito, pago, nota, entrega: tipoEntrega });
    window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`, '_blank');
    mostrarToast('✅ ¡Pedido enviado! Redirigiendo a WhatsApp...', 'exito');
    setTimeout(() => { limpiarCarrito(); ocultarCheckout(); }, 1800);
  });

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

function iniciarAuthForms() {
  const authFeedback  = document.getElementById('authFeedback');
  const loginForm     = document.getElementById('loginForm');
  const registerForm  = document.getElementById('registerForm');
  const tabs          = document.querySelectorAll('.tab-btn');

  const toggleTab = tab => {
    tabs.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
    if (loginForm)    loginForm.classList.toggle('hidden', tab !== 'login');
    if (registerForm) registerForm.classList.toggle('hidden', tab !== 'register');
    if (authFeedback) authFeedback.textContent = '';
  };

  tabs.forEach(btn => btn.addEventListener('click', () => toggleTab(btn.dataset.tab)));
  toggleTab('login');

  const submitForm = async form => {
    if (!form) return;
    try {
      const res  = await fetch(form.action, { method: 'POST', body: new FormData(form) });
      const json = await res.json();
      if (json.success) {
        mostrarToast(json.message || 'Operación exitosa', 'exito');
        if (authFeedback) authFeedback.textContent = json.message || '';
        if (form === registerForm) { toggleTab('login'); form.reset(); }
      } else {
        mostrarToast(json.error || 'Error al procesar', 'error');
        if (authFeedback) authFeedback.textContent = json.error || '';
      }
    } catch (_) {
      mostrarToast('Error de conexión con el servidor', 'error');
      if (authFeedback) authFeedback.textContent = 'Error de conexión';
    }
  };

  loginForm?.addEventListener('submit',    e => { e.preventDefault(); submitForm(loginForm);    });
  registerForm?.addEventListener('submit', e => { e.preventDefault(); submitForm(registerForm); });
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
  document.getElementById('confirmTexto').textContent  = texto;
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
   SESIÓN / CUENTA
   ============================================================ */
function cargarSesion() {
  // Placeholder para lógica de sesión con backend
}
function toggleAccountMenu(e) {
  e.stopPropagation();
  document.getElementById('accountMenu')?.classList.toggle('open');
}
function openAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}
function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
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

function normalizarImagenes(p) {
  if (p.imagenes && Array.isArray(p.imagenes)) return p.imagenes.filter(Boolean);
  if (p.imagen && typeof p.imagen === 'string' && p.imagen.trim()) return [p.imagen.trim()];
  return [];
}

function normalizarArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(v => String(v).trim()).filter(Boolean);
  return String(val).split(',').map(v => v.trim()).filter(Boolean);
}

function getDistance(t1, t2) {
  return Math.sqrt((t1.clientX - t2.clientX) ** 2 + (t1.clientY - t2.clientY) ** 2);
}

/*
   ▸ ICONOS POR CATEGORÍA
   Edita las rutas de imágenes para cada categoría aquí.
   Estas se muestran cuando no hay imagen disponible para un producto.
*/
function iconoCategoria(cat = '') {
  const c = cat.toLowerCase();
  if (c.includes('casaca'))   return 'img/imagen1.jpeg';
  if (c.includes('blusa'))    return 'img/imagen11.jpeg';
  if (c.includes('conjunto')) return 'img/imagen21.jpeg';
  if (c.includes('chompa'))   return 'img/imagen31.jpeg';
  return 'img/imagen1.jpeg';
}