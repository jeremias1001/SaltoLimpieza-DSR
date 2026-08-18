function app() {
  return {
    open: false,
    section: 'overview',
    cartOpen: false,
    toastMessage: '',
    toastVisible: false,

    navGroups: [
      { group: 'Tu e-commerce', items: [
        { id: 'overview', name: 'Visión general', sub: 'El panorama completo', icon: 'layout-dashboard' },
      ]},
      { group: 'Tu administración', items: [
        { id: 'admin-dashboard', name: 'Dashboard', sub: 'Cómo va tu negocio', icon: 'gauge' },
        { id: 'admin-products', name: 'Productos', sub: 'Catálogo y variantes', icon: 'package' },
        { id: 'admin-orders', name: 'Pedidos', sub: 'Flujo operacional', icon: 'shopping-bag' },
        { id: 'admin-customers', name: 'Clientes', sub: 'Historial y segmentos', icon: 'users' },
        { id: 'admin-promotions', name: 'Promociones', sub: 'Descuentos y campañas', icon: 'badge-percent' },
        { id: 'admin-payments', name: 'Pagos y despachos', sub: 'Cobros y entregas', icon: 'truck' },
        { id: 'admin-settings', name: 'Configuración', sub: 'Datos del negocio', icon: 'settings' },
      ]},
      { group: 'Tu tienda', items: [
        { id: 'store-home', name: 'Inicio', sub: 'Lo que ve tu cliente', icon: 'home' },
        { id: 'store-catalog', name: 'Catálogo', sub: 'Vitrina de productos', icon: 'grid-3x3' },
        { id: 'store-product', name: 'Producto', sub: 'Ficha de compra', icon: 'package-open' },
        { id: 'store-cart', name: 'Carrito', sub: 'Antes del pago', icon: 'shopping-cart' },
        { id: 'store-checkout', name: 'Checkout', sub: 'Cierre de compra', icon: 'credit-card' },
      ]},
      { group: 'Crecimiento', items: [
        { id: 'growth-integrations', name: 'Integraciones', sub: 'Qué se puede sumar', icon: 'plug-zap' },
        { id: 'growth-roadmap', name: 'Roadmap', sub: 'Cómo escala', icon: 'rocket' },
      ]},
    ],

    get allNavItems() {
      return this.navGroups.flatMap(g => g.items);
    },
    get title() {
      const current = this.allNavItems.find(i => i.id === this.section);
      return current ? current.name : 'Sales Room';
    },
    get isStore() {
      return this.section.startsWith('store-');
    },
    get worldLabel() {
      if (this.section === 'overview') return 'Tu e-commerce';
      if (this.section.startsWith('admin-')) return 'Tu administración';
      if (this.section.startsWith('store-')) return 'Tu tienda';
      if (this.section.startsWith('growth-')) return 'Crecimiento';
      return '';
    },

    go(id) {
      this.section = id;
      this.open = false;
      this.icons();
    },
    icons() {
      requestAnimationFrame(() => window.lucide && lucide.createIcons());
    },
    formatCLP(n) {
      return '$' + Number(n).toLocaleString('es-CL');
    },
    notify(message) {
      this.toastMessage = message;
      this.toastVisible = true;
      setTimeout(() => { this.toastVisible = false; }, 2600);
    },

    metrics: [
      { label: 'Ventas del mes', value: '$4.180.000', note: 'datos demostrativos', icon: 'trending-up', color: 'bg-emerald-50 text-emerald-700' },
      { label: 'Pedidos', value: '124', note: 'últimos 30 días', icon: 'shopping-bag', color: 'bg-blue-50 text-brand-blue' },
      { label: 'Ticket promedio', value: '$18.450', note: 'por pedido', icon: 'receipt', color: 'bg-amber-50 text-amber-700' },
      { label: 'Clientes', value: '86', note: 'con al menos 1 compra', icon: 'users', color: 'bg-violet-50 text-violet-700' },
      { label: 'Stock bajo', value: '3 productos', note: 'necesitan reposición', icon: 'triangle-alert', color: 'bg-rose-50 text-rose-700' },
      { label: 'Pedidos pendientes', value: '5', note: 'por preparar o despachar', icon: 'clock', color: 'bg-slate-100 text-slate-700' },
    ],
    bestSellers: [
      { name: 'Limpiador Multiuso', sold: '142 u.', revenue: '$992.580' },
      { name: 'Detergente Concentrado', sold: '98 u.', revenue: '$930.020' },
      { name: 'Pack Limpieza Hogar', sold: '54 u.', revenue: '$1.187.460' },
    ],

    categories: [
      { name: 'Limpieza hogar', icon: 'home' },
      { name: 'Detergentes', icon: 'droplets' },
      { name: 'Desinfectantes', icon: 'shield-check' },
      { name: 'Aromatizantes', icon: 'flower-2' },
      { name: 'Packs', icon: 'package-plus' },
      { name: 'Accesorios', icon: 'brush' },
    ],

    products: [
      { name: 'Limpiador Multiuso', sku: 'SL001', category: 'Multiuso', price: 6990, stock: 86, status: 'Publicado', statusClass: 'bg-emerald-100 text-emerald-700', variants: null },
      { name: 'Detergente Concentrado', sku: 'SL002', category: 'Detergentes', price: 9490, stock: 34, status: 'Publicado', statusClass: 'bg-emerald-100 text-emerald-700', variants: '3 variantes · 1L / 3L / 5L' },
      { name: 'Pack Limpieza Hogar', sku: 'SL003', category: 'Packs', price: 21990, stock: 18, status: 'Oferta', statusClass: 'bg-amber-100 text-amber-700', variants: null },
      { name: 'Aromatizante Frescura', sku: 'SL004', category: 'Aromatizantes', price: 4990, stock: 52, status: 'Borrador', statusClass: 'bg-slate-100 text-slate-600', variants: null },
    ],

    showProductModal: false,
    newProduct: { name: '', description: '', price: '', compareAtPrice: '', sku: '', category: 'Multiuso', stock: '', status: 'Publicado' },
    openProductModal() {
      this.newProduct = { name: '', description: '', price: '', compareAtPrice: '', sku: '', category: 'Multiuso', stock: '', status: 'Publicado' };
      this.showProductModal = true;
      this.icons();
    },
    closeProductModal() { this.showProductModal = false; },
    submitProduct() {
      this.showProductModal = false;
      this.notify('Producto creado (demo) · no se guarda realmente');
    },

    orders: [
      {
        id: '#1042', customer: 'María González', address: 'Viña del Mar', total: 24970, paid: 'Pagado', fulfillment: 'Preparando', time: 'Hoy 15:32', badgeClass: 'bg-blue-100 text-brand-blue',
        items: [{ name: 'Limpiador Multiuso', qty: 2, price: 6990 }, { name: 'Aromatizante Frescura', qty: 1, price: 4990 }],
        timeline: [
          { time: '15:31', label: 'Pedido recibido' },
          { time: '15:32', label: 'Pago confirmado' },
          { time: '15:35', label: 'Preparación iniciada' },
          { time: '16:15', label: 'Pedido listo' },
          { time: '16:40', label: 'Despachado' },
        ],
      },
      {
        id: '#1041', customer: 'Comercial Norte SpA', address: 'Quilpué', total: 78450, paid: 'Transferencia', fulfillment: 'Preparando', time: 'Hoy 12:05', badgeClass: 'bg-blue-100 text-brand-blue',
        items: [{ name: 'Detergente Concentrado', qty: 6, price: 9490 }],
        timeline: [
          { time: '12:04', label: 'Pedido recibido' },
          { time: '12:05', label: 'Pago confirmado' },
          { time: '12:20', label: 'Preparación iniciada' },
        ],
      },
      {
        id: '#1040', customer: 'Ignacio Pérez', address: 'Valparaíso', total: 16980, paid: 'Pagado', fulfillment: 'Enviado', time: 'Ayer 18:47', badgeClass: 'bg-amber-100 text-amber-700',
        items: [{ name: 'Pack Limpieza Hogar', qty: 1, price: 21990 }],
        timeline: [
          { time: '18:47', label: 'Pedido recibido' },
          { time: '18:48', label: 'Pago confirmado' },
          { time: '19:10', label: 'Preparación iniciada' },
          { time: '20:02', label: 'Pedido listo' },
          { time: '20:30', label: 'Despachado' },
        ],
      },
      {
        id: '#1038', customer: 'María González', address: 'Viña del Mar', total: 18990, paid: 'Pagado', fulfillment: 'Entregado', time: '3 días atrás', badgeClass: 'bg-emerald-100 text-emerald-700',
        items: [{ name: 'Limpiador Multiuso', qty: 1, price: 6990 }, { name: 'Detergente Concentrado', qty: 1, price: 9490 }],
        timeline: [
          { time: 'Día 1 · 10:02', label: 'Pedido recibido' },
          { time: 'Día 1 · 10:03', label: 'Pago confirmado' },
          { time: 'Día 1 · 11:30', label: 'Despachado' },
          { time: 'Día 2 · 09:15', label: 'Entregado' },
        ],
      },
    ],
    orderStatuses: ['Pedido recibido', 'Pago confirmado', 'Preparando', 'Listo para despacho', 'Enviado', 'Entregado'],
    selectedOrder: null,
    openOrder(order) { this.selectedOrder = order; this.icons(); },
    closeOrder() { this.selectedOrder = null; },

    customers: [
      { initials: 'MG', name: 'María González', email: 'maria.gonzalez@mail.com', phone: '+56 9 1234 5678', type: 'Cliente frecuente', segment: 'Frecuente', badgeClass: 'bg-emerald-100 text-emerald-700', orders: 7, total: 154000, last: 'Hoy', history: [{ id: '#1042', total: 24970 }, { id: '#1038', total: 18990 }] },
      { initials: 'CN', name: 'Comercial Norte SpA', email: 'compras@comercialnorte.cl', phone: '+56 32 245 9012', type: 'Empresa', segment: 'Mayorista', badgeClass: 'bg-blue-100 text-brand-blue', orders: 12, total: 890000, last: 'Hoy', history: [{ id: '#1041', total: 78450 }] },
      { initials: 'IP', name: 'Ignacio Pérez', email: 'ignacio.perez@mail.com', phone: '+56 9 8765 4321', type: 'Nuevo cliente', segment: 'Nuevo', badgeClass: 'bg-slate-100 text-slate-600', orders: 1, total: 16980, last: 'Ayer', history: [{ id: '#1040', total: 16980 }] },
      { initials: 'FS', name: 'Francisca Soto', email: 'francisca.soto@mail.com', phone: '+56 9 3344 5566', type: 'Cliente VIP', segment: 'VIP', badgeClass: 'bg-violet-100 text-violet-700', orders: 21, total: 1420000, last: 'Hace 4 días', history: [{ id: '#1019', total: 45900 }, { id: '#0988', total: 61200 }] },
    ],

    promos: [
      { code: 'BIENVENIDA10', title: 'Código de descuento', text: '10% de descuento para nuevos clientes con un código simple de compartir.', icon: 'ticket-percent', iconBg: 'bg-amber-50 text-amber-700' },
      { code: 'AUTO15', title: 'Descuento automático', text: '15% aplicado automáticamente en productos seleccionados, sin código.', icon: 'sparkles', iconBg: 'bg-blue-50 text-brand-blue' },
      { code: 'ENVIO30K', title: 'Promoción por monto', text: 'Despacho gratis para compras desde $30.000.', icon: 'truck', iconBg: 'bg-emerald-50 text-emerald-700' },
      { code: 'PACK3', title: 'Packs', text: 'Compra 3 productos y obtén 10% de descuento en el total.', icon: 'package-plus', iconBg: 'bg-violet-50 text-violet-700' },
      { code: 'REGALO2X1', title: 'Compra X, recibe Y', text: 'Compra 2 detergentes y recibe 1 aromatizante de regalo.', icon: 'gift', iconBg: 'bg-rose-50 text-rose-700' },
    ],
    showPromoModal: false,
    newPromo: { type: 'Código de descuento', code: '', value: '' },
    openPromoModal() {
      this.newPromo = { type: 'Código de descuento', code: '', value: '' };
      this.showPromoModal = true;
      this.icons();
    },
    closePromoModal() { this.showPromoModal = false; },
    submitPromo() {
      this.showPromoModal = false;
      this.notify('Promoción creada (demo) · no se guarda realmente');
    },

    paymentStates: ['Pendiente', 'Autorizado', 'Pagado', 'Reembolsado', 'Fallido'],
    shippingMethods: [
      { name: 'Despacho Viña del Mar', price: 3990 },
      { name: 'Despacho Región de Valparaíso', price: 5990 },
      { name: 'Retiro en tienda', price: 0 },
    ],

    settingsCards: [
      { title: 'Datos de la tienda', icon: 'store', items: ['Nombre: SaltoLimpieza', 'Logo cargado', 'Email de contacto', 'Teléfono de contacto'] },
      { title: 'Moneda y región', icon: 'globe', items: ['Moneda: CLP', 'País: Chile'] },
      { title: 'Medios de pago', icon: 'credit-card', items: ['Configurables según integración', 'Ver detalle en Crecimiento → Integraciones'] },
      { title: 'Envíos', icon: 'truck', items: ['Zonas y tarifas propias', 'Retiro en tienda disponible'] },
      { title: 'Usuarios', icon: 'user-cog', items: ['Administradores futuros', 'Permisos por rol (fase futura)'] },
    ],

    benefits: [
      { icon: 'shield-check', title: 'Compra segura', text: 'Checkout claro y protegido para tus clientes.' },
      { icon: 'truck', title: 'Despacho', text: 'Cobertura regional con tarifas definidas.' },
      { icon: 'headset', title: 'Atención', text: 'Canal directo para resolver dudas.' },
      { icon: 'sparkles', title: 'Productos seleccionados', text: 'Catálogo curado para el hogar y la empresa.' },
    ],

    catalogProducts: [
      { name: 'Limpiador Multiuso', category: 'Multiuso', price: 6990, rating: 4, image: 'M' },
      { name: 'Detergente Concentrado', category: 'Detergentes', price: 9490, rating: 5, image: 'D' },
      { name: 'Pack Limpieza Hogar', category: 'Packs', price: 21990, rating: 4, image: 'P' },
      { name: 'Aromatizante Frescura', category: 'Aromatizantes', price: 4990, rating: 4, image: 'A' },
      { name: 'Desinfectante Multisuperficie', category: 'Desinfectantes', price: 7490, rating: 5, image: 'D' },
      { name: 'Set de Accesorios de Limpieza', category: 'Accesorios', price: 12990, rating: 4, image: 'S' },
    ],
    catalogCategoryFilter: 'Todas',
    get catalogCategories() {
      return ['Todas', ...new Set(this.catalogProducts.map(p => p.category))];
    },
    get filteredCatalog() {
      if (this.catalogCategoryFilter === 'Todas') return this.catalogProducts;
      return this.catalogProducts.filter(p => p.category === this.catalogCategoryFilter);
    },

    productDetail: {
      name: 'Detergente Concentrado',
      description: 'Detergente concentrado de alto rendimiento, ideal para uso doméstico e industrial. Rinde hasta 3 veces más que un detergente tradicional.',
      features: ['Alto rendimiento', 'Apto para ropa de color', 'Fragancia duradera'],
      shippingNote: 'Despacho disponible en Viña del Mar y Región de Valparaíso, o retiro en tienda.',
      variants: [
        { label: '1 litro', price: 5990, sku: 'SL002-1L', stock: 40 },
        { label: '3 litros', price: 9490, sku: 'SL002-3L', stock: 34 },
        { label: '5 litros', price: 13990, sku: 'SL002-5L', stock: 12 },
      ],
    },
    selectedVariant: 0,
    productQty: 1,
    incQty() { this.productQty++; },
    decQty() { if (this.productQty > 1) this.productQty--; },

    cart: [],
    addToCart(name, price, variantLabel, qty) {
      qty = qty || 1;
      const key = name + (variantLabel || '');
      const existing = this.cart.find(i => i.key === key);
      if (existing) { existing.qty += qty; }
      else { this.cart.push({ key, name, price, variant: variantLabel || null, qty }); }
      this.cartOpen = true;
      this.icons();
    },
    removeFromCart(key) { this.cart = this.cart.filter(i => i.key !== key); },
    changeCartQty(key, delta) {
      const item = this.cart.find(i => i.key === key);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) this.removeFromCart(key);
    },
    get cartCount() { return this.cart.reduce((sum, i) => sum + i.qty, 0); },
    get cartSubtotal() { return this.cart.reduce((sum, i) => sum + i.qty * i.price, 0); },
    get cartShipping() { return this.cartSubtotal === 0 || this.cartSubtotal >= 30000 ? 0 : 3990; },
    get cartTotal() { return this.cartSubtotal + this.cartShipping; },

    checkoutStep: 1,
    checkoutSteps: ['Información', 'Dirección', 'Despacho', 'Pago'],
    checkoutForm: { name: '', email: '', phone: '', region: '', comuna: '', address: '', shippingMethod: 'Despacho Viña del Mar', paymentMethod: 'Webpay' },
    orderConfirmed: false,
    confirmedOrderId: '#1043',
    nextCheckoutStep() { if (this.checkoutStep < 4) this.checkoutStep++; else this.confirmCheckout(); this.icons(); },
    prevCheckoutStep() { if (this.checkoutStep > 1) this.checkoutStep--; },
    confirmCheckout() {
      this.orderConfirmed = true;
      this.cart = [];
      this.icons();
    },
    restartCheckout() {
      this.orderConfirmed = false;
      this.checkoutStep = 1;
      this.checkoutForm = { name: '', email: '', phone: '', region: '', comuna: '', address: '', shippingMethod: 'Despacho Viña del Mar', paymentMethod: 'Webpay' };
    },

    statusMeta: {
      incluido: { label: 'Incluido', class: 'bg-emerald-100 text-emerald-700' },
      configurable: { label: 'Configurable', class: 'bg-blue-100 text-brand-blue' },
      integrable: { label: 'Integrable', class: 'bg-violet-100 text-violet-700' },
      futuro: { label: 'Futuro / adicional', class: 'bg-slate-100 text-slate-600' },
    },
    integrationGroups: [
      { title: 'Medios de pago', icon: 'credit-card', items: [
        { name: 'Webpay / Transbank', text: 'El medio de pago más usado en Chile.', status: 'integrable' },
        { name: 'Mercado Pago', text: 'Alternativa de cobro con tarjetas y saldo en cuenta.', status: 'integrable' },
        { name: 'Transferencia bancaria', text: 'Requiere confirmación manual del pago.', status: 'configurable' },
      ]},
      { title: 'Logística y despacho', icon: 'truck', items: [
        { name: 'Chilexpress', text: 'Despacho a domicilio a nivel nacional.', status: 'integrable' },
        { name: 'Blue Express', text: 'Cobertura alternativa de despacho.', status: 'integrable' },
        { name: 'Starken', text: 'Cobertura alternativa de despacho.', status: 'integrable' },
        { name: 'Despacho propio', text: 'Zonas y tarifas definidas por SaltoLimpieza.', status: 'configurable' },
      ]},
      { title: 'Facturación', icon: 'file-text', items: [
        { name: 'Facturación electrónica / ERP', text: 'El e-commerce puede conectarse posteriormente con un sistema de facturación o ERP para automatizar la emisión de documentos tributarios.', status: 'futuro' },
      ]},
      { title: 'WhatsApp', icon: 'message-circle', items: [
        { name: 'Confirmación y seguimiento de pedidos', text: 'Avisos de pedido despachado, recuperación de carrito, atención automática y consultas de stock.', status: 'futuro' },
      ]},
      { title: 'Emails', icon: 'mail', items: [
        { name: 'Emails transaccionales', text: 'Pedido recibido, pago confirmado y pedido enviado.', status: 'incluido' },
        { name: 'Email marketing', text: 'Recuperación de carrito, clientes inactivos, cupones y recompra.', status: 'futuro' },
      ]},
      { title: 'CRM y venta B2B', icon: 'building-2', items: [
        { name: 'CRM y segmentación avanzada', text: 'Cliente → compra → segmentación → campaña → recompra.', status: 'futuro' },
        { name: 'Venta mayorista / B2B', text: 'Precio mayorista, listas de precio, mínimos de compra y cotización.', status: 'futuro' },
      ]},
      { title: 'Analytics y SEO', icon: 'bar-chart-3', items: [
        { name: 'Estructura SEO por producto', text: 'Título, meta descripción y URL amigable en cada producto y categoría.', status: 'incluido' },
        { name: 'Google Analytics / Meta Pixel / Google Ads', text: 'Permiten medir qué campañas generan visitas, productos vistos, carritos y compras.', status: 'integrable' },
      ]},
    ],

    roadmapStages: [
      { phase: 'Etapa 1 · Lanzamiento', badge: 'Incluido', badgeClass: 'bg-emerald-100 text-emerald-700', items: ['E-commerce', 'Productos', 'Inventario', 'Pedidos', 'Clientes', 'Promociones', 'Panel administrativo', 'Checkout', 'Configuración inicial'] },
      { phase: 'Etapa 2 · Optimización', badge: 'Opcional', badgeClass: 'bg-blue-100 text-brand-blue', items: ['Analytics', 'Meta Pixel', 'SEO avanzado', 'Automatizaciones'] },
      { phase: 'Etapa 3 · Automatización', badge: 'Opcional', badgeClass: 'bg-violet-100 text-violet-700', items: ['WhatsApp', 'Email marketing', 'Recuperación de carrito', 'CRM'] },
      { phase: 'Etapa 4 · Escala', badge: 'Opcional', badgeClass: 'bg-slate-100 text-slate-600', items: ['ERP', 'Facturación', 'Venta mayorista / B2B', 'Integraciones logísticas'] },
    ],
  };
}

document.addEventListener('alpine:init', () => requestAnimationFrame(() => window.lucide && lucide.createIcons()));

window.addEventListener('load', () => {
  window.lucide && lucide.createIcons();
  const canvas = document.getElementById('salesChart');
  if (canvas) {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'],
        datasets: [{
          label: 'Pedidos demo',
          data: [12, 18, 26, 29, 36, 44],
          tension: 0.35,
          borderColor: '#0E54B7',
          backgroundColor: 'rgba(14,84,183,.10)',
          borderWidth: 3,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: '#FFD62E',
          pointBorderColor: '#0E54B7',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#64748B' } },
          y: { grid: { color: 'rgba(148,163,184,.15)' }, ticks: { color: '#64748B' } },
        },
      },
    });
  }
});
