/* script.js */

document.addEventListener('DOMContentLoaded', () => {

    /* Theme is locked to dark mode aesthetic */

    /* --- 2. Sticky Glass Navbar --- */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- 3. Intersection Observer for Scroll Animations --- */
    // Add "visible" class to add fade-in effect when elements enter viewport
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once faded in if you only want it to happen once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    /* --- 4. Mobile Menu Toggle --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            if (isVisible) {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                // Inline styles overrides to handle raw display changing
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--glass-bg)';
                navLinks.style.backdropFilter = 'blur(16px)';
                navLinks.style.padding = '2rem';
                navLinks.style.gap = '1.5rem';
                navLinks.style.alignItems = 'center';
            }
        });

        // Ensure nav links close on mobile when an item is clicked
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }

    // Reset inline styles on window resize to prevent layout breaking
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.background = 'transparent';
            navLinks.style.padding = '0';
        } else if (navLinks) {
            navLinks.style.display = ''; // Let external CSS take over
        }
    });

});
