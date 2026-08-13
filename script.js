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
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});