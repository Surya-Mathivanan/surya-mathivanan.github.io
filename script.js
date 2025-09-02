// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");
const backButton = document.getElementById("backButton");
const mainGrid = document.getElementById("mainGrid");
const gridItems = document.querySelectorAll(".grid-item");
const expandedViews = document.querySelectorAll(".expanded-view");
const suggestionItems = document.querySelectorAll(".suggestion-item");



// Contact Page JavaScript - Enhanced Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initFormHandler();
    initAnimations();
    initScrollAnimations();
    initSocialLinkTracking();
    initFormValidation();
});

// Form submission handler with validation and feedback
function initFormHandler() {
    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');
    const submitBtn = document.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        showLoadingState(submitBtn);
        
        try {
            // Simulate form submission (replace with actual API call)
            const formData = getFormData();
            const result = await submitForm(formData);
            
            if (result.success) {
                showSuccessMessage(responseMessage);
                resetForm(contactForm, submitBtn);
            } else {
                showErrorMessage(responseMessage, result.message);
                resetButton(submitBtn);
            }
        } catch (error) {
            showErrorMessage(responseMessage, 'An error occurred. Please try again.');
            resetButton(submitBtn);
        }
    });
}

// Form validation
function initFormValidation() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Remove validation styling on focus
        input.addEventListener('focus', function() {
            clearFieldValidation(this);
        });
    });
}

function validateForm() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Validate required fields
    if (!validateField(firstName)) isValid = false;
    if (!validateField(lastName)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(subject)) isValid = false;
    if (!validateField(message)) isValid = false;
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is empty
    if (!value) {
        errorMessage = 'This field is required';
        isValid = false;
    } else {
        // Field-specific validation
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'text':
                if (value.length < 2) {
                    errorMessage = 'Please enter at least 2 characters';
                    isValid = false;
                }
                break;
            default:
                if (field.tagName === 'TEXTAREA' && value.length < 10) {
                    errorMessage = 'Please enter at least 10 characters';
                    isValid = false;
                }
        }
    }
    
    // Apply validation styling
    if (isValid) {
        field.style.borderColor = 'var(--success-color)';
        removeFieldError(field);
    } else {
        field.style.borderColor = 'var(--error-color)';
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    removeFieldError(field); // Remove any existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = 'var(--error-color)';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function clearFieldValidation(field) {
    field.style.borderColor = 'var(--border-color)';
    removeFieldError(field);
}

// Get form data
function getFormData() {
    return {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        timestamp: new Date().toISOString()
    };
}

// Simulate form submission (replace with actual API call)
function submitForm(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate API response
            resolve({ success: true });
        }, 2000);
    });
}

// Loading state management
function showLoadingState(button) {
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;
    button.style.cursor = 'not-allowed';
}

function resetButton(button) {
    button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    button.disabled = false;
    button.style.cursor = 'pointer';
}

// Success/Error message handling
function showSuccessMessage(messageElement) {
    messageElement.className = 'response-message success';
    messageElement.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
    messageElement.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideMessage(messageElement);
    }, 5000);
}

function showErrorMessage(messageElement, message) {
    messageElement.className = 'response-message error';
    messageElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    messageElement.style.display = 'block';
    
    // Auto-hide after 7 seconds
    setTimeout(() => {
        hideMessage(messageElement);
    }, 7000);
}

function hideMessage(messageElement) {
    messageElement.style.opacity = '0';
    setTimeout(() => {
        messageElement.style.display = 'none';
        messageElement.style.opacity = '1';
    }, 300);
}

// Form reset
function resetForm(form, button) {
    form.reset();
    resetButton(button);
    
    // Clear validation styling
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        clearFieldValidation(input);
    });
}

// Animation initialization
function initAnimations() {
    // Add stagger animation to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('fade-in');
    });
    
    // Add hover sound effects (optional)
    addHoverSounds();
}

// Scroll animations for statistics
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add random delay for more natural animation
                const delay = Math.random() * 0.3;
                entry.target.style.animationDelay = `${delay}s`;
                entry.target.classList.add('animate');
                
                // Animate numbers counting up
                animateCounter(entry.target);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });
    
    // Observe info blocks for slide-in animation
    document.querySelectorAll('.info-block').forEach((block, index) => {
        block.style.transform = 'translateX(-20px)';
        block.style.opacity = '0';
        block.style.transition = 'all 0.6s ease';
        block.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            block.style.transform = 'translateX(0)';
            block.style.opacity = '1';
        }, 500 + (index * 100));
    });
}

