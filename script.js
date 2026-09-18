const typography = document.createElement('style');
typography.textContent = `
  :root {
    --ink: #202020;
    --gold: #d7be8a;
    --gold-dark: #9a7538;
    --cream: #faf7f0;
    --line: #ded5c5;
    --muted: #6f685d;
    --white: #fffdfa;
  }
  body { background: #fffdfa; }
  .site-header { background: rgba(250, 247, 240, .97); }
  .hero, .videos, .book { background: #fffdfa; }
  .site-header .brand { width: 285px; height: 70px; overflow: hidden; }
  .site-header .brand-logo { width: 100%; height: 100%; object-fit: contain; object-position: left center; }
  .footer-brand { display: block; width: min(390px, 100%); height: auto; padding: 10px 14px; background: #faf7f0; border: 1px solid #d7be8a; border-radius: 6px; }
  .footer-brand .brand-logo { display: block; width: 100%; height: auto; }
  .hero h1 { font-size: clamp(40px, 4vw, 60px); }
  .section-title h2, .included-heading h2 { font-size: clamp(30px, 3.2vw, 44px); }
  .booking-card h2 { font-size: clamp(30px, 3.2vw, 42px); }
  .perfect-for { overflow: hidden; background: #202020; color: #faf7f0; border-top: 1px solid #4b453b; border-bottom: 1px solid #4b453b; }
  .perfect-for-track { display: flex; width: max-content; animation: perfectForRoll 28s linear infinite; }
  .perfect-for-group { display: flex; align-items: center; flex-shrink: 0; gap: 34px; padding: 21px 17px; white-space: nowrap; }
  .perfect-for-label { color: #d7be8a; font-size: 12px; font-weight: 800; letter-spacing: .14em; }
  .perfect-for-item { font-family: var(--display); font-size: 17px; font-weight: 700; letter-spacing: -.01em; }
  .perfect-for-dot { color: #d7be8a; font-size: 13px; }
  @keyframes perfectForRoll { to { transform: translateX(-50%); } }
  @media (prefers-reduced-motion: reduce) { .perfect-for-track { animation: none; } }
  @media (max-width: 760px) {
    .site-header .brand { width: 220px; height: 58px; }
    .hero h1 { font-size: 34px; }
    .section-title h2, .included-heading h2 { font-size: 30px; }
  }
  @media (max-width: 420px) {
    .hero h1 { font-size: 31px; }
  }
`;
document.head.append(typography);

const perfectForItems = ['Weddings', 'Corporate Events', 'Quinceañeras', 'Birthdays', 'School Events', 'Brand Activations'];
const perfectForGroup = () => `
  <div class="perfect-for-group">
    <span class="perfect-for-label">PERFECT FOR</span>
    ${perfectForItems.map((item) => `<span class="perfect-for-dot">✦</span><span class="perfect-for-item">${item}</span>`).join('')}
    <span class="perfect-for-dot">✦</span>
  </div>
`;
const perfectForBar = document.createElement('div');
perfectForBar.className = 'perfect-for';
perfectForBar.setAttribute('aria-label', `Perfect for ${perfectForItems.join(', ')}`);
perfectForBar.innerHTML = `<div class="perfect-for-track">${perfectForGroup()}${perfectForGroup()}</div>`;
perfectForBar.querySelector('.perfect-for-group:last-child').setAttribute('aria-hidden', 'true');
document.querySelector('.hero').insertAdjacentElement('afterend', perfectForBar);

const videosSection = document.querySelector('.videos');
const includedSection = document.createElement('section');
includedSection.className = 'details included';
videosSection.insertAdjacentElement('afterend', includedSection);

const includedHeading = document.querySelector('.included-heading');
includedHeading.style.marginTop = '0';
includedSection.append(includedHeading, document.querySelector('.included-grid'));

const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu');

menu.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? '×' : '☰';
});

document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  header.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.textContent = '☰';
}));

document.querySelectorAll('.accordion details').forEach((detail) => detail.addEventListener('toggle', () => {
  if (detail.open) document.querySelectorAll('.accordion details').forEach((other) => {
    if (other !== detail) other.open = false;
  });
}));

document.getElementById('quickQuoteForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = 'Thanks—your information is ready. The lead destination still needs to be connected before submissions can be received.';
  note.classList.add('success');
});
