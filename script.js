// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Header scroll effect
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Gallery Filtering with animation
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach((item, index) => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    // Add delay for staggered animation
                    setTimeout(() => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 10);
                    }, index * 100);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const projectType = document.getElementById('project-type').value;
        const message = document.getElementById('message').value;
        
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const originalBg = submitBtn.style.background;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Enquiry Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';
        submitBtn.disabled = true;
        
        // In a real implementation, you would send this data to a server
        console.log({
            name, phone, email, projectType, message
        });
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = originalBg;
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.gallery-item, .feature, .contact-item').forEach(el => {
    observer.observe(el);
});

// Floating animation for trust badges
const badges = document.querySelectorAll('.badge');
badges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.2}s`;
});

// Before/After Image Controls - Consolidated Version
function initImageControls() {
    const beforeAfterContainers = document.querySelectorAll('.before-after-container');
    
    if (beforeAfterContainers.length === 0) return;
    
    beforeAfterContainers.forEach(container => {
        const beforeBtn = container.querySelector('.image-btn[data-image="before"]');
        const afterBtn = container.querySelector('.image-btn[data-image="after"]');
        const beforeImg = container.querySelector('.before-img');
        const afterImg = container.querySelector('.after-img');
        
        // Check if elements exist
        if (!beforeBtn || !afterBtn || !beforeImg || !afterImg) return;
        
        // Function to show before image
        const showBefore = () => {
            beforeBtn.classList.add('active');
            afterBtn.classList.remove('active');
            beforeImg.classList.add('active');
            afterImg.classList.remove('active');
        };
        
        // Function to show after image
        const showAfter = () => {
            afterBtn.classList.add('active');
            beforeBtn.classList.remove('active');
            afterImg.classList.add('active');
            beforeImg.classList.remove('active');
        };
        
        // Set initial state
        showBefore();
        
        // Before button click
        beforeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showBefore();
        });
        
        // After button click
        afterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showAfter();
        });
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            // Swipe left (show after)
            if (touchStartX - touchEndX > swipeThreshold) {
                showAfter();
            }
            
            // Swipe right (show before)
            if (touchEndX - touchStartX > swipeThreshold) {
                showBefore();
            }
        }
        
        // Desktop hover effect (only if hover is supported)
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            container.addEventListener('mouseenter', showAfter);
            container.addEventListener('mouseleave', showBefore);
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize image controls
    initImageControls();
    
    // Initialize all gallery items as visible
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.classList.add('visible');
    });
});

// Re-initialize image controls on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initImageControls();
    }, 250); // Debounce resize events
});