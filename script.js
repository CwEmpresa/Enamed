
    // ==========================
    // CONFIGURAÇÃO DE CHECKOUT
    // ==========================
    // Substitua # pelas URLs reais do checkout do novo produto.
    const CHECKOUT_BASIC = 'https://pay.lowify.com.br/go.php?offer=3mvu9r8';
    const CHECKOUT_COMPLETE = 'https://pay.lowify.com.br/checkout.php?product_id=4YDFBH';
    const CHECKOUT_COMPLETE_UPGRADE = 'https://pay.lowify.com.br/go.php?offer=evtn1m0';

    const upgradeModal = document.getElementById('basic-upgrade-modal');
    const popupProductImg = document.getElementById('basic-upgrade-product-img');
    const heroProductImg = document.querySelector('#hero .hero-product-inline img');
    if (popupProductImg && heroProductImg) popupProductImg.src = heroProductImg.currentSrc || heroProductImg.src;
    const openUpgrade = () => {
      if (!upgradeModal) return;
      upgradeModal.classList.add('is-open');
      upgradeModal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
      const close = upgradeModal.querySelector('.basic-upgrade-close');
      if (close) close.focus();
    };
    const closeUpgrade = () => {
      if (!upgradeModal) return;
      upgradeModal.classList.remove('is-open');
      upgradeModal.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
    };

    document.querySelectorAll('.checkout-btn').forEach(btn => {
      const plan = btn.dataset.plan;
      if (plan === 'basic') {
        btn.href = CHECKOUT_BASIC;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openUpgrade();
        });
      } else {
        btn.href = CHECKOUT_COMPLETE;
      }
    });

    if (upgradeModal) {
      const upgradeCta = upgradeModal.querySelector('.basic-upgrade-cta');
      const decline = upgradeModal.querySelector('.basic-upgrade-decline');
      const close = upgradeModal.querySelector('.basic-upgrade-close');
      if (upgradeCta) upgradeCta.href = CHECKOUT_COMPLETE_UPGRADE;
      if (decline) decline.href = CHECKOUT_BASIC;
      if (close) close.addEventListener('click', closeUpgrade);
      upgradeModal.addEventListener('click', (e) => { if (e.target === upgradeModal) closeUpgrade(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && upgradeModal.classList.contains('is-open')) closeUpgrade(); });
    }
  


    // Mantém a data da faixa de oferta sincronizada com o dia atual em Fortaleza/BR.
    (function () {
      const el = document.getElementById('daily-offer');
      if (!el) return;
      const hoje = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Fortaleza',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date());
      el.textContent = `OFERTA ESPECIAL: DISPONÍVEL APENAS HOJE ${hoje}`;
    })();
  


(function(){
  const loopTrack=document.querySelector('.preview-loop-track[data-clone-loop="true"]');
  if(loopTrack && !loopTrack.dataset.cloned){
    [...loopTrack.children].forEach(card=>{
      const clone=card.cloneNode(true);
      clone.setAttribute('aria-hidden','true');
      const image=clone.querySelector('img');
      if(image) image.alt='';
      loopTrack.appendChild(clone);
    });
    loopTrack.dataset.cloned='true';
  }
  const root=document.querySelector('.preview-stage');
  if(!root) return;
  const track=root.querySelector('.preview-stage-track');
  const slides=[...root.querySelectorAll('.preview-slide')];
  const dots=[...root.querySelectorAll('.preview-dot')];
  const prev=root.querySelector('.preview-prev');
  const next=root.querySelector('.preview-next');
  let index=0, timer;
  function go(i){
    index=(i+slides.length)%slides.length;
    track.style.transform=`translateX(-${index*100}%)`;
    slides.forEach((s,n)=>s.classList.toggle('is-active',n===index));
    dots.forEach((d,n)=>d.classList.toggle('is-active',n===index));
  }
  function auto(){ clearInterval(timer); timer=setInterval(()=>go(index+1),4500); }
  if(prev) prev.addEventListener('click',()=>{go(index-1);auto()});
  if(next) next.addEventListener('click',()=>{go(index+1);auto()});
  dots.forEach((d,n)=>d.addEventListener('click',()=>{go(n);auto()}));
  go(0); auto();
})();



    // Contagem regressiva até o início do dia da prova (13/09/2026, horário de Brasília).
    (function () {
      const target = new Date('2026-09-13T00:00:00-03:00').getTime();
      const els = {
        days: document.getElementById('countdown-days'),
        hours: document.getElementById('countdown-hours'),
        minutes: document.getElementById('countdown-minutes'),
        seconds: document.getElementById('countdown-seconds')
      };
      if (!els.days || !els.hours || !els.minutes || !els.seconds) return;
      const pad = n => String(Math.max(0, n)).padStart(2, '0');
      function renderCountdown() {
        const distance = Math.max(0, target - Date.now());
        const days = Math.floor(distance / 86400000);
        const hours = Math.floor((distance % 86400000) / 3600000);
        const minutes = Math.floor((distance % 3600000) / 60000);
        const seconds = Math.floor((distance % 60000) / 1000);
        els.days.textContent = pad(days);
        els.hours.textContent = pad(hours);
        els.minutes.textContent = pad(minutes);
        els.seconds.textContent = pad(seconds);
      }
      renderCountdown();
      const timer = setInterval(renderCountdown, 1000);
      window.addEventListener('pagehide', () => clearInterval(timer), { once: true });
    })();
  


(function(){
  const video = document.getElementById('material-video');
  if (!video) return;
  const source = video.querySelector('source[data-src]');
  if (!source) return;
  let loaded = false;
  const loadVideo = () => {
    if (loaded) return;
    loaded = true;
    source.src = source.dataset.src;
    source.removeAttribute('data-src');
    video.load();
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      if (entries.some(entry => entry.isIntersecting)) {
        loadVideo();
        obs.disconnect();
      }
    }, { rootMargin: '700px 0px' });
    observer.observe(video);
  } else {
    loadVideo();
  }
  // If the user taps before the observer fires, load immediately.
  video.addEventListener('pointerdown', loadVideo, { once:true });
})();
