// common small helpers
document.getElementById('year')?.append(new Date().getFullYear());

// Simple global cart API for cross-page use
window.Cart = {
  key: 'tutto_cart',
  get(){ return JSON.parse(localStorage.getItem(this.key)||'[]'); },
  save(items){ localStorage.setItem(this.key, JSON.stringify(items)); window.dispatchEvent(new Event('cart:update')); },
  add(item){ const items = this.get(); const idx = items.findIndex(x=>x.name===item.name);
    if(idx>-1){ items[idx].qty += item.qty||1; } else { items.push({...item, qty:item.qty||1}); } this.save(items); alert('Zum Warenkorb hinzugefügt.'); },
  remove(name){ const items=this.get().filter(i=>i.name!==name); this.save(items); },
  setQty(name, qty){ const items=this.get(); const it=items.find(i=>i.name===name); if(it){ it.qty=Math.max(1, qty); this.save(items); }},
  clear(){ localStorage.removeItem(this.key); window.dispatchEvent(new Event('cart:update')); }
};