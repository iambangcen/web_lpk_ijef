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


// ==========================================================================
// 2. FUNGSI GLOBAL TAB PROGRAM (Diletakkan di Luar agar bisa dipanggil HTML onclick)
// ==========================================================================
function switchProgram(programId, event) {
  // Sembunyikan semua konten program
  const contents = document.querySelectorAll('.program-content');
  contents.forEach(el => {
    el.style.display = 'none';
  });

  // Tampilkan program yang diklik
  const targetContent = document.getElementById(programId);
  if (targetContent) {
    targetContent.style.display = 'block';
  }

  // Hapus class active dari semua tombol tab
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });

  // Tambahkan class active ke tombol yang sedang diklik
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
}


// ==========================================================================
// 3. DOM CONTENT LOADED UTAMA
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  
  // A. ELEMEN NAVIGASI & MOBILE SIDEBAR MENU
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

  // Pasang Event Listener Navigasi
  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);


  // B. LOGIKA ACCORDION MULTI-LEVEL (LEVEL 1, 2, & 3)
  const dropdownToggles = document.querySelectorAll('.dropdown > .dropdown-toggle');
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      const parentDropdown = toggle.parentElement;
      const hasSubmenu = parentDropdown.querySelector('.submenu') !== null;

      if (window.innerWidth <= 991 && hasSubmenu) {
        e.preventDefault();
        document.querySelectorAll('.dropdown').forEach((item) => {
          if (item !== parentDropdown) {
            item.classList.remove('active');
          }
        });
        parentDropdown.classList.toggle('active');
      } else if (window.innerWidth <= 991) {
        closeMenu();
      }
    });
  });

  // Accordion Sub-Level 2 & 3
  const dropdownSubToggles = document.querySelectorAll('.dropdown-sub > .dropdown-toggle-sub');
  dropdownSubToggles.forEach((subToggle) => {
    subToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const parentSub = subToggle.parentElement;
      const siblingSubs = parentSub.parentElement.querySelectorAll(':scope > .dropdown-sub');
      siblingSubs.forEach((sibling) => {
        if (sibling !== parentSub) {
          sibling.classList.remove('active');
        }
      });

      parentSub.classList.toggle('active');
    });
  });

  // Tutup sidebar otomatis saat link navigasi akhir diklik
  const directLinks = document.querySelectorAll('.nav-links a:not(.dropdown-toggle):not(.dropdown-toggle-sub)');
  directLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        closeMenu();
      }
    });
  });


  // C. EFEK FLOATING HEADER SAAT SCROLL
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });


  // D. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
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


  // E. INISIALISASI DEFAULT TAB PROGRAM PERTAMA KALI
  const firstTabBtn = document.querySelector('.tab-btn');
  if (firstTabBtn) {
    switchProgram('reguler', { currentTarget: firstTabBtn });
  }

});


// ==========================================================================
// PROGRESS BAR DINAMIK UNTUK SEMUA SUB-BAGIAN TIMELINE
// ==========================================================================
window.addEventListener('scroll', () => {
  // Cari semua container timeline yang sedang aktif di tab terbuka
  const activeContent = document.querySelector('.program-content:not([style*="display: none"])');
  if (!activeContent) return;

  const containers = activeContent.querySelectorAll('.timeline-container');
  
  containers.forEach(container => {
    const progressBar = container.querySelector('.timeline-progress-bar');
    const timelineLine = container.querySelector('.timeline-line');
    const items = container.querySelectorAll('.timeline-item');
    
    if (!progressBar || items.length === 0) return;

    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    
    const firstNum = firstItem.querySelector('.timeline-number');
    const lastNum = lastItem.querySelector('.timeline-number');
    
    if (!firstNum || !lastNum) return;

    const windowHeight = window.innerHeight;
    const containerRect = container.getBoundingClientRect();

    // Pastikan kalkulasi hanya berjalan jika container sedang terlihat di layar
    if (containerRect.top < windowHeight && containerRect.bottom > 0) {
      const startY = firstNum.getBoundingClientRect().top + window.scrollY + 19;
      const endY = lastNum.getBoundingClientRect().top + window.scrollY + (lastNum.offsetHeight / 2);
      
      const totalDistance = endY - startY;
      const currentScroll = window.scrollY + (windowHeight * 0.5);

      // Hitung progress khusus untuk container ini
      let progress = (currentScroll - startY) / totalDistance;
      progress = Math.max(0, Math.min(1, progress));

      const currentHeightPx = progress * totalDistance;
      progressBar.style.height = currentHeightPx + 'px';

      // Sesuaikan tinggi garis abu-abu secara otomatis mengikuti jarak total item
      if (timelineLine) {
        timelineLine.style.height = (totalDistance) + 'px';
      }
    }
  });
});