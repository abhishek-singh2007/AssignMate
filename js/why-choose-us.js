// Why Choose Us Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize why choose us section animations
  initializeWhyChooseUsAnimations();
  
  // Add trust point interactions
  addTrustPointInteractions();
});

// Function to initialize scroll-triggered animations
function initializeWhyChooseUsAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.dataset.delay || 0;
        
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, delay);
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  // Observe why choose us section elements
  const whyChooseUsSection = document.querySelector('.why-choose-us');
  if (whyChooseUsSection) {
    
    // Section header
    const sectionHeader = whyChooseUsSection.querySelector('.section-header');
    if (sectionHeader) {
      sectionHeader.style.opacity = '0';
      sectionHeader.style.transform = 'translateY(30px)';
      sectionHeader.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(sectionHeader);
    }
    
    // Trust points
    const trustPoints = whyChooseUsSection.querySelectorAll('.trust-point');
    trustPoints.forEach((point) => {
      point.style.opacity = '0';
      point.style.transform = 'translateY(30px)';
      point.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(point);
    });
    
    // Trust stats
    const trustStats = whyChooseUsSection.querySelector('.trust-stats');
    if (trustStats) {
      trustStats.style.opacity = '0';
      trustStats.style.transform = 'translateY(30px)';
      trustStats.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(trustStats);
    }
    
    // Section CTA
    const sectionCta = whyChooseUsSection.querySelector('.section-cta');
    if (sectionCta) {
      sectionCta.style.opacity = '0';
      sectionCta.style.transform = 'translateY(30px)';
      sectionCta.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(sectionCta);
    }
  }
}

// Function to add interactive trust point effects
function addTrustPointInteractions() {
  const trustPoints = document.querySelectorAll('.trust-point');
  
  trustPoints.forEach(point => {
    // Enhanced hover effects
    point.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    point.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add counter animation for stats when they come into view
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    const finalValue = stat.textContent;
    const isPercentage = finalValue.includes('%');
    const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(stat, 0, numericValue, 2000, isPercentage);
          observer.unobserve(stat);
        }
      });
    });
    
    observer.observe(stat);
  });
  
  // Add click tracking for trust CTA
  const trustCtaBtn = document.querySelector('.trust-cta-btn');
  if (trustCtaBtn) {
    trustCtaBtn.addEventListener('click', function() {
      // Track trust section CTA click
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'Trust CTA',
          event_label: 'Why Choose Us Section'
        });
      }
    });
  }
}

// Counter animation function
function animateCounter(element, start, end, duration, isPercentage = false) {
  const range = end - start;
  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (range * easeOut));
    
    if (isPercentage) {
      element.textContent = current + '%';
    } else if (element.textContent.includes('+')) {
      element.textContent = current + '+';
    } else if (element.textContent.includes('/')) {
      element.textContent = current + '/7';
    } else {
      element.textContent = current;
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Add subtle parallax effect to trust points (optional)
function addParallaxEffect() {
  const trustPoints = document.querySelectorAll('.trust-point');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.02;
    
    trustPoints.forEach((point, index) => {
      const yPos = rate * (index % 2 === 0 ? 1 : -1);
      point.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Export functions for potential external use
window.scrollToWhyChooseUs = function() {
  const whyChooseUsSection = document.querySelector('.why-choose-us');
  if (whyChooseUsSection) {
    whyChooseUsSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};