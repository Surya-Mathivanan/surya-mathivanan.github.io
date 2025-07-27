// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const backButton = document.getElementById('backButton');
const mainGrid = document.getElementById('mainGrid');
const gridItems = document.querySelectorAll('.grid-item');
const expandedViews = document.querySelectorAll('.expanded-view');
const suggestionItems = document.querySelectorAll('.suggestion-item');

// Track current state
let isOnHomePage = true;

// Search functionality - only works on home page
searchInput.addEventListener('input', function() {
    if (!isOnHomePage) return; // Only work on home page
    
    const query = this.value.toLowerCase();
    if (query.length > 0) {
        searchSuggestions.style.display = 'block';
        suggestionItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    } else {
        searchSuggestions.style.display = 'none';
    }
});

// Search suggestions click - only works on home page
suggestionItems.forEach(item => {
    item.addEventListener('click', function() {
        if (!isOnHomePage) return; // Only work on home page
        
        const section = this.dataset.section;
        showSection(section);
        searchInput.value = '';
        searchSuggestions.style.display = 'none';
    });
});

// Hide suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
        searchSuggestions.style.display = 'none';
    }
});

// Grid item hover effects
gridItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        if (!isOnHomePage) return; // Only work on home page
        
        gridItems.forEach(otherItem => {
            if (otherItem !== this) {
                otherItem.classList.add('blurred');
            }
        });
    });

    item.addEventListener('mouseleave', function() {
        if (!isOnHomePage) return; // Only work on home page
        
        gridItems.forEach(otherItem => {
            otherItem.classList.remove('blurred');
        });
    });

    // Grid item click
    item.addEventListener('click', function() {
        if (!isOnHomePage) return; // Only work on home page
        
        const section = this.dataset.section;
        showSection(section);
    });
});

// Show section function
function showSection(section) {
    const targetView = document.getElementById(section + 'View');
    if (targetView) {
        isOnHomePage = false;
        mainGrid.style.display = 'none';
        targetView.classList.add('active');
        backButton.style.display = 'block';
        
        // Hide search suggestions when leaving home page
        searchSuggestions.style.display = 'none';
        
        // Add scroll animation for skill bars
        if (section === 'skills') {
            setTimeout(() => {
                const skillBars = document.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    bar.style.animation = 'fillBar 1s ease-in-out';
                });
            }, 300);
        }
    }
}

// Back button functionality
backButton.addEventListener('click', function() {
    isOnHomePage = true;
    expandedViews.forEach(view => {
        view.classList.remove('active');
    });
    mainGrid.style.display = 'grid'; // Changed from 'flex' to 'grid'
    backButton.style.display = 'none';
    
    // Clear search input when returning to home
    searchInput.value = '';
    searchSuggestions.style.display = 'none';
});

// Smooth scrolling for expanded views
expandedViews.forEach(view => {
    view.addEventListener('scroll', function() {
        const scrolled = this.scrollTop;
        const rate = scrolled * -0.5;
        this.style.backgroundPositionY = rate + 'px';
    });
});

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (mobileNav.classList.contains('active')) {
            closeMobileNav();
        } else {
            isOnHomePage = true;
            expandedViews.forEach(view => {
                view.classList.remove('active');
            });
            mainGrid.style.display = 'grid'; // Changed from 'flex' to 'grid'
            backButton.style.display = 'none';
            searchInput.value = '';
            searchSuggestions.style.display = 'none';
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    gridItems.forEach((item, index) => {
        item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease both';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .education-item').forEach(el => {
    observer.observe(el);
});

// Mobile Navigation Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', function() {
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close mobile nav
function closeMobileNav() {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

mobileNavClose.addEventListener('click', closeMobileNav);
mobileNavOverlay.addEventListener('click', closeMobileNav);

// Mobile nav item clicks
mobileNavItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        const action = this.dataset.action;
        const section = this.dataset.section;
        
        if (action === 'home') {
            // Go back to home
            isOnHomePage = true;
            expandedViews.forEach(view => {
                view.classList.remove('active');
            });
            mainGrid.style.display = 'flex';
            searchInput.value = '';
            searchSuggestions.style.display = 'none';
        } else if (section) {
            // Show section
            showSection(section);
        }
        
        closeMobileNav();
    });
});

// Close mobile nav on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (mobileNav.classList.contains('active')) {
            closeMobileNav();
        } else {
            isOnHomePage = true;
            expandedViews.forEach(view => {
                view.classList.remove('active');
            });
            mainGrid.style.display = 'flex';
            backButton.style.display = 'none';
            searchInput.value = '';
            searchSuggestions.style.display = 'none';
        }
    }
});

// Update window resize handler
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileNav();
    }
});


  function showResumePopup() {
    const popup = document.getElementById('resume-popup');
    const closeBtn = document.getElementById('close-popup');

    // Close action
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    // Show popup after delay
    setTimeout(() => {
      popup.style.display = 'flex';
    }, 4000); // 6 seconds delay
  }

  // Call once on initial load
  window.addEventListener('DOMContentLoaded', showResumePopup);

  // Optional: Call again whenever user navigates to #home (if using hash navigation)
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '' || window.location.hash === '#home') {
      showResumePopup();
    }
  });