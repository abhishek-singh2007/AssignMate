// Service-specific WhatsApp Functions
const PHONE_NUMBERS = {
  primary: "919005315241",
  research: "917607622720"  // Different number for research paper
};

// Service-specific WhatsApp function
function openWhatsAppService(serviceName) {
  let message = "";
  let phoneNumber = PHONE_NUMBERS.primary;
  
  // Set service-specific messages
  switch(serviceName.toLowerCase()) {
    case 'handwritten assignment':
    case 'handwritten':
      message = "Hi! I need help with handwritten assignment. Please share details and pricing.";
      break;
      
    case 'ppt presentation':
    case 'ppt':
      message = "Hi! I need help with PPT presentation. Please share details and pricing.";
      break;
      
    case 'project report':
    case 'project':
      message = "Hi! I need help with project report. Please share details and pricing.";
      break;
      
    case 'typed notes':
    case 'notes':
      message = "Hi! I need help with typed notes. Please share details and pricing.";
      break;
      
    case 'research work':
    case 'research paper':
    case 'research':
      message = "Hi! I need help with research paper. Please share details and pricing.";
      phoneNumber = PHONE_NUMBERS.research; // Different number for research
      break;
      
    case 'custom work':
    case 'custom':
      message = "Hi! I need help with custom work. Please share details and pricing.";
      break;
      
    default:
      message = `Hi! I need help with ${serviceName}. Please share details and pricing.`;
  }
  
  openWhatsAppWithMessage(message, phoneNumber);
}

// Bulk inquiry function
function openWhatsAppBulk() {
  const message = "Hi! I want to know about bulk orders and custom pricing.";
  openWhatsAppWithMessage(message, PHONE_NUMBERS.primary);
}

// Generic WhatsApp opener with custom message and number
function openWhatsAppWithMessage(message, phoneNumber) {
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
  } else {
    const webUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(webUrl, '_blank');
  }
}

// Add click handlers for service buttons when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners to service buttons
  const serviceButtons = document.querySelectorAll('.service-cta');
  serviceButtons.forEach(button => {
    const serviceName = button.getAttribute('onclick');
    if (serviceName && serviceName.includes('openWhatsAppService')) {
      // Extract service name from onclick attribute
      const match = serviceName.match(/openWhatsAppService\(['"]([^'"]+)['"]\)/);
      if (match) {
        const service = match[1];
        button.removeAttribute('onclick');
        button.addEventListener('click', () => openWhatsAppService(service));
      }
    }
  });

  // Add event listeners to bulk inquiry buttons  
  const bulkButtons = document.querySelectorAll('.bulk-inquiry-btn');
  bulkButtons.forEach(button => {
    button.removeAttribute('onclick');
    button.addEventListener('click', openWhatsAppBulk);
  });
});