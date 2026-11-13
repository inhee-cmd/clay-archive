// 모든 페이지 공통: 머리말·꼬리말·모바일 메뉴·작품 카드
const L = id => `img/l/${id}.jpg`;
const S = id => `img/s/${id}.jpg`;
const C = id => `img/c/${id}.jpg`;
const CS = id => `img/cs/${id}.jpg`;
const qs = k => new URLSearchParams(location.search).get(k);
const findW = id => WORKS.find(w => w.id === id);

function card(w) {
  return `<a class="item reveal" href="work.html?id=${w.id}">
    <div class="ph"><img src="${CS(w.cut[0])}" alt="${w.name}" loading="lazy"><img src="${S(w.imgs[0])}" alt="" loading="lazy">
      ${w.tag ? `<span class="tag">${w.tag}</span>` : ''}</div>
    <h3>${w.name}</h3><p class="maker">${w.en} · ${w.year}</p></a>`;
}

(function layout() {
  const page = document.body.dataset.page || '';
  const nav = [['works', 'WORKS', '작품'], ['archive', 'ARCHIVE', '기록'], ['about', 'ABOUT', '소개']];
  const ig = `https://instagram.com/${SITE.insta}`;
  document.body.insertAdjacentHTML('afterbegin', `
  <header><div class="hd">
    <button class="menu-btn" aria-label="메뉴 열기">≡</button>
    <nav>${nav.map(([k, e]) => `<a href="${k}.html"${page === k ? ' class="on"' : ''}>${e}</a>`).join('')}</nav>
    <a class="logo" href="index.html">${SITE.name}<small>${SITE.en}</small></a>
    <div class="util"><a href="about.html#contact">CONTACT</a><a class="hide-m" href="${ig}" target="_blank" rel="noopener">INSTAGRAM</a></div>
  </div></header>
  <div class="drawer"><div class="panel"><button class="close" aria-label="닫기">×</button>
    ${nav.map(([k, e, ko]) => `<a href="${k}.html">${e}<small>${ko}</small></a>`).join('')}
    <a href="about.html#contact">CONTACT<small>연락</small></a><a href="${ig}" target="_blank" rel="noopener">INSTAGRAM<small>@${SITE.insta}</small></a></div></div>`);
  document.body.insertAdjacentHTML('beforeend', `<footer>
    <div><div class="logo">${SITE.name}</div>손으로 빚어 두 번 구운 그릇의 기록</div>
    <div><h4>CONTACT</h4><a href="mailto:${SITE.email}">${SITE.email}</a><br><a href="${ig}" target="_blank" rel="noopener">Instagram @${SITE.insta}</a></div>
    <div><h4>STUDIO</h4>${SITE.addr}<br>방문은 미리 연락 주세요<br><br>© ${new Date().getFullYear()} ${SITE.en}</div>
  </footer>`);

  const dr = document.querySelector('.drawer');
  document.querySelector('.menu-btn').onclick = () => dr.classList.add('open');
  dr.onclick = e => { if (e.target === dr || e.target.closest('.close')) dr.classList.remove('open'); };
})();

function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
  document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
}
window.addEventListener('DOMContentLoaded', reveal);
