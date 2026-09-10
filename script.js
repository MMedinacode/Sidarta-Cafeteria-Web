/* ============================================================
   DATOS DEL NEGOCIO
   ============================================================ */

// HORARIO REAL confirmado vía Instagram @sidarta_cafeteria. Domingo no mencionado: se asume cerrado.
const HOURS = {
  0: [], 1:[[7,19]], 2:[[7,19]], 3:[[7,19]],
  4:[[7,19]], 5:[[7,19]], 6:[[10,14]]
};

const WHATSAPP_NUMBER = "56989378521";

// CATÁLOGO — precios tomados del menú físico fotografiado (@sidarta_cafeteria).
const MENU = [
  // --- CALIENTES ---
  { id:'c1', cat:'Calientes', name:'Espresso', price:2400, desc:'Simple $2.400 · Doble $3.800.' },
  { id:'c2', cat:'Calientes', name:'Americano', price:2400, desc:'Simple $2.400 · Doble $3.800.' },
  { id:'c3', cat:'Calientes', name:'Capuchino', price:3200, desc:'Simple $3.200 · Doble $4.400.' },
  { id:'c4', cat:'Calientes', name:'Latte', price:3200, desc:'Simple $3.200 · Doble $4.400.' },
  { id:'c5', cat:'Calientes', name:'Latte Syrup', price:3500, desc:'Simple $3.500 · Doble $4.500.' },
  { id:'c6', cat:'Calientes', name:'Mocachino', price:3500, desc:'Simple $3.500 · Doble $4.500.' },
  { id:'c7', cat:'Calientes', name:'Irlandés', price:4400, desc:'Simple $4.400 · Doble $4.900.' },
  { id:'c8', cat:'Calientes', name:'Chocolate Caliente', price:3300, desc:'Simple $3.300 · Doble $4.400.' },
  { id:'c9', cat:'Calientes', name:'Chai Latte', price:3500, desc:'Especias de chai con leche vaporizada.' },
  { id:'c10', cat:'Calientes', name:'Tetera de Té de Hoja', price:2500, desc:'Variedades disponibles en el local.' },
  { id:'c11', cat:'Calientes', name:'Chemex', price:4500, desc:'Filtrado en Chemex.' },
  { id:'c12', cat:'Calientes', name:'Prensa Francesa', price:4500, desc:'Filtrado en prensa francesa.' },

  // --- FRÍAS ---
  { id:'f1', cat:'Frías', name:'Americano Iced', price:3900, desc:'Espresso con agua fría.' },
  { id:'f2', cat:'Frías', name:'Latte Iced', price:4500, desc:'Espresso con leche fría.' },
  { id:'f3', cat:'Frías', name:'Chocolate Iced', price:3900, desc:'Chocolate helado.' },
  { id:'f4', cat:'Frías', name:'Jugo 400cc', price:2550, desc:'Jugo natural del día.' },
  { id:'f5', cat:'Frías', name:'Limonada Menta Jengibre', price:2550, desc:'Limonada natural con menta y jengibre.' },
  { id:'f6', cat:'Frías', name:'Leche con Plátano', price:3990, desc:'Batido de leche con plátano.' },
  { id:'f7', cat:'Frías', name:'Smoothie', price:3990, desc:'Smoothie de fruta.' },
  { id:'f8', cat:'Frías', name:'Milkshake', price:3990, desc:'Milkshake de la casa.' },
  { id:'f9', cat:'Frías', name:'Café Helado', price:4800, desc:'Preparación fría de la casa.' },
  { id:'f10', cat:'Frías', name:'Bebida en Lata', price:1800, desc:'Bebida en lata.' },
  { id:'f11', cat:'Frías', name:'Agua Mineral', price:1800, desc:'Con o sin gas.' },

  // --- HELADOS ---
  { id:'h1', cat:'Helados', name:'Helado en Cono o Copa', price:2000, desc:'Simple $2.000 · Doble $3.500 · Triple $5.000.', img:'fotos/helado-en-cono-o-copa.jpg' },
  { id:'h2', cat:'Helados', name:'Copa Sidarta', price:6000, desc:'3 bolas de helado + salsa + topping.', img:'fotos/helado-en-cono-o-copa.jpg' },
  { id:'h3', cat:'Helados', name:'Affogato', price:3990, desc:'Simple $3.990 · Doble $4.990.', img:'fotos/helado-en-cono-o-copa.jpg' },
  { id:'h4', cat:'Helados', name:'Brownie con Helado', price:3500, desc:'Brownie de la casa con helado.', img:'fotos/helado-en-cono-o-copa.jpg' },

  // --- TORTAS Y BOLLERÍA ---
  { id:'b1', cat:'Tortas y Bollería', name:'Medialuna Tradicional', price:1500, desc:'Medialuna clásica.' },
  { id:'b2', cat:'Tortas y Bollería', name:'Muffin', price:2000, desc:'Cocho, chips o arándano.' },
  { id:'b3', cat:'Tortas y Bollería', name:'Brownie', price:2500, desc:'Brownie artesanal.' },
  { id:'b4', cat:'Tortas y Bollería', name:'Torta (variedades)', price:3500, desc:'Precio desde $3.500 a $4.900 según variedad.' },
  { id:'b5', cat:'Tortas y Bollería', name:'Donas', price:1800, desc:'Chocolate o frutilla.' },
  { id:'b6', cat:'Tortas y Bollería', name:'Galletón (variedades)', price:600, desc:'Precio desde $600 a $1.500 según variedad.' },
];

