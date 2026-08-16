// ==========================================================================
// PRELOADER HANDLER (DENGAN DELAY / TIMEOUT 5 DETIK)
// ==========================================================================
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
  }
}

// OPSI A: Menggunakan setTimeout langsung 5000 ms (5 detik)
// setTimeout(hidePreloader, 5000);

// OPSI B: Jika ingin menunggu 'load' SELESAI DULU, BARU jeda 5 detik baru hilang:
window.addEventListener('load', () => {
   setTimeout(hidePreloader, 5000);
 });

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. ELEMEN NAVIGASI & MOBILE SIDEBAR MENU
  // ==========================================================================
  const menuToggle = document.querySelector('.menu-toggle');
  const closeBtn = document.querySelector('.close-btn');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  const navbar = document.querySelector('.navbar');
  
  // Fungsi Buka Menu Mobile
  const openMenu = () => {
    if (navLinks) navLinks.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  // Fungsi Tutup Menu Mobile
  const closeMenu = () => {
    if (navLinks) navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);
  
  // ==========================================================================
  // 2. LOGIKA DROPDOWN ACCORDION SUBMENU (HANYA UNTUK MOBILE)
  // ==========================================================================
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      // Jalankan accordion klik hanya di layar mobile
      if (window.innerWidth <= 768) {
        const parentDropdown = toggle.parentElement;
        
        document.querySelectorAll('.dropdown').forEach((item) => {
          if (item !== parentDropdown) {
            item.classList.remove('active');
          }
        });
        
        parentDropdown.classList.toggle('active');
      }
    });
  });
  
  // Tutup menu sidebar otomatis saat link submenu atau link navigasi diklik
  const directLinks = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
  directLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });
  
  // ==========================================================================
  // 3. EFEK FLOATING HEADER SAAT SCROLL
  // ==========================================================================
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // ==========================================================================
  // 4. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Hentikan pemantauan setelah muncul
          }
        });
      },
      {
        root: null,
        threshold: 0.15, // Aktif saat 15% elemen masuk viewport
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }
});
