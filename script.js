/**
 * SMYRNA FELLOWSHIP TRUST - OFFICIAL INTERACTIVE SCRIPT
 * Location: Ooty, The Nilgiris, Tamil Nadu, India
 * Registration: 124/1988 | 80G Tax Exemption | FCRA Approved
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initScrollAnimations();
  initCounters();
  initImpactCalculator();
  initDonationModal();
  initVolunteerModal();
  initStoriesCarousel();
  initGalleryFilter();
  initForms();
  initBackToTop();
  initAuroraMouseEffect();
});

/* -------------------------------------------------------------------------- */
/* 1. Theme Toggle (Dark / Light Aurora Theme)                               */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('smyrna_theme') || 'dark';
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeIcon(true);
  }

  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('smyrna_theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
    showToast(isLight ? 'Light theme activated' : 'Dark Aurora theme activated');
  });
}

function updateThemeIcon(isLight) {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;
  themeToggleBtn.innerHTML = isLight
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
}

/* -------------------------------------------------------------------------- */
/* 2. Mobile Navigation & Sticky Header Scroll Handler                       */
/* -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navbar = document.getElementById('navbar');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      toggleBtn.classList.toggle('active', isActive);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navbar.contains(e.target)) {
        navMenu.classList.remove('active');
        toggleBtn.classList.remove('active');
      }
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggleBtn.classList.remove('active');
      });
    });
  }

  // Handle sticky navbar scroll transition (Transparent -> Solid White)
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
}

function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  if (window.scrollY > 25) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/* -------------------------------------------------------------------------- */
/* 3. Scroll Animations & Active Nav Link ScrollSpy                           */
/* -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Navbar active link highlight on scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = 'hero';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navbar = document.getElementById('navbar');
        const headerOffset = navbar ? navbar.offsetHeight + 10 : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 4. Number Counter Animation                                                */
/* -------------------------------------------------------------------------- */
function initCounters() {
  const counterElements = document.querySelectorAll('.counter-num');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach(el => {
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = Math.ceil(target / 60);

          const timer = setInterval(() => {
            count += speed;
            if (count >= target) {
              el.innerText = target.toLocaleString() + suffix;
              clearInterval(timer);
            } else {
              el.innerText = count.toLocaleString() + suffix;
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('impact-stats');
  if (statsSection) observer.observe(statsSection);
}

/* -------------------------------------------------------------------------- */
/* 5. Interactive Impact Calculator Slider                                    */
/* -------------------------------------------------------------------------- */
function initImpactCalculator() {
  const slider = document.getElementById('impact-slider');
  const amountDisplay = document.getElementById('calc-amount-display');
  const impactResultText = document.getElementById('calc-impact-text');
  const taxSavingsText = document.getElementById('calc-tax-savings');
  const amountBtns = document.querySelectorAll('.amount-btn');

  if (!slider || !amountDisplay) return;

  const impactRules = [
    { max: 1000, desc: "Provides 1 week of nutritious, warm home-cooked meals & fresh milk for an elder at Smyrna Haven." },
    { max: 2500, desc: "Sponsors complete educational books, uniforms & school stationery for 1 child for half a term." },
    { max: 5000, desc: "Sponsors 1 full month of medical care, daily nursing & nutritious diet for an abandoned elder." },
    { max: 10000, desc: "Funds 3 months of comprehensive schooling, nutritious meals & care for an orphaned child in Ooty." },
    { max: 25000, desc: "Sponsors a full mobile medical outreach clinic camp providing free diagnostic tests & medicine to 2 remote tribal villages." },
    { max: 100000, desc: "Sponsors complete vocational training tools, weaving looms & skill certification for 5 special-needs youth." }
  ];

  function updateCalculator(val) {
    const amount = parseInt(val, 10);
    amountDisplay.innerText = `₹${amount.toLocaleString('en-IN')}`;

    // Compute description
    let match = impactRules[impactRules.length - 1];
    for (let rule of impactRules) {
      if (amount <= rule.max) {
        match = rule;
        break;
      }
    }
    impactResultText.innerText = match.desc;

    // Tax savings estimation (50% deduction under 80G in 30% tax slab ~ 15% net savings)
    const estTaxSaving = Math.round(amount * 0.15);
    if (taxSavingsText) {
      taxSavingsText.innerText = `Approx. ₹${estTaxSaving.toLocaleString('en-IN')} tax savings (50% 80G deduction under Section 80G)`;
    }

    // Update active preset buttons
    amountBtns.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-val'), 10) === amount);
    });
  }

  slider.addEventListener('input', (e) => {
    updateCalculator(e.target.value);
  });

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      if (val) {
        slider.value = val;
        updateCalculator(val);
      }
    });
  });

  // Initial call
  updateCalculator(slider.value);
}

