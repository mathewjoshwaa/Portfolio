// Animations JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false,
        offset: 50
    });

    // Handle preloader
    const preloader = document.querySelector('.preloader');

    // Hide preloader after page is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');

            // Enable scrolling after preloader is hidden
            document.body.style.overflow = 'auto';

            // Activate initial animations
            activateInitialAnimations();
        }, 500);
    });

    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Progress bar on scroll
    const progressBar = document.querySelector('.progress-bar');

    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = scrollPercentage + '%';
    });

    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');

    if (cursor) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add active class on clickable elements
        const clickableElements = document.querySelectorAll('a, button, input, textarea, .btn, .project-card, .timeline-content, .nav-link');

        clickableElements.forEach(function(element) {
            element.addEventListener('mouseenter', function() {
                cursor.classList.add('active');
            });

            element.addEventListener('mouseleave', function() {
                cursor.classList.remove('active');
            });
        });
    }

    // Handle page transitions for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const pageTransition = document.querySelector('.page-transition');

    internalLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Show transition
                pageTransition.classList.add('active');

                setTimeout(function() {
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'instant'
                    });

                    // Hide transition
                    pageTransition.classList.add('exit');

                    setTimeout(function() {
                        pageTransition.classList.remove('active');
                        pageTransition.classList.remove('exit');
                    }, 500);
                }, 500);
            }
        });
    });

    // Animate skill progress bars
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.animate-progress');

        progressBars.forEach(function(bar) {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        });
    }

    // Activate text reveal animations
    function activateTextReveal() {
        const textElements = document.querySelectorAll('.text-reveal');

        textElements.forEach(function(element) {
            // Skip the name heading
            if (element.classList.contains('name-heading')) {
                return;
            }

            // Create spans for each letter
            const text = element.textContent;
            element.textContent = '';

            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.textContent = text[i];
                span.style.transitionDelay = (0.05 * i) + 's';
                element.appendChild(span);
            }

            // Add active class after a delay
            setTimeout(function() {
                element.classList.add('active');
            }, 300);
        });
    }

    // Activate image reveal animations
    function activateImageReveal() {
        const imageElements = document.querySelectorAll('.image-reveal');

        imageElements.forEach(function(element) {
            // Add active class after a delay
            setTimeout(function() {
                element.classList.add('active');
            }, 300);
        });
    }

    // Activate staggered animations
    function activateStaggeredAnimations() {
        const staggerItems = document.querySelectorAll('.stagger-item');

        staggerItems.forEach(function(item, index) {
            setTimeout(function() {
                item.classList.add('active');
            }, 100 * (index + 1));
        });
    }

    // Initial animations
    function activateInitialAnimations() {
        setTimeout(function() {
            activateTextReveal();
            activateImageReveal();
            activateStaggeredAnimations();

            // Animate progress bars after a delay
            setTimeout(animateProgressBars, 1000);
        }, 500);
    }

    // Reactivate animations on scroll
    window.addEventListener('scroll', function() {
        // Check if elements are in viewport and activate animations
        const animatedElements = document.querySelectorAll('.text-reveal, .image-reveal, .stagger-item');

        animatedElements.forEach(function(element) {
            if (isInViewport(element) && !element.classList.contains('active')) {
                element.classList.add('active');
            }
        });

        // Animate progress bars when in viewport
        const progressBars = document.querySelectorAll('.animate-progress');

        progressBars.forEach(function(bar) {
            if (isInViewport(bar) && bar.style.width === '0%') {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
            }
        });
    });

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});
