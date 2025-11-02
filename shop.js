// Render menu & cart logic
function euro(n){ return (n||0).toFixed(2).replace('.',',') + ' €'; }

function renderMenu(listId, items){
  const root = document.getElementById(listId);
  items.forEach(it=>{
    const div = document.createElement('div'); div.className='item';
    div.innerHTML = `<div class="row">
        <div><h4>${it.name}</h4><p>${it.desc||''}</p></div>
        <div class="row">
          <strong class="price">${euro(it.price)}</strong>
          <button class="btn small add">+</button>
        </div>
      </div>`;
    div.querySelector('.add').onclick=()=>window.Cart.add({name:it.name, price:it.price, qty:1});
    root.appendChild(div);
  });
}

fetch('menu.json').then(r=>r.json()).then(menu=>{
  renderMenu('list-pizzen', menu.pizzen);
  renderMenu('list-pasta', menu.pasta);
  renderMenu('list-salate', menu.salate);
  renderMenu('list-panini', menu.panini);
});

// Cart UI
const itemsRoot = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const deliveryEl = document.getElementById('delivery');
const totalEl = document.getElementById('total');
const form = document.getElementById('checkout-form');
const addressBox = document.getElementById('address-fields');

function recalc(){
  const items = window.Cart.get();
  itemsRoot.innerHTML='';
  let sum = 0;
  items.forEach(it=>{
    sum += it.price * it.qty;
    const row = document.createElement('div'); row.className='cart-line';
    row.innerHTML = `<div><strong>${it.name}</strong><br><small>${euro(it.price)} × ${it.qty}</small></div>
                     <div class="qty">
                       <button class="btn small" aria-label="Menge minus">-</button>
                       <span>${it.qty}</span>
                       <button class="btn small" aria-label="Menge plus">+</button>
                       <button class="btn small ghost" aria-label="Entfernen">✕</button>
                     </div>`;
    const [minus, plus, rm] = row.querySelectorAll('button');
    minus.onclick=()=>{ window.Cart.setQty(it.name, it.qty-1); };
    plus.onclick=()=>{ window.Cart.setQty(it.name, it.qty+1); };
    rm.onclick=()=>{ window.Cart.remove(it.name); };
    itemsRoot.appendChild(row);
  });
  subtotalEl.textContent = euro(sum);

  // delivery fee logic
  const mode = (new FormData(form).get('mode')) || 'abholung';
  let fee = 0;
  if(mode==='lieferung'){
    fee = sum >= 25 ? 0 : 2.50; // Beispielregel: ab 25€ frei
  }
  deliveryEl.textContent = euro(fee);
  totalEl.textContent = euro(sum + fee);
}

window.addEventListener('cart:update', recalc);
form?.addEventListener('change', (e)=>{
  const mode = (new FormData(form).get('mode'));
  addressBox.hidden = mode !== 'lieferung';
  recalc();
});

form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const items = window.Cart.get();
  if(!items.length){ alert('Warenkorb ist leer.'); return; }
  const data = Object.fromEntries(new FormData(form).entries());
  const sum = subtotalEl.textContent;
  const total = parseFloat(totalEl.textContent.replace('.','').replace(',','.'));
  const order = {
    id: Math.floor(Math.random()*1e6),
    ts: Date.now(),
    items,
    subtotal: sum,
    delivery_fee: deliveryEl.textContent,
    total,
    mode: data.mode,
    pay: data.pay,
    phone: data.phone||'',
    street: data.street||'',
    city: data.city||'',
    note: data.note||'',
    notes: data.notes||''
  };
  const all = JSON.parse(localStorage.getItem('tutto_orders')||'[]');
  all.push(order);
  localStorage.setItem('tutto_orders', JSON.stringify(all));
  window.Cart.clear();
  alert('Danke! Deine Bestellung wurde erfasst. Bei Lieferung rufen wir ggf. zur Bestätigung an.');
  location.href = './kasse.html';
});

// initial
recalc();