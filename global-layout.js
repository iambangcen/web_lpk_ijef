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
      opacity: 0.5;
      animation: floatCloud linear infinite;
    }
    @keyframes floatCloud {
      0% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(35px, -25px) rotate(4deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }

    /* ==========================================
       MODERN PROFESSIONAL ADMIN MODAL STYLING
       ================================---------- */
    .admin-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      padding: 16px;
      box-sizing: border-box;
    }

    .admin-modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .admin-modal-box {
      background: #ffffff;
      width: 100%;
      max-width: 460px;
      border-radius: 20px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      position: relative;
      transform: translateY(20px) scale(0.95);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      max-height: 90vh;
    }

    .admin-modal-overlay.active .admin-modal-box {
      transform: translateY(0) scale(1);
    }

    .admin-modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(255, 255, 255, 0.8);
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s ease;
      z-index: 20;
    }

    .admin-modal-close:hover {
      background: #ffffff;
      color: #0f172a;
    }

    .admin-modal-header {
      padding: 32px 24px 24px 24px;
      text-align: center;
      position: relative;
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border-bottom: 1px solid #e2e8f0;
      overflow: hidden;
    }

    .admin-modal-header::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('${assetPath}ornamen-awan.jpeg');
      background-size: cover;
      opacity: 0.15;
      pointer-events: none;
    }

    .admin-modal-icon-wrapper {
      width: 56px;
      height: 56px;
      background: #ffffff;
      color: #16a34a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      margin: 0 auto 14px auto;
      box-shadow: 0 4px 12px rgba(22, 163, 74, 0.15);
      position: relative;
      z-index: 2;
    }

    .admin-modal-header h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 6px 0;
      position: relative;
      z-index: 2;
    }

    .admin-modal-header p {
      font-size: 0.875rem;
      color: #475569;
      margin: 0;
      line-height: 1.5;
      position: relative;
      z-index: 2;
    }

    .admin-list {
      padding: 20px 24px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .admin-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 14px 16px;
      transition: all 0.2s ease;
      gap: 12px;
    }

    .admin-card:hover {
      border-color: #cbd5e1;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
      transform: translateY(-2px);
    }

    .admin-info {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .admin-avatar {
      width: 44px;
      height: 44px;
      background: #eff6ff;
      color: #0284c7;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .admin-details {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .admin-details h4 {
      font-size: 0.925rem;
      font-weight: 600;
      color: #0f172a;
      margin: 0 0 2px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .admin-details span {
      font-size: 0.8rem;
      color: #64748b;
      font-weight: 500;
    }

    .btn-wa-chat {
      background: #25d366;
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      flex-shrink: 0;
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(37, 211, 102, 0.2);
    }

    .btn-wa-chat:hover {
      background: #20ba5a;
      box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);
      color: #ffffff;
    }

    @media (max-width: 480px) {
      .admin-card {
        flex-direction: column;
        align-items: flex-start;
        padding: 14px;
      }
      .btn-wa-chat {
        width: 100%;
        justify-content: center;
        margin-top: 4px;
      }
    }
  `;
  document.head.appendChild(cloudStyle);

  const cloudContainer = document.createElement('div');
  cloudContainer.className = 'global-cloud-container';
  cloudContainer.innerHTML = `
    <img src="${assetPath}ornamen-awan.jpeg" class="floating-cloud" style="top: 8%; left: 2%; width: 220px; animation-duration: 7s;" alt="">
    <img src="${assetPath}ornamen-awan.jpeg" class="floating-cloud" style="top: 55%; left: 4%; width: 200px; animation-duration: 8s; animation-delay: 1s;" alt="">
    <img src="${assetPath}ornamen-awan.jpeg" class="floating-cloud" style="top: 25%; left: 38%; width: 240px; animation-duration: 7.5s; animation-delay: 0.5s;" alt="">
    <img src="${assetPath}ornamen-awan.jpeg" class="floating-cloud" style="top: 72%; left: 45%; width: 210px; animation-duration: 6.5s; animation-delay: 1.8s;" alt="">
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
      <img src="${assetPath}ijef-logo-small.png" alt="Logo LPK IJEF Corp" class="preloader-logo">
      <div class="spinner"></div>
      <p class="preloader-text">Memuat halaman...</p>
    </div>
  </div>

  <div class="nav-overlay" id="nav-overlay"></div>

  <nav class="navbar">
    <div class="container nav-container reveal">
      <a href="${pagePrefix}index.html" class="brand-logo">
        <img src="${assetPath}ijef-logo-small.png" alt="Logo LPK IJEF" class="nav-logo-img">
        LPK IJEF Corp.
      </a>

      <button class="menu-toggle" id="menu-toggle" aria-label="Toggle Navigation">
        <i class="fa-solid fa-bars"></i>
      </button>

      <ul class="nav-links" id="nav-links">
        <li class="sidebar-header">
          <div class="logo-wrapper">
            <img src="${assetPath}ijef-logo-small.png" alt="Logo LPK IJEF" class="sidebar-logo">
          </div>
          <button class="close-btn" id="close-btn"><i class="fa-solid fa-xmark"></i></button>
        </li>

        <li class="dropdown">
          <a href="${pagePrefix}index.html" class="dropdown-toggle">
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
            <li><a href="${pagePrefix}our-team.html">Our Team</a></li>
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
              <a href="#" class="dropdown-toggle-sub">
                <span>Biaya</span>
                <i class="fa-solid fa-chevron-down arrow-sub"></i>
              </a>
              <ul class="submenu-sub submenu-down">
                <li><a href="${pagePrefix}biaya-pelatihan.html">Biaya Pelatihan</a></li>
                <li><a href="${pagePrefix}biaya-kelas-pemantapan-online.html">Biaya Kelas Pemantapan & Online</a></li>
                <li><a href="${pagePrefix}mandiri.html">Biaya Keberangkatan</a></li>
              </ul>
            </li>

            <li class="dropdown-sub dropdown-sub-down">
              <a href="#" class="dropdown-toggle-sub">
                <span>Fasilitas</span>
                <i class="fa-solid fa-chevron-down arrow-sub"></i>
              </a>
              <ul class="submenu-sub submenu-down">
                <li><a href="${pagePrefix}kelas.html">Kelas</a></li>
                <li><a href="${pagePrefix}gedung.html">Gedung</a></li>
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

        <li class="dropdown">
          <a href="${pagePrefix}our-partner.html" class="dropdown-toggle">
            <span>Our Partner</span>
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
                          <span>日本語学校</span>
                          <span>LPK INTERNATIONAL JAPAN ECONOMY FUTURE CORP.</span>
                      </p>
                  </div>
                  <div class="footer-contact">
                      <h4>Alamat Kantor</h4>
                      <p><i class="fas fa-map-marker-alt"></i> <span>
Jl. Raya Padalarang Cisarua KM 2,5 no.5 Kampung Babakan Cinta RT.003 RW.004 Pasirhalang Cisarua, Bandung Barat 40551</span></p>
                      <p><i class="fas fa-phone-alt"></i> <span>08981191774 (Admin Kantor)</span></p>
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
  // 3. ADMIN WHATSAPP POPUP MODAL (SALMA & TANIA)
  // ==========================================
  const adminModalHTML = `
  <div class="admin-modal-overlay" id="adminModal">
    <div class="admin-modal-box">
      <button class="admin-modal-close" id="closeAdminModal">&times;</button>
      
      <div class="admin-modal-header">
        <div class="admin-modal-icon-wrapper">
          <i class="fa-brands fa-whatsapp"></i>
        </div>
        <h3>Kontak Kami</h3>
        <p>Silakan hubungi tim admin kami di bawah ini untuk konsultasi, pendaftaran pelatihan, maupun kerja sama mitra dengan LPK IJEF Corp:</p>
      </div>

      <div class="admin-list">
        <!-- Admin 1: Tania (Admin Rekrutmen / Pendaftaran Pelatihan) -->
        <div class="admin-card">
          <div class="admin-info">
            <div class="admin-avatar" style="background: #e0f2fe; color: #0284c7;">
              <i class="fa-solid fa-user-tie"></i>
            </div>
            <div class="admin-details">
              <h4>Tania</h4>
              <span>Admin Rekrutmen</span>
            </div>
          </div>
          <a href="https://wa.me/6282130826893?text=Halo%20Tania,%20saya%20ingin%20berkonsultasi%20dan%20mendapatkan%20informasi%20terkait%20pendaftaran%20pelatihan%20di%20LPK%20IJEF%20Corp." target="_blank" class="btn-wa-chat">
            <i class="fa-brands fa-whatsapp"></i>WhatsApp
          </a>
        </div>

        <!-- Admin 2: Salma (Admin Job) -->
        <div class="admin-card">
          <div class="admin-info">
            <div class="admin-avatar" style="background: #fef3c7; color: #d97706;">
              <i class="fa-solid fa-headset"></i>
            </div>
            <div class="admin-details">
              <h4>Salma</h4>
              <span>Admin Job</span>
            </div>
          </div>
          <a href="https://wa.me/6282130826893?text=Halo%20Salma%20Sensei,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20dan%20kerja%20sama%20mitra%20di%20LPK%20IJEF%20Corp." target="_blank" class="btn-wa-chat">
            <i class="fa-brands fa-whatsapp"></i>WhatsApp
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