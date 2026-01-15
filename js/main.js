// WhatsApp Deep Link Function - Opens Native App First
function openWhatsApp() {
  const message = "Hi! Mujhe academic help chahiye. Please share details and pricing.";
  const phoneNumber = "919005315241"; // Replace with your WhatsApp number
  
  // Detect if user is on mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Mobile: Try to open native WhatsApp app first
    const nativeAppUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    const webFallbackUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Create a hidden iframe to test if native app opens
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = nativeAppUrl;
    document.body.appendChild(iframe);
    
    // Set a timeout to open web version if native app doesn't respond
    setTimeout(() => {
      document.body.removeChild(iframe);
      window.open(webFallbackUrl, '_blank');
    }, 1000);
    
    // Try to focus back to our page (indicates native app didn't open)
    setTimeout(() => {
      if (!document.hidden) {
        window.open(webFallbackUrl, '_blank');
      }
    }, 1500);
    
  } else {
    // Desktop: Open WhatsApp Web directly
    const webUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(webUrl, '_blank');
  }
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Trigger entrance animations
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      heroContent.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // Add click ripple effect to CTA button
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.height, rect.width);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .cta-btn {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

// Removed sections and CSS/JS files as per suggestion
const sectionsToRemove = [
  'how-it-works',
  'services',
  'why-choose-us',
  'reviews'
];

sectionsToRemove.forEach(section => {
  const htmlFile = `sections/${section}.html`;
  const cssFile = `css/${section}.css`;
  const jsFile = `js/${section}.js`;
  
  // Logic to remove or ignore these files/sections
  console.log(`Removed: ${htmlFile}`);
  console.log(`Removed: ${cssFile}`);
  console.log(`Removed: ${jsFile}`);
});
