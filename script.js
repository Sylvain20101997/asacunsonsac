let cartCount = 0;
let selectedDecos = ['🌈', '⭐'];
let currentPrice = 14.90;
let decoMode = 'suggested';
let currentProduct = 'Badge';
let selectedBadgeShape = 'cloud1';
let selectedMugStyle = 'elegant';

function updatePreview() {
  const name = document.getElementById('name-input').value || 'Prénom';
  const job = document.getElementById('job-input').value || 'Profession';
  document.getElementById('preview-name').textContent = name;
  document.getElementById('preview-job').textContent = job;

  let decoDisplay = '';
  if (decoMode === 'none') {
    decoDisplay = '';
  } else if (decoMode === 'suggested') {
    decoDisplay = selectedDecos.join(' ');
  } else if (decoMode === 'custom') {
    const customDeco = document.getElementById('custom-deco-input').value;
    decoDisplay = customDeco ? '✨ ' + customDeco : '';
  }
  document.getElementById('preview-decos').textContent = decoDisplay;

  if (currentProduct === 'Mug') {
    const nameDisplay = document.getElementById('mug-name-display');
    const jobDisplay = document.getElementById('mug-job-display');
    const overlay = document.getElementById('mug-text-overlay');
    if (nameDisplay) nameDisplay.textContent = name;
    if (jobDisplay) jobDisplay.textContent = job !== 'Profession' ? job : '';
    if (overlay) overlay.className = 'mug-text-overlay mug-style-' + selectedMugStyle;
  } else if (currentProduct === 'Tote bag') {
    const toteText = document.getElementById('tote-text');
    if (toteText) toteText.textContent = name;
  } else if (currentProduct === 'Lanyard') {
    const lanyardText = document.getElementById('lanyard-text');
    if (lanyardText) lanyardText.textContent = name;
  }
}

function setDecoMode(mode, element) {
  document.querySelectorAll('.deco-tab').forEach(tab => tab.classList.remove('selected'));
  element.classList.add('selected');
  document.querySelectorAll('.deco-section').forEach(section => section.classList.remove('active'));
  document.getElementById('deco-' + mode).classList.add('active');
  decoMode = mode;
  if (mode === 'none') {
    selectedDecos = [];
  } else if (mode === 'suggested' && selectedDecos.length === 0) {
    selectedDecos = ['🌈', '⭐'];
  }
  updatePreview();
}

function selectColor(el, color) {
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  if (currentProduct === 'Badge') {
    document.getElementById('preview-badge').style.background = color;
  } else if (currentProduct === 'Mug') {
    const overlay = document.getElementById('mug-text-overlay');
    if (overlay) overlay.style.color = color;
  }
}