// Animate counter numbers
function animateCounter(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    const finalNumber = numberElement.textContent;
    
    // Extract numeric value
    const isPlus = finalNumber.includes('+');
    const isHours = finalNumber.includes('h');
    const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let currentNumber = 0;
    const increment = numericValue / 30; // 30 steps for smooth animation
    const duration = 1000; // 1 second
    const stepTime = duration / 30;
    
    const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(counter);
        }
        
        let displayValue = Math.floor(currentNumber).toString();
        if (isPlus) displayValue += '+';
        if (isHours) displayValue += 'h';
        
        numberElement.textContent = displayValue;
    }, stepTime);
}

// Social link tracking and analytics
function initSocialLinkTracking() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.title || this.getAttribute('aria-label');
            
            // Track click (replace with actual analytics)
            trackSocialClick(platform, this.href);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Analytics tracking function (implement with your preferred service)
function trackSocialClick(platform, url) {
    console.log(`Social link clicked: ${platform} - ${url}`);
    
    // Example Google Analytics tracking (uncomment if using GA)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'social_click', {
    //         'social_platform': platform,
    //         'link_url': url
    //     });
    // }
}

// Add hover sound effects (optional feature)
function addHoverSounds() {
    // Only add if user hasn't disabled sounds
    if (localStorage.getItem('soundsEnabled') !== 'false') {
        const buttons = document.querySelectorAll('.submit-btn, .social-link, .resume-link');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                // Play subtle hover sound (implement if desired)
                // playHoverSound();
            });
        });
    }
}

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Enhanced form navigation
    if (e.key === 'Enter' && e.target.matches('.form-input:not([type="submit"])')) {
        e.preventDefault();
        const inputs = Array.from(document.querySelectorAll('.form-input, .form-textarea'));
        const currentIndex = inputs.indexOf(e.target);
        const nextInput = inputs[currentIndex + 1];
        
        if (nextInput) {
            nextInput.focus();
        } else {
            document.querySelector('.submit-btn').focus();
        }
    }
    
    // Escape key to close messages
    if (e.key === 'Escape') {
        const visibleMessage = document.querySelector('.response-message[style*="block"]');
        if (visibleMessage) {
            hideMessage(visibleMessage);
        }
    }
});

// Auto-save form data to prevent loss
function initAutoSave() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    
    // Load saved data on page load
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(`contact_${input.id}`);
        if (savedValue) {
            input.value = savedValue;
        }
        
        // Save data on input
        input.addEventListener('input', function() {
            localStorage.setItem(`contact_${this.id}`, this.value);
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        setTimeout(() => {
            inputs.forEach(input => {
                localStorage.removeItem(`contact_${input.id}`);
            });
        }, 3000); // Clear after successful submission delay
    });
}

// Initialize auto-save if not in private browsing
try {
    localStorage.setItem('test', '1');
    localStorage.removeItem('test');
    initAutoSave();
} catch (e) {
    console.log('LocalStorage not available - auto-save disabled');
}

// Theme detection and adjustment
function detectTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Adjust animations based on user preferences
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-base', 'none');
    }
    
    // Listen for theme changes
    prefersDark.addEventListener('change', (e) => {
        // Adjust theme if needed
        console.log('Theme changed:', e.matches ? 'dark' : 'light');
    });
}

// Initialize theme detection
detectTheme();

// Performance optimization - lazy load map
function initLazyMap() {
    const mapContainer = document.querySelector('.map-container');
    const mapIframe = mapContainer.querySelector('iframe');
    
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Map is visible, ensure it's loaded
                if (!mapIframe.src) {
                    mapIframe.src = mapIframe.getAttribute('data-src') || mapIframe.src;
                }
                mapObserver.unobserve(entry.target);
            }
        });
    });
    
    mapObserver.observe(mapContainer);
}

// Initialize lazy loading
initLazyMap();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        validateField,
        getFormData,
        trackSocialClick
    };
}




// Track current state
let isOnHomePage = true;

// Search functionality - only works on home page
searchInput.addEventListener("input", function () {
  if (!isOnHomePage) return; // Only work on home page

  const query = this.value.toLowerCase();
  if (query.length > 0) {
    searchSuggestions.style.display = "block";
    suggestionItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  } else {
    searchSuggestions.style.display = "none";
  }
});

// Search suggestions click - only works on home page
suggestionItems.forEach((item) => {
  item.addEventListener("click", function () {
    if (!isOnHomePage) return; // Only work on home page

    const section = this.dataset.section;
    showSection(section);
    searchInput.value = "";
    searchSuggestions.style.display = "none";
  });
});

// Hide suggestions when clicking outside
document.addEventListener("click", function (e) {
  if (!e.target.closest(".search-container")) {
    searchSuggestions.style.display = "none";
  }
});

