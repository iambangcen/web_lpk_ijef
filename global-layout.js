document.addEventListener("DOMContentLoaded", function () {
  // Deteksi otomatis apakah file HTML berada di dalam sub-folder atau tidak
  const isInSubfolder = window.location.pathname.includes('/program/') || window.location.pathname.includes('/pages/');
  const assetPath = isInSubfolder ? "../assets/" : "assets/";
  const pagePrefix = isInSubfolder ? "../" : "";

  // 1. GLOBAL NAVBAR / HEADER
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

  // Sisipkan Navbar ke dalam halaman (Pastikan ada elemen penampung atau disisipkan di awal body)
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);


  // 2. GLOBAL FOOTER
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
});