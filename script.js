/**
 * MILLETZA - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  
  function toggleMobileNav() {
    mobileNav.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  }

  if (mobileMenuBtn && mobileNavClose && mobileNavOverlay) {
    mobileMenuBtn.addEventListener('click', toggleMobileNav);
    mobileNavClose.addEventListener('click', toggleMobileNav);
    mobileNavOverlay.addEventListener('click', toggleMobileNav);
    
    // Close mobile nav when clicking a link
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', toggleMobileNav);
    });
  }

  // --- Header Scroll Effect ---
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Run once
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-children');
  animatedElements.forEach(el => observer.observe(el));

  // --- Product Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          // Small delay to allow display block to apply before animating opacity
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // Match transition duration
        }
      });
    });
  });

  // --- Wishlist Toggle ---
  const wishlistBtns = document.querySelectorAll('.product-wishlist');
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default if it's inside an anchor tag eventually
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
      }
    });
  });

  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- Form Submissions (Prevent Default for Demo) ---
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const originalText = btn.innerText;
      btn.innerText = 'Subscribed!';
      btn.style.backgroundColor = 'var(--color-accent)';
      
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = '';
        form.reset();
      }, 3000);
    });
  });

});
