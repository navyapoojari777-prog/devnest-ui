document.addEventListener('DOMContentLoaded', () => {
  // Status Ticker Logic
  const latencyVal = document.getElementById('latency-val');
  const deploysVal = document.getElementById('deploys-val');
  let deployCount = 1204;

  if (latencyVal && deploysVal) {
    setInterval(() => {
      // Simulate latency fluctuation
      const lat = Math.floor(Math.random() * 8) + 20;
      latencyVal.textContent = `${lat}ms`;

      // Occasional deploy increment
      if (Math.random() > 0.8) {
        deployCount += Math.floor(Math.random() * 2);
        deploysVal.textContent = deployCount.toLocaleString();
      }
    }, 3000);
  }

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.glass-header');

  mobileToggle.addEventListener('click', () => {
    // Simple toggle for mobile menu visibility logic 
    // In a real app we'd toggle a class on nav-links. 
    // Since I hid nav-links with display:none on mobile in CSS, 
    // I need to toggle a class that changes that display property.

    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';

    if (navLinks.style.display === 'flex') {
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'rgba(10, 10, 15, 0.95)';
      navLinks.style.padding = '2rem';
      navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    }
  });

  // Sticky Header Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navLinks.style.display === 'flex') {
          navLinks.style.display = 'none';
        }
      }
    });
  });

  // Dashboard Preview Animations (Dummy Data Interactivity)
  const previewBars = document.querySelectorAll('.p-bar');
  if (previewBars.length > 0) {
    setInterval(() => {
      previewBars.forEach(bar => {
        const newHeight = Math.floor(Math.random() * 60) + 20;
        bar.style.height = newHeight + '%';
      });
    }, 2000);
  }

  // Dashboard Pie Chart Animation (Dummy)
  const pieCharts = document.querySelectorAll('.pie-chart-mockup');
  if (pieCharts.length > 0) {
    setInterval(() => {
      pieCharts.forEach(pie => {
        // Just a subtle rotation to show it's "alive"
        const currentRotation = pie.style.transform || 'rotate(0deg)';
        const match = currentRotation.match(/rotate\((\d+)deg\)/);
        const nextDeg = (match ? parseInt(match[1]) : 0) + 1;
        // Commented out to avoid overwhelming movement, but can be enabled if user wants real-time data feel
        // pie.style.transform = `rotate(${nextDeg}deg)`;
      });
    }, 100);
  }
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-in-up, .hero-visual');
  animatedElements.forEach(el => observer.observe(el));

  // Custom Cursor Glow Effect (Desktop Only)
  const cursorGlow = document.querySelector('.cursor-glow');

  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.opacity = '1';
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });
  }

  // Dynamic Tilt Effect for Cards
  const cards = document.querySelectorAll('.glass-card, .feature-card, .cta-box');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  // Modal Logic
  const modalOverlay = document.getElementById('modal-overlay');
  const loginModalContent = document.getElementById('login-modal-content');
  const signupModalContent = document.getElementById('signup-modal-content');
  const videoModalContent = document.getElementById('video-modal-content');
  const successModalContent = document.getElementById('success-modal-content');
  const modalClose = document.getElementById('modal-close');

  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const heroSignupBtn = document.getElementById('hero-signup-btn');
  const ctaSignupBtn = document.getElementById('cta-signup-btn');
  const watchDemoBtn = document.getElementById('watch-demo-btn');

  const starterPlanBtn = document.getElementById('starter-plan-btn');
  const proPlanBtn = document.getElementById('pro-plan-btn');
  const entPlanBtn = document.getElementById('ent-plan-btn');

  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const dummyProfile = document.getElementById('dummy-profile');
  const successMessage = document.getElementById('success-message');
  const closeSuccess = document.getElementById('close-success');
  const demoProgress = document.getElementById('demo-progress');
  const demoSignupBtn = document.getElementById('demo-signup-btn');

  const switchToSignup = document.getElementById('switch-to-signup');
  const switchToLogin = document.getElementById('switch-to-login');

  let demoInterval;

  const openModal = (type, plan = null) => {
    modalOverlay.classList.add('active');
    loginModalContent.classList.add('hidden');
    signupModalContent.classList.add('hidden');
    videoModalContent.classList.add('hidden');
    successModalContent.classList.add('hidden');

    if (type === 'login') {
      loginModalContent.classList.remove('hidden');
    } else if (type === 'signup') {
      signupModalContent.classList.remove('hidden');
      if (plan) {
        document.getElementById('signup-role').value = 'developer'; // default
        console.log('Selected plan:', plan);
      }
    } else if (type === 'demo') {
      videoModalContent.classList.remove('hidden');
      startDemoSimulation();
    }
    document.body.style.overflow = 'hidden'; // Prevent scroll
  };

  window.openModal = openModal;

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    clearInterval(demoInterval);
  };

  const startDemoSimulation = () => {
    let progress = 0;
    demoProgress.style.width = '0%';
    clearInterval(demoInterval);
    demoInterval = setInterval(() => {
      progress += 0.5;
      demoProgress.style.width = progress + '%';
      if (progress >= 100) clearInterval(demoInterval);
    }, 50);
  };

  loginBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal('login'); });
  signupBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal('signup'); });
  heroSignupBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal('signup'); });
  ctaSignupBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal('signup'); });
  watchDemoBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal('demo'); });
  demoSignupBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal('signup'); });

  starterPlanBtn?.addEventListener('click', (e) => { e.preventDefault(); window.selectedPlan = 'Starter'; openModal('signup', 'Starter'); });
  proPlanBtn?.addEventListener('click', (e) => { e.preventDefault(); window.selectedPlan = 'Professional'; openModal('signup', 'Professional'); });
  entPlanBtn?.addEventListener('click', (e) => { e.preventDefault(); window.selectedPlan = 'Enterprise'; openModal('signup', 'Enterprise'); });

  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

  switchToSignup?.addEventListener('click', (e) => { e.preventDefault(); openModal('signup'); });
  switchToLogin?.addEventListener('click', (e) => { e.preventDefault(); openModal('login'); });

  // Dummy Form Submission Handling
  const handleSubmission = (e, type) => {
    e.preventDefault();

    // Just show success and close modal for now
    successModalContent.classList.remove('hidden');
    loginModalContent.classList.add('hidden');
    signupModalContent.classList.add('hidden');

    if (type === 'signup') {
      successMessage.textContent = 'Account created successfully!';
    } else {
      successMessage.textContent = 'Logged in successfully!';
    }
  };

  loginForm?.addEventListener('submit', (e) => handleSubmission(e, 'login'));
  signupForm?.addEventListener('submit', (e) => handleSubmission(e, 'signup'));
  closeSuccess?.addEventListener('click', closeModal);
});
