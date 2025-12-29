// Sample menu data. Replace or extend items as you like.
const MENU = [
  {
    id: 1,
    title: "Tomato Basil Bruschetta",
    category: "Starters",
    price: "₹129",
    img: "https://images.unsplash.com/photo-1604908177522-3d6f06a3b3f9?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=1c7b1f8a0cd6e2a0f7c7a0b7b7f8c2c0",
    desc: "Toasted baguette topped with fresh tomato, basil, garlic and a drizzle of olive oil."
  },
  {
    id: 2,
    title: "Classic Margherita Pizza",
    category: "Mains",
    price: "₹349",
    img: "https://images.unsplash.com/photo-1548365328-9b6f5b3f0e7f?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=3a9d6b8f4c2a9b3f6a1b2c3d4e5f6789",
    desc: "Stone-baked pizza with fresh mozzarella, tomato sauce and basil."
  },
  {
    id: 3,
    title: "Grilled Chicken Sandwich",
    category: "Mains",
    price: "₹289",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=8ddd5b0a1b7d8a9f2c3e4f5a6b7c8d9e",
    desc: "Tender grilled chicken with fresh greens, tomato and aioli on toasted bread."
  },
  {
    id: 4,
    title: "Chocolate Lava Cake",
    category: "Desserts",
    price: "₹149",
    img: "https://images.unsplash.com/photo-1604908177527-1a6b0e2f9b3d?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    desc: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream."
  },
  {
    id: 5,
    title: "Lemon Iced Tea",
    category: "Drinks",
    price: "₹99",
    img: "https://images.unsplash.com/photo-1564510714747-8b33e3dba7d9?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=7f6d5c4b3a2b1c0d9e8f7a6b5c4d3e2f",
    desc: "Refreshing lemon iced tea with a hint of mint."
  }
];

// DOM
const menuEl = document.getElementById('menu');
const filters = Array.from(document.querySelectorAll('.filter-btn'));
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalClose = document.getElementById('modal-close');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

function renderMenu(items){
  if(!items.length){
    menuEl.innerHTML = '<p style="color:#666">No items match your search.</p>';
    return;
  }
  menuEl.innerHTML = items.map(item => `
    <article class="card" tabindex="0" data-id="${item.id}">
      <img src="${item.img}" alt="${escapeHtml(item.title)}" loading="lazy" />
      <div class="card-body">
        <div>
          <h3 class="card-title">${escapeHtml(item.title)}</h3>
          <p class="description">${escapeHtml(truncate(item.desc, 90))}</p>
        </div>
        <div class="card-meta">
          <span class="cat-badge">${escapeHtml(item.category)}</span>
          <span class="price">${escapeHtml(item.price)}</span>
        </div>
      </div>
    </article>
  `).join('');

  // attach click to open modal
  Array.from(menuEl.querySelectorAll('.card')).forEach(card=>{
    card.addEventListener('click', ()=> openModal(card.dataset.id));
    card.addEventListener('keypress', (e)=> { if(e.key === 'Enter') openModal(card.dataset.id); });
  });
}

function openModal(id){
  const item = MENU.find(i => String(i.id) === String(id));
  if(!item) return;
  modalImg.src = item.img;
  modalImg.alt = item.title;
  modalTitle.textContent = item.title;
  modalDesc.textContent = item.desc;
  modalPrice.textContent = item.price;
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(){
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=> { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeModal(); });

// Filtering
filters.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.dataset.category;
    applyFilters({category, query: searchInput.value.trim()});
  });
});

searchInput.addEventListener('input', ()=>{
  const active = document.querySelector('.filter-btn.active');
  const category = active ? active.dataset.category : 'All';
  applyFilters({category, query: searchInput.value.trim()});
});

function applyFilters({category='All', query=''}){
  let items = MENU.slice();
  if(category && category !== 'All'){
    items = items.filter(i => i.category === category);
  }
  if(query){
    const q = query.toLowerCase();
    items = items.filter(i => (i.title + ' ' + i.desc + ' ' + i.category).toLowerCase().includes(q));
  }
  renderMenu(items);
}

// Helpers
function truncate(text, n){
  return text.length > n ? text.slice(0,n-1) + '…' : text;
}
function escapeHtml(str){
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}

// Initialize
renderMenu(MENU);