const CATEGORIES = ['Calientes','Frías','Helados','Tortas y Bollería'];

/* ============================================================
   ESTADO
   ============================================================ */
let activeCat = 'Calientes';
let cart = {};
const fmt = n => '$' + n.toLocaleString('es-CL');

/* ============================================================
   RENDER CARTA
   ============================================================ */
function renderFilters(){
  const wrap = document.getElementById('cat-filters');
  wrap.innerHTML = CATEGORIES.map(c =>
    `<button class="cat-btn px-4 py-2 text-[11px] tracker uppercase ${c===activeCat?'active':''}" data-cat="${c}">${c}</button>`
  ).join('');
  wrap.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{ activeCat = btn.dataset.cat; renderFilters(); renderMenu(); });
  });
}

function renderMenu(){
  const list = document.getElementById('menu-list');
  const items = MENU.filter(i => i.cat === activeCat);
  list.innerHTML = items.map(i => `
    <div class="card-item grid grid-cols-[1fr,auto] items-center gap-4 py-5" data-id="${i.id}">
      <div>
        <h4 class="serif text-xl md:text-2xl">${i.name}</h4>
        <p class="text-xs max-w-md" style="color:var(--wood)">${i.desc}</p>
      </div>
      <span class="text-sm">${fmt(i.price)}</span>
    </div>
  `).join('');
  list.querySelectorAll('.card-item').forEach(el=>{
    el.addEventListener('click', ()=> openModal(el.dataset.id));
  });
}

/* ============================================================
   MODAL PRODUCTO
   ============================================================ */
const modal = document.getElementById('product-modal');
let currentProduct = null;
function openModal(id){
  const item = MENU.find(m=>m.id===id);
  currentProduct = item;
  document.getElementById('modal-img').src = item.img;
  document.getElementById('modal-img').alt = item.name;
  document.getElementById('modal-cat').textContent = item.cat;
  document.getElementById('modal-name').textContent = item.name;
  document.getElementById('modal-desc').textContent = item.desc;
  document.getElementById('modal-price').textContent = fmt(item.price);
  modal.classList.remove('hidden');
  requestAnimationFrame(()=>{ modal.classList.remove('opacity-0','invisible'); });
}
function closeModal(){
  modal.classList.add('opacity-0','invisible');
  setTimeout(()=> modal.classList.add('hidden'), 300);
}
document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });
document.getElementById('modal-add').addEventListener('click', ()=>{
  if(currentProduct){ addToCart(currentProduct.id); closeModal(); openCart(); }
});

/* ============================================================
   CARRITO
   ============================================================ */
function addToCart(id){ cart[id] = (cart[id]||0)+1; renderCart(); }
function changeQty(id, delta){
  cart[id] = (cart[id]||0) + delta;
  if(cart[id] <= 0) delete cart[id];
  renderCart();
}
function renderCart(){
  const wrap = document.getElementById('cart-items');
  const ids = Object.keys(cart);
  const countEl = document.getElementById('cart-count');
  const totalCount = ids.reduce((s,id)=>s+cart[id],0);
  countEl.textContent = totalCount;
  countEl.classList.toggle('hidden', totalCount===0);

  if(ids.length===0){
    wrap.innerHTML = '<p id="cart-empty" class="text-sm text-center py-10" style="color:var(--wood)">Todavía no agregas nada. Vuelve a la carta y elige algo rico.</p>';
  } else {
    wrap.innerHTML = ids.map(id=>{
      const item = MENU.find(m=>m.id===id);
      return `
      <div class="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <p class="text-sm">${item.name}</p>
          <p class="text-xs" style="color:var(--wood)">${fmt(item.price)}</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="w-6 h-6 border border-[var(--line)]" data-act="minus" data-id="${id}">–</button>
          <span class="text-sm w-4 text-center">${cart[id]}</span>
          <button class="w-6 h-6 border border-[var(--line)]" data-act="plus" data-id="${id}">+</button>
        </div>
      </div>`;
    }).join('');
    wrap.querySelectorAll('button[data-act]').forEach(btn=>{
      btn.addEventListener('click', ()=> changeQty(btn.dataset.id, btn.dataset.act==='plus'?1:-1));
    });
  }
  const total = ids.reduce((s,id)=> s + cart[id]*MENU.find(m=>m.id===id).price, 0);
  document.getElementById('cart-total').textContent = fmt(total);
}

