import './styles.css';

const restaurants = [
  {
    id: 'sambal-lab',
    name: 'Sambal Lab',
    category: 'Malaysian',
    detail: 'Modern nasi campur · 0.8 km',
    rating: '4.8',
    price: 'RM 18–28',
    priceValue: 23,
    accent: 'coral',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1100&q=84',
    tag: 'Best match',
    blurb: 'Big flavours, quick tables, and a sambal bar worth the walk.'
  },
  {
    id: 'common-man',
    name: 'Common Man Coffee',
    category: 'Cafe',
    detail: 'Coffee & brunch · 1.2 km',
    rating: '4.6',
    price: 'RM 16–32',
    priceValue: 24,
    accent: 'yellow',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=84',
    tag: 'Good for a reset',
    blurb: 'A bright corner for slow coffee, soft eggs, and a little headspace.'
  },
  {
    id: 'noodle-club',
    name: 'Noodle Club',
    category: 'Asian',
    detail: 'Hand-pulled noodles · 1.7 km',
    rating: '4.7',
    price: 'RM 14–22',
    priceValue: 18,
    accent: 'blue',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=84',
    tag: 'Under RM20',
    blurb: 'Springy noodles, rich broth, and the kind of meal that fixes a day.'
  },
  {
    id: 'bowl-story',
    name: 'Bowl Story',
    category: 'Healthy',
    detail: 'Rice bowls · 2.1 km',
    rating: '4.5',
    price: 'RM 20–30',
    priceValue: 25,
    accent: 'green',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=84',
    tag: 'Fresh pick',
    blurb: 'Colourful, balanced bowls with enough crunch to keep lunch interesting.'
  }
];