// Grid item hover effects
gridItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    if (!isOnHomePage) return; // Only work on home page

    gridItems.forEach((otherItem) => {
      if (otherItem !== this) {
        otherItem.classList.add("blurred");
      }
    });
  });

  item.addEventListener("mouseleave", function () {
    if (!isOnHomePage) return; // Only work on home page

    gridItems.forEach((otherItem) => {
      otherItem.classList.remove("blurred");
    });
  });

  // Grid item click
  item.addEventListener("click", function () {
    if (!isOnHomePage) return; // Only work on home page

    const section = this.dataset.section;
    showSection(section);
  });
});

// Show section function
function showSection(section) {
  // Handle home section specially
  if (section === "home") {
    goToHome();
    return;
  }

  const targetView = document.getElementById(section + "View");
  if (targetView) {
    // First hide all expanded views
    expandedViews.forEach((view) => {
      view.classList.remove("active");
    });

    isOnHomePage = false;
    mainGrid.style.display = "none";
    targetView.classList.add("active");
    backButton.style.display = "block";

    // Hide search suggestions when leaving home page
    searchSuggestions.style.display = "none";

    // Add scroll animation for skill bars
    if (section === "skills") {
      setTimeout(() => {
        const skillBars = document.querySelectorAll(".skill-progress");
        skillBars.forEach((bar) => {
          bar.style.animation = "fillBar 1s ease-in-out";
        });
      }, 300);
    }
  }
}

// Function to return to home
function goToHome() {
  isOnHomePage = true;
  // Hide all expanded views
  expandedViews.forEach((view) => {
    view.classList.remove("active");
  });
  // Show main grid
  mainGrid.style.display = "grid";
  backButton.style.display = "none";

  // Reset search
  searchInput.value = "";
  searchSuggestions.style.display = "none";
}

// Back button functionality
backButton.addEventListener("click", goToHome);

// Smooth scrolling for expanded views
expandedViews.forEach((view) => {
  view.addEventListener("scroll", function () {
    const scrolled = this.scrollTop;
    const rate = scrolled * -0.5;
    this.style.backgroundPositionY = rate + "px";
  });
});

// Form submission
document
  .querySelector(".contact-form form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your message! I'll get back to you soon.");
    this.reset();
  });

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (mobileNav.classList.contains("active")) {
      closeMobileNav();
    } else {
      goToHome();
    }
  }
});

// Add loading animation
window.addEventListener("load", function () {
  gridItems.forEach((item, index) => {
    item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease both";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".skill-category, .project-card, .education-item")
  .forEach((el) => {
    observer.observe(el);
  });

// Mobile Navigation Elements
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileNav = document.getElementById("mobileNav");
const mobileNavOverlay = document.getElementById("mobileNavOverlay");
const mobileNavClose = document.getElementById("mobileNavClose");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

// Mobile menu toggle
mobileMenuToggle.addEventListener("click", function () {
  mobileNav.classList.add("active");
  mobileNavOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

// Close mobile nav
function closeMobileNav() {
  mobileNav.classList.remove("active");
  mobileNavOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

mobileNavClose.addEventListener("click", closeMobileNav);
mobileNavOverlay.addEventListener("click", closeMobileNav);

// Mobile nav item clicks
mobileNavItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    const action = this.dataset.action;
    const section = this.dataset.section;

    if (action === "home") {
      // Go back to home
      isOnHomePage = true;
      expandedViews.forEach((view) => {
        view.classList.remove("active");
      });
      mainGrid.style.display = "flex";
      searchInput.value = "";
      searchSuggestions.style.display = "none";
    } else if (section) {
      // Show section
      showSection(section);
    }

    closeMobileNav();
  });
});

// Close mobile nav on escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (mobileNav.classList.contains("active")) {
      closeMobileNav();
    } else {
      isOnHomePage = true;
      expandedViews.forEach((view) => {
        view.classList.remove("active");
      });
      mainGrid.style.display = "flex";
      backButton.style.display = "none";
      searchInput.value = "";
      searchSuggestions.style.display = "none";
    }
  }
});

// Update window resize handler
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    closeMobileNav();
  }
});

function showResumePopup() {
  const popup = document.getElementById("resume-popup");
  const closeBtn = document.getElementById("close-popup");

  // Close action
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Show popup after delay
  setTimeout(() => {
    popup.style.display = "flex";
  }, 4000); // 6 seconds delay
}

// Call once on initial load
window.addEventListener("DOMContentLoaded", showResumePopup);

// Optional: Call again whenever user navigates to #home (if using hash navigation)
window.addEventListener("hashchange", () => {
  if (window.location.hash === "" || window.location.hash === "#home") {
    showResumePopup();
  }
});
