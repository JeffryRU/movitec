// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// App Showcase Functionality
const showcaseButtons = document.querySelectorAll('.showcase-btn');
const showcaseScreens = document.querySelectorAll('.showcase-screen');
const showcaseDescriptions = document.querySelectorAll('.showcase-description');

// Auto-rotate variables
let currentScreenIndex = 0;
const screenNames = ['search', 'map', 'qr', 'history', 'coins', 'packages', 'payment', 'profile'];
let autoRotateInterval;
let isUserInteracting = false;

showcaseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetScreen = button.getAttribute('data-screen');
    
    // Set user interaction flag
    isUserInteracting = true;
    
    // Update current screen index based on user selection
    currentScreenIndex = screenNames.indexOf(targetScreen);
    
    // Remove active class from all buttons
    showcaseButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    // Hide all screens
    showcaseScreens.forEach(screen => screen.classList.remove('active'));
    // Show target screen
    const targetScreenElement = document.querySelector(`.showcase-screen[data-screen="${targetScreen}"]`);
    if (targetScreenElement) {
      targetScreenElement.classList.add('active');
    }
    
    // Hide all descriptions
    showcaseDescriptions.forEach(desc => desc.classList.remove('active'));
    // Show target description
    const targetDescription = document.querySelector(`.showcase-description[data-screen="${targetScreen}"]`);
    if (targetDescription) {
      targetDescription.classList.add('active');
    }
    
    // Clear existing auto-rotation
    clearInterval(autoRotateInterval);
    
    // Reset user interaction flag after a longer delay
    setTimeout(() => {
      isUserInteracting = false;
      startAutoRotation();
    }, 15000); // Wait 15 seconds before resuming auto-rotation
  });
});

// Auto-rotate showcase screens
function autoRotateShowcase() {
  if (!isUserInteracting) {
    currentScreenIndex = (currentScreenIndex + 1) % screenNames.length;
    const targetButton = document.querySelector(`.showcase-btn[data-screen="${screenNames[currentScreenIndex]}"]`);
    if (targetButton) {
      targetButton.click();
    }
  }
}

// Start auto-rotation function
function startAutoRotation() {
  if (!isUserInteracting) {
    autoRotateInterval = setInterval(autoRotateShowcase, 8000); // Increased to 8 seconds
  }
}

// Start auto-rotation initially
startAutoRotation();

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
  }
});

// Add some interactivity to package cards
document.querySelectorAll('.btn-package').forEach(button => {
  button.addEventListener('click', function() {
    // Add a simple feedback animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
    
    // Here you could add actual purchase functionality
    console.log('Package selected:', this.closest('.package-card').querySelector('h3').textContent);
  });
});

// Add hover effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});
