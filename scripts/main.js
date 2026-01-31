/* ==========================================================================
   Ram & Rose — Interactions
   Smooth, subtle, purposeful
   ========================================================================== */

(function() {
    'use strict';

    // --------------------------------------------------------------------------
    // Scroll Animations (Intersection Observer)
    // --------------------------------------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // --------------------------------------------------------------------------
    // Navigation Scroll Effect
    // --------------------------------------------------------------------------
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNav() {
        const scrollY = window.scrollY;
        
        // Add/remove scrolled class for styling
        if (scrollY > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
        
        // Hide/show on scroll direction (optional, disabled by default)
        // if (scrollY > lastScrollY && scrollY > 300) {
        //     nav.style.transform = 'translateY(-100%)';
        // } else {
        //     nav.style.transform = 'translateY(0)';
        // }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });

    // --------------------------------------------------------------------------
    // Smooth Scroll for Anchor Links
    // --------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --------------------------------------------------------------------------
    // Newsletter Form (Placeholder)
    // --------------------------------------------------------------------------
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Placeholder - replace with actual form handling
            console.log('Newsletter signup:', email);
            
            // Simple feedback
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Thank you';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                this.reset();
            }, 2000);
        });
    }

    // --------------------------------------------------------------------------
    // Parallax Effect (Subtle)
    // --------------------------------------------------------------------------
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                parallaxElements.forEach(el => {
                    const speed = el.dataset.parallax || 0.1;
                    const rect = el.getBoundingClientRect();
                    const scrolled = window.scrollY;
                    
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const yPos = (rect.top - window.innerHeight) * speed;
                        el.style.transform = `translateY(${yPos}px)`;
                    }
                });
            });
        }, { passive: true });
    }

    // --------------------------------------------------------------------------
    // Image Lazy Loading (Native with Fallback)
    // --------------------------------------------------------------------------
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.loading = 'lazy';
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // --------------------------------------------------------------------------
    // Reduced Motion Support
    // --------------------------------------------------------------------------
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('.animate-fade-up, .animate-on-scroll').forEach(el => {
            el.style.animation = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.classList.add('visible');
        });
    }

    // --------------------------------------------------------------------------
    // Page Load Complete
    // --------------------------------------------------------------------------
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

})();