/* -------------------------------------------------------------------------- */
/* 6. Donation Modal Logic & Copy Functionality                               */
/* -------------------------------------------------------------------------- */
function initDonationModal() {
  const modalOverlay = document.getElementById('donation-modal');
  const openBtns = document.querySelectorAll('.open-donation-modal');
  const closeBtn = document.getElementById('close-donation-modal');

  if (!modalOverlay) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // Donation Tab switching (UPI/INR vs Foreign FCRA)
  const tabs = document.querySelectorAll('.donation-tab');
  const tabContents = document.querySelectorAll('.donation-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target-tab');
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.style.display = 'none');

      tab.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.style.display = 'block';
    });
  });

  // Copy to clipboard buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      }
    });
  });

  // Receipt Generator form inside Modal
  const receiptForm = document.getElementById('receipt-request-form');
  if (receiptForm) {
    receiptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your 80G Tax Exemption Receipt request has been logged. Our team will email your official certificate.');
      modalOverlay.classList.remove('active');
      receiptForm.reset();
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 7. Volunteer Application Modal                                              */
/* -------------------------------------------------------------------------- */
function initVolunteerModal() {
  const modalOverlay = document.getElementById('volunteer-modal');
  const openBtns = document.querySelectorAll('.open-volunteer-modal');
  const closeBtn = document.getElementById('close-volunteer-modal');
  const volunteerForm = document.getElementById('volunteer-form');

  if (!modalOverlay) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Application received! Thank you for offering your heart & hands to Smyrna Fellowship Trust.');
      modalOverlay.classList.remove('active');
      volunteerForm.reset();
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 8. Stories of Hope Carousel                                                */
/* -------------------------------------------------------------------------- */
function initStoriesCarousel() {
  const stories = [
    {
      name: "Priya Mary",
      role: "Former Smyrna Children's Home Resident • Now Registered Nurse",
      text: "“When I arrived at Smyrna as a young orphaned girl, I found more than shelter — I found a family that believed in me. Smyrna funded my nursing degree, and today I work proudly at a Nilgiris hospital caring for others with the same love I received here.”",
      img: "assets/images/children.jpg"
    },
    {
      name: "Grandfather Samuel (Age 82)",
      role: "Resident at Smyrna Haven Elder Care",
      text: "“After my family left me destitute, I feared sleeping under cold plastic sheets. Smyrna Haven took me in, gave me a clean warm bed, daily medicine, and respect. I now spend my morning walks in the Ooty gardens surrounded by laughter.”",
      img: "assets/images/elderly.jpg"
    },
    {
      name: "Anand & Devi",
      role: "Special Needs Vocational Training Graduates",
      text: "“At Smyrna's craft workshop, we learned handloom weaving and eco-friendly candle making. For the first time in our lives, we earn our own dignified income and help support our rural family in Nilgiris.”",
      img: "assets/images/vocational.jpg"
    }
  ];

  let currentIdx = 0;
  const nameEl = document.getElementById('story-author-name');
  const roleEl = document.getElementById('story-author-role');
  const textEl = document.getElementById('story-text');
  const imgEl = document.getElementById('story-img');
  const prevBtn = document.getElementById('story-prev-btn');
  const nextBtn = document.getElementById('story-next-btn');

  if (!textEl) return;

  function renderStory(idx) {
    const s = stories[idx];
    nameEl.innerText = s.name;
    roleEl.innerText = s.role;
    textEl.innerText = s.text;
    imgEl.src = s.img;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIdx = (currentIdx - 1 + stories.length) % stories.length;
      renderStory(currentIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % stories.length;
      renderStory(currentIdx);
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 9. Gallery Filtering                                                       */
/* -------------------------------------------------------------------------- */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 10. Contact & Newsletter Form Submissions                                  */
/* -------------------------------------------------------------------------- */
function initForms() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent successfully! Smyrna Trust team will respond within 24 hours.');
      contactForm.reset();
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing to Smyrna Fellowship Trust updates!');
      newsletterForm.reset();
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 11. Back To Top Floating Button                                            */
/* -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------------------------------------------------------------- */
/* 12. Aurora Mouse Blob Movement                                             */
/* -------------------------------------------------------------------------- */
function initAuroraMouseEffect() {
  const blob1 = document.querySelector('.aurora-blob-1');
  const blob2 = document.querySelector('.aurora-blob-2');

  if (!blob1 || !blob2) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 30;
    const y = (e.clientY / window.innerHeight) * 30;

    blob1.style.transform = `translate(${x}px, ${y}px)`;
    blob2.style.transform = `translate(${-x}px, ${-y}px)`;
  });
}

/* -------------------------------------------------------------------------- */
/* Toast Notification Utility                                                 */
/* -------------------------------------------------------------------------- */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