const icon = (name, size = 20) => {
  const paths = {
    compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15.7 8.3-2.2 4.9-4.9 2.2 2.2-4.9 4.9-2.2Z"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M7 3v4M17 3v4M3.5 9h17"/>',
    bookmark: '<path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z"/>',
    user: '<circle cx="12" cy="8" r="3.2"/><path d="M5.2 20a6.8 6.8 0 0 1 13.6 0"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.4 4.4"/>',
    arrow: '<path d="M5 12h13M13 6l6 6-6 6"/>',
    pin: '<path d="M19 10.2c0 5.1-7 10.3-7 10.3S5 15.3 5 10.2a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.2"/>',
    heart: '<path d="M20.8 8.9c0 5.7-8.8 10.3-8.8 10.3S3.2 14.6 3.2 8.9A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.6Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    sparkle: '<path d="m12 2 1.4 6.6L20 10l-6.6 1.4L12 18l-1.4-6.6L4 10l6.6-1.4L12 2ZM19 16l.6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    sliders: '<path d="M4 6h16M4 12h16M4 18h16M8 4v4M15 10v4M10 16v4"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>',
    more: '<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
    location: '<path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"/><circle cx="12" cy="10" r="2"/>',
    check: '<path d="m5 12 4.2 4L19 6"/>'
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.sparkle}</svg>`;
};

const state = {
  activeTab: 'explore',
  activeFilter: 'All picks',
  view: 'grid',
  saved: new Set(),
  expense: 428,
  query: ''
};

const filters = ['All picks', 'Open now', 'Under RM20', 'Cafe', 'Malaysian'];

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand-lockup">
        <div class="brand-mark"><span></span><span></span><span></span></div>
        <span class="brand-name">makan<span>what</span></span>
      </div>

      <div class="sidebar-date">
        <span class="eyebrow">YOUR FOOD COMPASS</span>
        <p id="today-date">Friday, 6 November</p>
      </div>

      <nav class="main-nav" aria-label="Main navigation">
        <button class="nav-item active" data-tab="explore">${icon('compass')}<span>Explore</span><span class="nav-pill">4</span></button>
        <button class="nav-item" data-tab="calendar">${icon('calendar')}<span>Calendar</span></button>
        <button class="nav-item" data-tab="activity">${icon('bookmark')}<span>Activity</span><span class="nav-dot"></span></button>
        <button class="nav-item" data-tab="profile">${icon('user')}<span>Profile</span></button>
      </nav>

      <div class="sidebar-spacer"></div>

      <div class="mini-summary">
        <div class="summary-top"><span>THIS MONTH</span>${icon('more', 18)}</div>
        <div class="summary-amount">RM <strong id="summary-expense">428</strong><span>.60</span></div>
        <div class="progress-track"><span></span></div>
        <div class="summary-bottom"><span>of RM 800 budget</span><span>53%</span></div>
      </div>

      <button class="profile-mini" data-tab="profile">
        <div class="avatar">TC</div><div><strong>Ting</strong><span>Personal account</span></div>${icon('chevron', 16)}
      </button>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div class="mobile-brand"><div class="brand-mark"><span></span><span></span><span></span></div><span class="brand-name">makan<span>what</span></span></div>
        <div class="topbar-location">${icon('pin', 17)}<span>Petaling Jaya</span>${icon('chevron', 14)}</div>
        <div class="topbar-actions"><button class="icon-button notification-button" aria-label="Notifications">${icon('sparkle', 19)}<span></span></button><button class="avatar avatar-small" data-tab="profile">TC</button></div>
      </header>

      <section class="page-view active-view" data-view="explore">
        <div class="hero-grid">
          <div class="hero-copy reveal">
            <div class="status-line"><span class="live-dot"></span> <span>GOOD AFTERNOON, TING</span></div>
            <h1>Find something<br/><em>worth eating.</em></h1>
            <p class="hero-subtitle">A little less scrolling. A lot more <span>“that was exactly what I needed.”</span></p>
            <form class="smart-search" id="smart-search">
              <div class="search-icon">${icon('sparkle', 21)}</div>
              <input id="search-input" autocomplete="off" placeholder="Try “warm noodles under RM20”" aria-label="Describe what you want to eat" />
              <button type="submit" class="search-submit" aria-label="Search">${icon('arrow', 20)}</button>
            </form>
            <div class="search-hints"><span>Try:</span><button type="button" data-query="something cosy and under RM20">something cosy</button><button type="button" data-query="a cafe for a slow afternoon">a cafe for a slow afternoon</button></div>
          </div>
          <div class="pulse-card reveal delay-1">
            <div class="pulse-card-top"><span class="eyebrow">THE PULSE</span><span class="pulse-live"><i></i> LIVE AROUND YOU</span></div>
            <div class="pulse-map" id="pulse-map">
              <div class="map-grid"></div><div class="map-road road-a"></div><div class="map-road road-b"></div><div class="map-road road-c"></div>
              <span class="map-label label-one">Jaya One</span><span class="map-label label-two">SS2</span><span class="map-label label-three">Taman SEA</span>
              <button class="map-pin pin-one" aria-label="Sambal Lab"><span></span></button><button class="map-pin pin-two" aria-label="Noodle Club"><span></span></button><button class="map-pin pin-three" aria-label="Common Man Coffee"><span></span></button>
              <div class="you-are-here"><span></span><small>YOU</small></div>
            </div>
            <div class="pulse-footer"><div><strong>24</strong><span>good spots within 3km</span></div><button class="text-button" id="open-map">Open map ${icon('arrow', 16)}</button></div>
          </div>
        </div>

        <div class="section-heading reveal"><div><span class="eyebrow">CURATED FOR RIGHT NOW</span><h2>Good picks around you <span>✦</span></h2></div><button class="view-all">View all ${icon('arrow', 16)}</button></div>
        <div class="toolbar reveal delay-1"><div class="filter-row">${filters.map((filter, index) => `<button class="filter-chip ${index === 0 ? 'selected' : ''}" data-filter="${filter}">${filter}${filter === 'All picks' ? '<span class="chip-count">24</span>' : ''}</button>`).join('')}</div><div class="view-toggle"><button class="view-button active" data-view-mode="grid" aria-label="Grid view">${icon('list', 18)}</button><button class="view-button" data-view-mode="map" aria-label="Map view">${icon('map', 18)}</button></div></div>
        <div class="restaurant-grid" id="restaurant-grid"></div>
      </section>

      <section class="page-view" data-view="calendar"><div class="simple-page-header"><span class="eyebrow">YOUR MONTH IN BITES</span><h1>Keep an eye<br/><em>on the little things.</em></h1><p>Small check-ins make spending feel a lot less mysterious.</p></div><div class="calendar-layout"><div class="calendar-card"><div class="calendar-card-head"><div><span class="eyebrow">NOVEMBER 2026</span><h2>Food spending</h2></div><button class="icon-button">${icon('more')}</button></div><div class="big-amount">RM ${state.expense}<span>.60</span></div><div class="spending-note"><span class="trend-up">↓ 12%</span> less than last month</div><div class="week-bars"><div style="--bar: 44%"><span>Mon</span><i></i><b>RM28</b></div><div style="--bar: 76%"><span>Tue</span><i></i><b>RM47</b></div><div style="--bar: 58%"><span>Wed</span><i></i><b>RM35</b></div><div style="--bar: 92%"><span>Thu</span><i></i><b>RM61</b></div><div style="--bar: 66%"><span>Fri</span><i></i><b>RM40</b></div><div style="--bar: 32%"><span>Sat</span><i></i><b>RM19</b></div><div style="--bar: 22%"><span>Sun</span><i></i><b>RM14</b></div></div></div><div class="side-stat-card"><span class="eyebrow">QUICK ADD</span><h3>Had something<br/>delicious?</h3><p>Capture it while it’s fresh in your memory.</p><button class="primary-button" id="add-expense">${icon('plus', 18)} Add an expense</button><div class="quote-mark">“</div></div></div></section>

      <section class="page-view" data-view="activity"><div class="simple-page-header"><span class="eyebrow">YOUR TASTE TRAIL</span><h1>Places you<br/><em>might revisit.</em></h1><p>Your saves and recent discoveries, all in one place.</p></div><div class="activity-list" id="activity-list"><div class="empty-activity"><div class="empty-icon">${icon('bookmark', 25)}</div><h3>Your saved places will live here.</h3><p>Tap the heart on a restaurant when it feels like a yes.</p><button class="secondary-button" data-tab="explore">Explore nearby ${icon('arrow', 16)}</button></div></div></section>

      <section class="page-view" data-view="profile"><div class="simple-page-header"><span class="eyebrow">YOUR FOOD COMPASS</span><h1>Make it feel<br/><em>more like you.</em></h1><p>Set a few preferences and we’ll make the next suggestion smarter.</p></div><div class="profile-card"><div class="profile-card-top"><div class="avatar avatar-large">TC</div><div><h2>Ting Chai</h2><p>Petaling Jaya · Malaysia</p></div><button class="secondary-button">Edit profile</button></div><div class="preference-grid"><div><span class="eyebrow">GO-TO CUISINES</span><div class="tag-list"><span>Malaysian</span><span>Japanese</span><span>Comfort food</span></div></div><div><span class="eyebrow">SEARCH RADIUS</span><div class="radius-options"><button>1 km</button><button class="active">3 km</button><button>5 km</button><button>10 km</button></div></div></div></div></section>
    </main>
    <button class="ai-orb" id="ai-orb" aria-label="Open MakanWhat concierge"><span class="orb-halo"></span><span class="orb-core">${icon('sparkle', 22)}</span><span class="orb-ping"></span></button>
    <aside class="ai-panel" id="ai-panel" aria-label="MakanWhat concierge"><div class="ai-panel-head"><div class="concierge-title"><span class="concierge-mark">${icon('sparkle', 15)}</span><div><span class="eyebrow">MAKANWHAT CONCIERGE</span><strong>Let’s find your yes.</strong></div></div><button class="modal-close" id="close-ai" aria-label="Close concierge">${icon('close', 18)}</button></div><div class="ai-message"><span class="ai-avatar">✦</span><div><p>Tell me the mood, budget, or craving. I’ll make the shortlist feel effortless.</p><span class="message-time">NOW · READY WHEN YOU ARE</span></div></div><div class="ai-suggestions"><button data-query="something cosy under RM20">cosy + under RM20</button><button data-query="a quiet cafe nearby">quiet cafe</button></div><form class="ai-form" id="ai-form"><input id="ai-input" placeholder="What are you in the mood for?" autocomplete="off"/><button type="submit" aria-label="Send">${icon('arrow', 18)}</button></form></aside>
    <nav class="mobile-nav" aria-label="Mobile navigation"><button class="nav-item active" data-tab="explore">${icon('compass')}<span>Explore</span></button><button class="nav-item" data-tab="calendar">${icon('calendar')}<span>Calendar</span></button><button class="nav-item" data-tab="activity">${icon('bookmark')}<span>Activity</span></button><button class="nav-item" data-tab="profile">${icon('user')}<span>Profile</span></button></nav>
  </div>
  <div class="toast" id="toast"><span class="toast-icon">${icon('check', 17)}</span><span id="toast-message">Saved to your taste trail</span></div>
  <div class="modal-backdrop" id="expense-modal"><div class="expense-modal"><button class="modal-close" id="close-modal" aria-label="Close">${icon('close')}</button><span class="eyebrow">QUICK ADD</span><h2>Log a little deliciousness.</h2><p>Keep your food spending honest without making it a whole thing.</p><form id="expense-form"><label>Amount<input type="number" min="0" step="0.01" placeholder="0.00" required /><span>RM</span></label><label>What was it?<input type="text" placeholder="e.g. Nasi lemak with friends" required /></label><button class="primary-button" type="submit">Save expense ${icon('arrow', 17)}</button></form></div></div>
`;

const restaurantGrid = document.querySelector('#restaurant-grid');
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  document.querySelector('#toast-message').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function getVisibleRestaurants() {
  const filter = state.activeFilter;
  if (filter === 'All picks') return restaurants;
  if (filter === 'Under RM20') return restaurants.filter((item) => item.priceValue <= 20);
  if (filter === 'Cafe') return restaurants.filter((item) => item.category === 'Cafe');
  if (filter === 'Malaysian') return restaurants.filter((item) => item.category === 'Malaysian');
  return restaurants;
}

function restaurantCard(item, index) {
  const saved = state.saved.has(item.id);
  return `<article class="restaurant-card ${index === 0 ? 'featured-card' : ''} reveal" style="--delay: ${index * 80}ms">
    <div class="restaurant-image-wrap"><img src="${item.image}" alt="${item.name}" loading="lazy"/><span class="restaurant-tag tag-${item.accent}">${item.tag}</span><button class="save-button ${saved ? 'saved' : ''}" data-save="${item.id}" aria-label="${saved ? 'Remove' : 'Save'} ${item.name}">${icon('heart', 18)}</button><div class="image-sheen"></div></div>
    <div class="restaurant-card-body"><div class="restaurant-title-row"><div><h3>${item.name}</h3><p>${item.detail}</p></div><div class="rating">${icon('sparkle', 13)} ${item.rating}</div></div><p class="restaurant-blurb">${item.blurb}</p><div class="restaurant-meta"><span>${item.price}</span><span class="meta-dot"></span><span>${item.category}</span><button class="card-arrow" aria-label="Open ${item.name}">${icon('arrow', 17)}</button></div></div>
  </article>`;
}

function renderRestaurants() {
  const items = getVisibleRestaurants();
  restaurantGrid.innerHTML = items.length ? items.map(restaurantCard).join('') : '<div class="no-results"><span class="eyebrow">NOT QUITE YET</span><h3>Let’s loosen the brief.</h3><p>There aren’t any exact matches in this little demo set.</p></div>';
  requestAnimationFrame(() => document.querySelectorAll('.restaurant-card.reveal').forEach((card) => card.classList.add('is-visible')));
}

function updateActivity() {
  const list = document.querySelector('#activity-list');
  if (!state.saved.size) {
    list.innerHTML = '<div class="empty-activity"><div class="empty-icon">' + icon('bookmark', 25) + '</div><h3>Your saved places will live here.</h3><p>Tap the heart on a restaurant when it feels like a yes.</p><button class="secondary-button" data-tab="explore">Explore nearby ' + icon('arrow', 16) + '</button></div>';
    return;
  }
  list.innerHTML = [...state.saved].map((id) => restaurants.find((item) => item.id === id)).filter(Boolean).map((item) => `<div class="activity-row"><img src="${item.image}" alt=""/><div><span class="eyebrow">SAVED PLACE</span><h3>${item.name}</h3><p>${item.detail}</p></div><button class="save-button saved" data-save="${item.id}">${icon('heart', 18)}</button></div>`).join('');
}

function setTab(tab) {
  state.activeTab = tab;
  document.querySelectorAll('[data-tab]').forEach((button) => button.classList.toggle('active', button.dataset.tab === tab));
  document.querySelectorAll('.page-view').forEach((view) => view.classList.toggle('active-view', view.dataset.view === tab));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', (event) => {
  const tabButton = event.target.closest('[data-tab]');
  if (tabButton) setTab(tabButton.dataset.tab);

  const filterButton = event.target.closest('[data-filter]');
  if (filterButton) {
    state.activeFilter = filterButton.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((button) => button.classList.toggle('selected', button === filterButton));
    renderRestaurants();
  }

  const saveButton = event.target.closest('[data-save]');
  if (saveButton) {
    const id = saveButton.dataset.save;
    state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id);
    renderRestaurants();
    updateActivity();
    showToast(state.saved.has(id) ? 'Saved to your taste trail' : 'Removed from your taste trail');
  }

  const hint = event.target.closest('[data-query]');
  if (hint) {
    document.querySelector('#search-input').value = hint.dataset.query;
    document.querySelector('#search-input').focus();
  }

  const viewButton = event.target.closest('[data-view-mode]');
  if (viewButton) {
    state.view = viewButton.dataset.viewMode;
    document.querySelectorAll('[data-view-mode]').forEach((button) => button.classList.toggle('active', button === viewButton));
    document.querySelector('#pulse-map').scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast(state.view === 'map' ? 'Map view is ready for live Places data' : 'Showing your curated picks');
  }
});

