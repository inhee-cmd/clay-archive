// 모든 페이지 공통: 머리말·꼬리말·모바일 메뉴·장바구니·알림
const won = n => n.toLocaleString('ko-KR') + '원';
const L = id => `img/l/${id}.jpg`;
const S = id => `img/s/${id}.jpg`;
const qs = k => new URLSearchParams(location.search).get(k);
const findP = id => PRODUCTS.find(p => p.id === id);

const Cart = {
  get() { try { return JSON.parse(localStorage.getItem('clay-cart') || '[]'); } catch { return []; } },
  set(v) { try { localStorage.setItem('clay-cart', JSON.stringify(v)); } catch {} Cart.badge(); },
  add(id, opt, qty) {
    const c = Cart.get(), hit = c.find(x => x.id === id && x.opt === opt);
    hit ? hit.qty += qty : c.push({ id, opt, qty });
    Cart.set(c);
  },
  count() { return Cart.get().reduce((s, x) => s + x.qty, 0); },
  badge() {
    document.querySelectorAll('.cart-n').forEach(b => { b.textContent = Cart.count(); b.classList.add('bump'); setTimeout(() => b.classList.remove('bump'), 200); });
  },
};

function card(p) {
  const sold = p.tag === 'SOLD OUT';
  return `<a class="item reveal" href="product.html?id=${p.id}">
    <div class="ph"><img src="${S(p.imgs[0])}" alt="${p.name}" loading="lazy"><img src="${S(p.imgs[1] || p.imgs[0])}" alt="" loading="lazy">
      ${p.tag ? `<span class="tag${sold ? ' sold' : ''}">${p.tag}</span>` : ''}</div>
    <h3>${p.name}</h3><p class="maker">${SITE.name} · 수작업</p>
    <p class="price">${sold ? `<s>${won(p.price)}</s>품절` : won(p.price)}</p></a>`;
}

function toast(img, name) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.append(t); }
  t.innerHTML = `<img src="${S(img)}" alt=""><div>${name}<br><span style="color:var(--muted)">장바구니에 담았습니다</span><a href="cart.html">보기</a></div>`;
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(t.timer); t.timer = setTimeout(() => t.classList.remove('show'), 2600);
}

function notice(title, msg) {
  let m = document.querySelector('.notice-modal');
  if (!m) { m = document.createElement('div'); m.className = 'notice-modal'; document.body.append(m); m.onclick = e => { if (e.target === m || e.target.closest('.btn')) m.classList.remove('show'); }; }
  m.innerHTML = `<div><h3>${title}</h3><p>${msg}</p><button class="btn dark" style="width:100%">확인</button></div>`;
  m.classList.add('show');
}
const SOON = () => notice('준비 중입니다', `온라인 결제·예약은 곧 열립니다.<br>지금은 인스타그램 DM이나 전화(${SITE.tel})로 주문·예약해 주세요.`);

(function layout() {
  const page = document.body.dataset.page || '';
  const nav = [['shop', 'SHOP', '상품'], ['archive', 'ARCHIVE', '기록'], ['class', 'CLASS', '클래스'], ['about', 'ABOUT', '소개']];
  const top = `<div class="top-notice">작업실에서 하나씩 빚어 굽습니다 · ${won(SITE.freeShip).replace('0,000원', '만 원')} 이상 무료배송</div>
  <header><div class="hd">
    <button class="menu-btn" aria-label="메뉴 열기">≡</button>
    <nav>${nav.map(([k, e]) => `<a href="${k}.html"${page === k ? ' class="on"' : ''}>${e}</a>`).join('')}</nav>
    <a class="logo" href="index.html">${SITE.name}<small>${SITE.en}</small></a>
    <div class="util"><a class="hide-m" href="guide.html">GUIDE</a><a class="hide-m" href="#" data-soon>LOGIN</a><a href="cart.html">CART<b class="cart-n">0</b></a></div>
  </div></header>
  <div class="drawer"><div class="panel"><button class="close" aria-label="닫기">×</button>
    ${nav.map(([k, e, ko]) => `<a href="${k}.html">${e}<small>${ko}</small></a>`).join('')}
    <a href="guide.html">GUIDE<small>공지 · 문의 · 후기</small></a><a href="cart.html">CART<small>장바구니</small></a></div></div>`;
  document.body.insertAdjacentHTML('afterbegin', top);
  document.body.insertAdjacentHTML('beforeend', `<footer>
    <div><div class="logo">${SITE.name}</div>
      상호 ${SITE.name} · 대표 ${SITE.owner}<br>사업자등록번호 ${SITE.bizNo} · 통신판매업 ${SITE.mailOrder}<br>주소 ${SITE.addr}<br>
      <span class="links"><a href="guide.html?b=notice">이용안내</a><a href="#" data-soon>이용약관</a><a href="#" data-soon>개인정보처리방침</a></span></div>
    <div><h4>CS CENTER</h4><div class="tel">${SITE.tel}</div>${SITE.hours}<br><a href="https://instagram.com/${SITE.insta}" target="_blank" rel="noopener">Instagram @${SITE.insta}</a></div>
    <div><h4>BANK</h4>${SITE.bank}<br>예금주 ${SITE.name}<br><br>© ${new Date().getFullYear()} ${SITE.en}</div>
  </footer>`);

  const dr = document.querySelector('.drawer');
  document.querySelector('.menu-btn').onclick = () => dr.classList.add('open');
  dr.onclick = e => { if (e.target === dr || e.target.closest('.close')) dr.classList.remove('open'); };
  document.addEventListener('click', e => { if (e.target.closest('[data-soon]')) { e.preventDefault(); SOON(); } });
  Cart.badge();
})();

function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
  document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
}
window.addEventListener('DOMContentLoaded', reveal);
