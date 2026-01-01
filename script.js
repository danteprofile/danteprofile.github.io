/**
 * DANTE CLIFFORD - Character Profile
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initAudioControl();
    initScrollReveal();
    initGallery();
    initPersonalityBars();
    initSmoothScroll();
});

/**
 * Ambient Floating Particles
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning and timing
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
    
    // Set initial volume
    bgMusic.volume = 0.3;
    
    let isPlaying = false;
    
    audioControl.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            audioControl.classList.remove('playing');
        } else {
            bgMusic.play().then(() => {
                audioControl.classList.add('playing');
            }).catch(err => {
                console.log('Audio playback failed:', err);
            });
        }
        isPlaying = !isPlaying;
    });
    
    // Handle audio ending (though it's looped)
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
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the reveal animation
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                
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
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            // Fade transition
            galleryMain.style.opacity = '0';
            
            setTimeout(() => {
                galleryMain.src = thumb.dataset.full;
                galleryMain.style.opacity = '1';
            }, 300);
        });
    });
    
    // Add transition style
    galleryMain.style.transition = 'opacity 0.3s ease';
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
        threshold: 0.5
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
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Parallax Effect for Hero Section (Optional Enhancement)
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (!hero || window.innerWidth < 768) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
            }
        }
    });
}

/**
 * Typewriter Effect for Dialogue (Optional Enhancement)
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * Handle Reduced Motion Preference
 */
function checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Disable animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--transition-slow', '0.01ms');
        document.documentElement.style.setProperty('--transition-slower', '0.01ms');
        
        // Reveal all elements immediately
        document.querySelectorAll('[data-reveal]').forEach(el => {
            el.classList.add('revealed');
        });
    }
}

// Check reduced motion preference on load
checkReducedMotion();

/**
 * Resize Handler
 */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate particles on resize if needed
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            const currentCount = particlesContainer.children.length;
            const targetCount = window.innerWidth < 768 ? 20 : 40;
            
            if (Math.abs(currentCount - targetCount) > 10) {
                particlesContainer.innerHTML = '';
                for (let i = 0; i < targetCount; i++) {
                    createParticle(particlesContainer, i);
                }
            }
        }
    }, 250);
});

/**
 * Loading Animation (Optional)
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial reveal for hero section
    setTimeout(() => {
        document.querySelectorAll('.hero [data-reveal]').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('revealed');
            }, i * 150);
        });
    }, 300);
});