document.querySelector('#smart-search').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#search-input');
  state.query = input.value.trim();
  if (!state.query) {
    input.focus();
    showToast('Tell me what kind of mood you’re in');
    return;
  }
  const lower = state.query.toLowerCase();
  const matchedFilter = lower.includes('cafe') ? 'Cafe' : lower.includes('malay') || lower.includes('nasi') ? 'Malaysian' : lower.includes('under') || lower.includes('cheap') || lower.includes('budget') ? 'Under RM20' : 'All picks';
  state.activeFilter = matchedFilter;
  document.querySelectorAll('[data-filter]').forEach((button) => button.classList.toggle('selected', button.dataset.filter === matchedFilter));
  renderRestaurants();
  showToast(`Reading your mood: “${state.query}”`);
  document.querySelector('#restaurant-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const aiPanel = document.querySelector('#ai-panel');
document.querySelector('#ai-orb').addEventListener('click', () => {
  aiPanel.classList.toggle('open');
  if (aiPanel.classList.contains('open')) document.querySelector('#ai-input').focus();
});
document.querySelector('#close-ai').addEventListener('click', () => aiPanel.classList.remove('open'));
document.querySelector('#ai-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#ai-input');
  const query = input.value.trim();
  if (!query) return input.focus();
  document.querySelector('#search-input').value = query;
  aiPanel.classList.remove('open');
  document.querySelector('#smart-search').requestSubmit();
});

