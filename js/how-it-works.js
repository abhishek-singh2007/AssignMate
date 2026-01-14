// How It Works Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Add staggered animation delays for step cards
        if (element.classList.contains('step-card')) {
          const delay = element.dataset.delay || 0;
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, delay);
        } else {
          // Standard fade-in-up animation
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
        
        // Unobserve after animation triggers
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  // Initialize animations for how-it-works elements
  const howItWorksSection = document.querySelector('.how-it-works');
  if (howItWorksSection) {
    
    // Observe section header
    const sectionHeader = howItWorksSection.querySelector('.section-header');
    if (sectionHeader) {
      sectionHeader.style.opacity = '0';
      sectionHeader.style.transform = 'translateY(30px)';
      sectionHeader.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(sectionHeader);
    }
    
    // Observe step cards with individual delays
    const stepCards = howItWorksSection.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      card.dataset.delay = (index + 1) * 200; // 200ms, 400ms, 600ms delays
      observer.observe(card);
    });
    
    // Observe section CTA
    const sectionCta = howItWorksSection.querySelector('.section-cta');
    if (sectionCta) {
      sectionCta.style.opacity = '0';
      sectionCta.style.transform = 'translateY(30px)';
      sectionCta.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(sectionCta);
    }
    
    // Add hover sound effect (optional - can be removed)
    stepCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        // Subtle scale animation on hover
        this.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
    
    // Add click tracking for analytics (optional)
    const ctaButton = sectionCta?.querySelector('.secondary-cta-btn');
    if (ctaButton) {
      ctaButton.addEventListener('click', function() {
        // Track how-it-works CTA click
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            event_category: 'CTA',
            event_label: 'How It Works Section'
          });
        }
      });
    }
  }
  
  // Smooth scrolling enhancement for section navigation
  function smoothScrollTo(target, duration = 800) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80; // Account for fixed header if any
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animateScroll(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animateScroll);
    }
    
    // Easing function
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animateScroll);
  }
  
  // Export smooth scroll function for potential use elsewhere
  window.smoothScrollTo = smoothScrollTo;
});