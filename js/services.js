// Services Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize services section animations
  initializeServicesAnimations();
  
  // Add service card interactions
  addServiceCardInteractions();
});

// Function to initialize scroll-triggered animations
function initializeServicesAnimations() {
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
  
  // Observe services section elements
  const servicesSection = document.querySelector('.services');
  if (servicesSection) {
    
    // Section header
    const sectionHeader = servicesSection.querySelector('.section-header');
    if (sectionHeader) {
      sectionHeader.style.opacity = '0';
      sectionHeader.style.transform = 'translateY(30px)';
      sectionHeader.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(sectionHeader);
    }
    
    // Service cards
    const serviceCards = servicesSection.querySelectorAll('.service-card');
    serviceCards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(card);
    });
    
    // Services footer
    const servicesFooter = servicesSection.querySelector('.services-footer');
    if (servicesFooter) {
      servicesFooter.style.opacity = '0';
      servicesFooter.style.transform = 'translateY(30px)';
      servicesFooter.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(servicesFooter);
    }
  }
}

// Function to add interactive hover effects
function addServiceCardInteractions() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    // Enhanced hover effects
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click tracking for analytics
    const ctaButton = card.querySelector('.service-cta');
    if (ctaButton) {
      ctaButton.addEventListener('click', function() {
        const serviceName = card.querySelector('.service-title').textContent;
        
        // Track service CTA click
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            event_category: 'Service CTA',
            event_label: serviceName
          });
        }
      });
    }
  });
}

// WhatsApp functions for specific services
function openWhatsAppService(serviceName) {
  const message = `Hi! I need help with ${serviceName}. Please share details and pricing.`;
  const phoneNumber = "919005315241";
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Try native app first
    const nativeAppUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    const webFallbackUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = nativeAppUrl;
    document.body.appendChild(iframe);
    
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.open(webFallbackUrl, '_blank');
    }, 1000);
    
    setTimeout(() => {
      if (!document.hidden) {
        window.open(webFallbackUrl, '_blank');
      }
    }, 1500);
    
  } else {
    // Desktop: Open WhatsApp Web
    const webUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(webUrl, '_blank');
  }
}

// WhatsApp function for bulk inquiries
function openWhatsAppBulk() {
  const message = "Hi! I'm interested in bulk orders and custom pricing. Please provide details.";
  const phoneNumber = "919005315241";
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    const nativeAppUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    const webFallbackUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = nativeAppUrl;
    document.body.appendChild(iframe);
    
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.open(webFallbackUrl, '_blank');
    }, 1000);
    
    setTimeout(() => {
      if (!document.hidden) {
        window.open(webFallbackUrl, '_blank');
      }
    }, 1500);
    
  } else {
    const webUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(webUrl, '_blank');
  }
  
  // Track bulk inquiry click
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click', {
      event_category: 'Bulk Inquiry',
      event_label: 'Services Section'
    });
  }
}

// Smooth scroll to services section (can be called from other sections)
function scrollToServices() {
  const servicesSection = document.querySelector('.services');
  if (servicesSection) {
    servicesSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Export functions for global use
window.openWhatsAppService = openWhatsAppService;
window.openWhatsAppBulk = openWhatsAppBulk;
window.scrollToServices = scrollToServices;