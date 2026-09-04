const listings = [
  { name: 'PlayStation 5', detail: 'Disc Edition · 825GB', category: 'consoles', label: 'Like new', price: '₹39,500', location: 'Mumbai', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=85' },
  { name: 'Nintendo Switch OLED', detail: 'White · with case', category: 'consoles', label: 'Good find', price: '₹22,000', location: 'Bengaluru', image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=700&q=85' },
  { name: 'The Legend of Zelda', detail: 'Tears of the Kingdom · Switch', category: 'games', label: 'Mint', price: '₹3,200', location: 'Delhi', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=700&q=85' },
  { name: 'DualSense Controller', detail: 'Midnight Black · PS5', category: 'accessories', label: 'Popular', price: '₹4,200', location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=700&q=85' },
  { name: 'Xbox Series S', detail: '512GB · 2 controllers', category: 'consoles', label: 'Great shape', price: '₹19,500', location: 'Chennai', image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=700&q=85' },
  { name: 'Steam Deck', detail: '256GB LCD · original box', category: 'consoles', label: 'Rare find', price: '₹31,000', location: 'Pune', image: 'https://images.unsplash.com/photo-1640955014216-75201056c829?auto=format&fit=crop&w=700&q=85' },
  { name: 'DualShock 4', detail: 'Glacier White · PS4', category: 'accessories', label: 'Good', price: '₹2,100', location: 'Kolkata', image: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?auto=format&fit=crop&w=700&q=85' },
  { name: 'EA Sports FC 25', detail: 'PS5 · sealed copy', category: 'games', label: 'Sealed', price: '₹2,800', location: 'Jaipur', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=700&q=85' }
];

const grid = document.querySelector('#listings-grid');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#search-input');
let activeFilter = 'all';

function renderListings() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = listings.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesQuery = !query || `${item.name} ${item.detail} ${item.location}`.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });
  grid.innerHTML = filtered.map((item) => `
    <article class="listing-card">
      <div class="listing-image"><img src="${item.image}" alt="${item.name}" loading="lazy"><span class="listing-tag">${item.label}</span><button class="heart-btn" aria-label="Save ${item.name}"><i data-lucide="heart"></i></button></div>
      <div class="listing-info"><div class="listing-category">${item.category}</div><h3 class="listing-name">${item.name}</h3><div class="listing-meta"><span class="listing-price">${item.price}</span><span class="listing-location">${item.location}</span></div></div>
    </article>`).join('');
  emptyState.style.display = filtered.length ? 'none' : 'block';
  grid.style.display = filtered.length ? 'grid' : 'none';
  lucide.createIcons();
}

document.querySelectorAll('.filter-btn').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderListings();
  });
});
searchInput.addEventListener('input', renderListings);
grid.addEventListener('click', (event) => {
  const heart = event.target.closest('.heart-btn');
  if (heart) { heart.classList.toggle('saved'); heart.querySelector('svg').setAttribute('data-lucide', heart.classList.contains('saved') ? 'heart' : 'heart'); lucide.createIcons(); }
});

const modal = document.querySelector('#sell-modal');
const toast = document.querySelector('#toast');
function openModal() { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); modal.querySelector('input').focus(); }
function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
document.querySelectorAll('[data-action="sell"]').forEach((button) => button.addEventListener('click', openModal));
document.querySelector('[data-close-modal]').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
document.querySelector('#sell-form').addEventListener('submit', (event) => {
  event.preventDefault();
  closeModal();
  toast.querySelector('span').textContent = 'Nice. Your listing draft is ready for photos.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
});

renderListings();
lucide.createIcons();
