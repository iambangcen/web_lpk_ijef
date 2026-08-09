document.addEventListener('DOMContentLoaded', () => {
  // 1. Elemen Navigasi & Mobile Side Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const closeBtn = document.querySelector('.close-btn');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  const navbar = document.querySelector('.navbar');

  // Fungsi Buka Menu Mobile
  const openMenu = () => {
    navLinks.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Kunci scroll saat menu terbuka
  };

  // Fungsi Tutup Menu Mobile
  const closeMenu = () => {
    navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Kembalikan scroll
  };

  // Event Listener Tombol Hamburger & Tutup
  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);

  // Tutup menu otomatis saat salah satu link navigasi diklik
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // 2. Efek Smooth Floating Header Saat Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Canvas Animasi Kelopak Sakura Gugur (Realistis)
  const canvas = document.getElementById('sakura-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.size = Math.random() * 10 + 8;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.03 - 0.015;
        this.opacity = Math.random() * 0.4 + 0.5;
        this.color = Math.random() > 0.3 ? '#f472b6' : '#fbcfe8';
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.8;
        this.angle += this.spin;

        if (this.y > height + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.opacity;

        const s = this.size;

        // Bentuk Kelopak Sakura Asli (dengan takik khas)
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(0, s);
        ctx.bezierCurveTo(-s * 0.7, s * 0.4, -s * 0.8, -s * 0.3, -s * 0.3, -s * 0.8);
        ctx.lineTo(0, -s * 0.65);
        ctx.lineTo(s * 0.3, -s * 0.8);
        ctx.bezierCurveTo(s * 0.8, -s * 0.3, s * 0.7, s * 0.4, 0, s);
        ctx.closePath();
        ctx.fill();

        // Serat Tengah
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 0.8;
        ctx.moveTo(0, s * 0.8);
        ctx.lineTo(0, -s * 0.3);
        ctx.stroke();

        ctx.restore();
      }
    }

    const petals = Array.from({ length: 35 }, () => new Petal());

    function animate() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(petal => {
        petal.update();
        petal.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }
});