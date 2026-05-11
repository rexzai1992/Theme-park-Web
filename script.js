(() => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) {
        menu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const revealNodes = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  }

  const filterButtons = document.querySelectorAll('[data-region-filter]');
  const destinationCards = document.querySelectorAll('[data-region]');

  if (filterButtons.length && destinationCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const region = button.dataset.regionFilter;

        filterButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');

        destinationCards.forEach((card) => {
          const isVisible = region === 'all' || card.dataset.region === region;
          card.classList.toggle('hidden', !isVisible);
        });
      });
    });
  }

  const heroVideo = document.querySelector('.hero video');

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;
    heroVideo.setAttribute('muted', '');
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');

    const startHeroVideo = () => {
      heroVideo.play().catch(() => {
        // Autoplay may still be blocked by browser policy until user interaction.
      });
    };

    startHeroVideo();
    heroVideo.addEventListener('loadeddata', startHeroVideo, { once: true });
    heroVideo.addEventListener('canplay', startHeroVideo, { once: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        heroVideo.pause();
      } else {
        startHeroVideo();
      }
    });
  }
})();
