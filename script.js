// ==========================================================================
// 1. PRELOADER HANDLER (FIXED: MUNCUL PERTAMA KALI SEBELUM HALAMAN TERLOAD)
// ==========================================================================
document.body.classList.add('loading');

function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
  }
  document.body.classList.remove('loading');
}

let isLoaded = false;

window.addEventListener('load', () => {
  isLoaded = true;
  // Berikan sedikit jeda (misal 600ms) agar terjemahan data-i18n sempat dieksekusi di balik layar preloader
  setTimeout(hidePreloader, 600); 
});

setTimeout(() => {
  if (!isLoaded) {
    hidePreloader();
  }
}, 4000); // Safety fallback


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


  // F. CAROUSEL TESTIMONIAL INIT
  const track = document.querySelector(".testimonial-track");
  if (track) {
    const slideGroups = Array.from(track.children);
    const nextButton = document.querySelector(".next-btn");
    const prevButton = document.querySelector(".prev-btn");
    const dotsContainer = document.querySelector(".testimonial-dots");

    let currentIndex = 0;
    const slideCount = slideGroups.length;
    let autoSlideInterval;

    if (dotsContainer) {
      slideGroups.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.classList.add("testimonial-dot");
        if (index === 0) dot.classList.add("active");
        dot.setAttribute("aria-label", `Slide ${index + 1}`);
        dot.addEventListener("click", () => {
          goToSlide(index);
          resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

    function updateSlidePosition() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlidePosition();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlidePosition();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSlidePosition();
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    const container = document.querySelector(".testimonial-carousel-container");
    if (container) {
      container.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
      container.addEventListener("mouseleave", startAutoSlide);
    }

    startAutoSlide();
  }


  // G. ANIMASI ODOMETER STATISTIK
  const odometerElements = document.querySelectorAll(".odometer");
  if (odometerElements.length > 0) {
    const runOdometer = (el) => {
      const target = parseInt(el.getAttribute("data-target"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 2000; 
      const frameRate = 30;  
      const totalFrames = Math.round((duration / 1000) * frameRate);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 2)));

        if (frame === totalFrames) {
          el.textContent = target + suffix;
          clearInterval(counter);
        } else {
          el.textContent = currentCount + suffix;
        }
      }, 1000 / frameRate);
    };

    const odometerObserver = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runOdometer(entry.target);
          observerInstance.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.5 });

    odometerElements.forEach(el => odometerObserver.observe(el));
  }


  // FETCH DAN RENDER GOOGLE REVIEWS DENGAN DUKUNGAN FOTO
  fetch('reviews.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("File reviews.json tidak ditemukan atau kosong.");
      }
      return response.json();
    })
    .then(reviews => {
      const container = document.getElementById('reviews-container');
      if (!container) return;
      
      container.innerHTML = ''; // Kosongkan kontainer

      reviews.slice(0, 10).forEach(review => {
        const authorName = review.author || 'Pengguna Google';
        const initial = authorName.charAt(0).toUpperCase();
        
        // Render galeri foto jika ulasan memiliki lampiran foto
        let photosHtml = '';
        if (review.photos && review.photos.length > 0) {
          photosHtml = '<div class="review-photos-grid" style="display: flex; gap: 8px; margin-top: 12px; overflow-x: auto;">';
          review.photos.forEach(photoUrl => {
            photosHtml += `<img src="${photoUrl}" alt="Foto Ulasan Alumni" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 1px solid #dadce0;">`;
          });
          photosHtml += '</div>';
        }

        const reviewCard = document.createElement('div');
        reviewCard.className = 'google-review-card';
        reviewCard.innerHTML = `
          <div class="review-header">
            <div class="review-avatar">${initial}</div>
            <div class="review-meta">
              <h4>${authorName}</h4>
              <div class="review-subinfo">
                <span class="review-stars">★★★★★</span>
                <span class="review-time">${review.time || 'Baru-baru ini'}</span>
              </div>
            </div>
          </div>
          <p class="review-text">"${review.text}"</p>
          ${photosHtml}
        `;
        container.appendChild(reviewCard);
      });
    })
    .catch(error => {
      console.warn("Gagal memuat ulasan:", error);
      const container = document.getElementById('reviews-container');
      if (container) {
        container.innerHTML = '<p style="color: #64748b; text-align: center;">Belum ada ulasan yang dimuat.</p>';
      }
    });

}); // AKHIR DARI DOM CONTENT LOADED UTAMA


// ==========================================================================
// 4. TRIGGER ANIMASI FADE OUT ARROW PADA STATISTIK SAAT PERTAMA KALI SCROLL
// ==========================================================================
let hasScrolledArrow = false;

window.addEventListener("scroll", () => {
  if (window.scrollY > 20 && !hasScrolledArrow) {
    hasScrolledArrow = true;
    const statCards = document.querySelectorAll(".stat-card");
    
    statCards.forEach(card => {
      card.classList.add("arrow-triggered");
    });
  }
});


// ==========================================================================
// 5. PROGRESS BAR DINAMIK UNTUK SEMUA SUB-BAGIAN TIMELINE
// ==========================================================================
window.addEventListener('scroll', () => {
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

    if (containerRect.top < windowHeight && containerRect.bottom > 0) {
      const startY = firstNum.getBoundingClientRect().top + window.scrollY + 19;
      const endY = lastNum.getBoundingClientRect().top + window.scrollY + (lastNum.offsetHeight / 2);
      
      const totalDistance = endY - startY;
      const currentScroll = window.scrollY + (windowHeight * 0.5);

      let progress = (currentScroll - startY) / totalDistance;
      progress = Math.max(0, Math.min(1, progress));

      const currentHeightPx = progress * totalDistance;
      progressBar.style.height = currentHeightPx + 'px';

      if (timelineLine) {
        timelineLine.style.height = (totalDistance) + 'px';
      }
    }
  });
});