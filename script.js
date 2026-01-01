/**
 * DANTE CLIFFORD - Character Profile
 * Interactive JavaScript
 * Mobile-First
 */

document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    initParticles();
    initAudioControl();
    initScrollReveal();
    initGallery();
    initPersonalityBars();
    initSmoothScroll();
    initNavScrollHide();
});

/**
 * Hamburger Menu Toggle
 */
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Hide/Show Navigation on Scroll
 */
function initNavScrollHide() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    nav.style.transform = 'translateY(-100%)';
                } else {
                    nav.style.transform = 'translateY(0)';
                }
                
                nav.style.transition = 'transform 0.3s ease';
                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Ambient Floating Particles
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Fewer particles on mobile for performance
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const randomX = Math.random() * 100;
    const randomDelay = Math.random() * 15;
    const randomDuration = 15 + Math.random() * 10;
    const randomSize = 1 + Math.random() * 2;
    
    particle.style.cssText = `
        left: ${randomX}%;
        width: ${randomSize}px;
        height: ${randomSize}px;
        animation-delay: ${randomDelay}s;
        animation-duration: ${randomDuration}s;
    `;
    
    container.appendChild(particle);
}

/**
 * Audio Control (BGM)
 */
function initAudioControl() {
    const audioControl = document.getElementById('audioControl');
    const bgMusic = document.getElementById('bgMusic');
    
    if (!audioControl || !bgMusic) return;
    
    bgMusic.volume = 0.3;
    let isPlaying = false;
    
    audioControl.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (isPlaying) {
            bgMusic.pause();
            audioControl.classList.remove('playing');
        } else {
            bgMusic.play().then(() => {
                audioControl.classList.add('playing');
            }).catch(err => {
                console.log('Audio playback requires user interaction:', err);
            });
        }
        isPlaying = !isPlaying;
    });
    
    bgMusic.addEventListener('ended', () => {
        audioControl.classList.remove('playing');
        isPlaying = false;
    });
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    if (!revealElements.length) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        revealElements.forEach(el => el.classList.add('revealed'));
        return;
    }
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

/**
 * Profile Gallery
 */
function initGallery() {
    const galleryMain = document.getElementById('galleryMain');
    const thumbnails = document.querySelectorAll('.gallery-thumbnails .thumb');
    
    if (!galleryMain || !thumbnails.length) return;
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            galleryMain.style.opacity = '0';
            
            setTimeout(() => {
                galleryMain.src = thumb.dataset.full;
                galleryMain.style.opacity = '1';
            }, 200);
        });
    });
    
    galleryMain.style.transition = 'opacity 0.2s ease';
}

/**
 * Personality Bars Animation
 */
function initPersonalityBars() {
    const barFills = document.querySelectorAll('.bar-fill');
    
    if (!barFills.length) return;
    
    const barOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                entry.target.style.width = `${width}%`;
                barObserver.unobserve(entry.target);
            }
        });
    }, barOptions);
    
    barFills.forEach(bar => {
        barObserver.observe(bar);
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed nav height
                const navHeight = document.getElementById('nav')?.offsetHeight || 60;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Window Load Handler
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial reveal for hero section
    setTimeout(() => {
        document.querySelectorAll('.hero [data-reveal]').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('revealed');
            }, i * 100);
        });
    }, 200);
});

/**
 * Resize Handler (debounced)
 */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }, 250);
}, { passive: true });
