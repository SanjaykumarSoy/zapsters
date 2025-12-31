// Sample Indian-focused menu data. Replace or extend items as you like.
const MENU = [
  {
    id: 1,
    title: "Masala Dosa",
    category: "South Indian",
    price: "₹119",
    img: "Masala-dosa-1.webp",
    desc: "Crispy rice crepe stuffed with spiced potato, served with coconut chutney and sambar. (South Indian favorite)"
  },
  {
    id: 2,
    title: "Idli with Sambar",
    category: "South Indian",
    price: "₹99",
    img: "02-idli-sambar.webp.jpeg",
    desc: "Steamed rice cakes (idli) served with hot sambar and two chutneys — coconut and tomato."
  },
  {
    id: 3,
    title: "Medu Vada",
    category: "South Indian",
    price: "₹129",
    img: "https://images.unsplash.com/photo-1589308078058-ef0f2cd7b4d8?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=5f4e3d2c1b0a9e8d7c6b5a4f3e2d1c0b",
    desc: "Crispy savory lentil doughnuts served with sambar and chutney. Popular South Indian snack."
  },
  {
    id: 4,
    title: "Paneer Butter Masala",
    category: "Mains",
    price: "₹249",
    img: "https://images.unsplash.com/photo-1604908177523-5c6f06a3b3f1?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=3b7e1a2c4d5f6a7b8c9d0e1f2a3b4c5d",
    desc: "Cottage cheese cubes simmered in a rich tomato–butter gravy with aromatic spices. Best with naan or rice."
  },
  {
    id: 5,
    title: "Hyderabadi Chicken Biryani",
    category: "Mains",
    price: "₹359",
    img: "https://images.unsplash.com/photo-1603079847493-6e3b9d5837c7?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=4c9d9b8a7e6f5d4c3b2a1f0e9d8c7b6a",
    desc: "Layered long-grain rice and marinated chicken cooked in the dum style with saffron and whole spices."
  },
  {
    id: 6,
    title: "Pav Bhaji",
    category: "Mains",
    price: "₹179",
    img: "https://images.unsplash.com/photo-1542736667-069246bdbc75?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=9d8c7b6a5f4e3d2c1b0a9e8d7c6b5a4f",
    desc: "Spiced mashed vegetable curry served with butter-toasted pav (bread). Street-food favorite from Maharashtra."
  },
  {
    id: 7,
    title: "Butter Naan",
    category: "Mains",
    price: "₹59",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d",
    desc: "Soft leavened flatbread brushed with butter — perfect to pair with gravies."
  },
  {
    id: 8,
    title: "Gulab Jamun",
    category: "Desserts",
    price: "₹89",
    img: "https://images.unsplash.com/photo-1564758866816-2e4b3a9f6b45?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e",
    desc: "Soft fried milk dumplings soaked in rose-scented sugar syrup. A beloved Indian dessert."
  },
  {
    id: 9,
    title: "Masala Chai",
    category: "Drinks",
    price: "₹39",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f",
    desc: "Strong spiced Indian tea brewed with milk, sugar and warming spices like cardamom and ginger."
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
