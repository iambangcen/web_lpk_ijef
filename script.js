// ==========================================================================
// 1. PRELOADER HANDLER (PRESERVED DELAY + SAFETY FALLBACK)
// ==========================================================================
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
  }
}

let isLoaded = false;

window.addEventListener('load', () => {
  isLoaded = true;
  setTimeout(hidePreloader, 1000); // Sembunyikan preloader 1 detik setelah aset selesai
});

setTimeout(() => {
  if (!isLoaded) {
    hidePreloader();
  }
}, 5000); // Safety fallback maksimal 5 detik jika ada link/aset bermasalah

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 2. ELEMEN NAVIGASI & MOBILE SIDEBAR MENU
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

  // PASANG EVENT LISTENER DI SINI (LUAR FUNGSI)
  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMenu); // Klik area gelap di luar sidebar akan menutup menu

  // ==========================================================================
  // 3. LOGIKA ACCORDION MULTI-LEVEL (LEVEL 1, 2, & 3)
  // ==========================================================================
  
  // Accordion Level 1 (Menu Utama Navbar)
  const dropdownToggles = document.querySelectorAll('.dropdown > .dropdown-toggle');
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      const parentDropdown = toggle.parentElement;
      const hasSubmenu = parentDropdown.querySelector('.submenu') !== null;

      // Di layar Mobile (<= 991px), HANYA jalankan accordion jika dropdown tersebut memiliki submenu (.submenu)
      if (window.innerWidth <= 991 && hasSubmenu) {
        e.preventDefault();

        // Tutup dropdown level 1 lainnya
        document.querySelectorAll('.dropdown').forEach((item) => {
          if (item !== parentDropdown) {
            item.classList.remove('active');
          }
        });

        parentDropdown.classList.toggle('active');
      }
      // Jika TIDAK punya submenu (seperti menu Beranda yang mengarah ke index.html),
      // biarkan link berjalan murni tanpa e.preventDefault() dan tutup menu sidebar.
      else if (window.innerWidth <= 991) {
        closeMenu();
      }
    });
  });

  // Accordion Sub-Level 2 & 3 (Biaya & Biaya Keberangkatan)
  const dropdownSubToggles = document.querySelectorAll('.dropdown-sub > .dropdown-toggle-sub');
  dropdownSubToggles.forEach((subToggle) => {
    subToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // Mencegah event menutup parent level di atasnya

      const parentSub = subToggle.parentElement;
      
      // Tutup menu selevel lainnya di dalam container yang sama
      const siblingSubs = parentSub.parentElement.querySelectorAll(':scope > .dropdown-sub');
      siblingSubs.forEach((sibling) => {
        if (sibling !== parentSub) {
          sibling.classList.remove('active');
        }
      });

      parentSub.classList.toggle('active');
    });
  });

  // Tutup sidebar otomatis saat link navigasi akhir (tanpa submenu) diklik
  const directLinks = document.querySelectorAll('.nav-links a:not(.dropdown-toggle):not(.dropdown-toggle-sub)');
  directLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        closeMenu();
      }
    });
  });

  // ==========================================================================
  // 4. EFEK FLOATING HEADER SAAT SCROLL
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
  // 5. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.15,
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }
});