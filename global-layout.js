document.addEventListener("DOMContentLoaded", function () {
  // Deteksi otomatis apakah file HTML berada di dalam sub-folder atau tidak
  const isInSubfolder = window.location.pathname.includes('/program/') || window.location.pathname.includes('/pages/');
  const assetPath = isInSubfolder ? "../assets/" : "assets/";
  const pagePrefix = isInSubfolder ? "../" : "";

  // ==========================================
  // 0. GLOBAL CLOUD BACKGROUND ANIMATION
  // ==========================================
  const existingCloud = document.querySelector('.global-cloud-container');
  if (existingCloud) existingCloud.remove();

  const cloudStyle = document.createElement('style');
  cloudStyle.innerHTML = `
    body {
      position: relative;
      overflow-x: hidden;
      background-color: #f8fafc !important;
    }
    .global-cloud-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: -999;
      overflow: hidden;
    }
    .floating-cloud {
      position: absolute;
      pointer-events: none;
      opacity: 0.5; /* Opasitas diturunkan agar lebih lembut dan tidak mencolok */
      animation: floatCloud linear infinite;
    }
    @keyframes floatCloud {
      0% {
        transform: translate(0, 0) rotate(0deg);
      }
      50% {
        transform: translate(35px, -25px) rotate(4deg);
      }
      100% {
        transform: translate(0, 0) rotate(0deg);
      }
    }
  `;
  document.head.appendChild(cloudStyle);

  // Sebaran awan diperluas ke kiri, tengah, dan kanan secara merata
  const cloudContainer = document.createElement('div');
  cloudContainer.className = 'global-cloud-container';
  cloudContainer.innerHTML = `
    <!-- Sisi Kiri -->
    <img src="${assetPath}ornamen-awan.jpeg" class="floating-cloud" style="top: 8%; left: 2%; width: 220px; animation-duration: 7s;" alt="">
    <img src="${assetPath}ornamen-awan.jpeg" class="floating-cloud" style="top: 55%; left: 4%; width: 200px; animation-duration: 8s; animation-delay: 1s;" alt="">
    
    <!-- Area Tengah -->
    <img src="${assetPath}ornamen-awan.jpeg" class="floating-cloud" style="top: 25%; left: 38%; width: 240px; animation-duration: 7.5s; animation-delay: 0.5s;" alt="">
    <img src="${assetPath}ornamen-awan.jpeg" class="floating-cloud" style="top: 72%; left: 45%; width: 210px; animation-duration: 6.5s; animation-delay: 1.8s;" alt="">

    <!-- Sisi Kanan (Disebarkan agar tidak menumpuk) -->
    <img src="${assetPath}ornamen-awan.jpeg" class="floating-cloud" style="top: 15%; right: 6%; width: 250px; animation-duration: 6.8s; animation-delay: 1.2s;" alt="">
    <img src="${assetPath}ornamen-awan.jpeg" class="floating-cloud" style="top: 82%; right: 8%; width: 230px; animation-duration: 7.2s; animation-delay: 0.8s;" alt="">
  `;
  document.body.appendChild(cloudContainer);


  // ==========================================
  // 1. GLOBAL NAVBAR / HEADER
  // ==========================================
  const navbarHTML = `
  <div id="preloader">
    <div class="spinner-container">
      <img src="${assetPath}ijefcorplogo-small.png" alt="Logo LPK IJEF Corp" class="preloader-logo">
      <div class="spinner"></div>
      <p class="preloader-text">Memuat halaman...</p>
    </div>
  </div>

  <div class="nav-overlay" id="nav-overlay"></div>

  <nav class="navbar">
    <div class="container nav-container reveal">
      <a href="${pagePrefix}index.html" class="brand-logo">
        <img src="${assetPath}ijefcorplogo-small.png" alt="Logo LPK IJEF" class="nav-logo-img">
        LPK IJEF Corp.
      </a>

      <button class="menu-toggle" id="menu-toggle" aria-label="Toggle Navigation">
        <i class="fa-solid fa-bars"></i>
      </button>

      <ul class="nav-links" id="nav-links">
        <li class="sidebar-header">
          <div class="logo-wrapper">
            <img src="${assetPath}ijefcorplogo-small.png" alt="Logo LPK IJEF" class="sidebar-logo">
          </div>
          <button class="close-btn" id="close-btn"><i class="fa-solid fa-xmark"></i></button>
        </li>

        <li class="dropdown">
          <a href="${pagePrefix}index.html#tentang-kami" class="dropdown-toggle">
            <span>Beranda</span>
          </a>
        </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle">
            <span>Profile</span>
            <i class="fa-solid fa-chevron-down icon-arrow"></i>
          </a>
          <ul class="submenu">
            <li><a href="${pagePrefix}company-profile.html">Company Profile</a></li>
            <li><a href="${pagePrefix}legalitas.html">Perizinan & Legalitas</a></li>
            <li><a href="${pagePrefix}our-team.html">Tim Kami / SOP</a></li>
            <li><a href="${pagePrefix}lokasi-pelatihan.html">Lokasi Pendidikan & Pelatihan</a></li>
          </ul>
        </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle">
            <span>Informasi</span>
            <i class="fa-solid fa-chevron-down icon-arrow"></i>
          </a>
          <ul class="submenu">
            <li><a href="${pagePrefix}bidang-kerja.html">Bidang Kerja</a></li>
            
            <li class="dropdown-sub dropdown-sub-down">
              <a href="${pagePrefix}biaya-pelatihan.html">
                <span>Biaya</span>
                <i class="fa-solid fa-chevron-down arrow-sub"></i>
              </a>
              <ul class="submenu-sub submenu-down">
                <li><a href="#">Biaya Pelatihan</a></li>
                <li class="dropdown-sub dropdown-sub-right">
                  <a href="#" class="dropdown-toggle-sub">
                    <span>Biaya Keberangkatan</span>
                    <i class="fa-solid fa-chevron-right arrow-sub"></i>
                  </a>
                  <ul class="submenu-sub submenu-right">
                    <li><a href="#">Mandiri</a></li>
                    <li><a href="#">Dana Talang</a></li>
                  </ul>
                </li>
              </ul>
            </li>

            <li class="dropdown-sub dropdown-sub-down">
              <a href="#" class="dropdown-toggle-sub">
                <span>Fasilitas</span>
                <i class="fa-solid fa-chevron-down arrow-sub"></i>
              </a>
              <ul class="submenu-sub submenu-down">
                <li><a href="#">Kelas</a></li>
                <li><a href="#">Gedung</a></li>
              </ul>
            </li>

            <li class="dropdown-sub dropdown-sub-down">
              <a href="#" class="dropdown-toggle-sub">
                <span>Dokumen & Sertifikat</span>
                <i class="fa-solid fa-chevron-down arrow-sub"></i>
              </a>
              <ul class="submenu-sub submenu-down">
                <li><a href="${pagePrefix}coe.html">COE</a></li>
                <li><a href="${pagePrefix}e-ktln.html">E-KTLN</a></li>
                <li><a href="${pagePrefix}jft-basic.html">JFT Basic</a></li>
                <li><a href="${pagePrefix}jlpt.html">JLPT</a></li>
                <li><a href="${pagePrefix}ssw.html">SSW</a></li>
              </ul>
            </li>
          </ul>
        </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle">
            <span>Program</span>
            <i class="fa-solid fa-chevron-down icon-arrow"></i>
          </a>
          <ul class="submenu">
            <li><a href="${pagePrefix}tokutei-ginou.html">Tokutei Ginou</a></li>
            <li><a href="${pagePrefix}nihongo-gakkou.html">Nihongo Gakkou</a></li>
            <li><a href="${pagePrefix}engineering.html">Engineering</a></li>
            <li><a href="${pagePrefix}internship.html">Internship</a></li>
            <li class="dropdown-sub dropdown-sub-right">
              <a href="#" class="dropdown-toggle-sub">
                <span>Kelas Pemantapan</span>
                <i class="fa-solid fa-chevron-right arrow-sub"></i>
              </a>
              <ul class="submenu-sub submenu-right">
                <li><a href="${pagePrefix}kelas-ssw.html">Kelas SSW</a></li>
                <li><a href="${pagePrefix}kelas-mensetsu.html">Kelas Mensetsu</a></li>
              </ul>
            </li>
            <li><a href="${pagePrefix}matching-job.html">Matching Job</a></li>
            <li><a href="${pagePrefix}kelas-online.html">Kelas Online</a></li>
          </ul>
        </li>

        <li class="dropdown">
          <a href="${pagePrefix}alur-pendaftaran.html" class="dropdown-toggle">
            <span>Alur Pendaftaran</span>
          </a>
        </li>
        <li><a href="#kontak" class="btn-primary btn-sidebar-cta">Daftar Sekarang</a></li>
      </ul>
    </div>
  </nav>
  `;

  document.body.insertAdjacentHTML('afterbegin', navbarHTML);


  // ==========================================
  // 2. GLOBAL FOOTER
  // ==========================================
  const footerHTML = `
      <footer class="footer-with-bg">
          <div class="footer-overlay"></div>
          <div class="container footer-container">
              <div class="footer-content">
                  <div class="footer-brand">
                      <h3>LPK <span>IJEF Corp.</span></h3>
                      <p class="footer-slogan">
                          <span>Bridging Indonesia to Japan - Training, Study, and Career.</span>
                          <span>日本語学校｜送り出し機関</span>
                          <span>LPK INTERNATIONAL JAPAN ECONOMY FUTURE CORP.</span>
                      </p>
                  </div>
                  <div class="footer-contact">
                      <h4>Alamat Kantor</h4>
                      <p><i class="fas fa-map-marker-alt"></i> <span>
Jl. Raya Padalarang Cisarua KM 2,5 no.5 Kampung Babakan Cinta RT.002 RW.004 Pasirhalang Cisarua, Bandung Barat 40551</span></p>
                      <p><i class="fas fa-phone-alt"></i> <span>[Masukkan Nomor Telepon kantor nya ya]</span></p>
                  </div>
              </div>
              <div class="footer-bottom">
                  <p>&copy; 2026 LPK IJEF Corp. All rights reserved.</p>
              </div>
          </div>
      </footer>
  `;
  
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
      footerPlaceholder.innerHTML = footerHTML;
  } else {
      document.body.insertAdjacentHTML('beforeend', footerHTML);
  }


  // ==========================================
  // 3. ADMIN WHATSAPP POPUP MODAL (SWEETALERT STYLE)
  // ==========================================
  const adminModalHTML = `
  <div class="admin-modal-overlay" id="adminModal">
    <div class="admin-modal-box">
      <button class="admin-modal-close" id="closeAdminModal">&times;</button>
      
      <div class="admin-modal-header">
        <i class="fa-brands fa-whatsapp admin-modal-icon"></i>
        <h3>Hubungi Admin Pendaftaran</h3>
        <p>Silakan pilih salah satu admin di bawah ini untuk konsultasi dan pendaftaran program LPK IJEF Corp:</p>
      </div>

      <div class="admin-list">
        <!-- Admin 1 -->
        <div class="admin-card">
          <div class="admin-info">
            <div class="admin-avatar">
              <i class="fa-solid fa-user-tie"></i>
            </div>
            <div>
              <h4>Admin 1 (Nama Admin)</h4>
              <span>Layanan Pendaftaran & Informasi Umum</span>
            </div>
          </div>
          <a href="https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20tertarik%20untuk%20mendaftar%20di%20LPK%20IJEF%20Corp." target="_blank" class="btn-wa-chat">
            <i class="fa-brands fa-whatsapp"></i> Chat WhatsApp
          </a>
        </div>

        <!-- Admin 2 -->
        <div class="admin-card">
          <div class="admin-info">
            <div class="admin-avatar">
              <i class="fa-solid fa-user-tie"></i>
            </div>
            <div>
              <h4>Admin 2 (Nama Admin)</h4>
              <span>Konsultasi Program & Dokumen</span>
            </div>
          </div>
          <a href="https://wa.me/6289876543210?text=Halo%20Admin,%20saya%20ingin%20konsultasi%20mengenai%20program%20di%20LPK%20IJEF%20Corp." target="_blank" class="btn-wa-chat">
            <i class="fa-brands fa-whatsapp"></i> Chat WhatsApp
          </a>
        </div>

        <!-- Admin 3 -->
        <div class="admin-card">
          <div class="admin-info">
            <div class="admin-avatar">
              <i class="fa-solid fa-user-tie"></i>
            </div>
            <div>
              <h4>Admin 3 (Nama Admin)</h4>
              <span>Informasi Biaya & Keberangkatan</span>
            </div>
          </div>
          <a href="https://wa.me/6281122334455?text=Halo%20Admin,%20saya%20ingin%20bertanya%20tentang%20biaya%20dan%20keberangkatan%20ke%20Jepang." target="_blank" class="btn-wa-chat">
            <i class="fa-brands fa-whatsapp"></i> Chat WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', adminModalHTML);

  // Logika interaksi Modal Admin
  const adminModal = document.getElementById("adminModal");
  const closeAdminModal = document.getElementById("closeAdminModal");
  const ctaButtons = document.querySelectorAll('a[href="#kontak"], .btn-sidebar-cta, .btn-primary');

  ctaButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      if (adminModal) {
        e.preventDefault();
        adminModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  if (closeAdminModal) {
    closeAdminModal.addEventListener("click", function () {
      adminModal.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }

  if (adminModal) {
    adminModal.addEventListener("click", function (e) {
      if (e.target === adminModal) {
        adminModal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }
});