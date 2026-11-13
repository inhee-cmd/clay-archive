// 모든 페이지 공통: 머리말·꼬리말·모바일 메뉴·작업일지 카드
const L = id => `img/l/${id}.jpg`;
const S = id => `img/s/${id}.jpg`;
const qs = k => new URLSearchParams(location.search).get(k);
const dot = d => d.replaceAll('-', '.');
const NEWEST = [...LOG].reverse();

function card(e) {
  // 사진 비율대로 폭을 나눠 세로 사진도 잘리지 않게 한다
  return `<a class="item reveal" href="entry.html?id=${e.id}" style="flex:${e.r} 1 ${Math.round(e.r * 260)}px">
    <div class="ph" style="aspect-ratio:${e.r}"><img src="${S(e.id)}" alt="${e.t}" loading="lazy"></div>
    <p class="date">${dot(e.d)}</p><h3>${e.t}</h3></a>`;
}

(function layout() {
  const page = document.body.dataset.page || '';
  const nav = [['log', 'LOG', '작업일지'], ['about', 'ABOUT', '소개']];
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
    <div><div class="logo">${SITE.name}</div>물레 앞에서 보낸 날들의 기록<br>${dot(LOG[0].d)} — ${dot(NEWEST[0].d)} · ${LOG.length}편</div>
    <div><h4>CONTACT</h4><a href="mailto:${SITE.email}">${SITE.email}</a><br><a href="${ig}" target="_blank" rel="noopener">Instagram @${SITE.insta}</a></div>
    <div><h4>STUDIO</h4>${SITE.addr}<br>방문은 미리 연락 주세요<br><br>© ${new Date().getFullYear()} ${SITE.en}</div>
  </footer>`);

  const dr = document.querySelector('.drawer');
  document.querySelector('.menu-btn').onclick = () => dr.classList.add('open');
  dr.onclick = e => { if (e.target === dr || e.target.closest('.close')) dr.classList.remove('open'); };
})();

function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .05 });
  document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
}
window.addEventListener('DOMContentLoaded', reveal);
