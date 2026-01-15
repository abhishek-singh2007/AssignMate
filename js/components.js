// Component Loader - Navbar & Footer
class ComponentLoader {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.init();
  }

  async init() {
    await this.loadNavbar();
    await this.loadFooter();
    this.setupNavbarFunctionality();
    this.setActiveLink();
  }

  async loadNavbar() {
    try {
      const response = await fetch('components/navbar.html');
      const navbarHTML = await response.text();
      
      // Insert navbar at the beginning of body
      document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    } catch (error) {
      console.error('Error loading navbar:', error);
    }
  }

  async loadFooter() {
    try {
      const response = await fetch('components/footer.html');
      const footerHTML = await response.text();
      
      // Insert footer at the end of body, before scripts
      const scripts = document.querySelectorAll('script');
      if (scripts.length > 0) {
        scripts[0].insertAdjacentHTML('beforebegin', footerHTML);
      } else {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
      }
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    // Map file names to page identifiers
    const pageMap = {
      'index.html': 'home',
      'about.html': 'about',
      'services.html': 'services',
      'functionality.html': 'functionality',
      'reviews.html': 'reviews'
    };
    
    return pageMap[page] || 'home';
  }

  setActiveLink() {
    // Wait a bit for navbar to be loaded
    setTimeout(() => {
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === this.currentPage) {
          link.classList.add('active');
        }
      });
    }, 100);
  }

  setupNavbarFunctionality() {
    // Wait for navbar to be loaded
    setTimeout(() => {
      const navToggle = document.querySelector('.nav-toggle');
      const navMenu = document.querySelector('.nav-menu');

      if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
          navToggle.classList.toggle('active');
          navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
          });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
          if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
          }
        });
      }
    }, 100);
  }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ComponentLoader();
});