const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
function openCart(){
  cartOverlay.classList.remove('hidden');
  requestAnimationFrame(()=>{
    cartOverlay.classList.remove('opacity-0','invisible');
    cartDrawer.classList.remove('translate-x-full');
  });
}
function closeCart(){
  cartDrawer.classList.add('translate-x-full');
  cartOverlay.classList.add('opacity-0','invisible');
  setTimeout(()=> cartOverlay.classList.add('hidden'), 300);
}
document.getElementById('cart-toggle').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

document.getElementById('cart-whatsapp').addEventListener('click', ()=>{
  const ids = Object.keys(cart);
  if(ids.length===0){ return; }
  const delivery = document.querySelector('input[name="delivery"]:checked').value;
  const deliveryLabel = delivery === 'retiro' ? 'Retiro en local (Calle Centenario N°46, Local 2)' : 'Entrega a domicilio (a confirmar cobertura y costo)';
  let msg = 'Hola! Quiero hacer un pedido en Sidarta:%0A%0A';
  let total = 0;
  ids.forEach(id=>{
    const item = MENU.find(m=>m.id===id);
    const qty = cart[id];
    total += qty*item.price;
    msg += `• ${qty}x ${item.name} — ${fmt(item.price*qty)}%0A`;
  });
  msg += `%0ATotal: ${fmt(total)}%0AMétodo: ${deliveryLabel}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
});

document.getElementById('wa-visit').addEventListener('click', (e)=>{
  e.preventDefault();
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Quisiera%20consultar%20por%20Sidarta.`, '_blank');
});

document.querySelectorAll('.wa-service').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const service = btn.dataset.service;
    const msg = encodeURIComponent(`Hola! Quisiera reservar: ${service}.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  });
});

/* ============================================================
   HORARIO / ABIERTO-CERRADO EN VIVO
   ============================================================ */
function computeStatus(){
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours()*60 + now.getMinutes();
  const ranges = HOURS[day] || [];
  let open = false, nextChange = null;
  ranges.forEach(([from,to])=>{
    const f = from*60, t = to*60;
    if(minutes >= f && minutes < t){ open = true; nextChange = t; }
  });
  return { open, nextChange };
}
function paintStatus(){
  const { open, nextChange } = computeStatus();
  let label;
  if(open){
    const h = Math.floor(nextChange/60), m = String(Math.round(nextChange%60)).padStart(2,'0');
    label = `Abierto ahora · cierra ${h}:${m}`;
  } else {
    label = 'Cerrado ahora';
  }
  [['hero-status-dot','hero-status-text'],['visit-status-dot','visit-status-text']].forEach(([dotId,textId])=>{
    const dot = document.getElementById(dotId);
    const text = document.getElementById(textId);
    if(dot && text){
      dot.className = `w-2 h-2 rounded-full ${open ? 'bg-green-400' : 'bg-red-400'}`;
      text.textContent = label;
    }
  });
}

/* ============================================================
   NAVEGACIÓN SPA POR PESTAÑAS
   ============================================================ */
const panels = document.querySelectorAll('.tab-panel');
const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
},{ threshold:0.15 });

function goToTab(tabId){
  panels.forEach(p => p.classList.toggle('active', p.dataset.tabPanel === tabId));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.tab === tabId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('main-nav').classList.remove('open');
  const activePanel = document.querySelector('.tab-panel.active');
  if(activePanel) activePanel.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));
}

document.querySelectorAll('[data-tab]').forEach(el=>{
  el.addEventListener('click', (e)=>{
    e.preventDefault();
    goToTab(el.dataset.tab);
  });
});

document.getElementById('menu-toggle').addEventListener('click', ()=>{
  document.getElementById('main-nav').classList.toggle('open');
});

document.getElementById('hero-contest-btn').addEventListener('click', ()=>{
  goToTab('visitanos');
  setTimeout(()=>{
    document.querySelector('.contest-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 350);
});

document.querySelector('.tab-panel.active').querySelectorAll('.fade-up').forEach(el=> revealObserver.observe(el));

renderFilters();
renderMenu();
renderCart();
paintStatus();
setInterval(paintStatus, 60000);