document.querySelector('#open-map').addEventListener('click', () => {
  state.view = 'map';
  document.querySelectorAll('[data-view-mode]').forEach((button) => button.classList.toggle('active', button.dataset.viewMode === 'map'));
  document.querySelector('#pulse-map').scrollIntoView({ behavior: 'smooth', block: 'center' });
  showToast('Map view is ready for live Places data');
});

const modal = document.querySelector('#expense-modal');
document.querySelector('#add-expense').addEventListener('click', () => modal.classList.add('open'));
document.querySelector('#close-modal').addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('open'); });
document.querySelector('#expense-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const amount = Number(event.target.querySelector('input[type="number"]').value || 0);
  state.expense = Math.round((state.expense + amount) * 100) / 100;
  document.querySelector('#summary-expense').textContent = Math.floor(state.expense);
  document.querySelector('.big-amount').innerHTML = `RM ${Math.floor(state.expense)}<span>.${String(Math.round((state.expense % 1) * 100)).padStart(2, '0')}</span>`;
  event.target.reset();
  modal.classList.remove('open');
  showToast('Expense added to your month');
});

document.querySelector('#today-date').textContent = new Intl.DateTimeFormat('en-MY', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Kuala_Lumpur' }).format(new Date());
document.querySelectorAll('.reveal').forEach((element) => requestAnimationFrame(() => element.classList.add('is-visible')));
renderRestaurants();

document.querySelectorAll('.pulse-card, .smart-search, .side-stat-card').forEach((element) => {
  element.addEventListener('pointermove', (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty('--rotate-x', `${y * -2}deg`);
    element.style.setProperty('--rotate-y', `${x * 2}deg`);
  });
  element.addEventListener('pointerleave', () => { element.style.setProperty('--rotate-x', '0deg'); element.style.setProperty('--rotate-y', '0deg'); });
});
