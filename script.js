// Main JavaScript for Techworld Designs

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Swiper
  initSwiper();
  
  // Initialize header scroll effect
  initHeaderScroll();
  
  // Initialize animation on scroll
  initAnimationOnScroll();
  
  // Initialize back to top button
  initBackToTop();
  
  // Initialize read more/less functionality
  initReadMore();
  
  // Initialize testimonial hover effects
  initTestimonialHover();
  
  // Initialize service card hover effects
  initServiceCardHover();
});

/**
 * Initialize Swiper for testimonials
 */
function initSwiper() {
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    grabCursor: true,
    effect: 'coverflow',
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    }
  });
}

/**
 * Initialize header scroll effect
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Initialize animation on scroll
 */
function initAnimationOnScroll() {
  // Select all elements to animate
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  // Function to add animation class when element is in viewport
  function checkAnimations() {
    animatedElements.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('animate');
      }
    });
  }
  
  // Add event listener for scroll
  window.addEventListener('scroll', checkAnimations);
  
  // Check animations on page load
  checkAnimations();
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
  // Create back to top button
  const backToTopButton = document.createElement('div');
  backToTopButton.classList.add('back-to-top');
  backToTopButton.innerHTML = '↑';
  document.body.appendChild(backToTopButton);
  
  // Show/hide back to top button
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  // Scroll to top when button is clicked
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Initialize read more/less functionality
 */
function initReadMore() {
  const readMoreBtn = document.getElementById('read-more-btn');
  const moreInfo = document.getElementById('more-info');
  
  if (readMoreBtn && moreInfo) {
    readMoreBtn.addEventListener('click', function() {
      moreInfo.classList.toggle('hidden');
      moreInfo.classList.toggle('show');
      
      if (moreInfo.classList.contains('hidden')) {
        readMoreBtn.textContent = 'Read More';
      } else {
        readMoreBtn.textContent = 'Read Less';
      }
    });
  }
}

/**
 * Initialize testimonial hover effects
 */
function initTestimonialHover() {
  const testimonials = document.querySelectorAll('#testimonials .swiper-slide');
  
  testimonials.forEach(testimonial => {
    testimonial.addEventListener('mouseenter', function() {
      testimonials.forEach(t => t.classList.remove('hover'));
      this.classList.add('hover');
    });
  });
}

/**
 * Initialize service card hover effects
 */
function initServiceCardHover() {
  const serviceCards = document.querySelectorAll('#services .bg-white');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });
}

/**
 * Enhanced toggle text function for read more/less
 */
function toggleText() {
  const moreInfo = document.getElementById("more-info");
  const btn = document.getElementById("read-more-btn");
  
  // Toggle visibility of the text with animation
  if (moreInfo.classList.contains("hidden")) {
    moreInfo.classList.remove("hidden");
    setTimeout(() => {
      moreInfo.classList.add("show");
    }, 10);
    btn.textContent = "Read Less";
  } else {
    moreInfo.classList.remove("show");
    setTimeout(() => {
      moreInfo.classList.add("hidden");
    }, 500);
    btn.textContent = "Read More";
  }
}

/**
 * Smooth scroll to section when clicking on navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

/**
 * Add class to elements when they come into view
 */
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add .animate-on-scroll class to elements you want to animate
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

/**
 * Add parallax effect to banner section
 */
function parallaxEffect() {
  const banner = document.querySelector('.bg-cover');
  
  if (banner) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      banner.style.backgroundPosition = `50% ${scrollPosition * 0.5}px`;
    });
  }
}

// Initialize parallax effect
parallaxEffect();

/**
 * Handle navbar collapse on mobile
 */
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('nav');

if (navbarToggle && navbarMenu) {
  navbarToggle.addEventListener('click', function() {
    navbarMenu.classList.toggle('show');
  });
}

/**
 * Form validation for newsletter subscription
 */
const subscribeForm = document.querySelector('footer form');
const emailInput = document.querySelector('footer input[type="email"]');

if (subscribeForm && emailInput) {
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Show success message
    const successMessage = document.createElement('p');
    successMessage.textContent = 'Thank you for subscribing!';
    successMessage.classList.add('text-green-500', 'mt-2');
    
    this.appendChild(successMessage);
    emailInput.value = '';
    
    // Remove success message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  });
}

/**
 * Add custom cursor effect
 */
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Add hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .interactive');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      cursor.classList.add('expanded');
    });
    
    el.addEventListener('mouseleave', function() {
      cursor.classList.remove('expanded');
    });
  });
}

/**
 * Add fade in animation to elements on page load
 */
window.addEventListener('load', function() {
  document.querySelectorAll('.fade-in-on-load').forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 100 * index);
  });
});

/**
 * Add typing effect to main heading
 */
function initTypingEffect() {
  const heading = document.querySelector('.banner-section h1');
  
  if (heading) {
    const text = heading.textContent;
    heading.textContent = '';
    
    let i = 0;
    const speed = 100;
    
    function typeWriter() {
      if (i < text.length) {
        heading.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    
    setTimeout(typeWriter, 500);
  }
}

// Call typing effect if needed
// initTypingEffect();

/**
 * Preload images for better performance
 */
function preloadImages() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const preloadImg = new Image();
      preloadImg.src = src;
    }
  });
}

// Preload images
preloadImages();