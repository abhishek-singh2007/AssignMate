// Reviews Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize reviews section animations
  initializeReviewsAnimations();
  
  // Add review card interactions
  addReviewCardInteractions();
  
  // Handle image loading errors gracefully
  handleImageErrors();
});

// Function to initialize scroll-triggered animations
function initializeReviewsAnimations() {
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
  
  // Observe reviews section elements
  const reviewsSection = document.querySelector('.reviews');
  if (reviewsSection) {
    
    // Section header
    const sectionHeader = reviewsSection.querySelector('.section-header');
    if (sectionHeader) {
      sectionHeader.style.opacity = '0';
      sectionHeader.style.transform = 'translateY(30px)';
      sectionHeader.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(sectionHeader);
    }
    
    // Review cards
    const reviewCards = reviewsSection.querySelectorAll('.review-card');
    reviewCards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(card);
    });
    
    // Reviews footer
    const reviewsFooter = reviewsSection.querySelector('.reviews-footer');
    if (reviewsFooter) {
      reviewsFooter.style.opacity = '0';
      reviewsFooter.style.transform = 'translateY(30px)';
      reviewsFooter.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(reviewsFooter);
    }
  }
}

// Function to add interactive review card effects
function addReviewCardInteractions() {
  const reviewCards = document.querySelectorAll('.review-card');
  
  reviewCards.forEach(card => {
    // Enhanced hover effects
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px) scale(1.02)';
      
      // Add subtle glow to stars
      const stars = this.querySelectorAll('.star');
      stars.forEach(star => {
        star.style.filter = 'drop-shadow(0 0 4px rgba(255, 193, 7, 0.8))';
      });
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      
      // Reset star glow
      const stars = this.querySelectorAll('.star');
      stars.forEach(star => {
        star.style.filter = 'drop-shadow(0 0 2px rgba(255, 193, 7, 0.5))';
      });
    });
  });
  
  // Add click tracking for reviews CTA
  const reviewsCtaBtn = document.querySelector('.reviews-cta');
  if (reviewsCtaBtn) {
    reviewsCtaBtn.addEventListener('click', function() {
      // Track reviews CTA click
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'Reviews CTA',
          event_label: 'Share Experience Button'
        });
      }
    });
  }
}

// Function to handle image loading errors gracefully
function handleImageErrors() {
  // Handle reviewer avatar images
  const avatarImages = document.querySelectorAll('.reviewer-avatar img');
  avatarImages.forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      const placeholder = this.nextElementSibling;
      if (placeholder && placeholder.classList.contains('avatar-placeholder')) {
        placeholder.style.display = 'flex';
      }
    });
  });
  
  // Handle review delivery images
  const reviewImages = document.querySelectorAll('.review-image img');
  reviewImages.forEach(img => {
    img.addEventListener('error', function() {
      const imageContainer = this.parentElement;
      if (imageContainer && imageContainer.classList.contains('review-image')) {
        imageContainer.style.display = 'none';
      }
    });
  });
}

// Function to add typing animation to review text (optional enhancement)
function addTypingAnimationToReviews() {
  const reviewTexts = document.querySelectorAll('.review-text');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const reviewText = entry.target;
        const originalText = reviewText.textContent;
        reviewText.textContent = '';
        
        let index = 0;
        const typingSpeed = 30; // milliseconds per character
        
        function typeCharacter() {
          if (index < originalText.length) {
            reviewText.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeCharacter, typingSpeed);
          }
        }
        
        setTimeout(typeCharacter, 500); // Delay before typing starts
        observer.unobserve(reviewText);
      }
    });
  }, { threshold: 0.5 });
  
  reviewTexts.forEach(text => {
    observer.observe(text);
  });
}

// Function to animate stars on scroll
function animateStarsOnScroll() {
  const reviewCards = document.querySelectorAll('.review-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stars = entry.target.querySelectorAll('.star');
        stars.forEach((star, index) => {
          setTimeout(() => {
            star.style.transform = 'scale(1.2)';
            star.style.filter = 'drop-shadow(0 0 6px rgba(255, 193, 7, 0.9))';
            
            setTimeout(() => {
              star.style.transform = 'scale(1)';
              star.style.filter = 'drop-shadow(0 0 2px rgba(255, 193, 7, 0.5))';
            }, 200);
          }, index * 100);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  reviewCards.forEach(card => {
    observer.observe(card);
  });
}

// Initialize optional enhancements
// Uncomment these lines to enable additional animations
// addTypingAnimationToReviews();
// animateStarsOnScroll();

// Export functions for potential external use
window.scrollToReviews = function() {
  const reviewsSection = document.querySelector('.reviews');
  if (reviewsSection) {
    reviewsSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Function to add new review dynamically (for future use)
window.addReview = function(reviewData) {
  const reviewsGrid = document.querySelector('.reviews-grid');
  if (!reviewsGrid) return;
  
  const reviewCard = document.createElement('div');
  reviewCard.className = 'review-card fade-in-up';
  reviewCard.innerHTML = `
    <div class="review-header">
      <div class="reviewer-info">
        <div class="reviewer-avatar">
          <img src="${reviewData.avatar}" alt="${reviewData.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="avatar-placeholder">${reviewData.name.charAt(0)}</div>
        </div>
        <div class="reviewer-details">
          <h4 class="reviewer-name">${reviewData.name}</h4>
          <p class="reviewer-course">${reviewData.course}</p>
        </div>
      </div>
      <div class="review-rating">
        ${'<span class="star">⭐</span>'.repeat(5)}
      </div>
    </div>
    <div class="review-content">
      <p class="review-text">"${reviewData.text}"</p>
    </div>
    ${reviewData.image ? `<div class="review-image"><img src="${reviewData.image}" alt="Delivery preview"></div>` : ''}
  `;
  
  reviewsGrid.appendChild(reviewCard);
  handleImageErrors(); // Re-initialize error handling for new images
};