function selectProduct(el, name, price, color) {
  document.querySelectorAll('.product-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  currentProduct = name;
  currentPrice = price;

  document.getElementById('preview-price').textContent = price.toFixed(2).replace('.', ',') + ' €';
  document.getElementById('btn-price').textContent = price.toFixed(2).replace('.', ',') + ' €';

  const isBadge = name === 'Badge';
  const isMug = name === 'Mug';
  const isDeco = name === 'Décoration';
  const isTote = name === 'Tote bag';
  const isSimple = isDeco || isTote; // produits sans prénom/couleur

  // Badge shapes
  const badgeShapesSection = document.getElementById('badge-shapes-section');
  if (isBadge) badgeShapesSection.classList.add('visible');
  else badgeShapesSection.classList.remove('visible');

  // Color section (masqué pour décoration, tote et mug)
  const colorSection = document.getElementById('color-section');
  if (colorSection) colorSection.style.display = (isSimple || isMug) ? 'none' : 'block';

  // Decos section (badge only)
  const decosSection = document.getElementById('decos-section');
  if (decosSection) decosSection.style.display = isBadge ? 'block' : 'none';

  // Lanyard option (badge only)
  const lanyardSection = document.getElementById('lanyard-option-section');
  if (lanyardSection) lanyardSection.style.display = isBadge ? 'block' : 'none';

  // Mug-specific options
  const mugOptionsSection = document.getElementById('mug-options-section');
  if (mugOptionsSection) mugOptionsSection.style.display = isMug ? 'block' : 'none';

  // Tote bag-specific options
  const toteOptionsSection = document.getElementById('tote-options-section');
  if (toteOptionsSection) toteOptionsSection.style.display = isTote ? 'block' : 'none';

  // Décoration-specific options
  const decoOptionsSection = document.getElementById('deco-options-section');
  if (decoOptionsSection) decoOptionsSection.style.display = isDeco ? 'block' : 'none';

  // Prénom : masqué pour deco/tote, visible avec (optionnel) pour mug
  const nameSection = document.getElementById('name-section');
  const nameOptional = document.getElementById('name-optional');
  if (nameSection) nameSection.style.display = isSimple ? 'none' : 'block';
  if (nameOptional) nameOptional.style.display = isMug ? 'inline' : 'none';

  // Profession : masqué pour deco, tote et mug
  const jobSection = document.getElementById('job-section');
  if (jobSection) jobSection.style.display = (isSimple || isMug) ? 'none' : 'block';

  // Numéros des étapes mug
  const mugStyleLabel = document.getElementById('mug-style-label');
  const mugPersoLabel = document.getElementById('mug-perso-label');
  if (mugStyleLabel) mugStyleLabel.childNodes[0].textContent = isMug ? '3. Style du design' : '4. Style du design';
  if (mugPersoLabel) mugPersoLabel.childNodes[0].textContent = isMug ? '4. Personnalisation ' : '5. Personnalisation ';

  // Step 4 label
  const step4Label = document.getElementById('step4-label');
  if (step4Label) step4Label.textContent = isMug ? 'Style' : 'Décorations';

  // Preview visibility
  document.getElementById('preview-badge').style.display = isBadge ? 'block' : 'none';
  document.getElementById('preview-mug').style.display = isMug ? 'block' : 'none';
  document.getElementById('preview-tote').style.display = name === 'Tote bag' ? 'block' : 'none';
  document.getElementById('preview-deco').style.display = isDeco ? 'block' : 'none';

  if (isBadge) {
    document.getElementById('preview-badge').style.background = color;
  }

  updateSteps(name);
  updatePreview();
}

function selectBadgeShape(el, shape) {
  document.querySelectorAll('.badge-shape').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  selectedBadgeShape = shape;
  const badgePreview = document.getElementById('preview-badge');
  if (badgePreview) {
    badgePreview.classList.remove('shape-cloud1','shape-rounded-rect','shape-starburst','shape-hexagon','shape-octagon','shape-almond','shape-cloud2','shape-blob');
    badgePreview.classList.add('shape-' + shape);
  }
  updatePreview();
}

function selectMugStyle(el, style) {
  document.querySelectorAll('.mug-style-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  selectedMugStyle = style;
  updatePreview();
}


function toggleDeco(el, deco) {
  el.classList.toggle('selected');
  if (el.classList.contains('selected')) {
    if (!selectedDecos.includes(deco)) selectedDecos.push(deco);
  } else {
    selectedDecos = selectedDecos.filter(d => d !== deco);
  }
  updatePreview();
}

function setStep(n, el) {
  document.querySelectorAll('.step-dot').forEach((d, i) => {
    d.classList.remove('active', 'done');
    if (i + 1 < n) d.classList.add('done');
  });
  el.classList.add('active');
}

function toggleFav(el) {
  el.textContent = el.textContent === '🤍' ? '❤️' : '🤍';
}

let cartItems = [];

const PRODUCT_ICONS = { 'Badge':'🏷️', 'Mug':'☕', 'Tote bag':'👜', 'Décoration':'🕯️' };

const SHAPE_NAMES = {
  'cloud1':       'Nuage',
  'rounded-rect': 'Rectangle arrondi',
  'starburst':    'Soleil dentelé',
  'hexagon':      'Hexagone',
  'octagon':      'Octogone',
  'almond':       'Amande',
  'cloud2':       'Nuage',
  'blob':         'Coussin',
};

function addToCart() {
  const item = { id: Date.now(), product: currentProduct, price: currentPrice };

  if (currentProduct === 'Badge') {
    const prenom = document.getElementById('name-input').value;
    const profession = document.getElementById('job-input').value;
    if (prenom) item.prenom = prenom;
    if (profession) item.profession = profession;
    item.forme = selectedBadgeShape;
    item.collier = document.getElementById('lanyard-toggle')?.classList.contains('active');
    if (selectedDecos.length) item.decos = selectedDecos.join(' ');
  } else if (currentProduct === 'Mug') {
    const prenom = document.getElementById('name-input').value;
    if (prenom) item.prenom = prenom;
    item.style = selectedMugStyle;
    const perso = document.getElementById('mug-custom-deco-input')?.value;
    if (perso) item.perso = perso;
  } else if (currentProduct === 'Tote bag') {
    const perso = document.getElementById('tote-custom-input')?.value;
    if (perso) item.perso = perso;
  } else if (currentProduct === 'Décoration') {
    const perso = document.getElementById('deco-custom-input')?.value;
    if (perso) item.perso = perso;
  }

  cartItems.push(item);
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
  const notif = document.getElementById('cart-notif');
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 3000);
}

function getItemDetails(item) {
  const lines = [];
  if (item.prenom) lines.push('Prénom : ' + item.prenom);
  if (item.profession) lines.push('Profession : ' + item.profession);
  if (item.forme) lines.push('Forme : ' + (SHAPE_NAMES[item.forme] || item.forme));
  if (item.collier) lines.push('Avec collier assorti');
  if (item.decos) lines.push('Décorations : ' + item.decos);
  if (item.style) lines.push('Style : ' + item.style);
  if (item.perso) lines.push('Personnalisation : ' + item.perso);
  return lines.join('<br>');
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const footer = document.getElementById('cart-footer');
  if (cartItems.length === 0) {
    container.innerHTML = '<div class="cart-empty">Votre panier est vide</div>';
    footer.style.display = 'none';
    return;
  }
  container.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon">${PRODUCT_ICONS[item.product] || '📦'}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.product} personnalisé</div>
        <div class="cart-item-details">${getItemDetails(item)}</div>
        <div class="cart-item-price">${item.price.toFixed(2).replace('.',',')} €</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');
  const total = cartItems.reduce((s, i) => s + i.price, 0);
  document.getElementById('cart-total').textContent = total.toFixed(2).replace('.',',') + ' €';
  footer.style.display = 'block';
}

function openCart() {
  renderCart();
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function removeFromCart(id) {
  cartItems = cartItems.filter(i => i.id !== id);
  cartCount = cartItems.length;
  document.getElementById('cart-count').textContent = cartCount;
  renderCart();
}

const STEP_CONFIGS = {
  'Badge':      ['Produit','Prénom','Couleur','Décorations','Aperçu'],
  'Mug':        ['Produit','Prénom','Style','Personnalisation'],
  'Tote bag':   ['Produit','Personnalisation'],
  'Décoration': ['Produit','Personnalisation'],
};

function updateSteps(product) {
  const labels = STEP_CONFIGS[product] || STEP_CONFIGS['Badge'];
  const dots = document.querySelectorAll('.step-dot');
  dots.forEach((dot, i) => {
    if (i < labels.length) {
      dot.style.display = 'flex';
      dot.querySelector('.step-num').textContent = i + 1;
      dot.querySelector('.step-label').textContent = labels[i];
    } else {
      dot.style.display = 'none';
    }
  });
  // Reset active state to step 1
  dots[0].classList.add('active');
}

function toggleLanyard() {
  const toggle = document.getElementById('lanyard-toggle');
  const label = document.getElementById('lanyard-label');
  const isActive = toggle.classList.toggle('active');
  label.textContent = isActive ? 'Oui — avec collier assorti' : 'Non — badge seul';
}

function openCollection(id) {
  const closed = document.getElementById(id + '-closed');
  const open = document.getElementById(id + '-open');
  closed.style.display = 'none';
  open.style.display = 'block';
  closed.closest('.cat-card-collection').classList.add('open');
}

function closeCollection(id) {
  const closed = document.getElementById(id + '-closed');
  const open = document.getElementById(id + '-open');
  closed.style.display = 'block';
  open.style.display = 'none';
  closed.closest('.cat-card-collection').classList.remove('open');
}

function openLightbox(img) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = img.src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeLightbox(); closeCart(); }
});

function toggleMenu() {
  const links = document.querySelector('.nav-links');
  const btn = document.querySelector('.nav-hamburger');
  links.classList.toggle('mobile-open');
  btn.classList.toggle('open');
  document.body.style.overflow = links.classList.contains('mobile-open') ? 'hidden' : '';
}

window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(42,31,20,0.08)' : 'none';
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.remove('mobile-open');
      document.querySelector('.nav-hamburger').classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  updateSteps('Badge');

  const customInput = document.getElementById('custom-deco-input');
  if (customInput) customInput.addEventListener('input', updatePreview);

  const badgePreview = document.getElementById('preview-badge');
  if (badgePreview && !badgePreview.classList.contains('shape-cloud1')) {
    badgePreview.classList.add('shape-cloud1');
  }
});

updatePreview();
