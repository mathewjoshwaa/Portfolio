// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.centered-nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Adjust offset based on screen size
            const isMobile = window.innerWidth <= 768;
            const offset = isMobile ? 80 : 70;

            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Here you would typically send the form data to a server
        // For now, we'll just log it and show a success message
        console.log({
            name,
            email,
            subject,
            message
        });

        // Show success message
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// Add active class to nav links on scroll and handle header scroll effect
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const header = document.querySelector('header');

    // Add scrolled class to header when page is scrolled
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skills-category, .project-card, .timeline-item, .contact-item, .achievement-item, .hero-highlights .highlight-item');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Typewriter effect
function typeWriter(element, texts, wait = 3000) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            // Removing text
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            // Adding text
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal speed when typing
        }

        // If word is complete
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = wait; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Move to next text
            typeSpeed = 500; // Pause before starting new word
        }

        setTimeout(type, typeSpeed);
    }

    type(); // Start the typing effect
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add animation class to elements that should be visible on load
    document.querySelectorAll('.hero-text, .hero-image, .name-heading, .hero-description').forEach(element => {
        element.classList.add('animate');
    });

    // Initialize typewriter effect
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        typeWriter(typewriterElement, [
            'Java Full Stack Developer',
            'Backend Developer',
            'Frontend Developer',
            'Problem Solver'
        ]);
    }

    // Animate hero highlights with delay
    const highlightItems = document.querySelectorAll('.hero-highlights .highlight-item');
    highlightItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, 300 * (index + 1));
    });

    // Check for elements to animate on initial load
    animateOnScroll();
});

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Prevent zoom on input focus for iOS
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name=viewport]');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        });

        input.addEventListener('blur', () => {
            if (window.innerWidth <= 768) {
                const viewport = document.querySelector('meta[name=viewport]');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            }
        });
    });

    // Optimize scroll performance on mobile
    let ticking = false;
    function optimizedScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll functions are handled elsewhere
                ticking = false;
            });
            ticking = true;
        }
    }

    // Use optimized scroll for mobile
    if (window.innerWidth <= 768) {
        window.addEventListener('scroll', optimizedScroll);
    }

    // Touch event handling for better mobile interaction
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could trigger some action
                console.log('Swiped up');
            } else {
                // Swipe down - could trigger some action
                console.log('Swiped down');
            }
        }
    }

    // Improve tap targets for mobile
    const buttons = document.querySelectorAll('.btn, .social-icon, .social-link, .project-link');
    buttons.forEach(button => {
        button.style.minHeight = '44px';
        button.style.minWidth = '44px';
    });

    // Add loading states for better UX
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', () => {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Re-enable after 3 seconds (adjust based on your needs)
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });
}

// Initialize mobile optimizations
if (window.innerWidth <= 768) {
    initMobileOptimizations();
}

// Re-initialize on resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        initMobileOptimizations();
    }
});
