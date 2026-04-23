const fs = require('fs');
const path = require('path');
const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const htmlInjectTop = `
    <!-- Ambient Background -->
    <div class="ambient-bg" aria-hidden="true">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
    </div>
    <!-- Custom Cursor -->
    <div class="custom-cursor"></div>
`;

const gsapScripts = `
    <!-- GSAP Animations -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="script.js"></script>
`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Inject Ambient BG and Cursor just after <body>
    if (!content.includes('class="ambient-bg"')) {
        content = content.replace('<body>', '<body>\n' + htmlInjectTop);
    }
    
    // Replace old script with GSAP scripts
    content = content.replace('<script src="script.js"></script>', gsapScripts);

    fs.writeFileSync(path.join(dir, file), content);
});

// CSS INJECTIONS
const cssPath = path.join(dir, 'styles.css');
const cssAppend = `\n
/* =========================================
   MILLION DOLLAR UI: AMBIENT & CURSOR
   ========================================= */
@media (min-width: 992px) {
    body { cursor: none; overflow-x: hidden; }
    a, button, input, select, textarea { cursor: none; }
}

.custom-cursor {
    position: fixed; top: 0; left: 0; width: 20px; height: 20px;
    background: var(--accent); border-radius: 50%;
    pointer-events: none; z-index: 999999;
    mix-blend-mode: difference;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease-out, height 0.3s ease-out, background-color 0.3s ease-out;
    display: none;
}
@media (min-width: 992px) { .custom-cursor { display: block; } }
.custom-cursor.hover { width: 60px; height: 60px; background: rgba(212, 175, 55, 0.4); border: 1px solid var(--accent); mix-blend-mode: normal; backdrop-filter: blur(4px); }

.ambient-bg {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    z-index: -2; overflow: hidden; background: #f8fbfa; pointer-events: none;
}
.orb {
    position: absolute; border-radius: 50%; filter: blur(100px);
    opacity: 0.5; animation: float 25s infinite ease-in-out alternate;
}
.orb-1 { width: 50vw; height: 50vw; background: #005a52; top: -10%; left: -10%; }
.orb-2 { width: 40vw; height: 40vw; background: #d4af37; bottom: -10%; right: -10%; animation-delay: -5s; }
.orb-3 { width: 30vw; height: 30vw; background: #a2d2c8; top: 40%; left: 30%; animation-delay: -10s; }

@keyframes float {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(50px, -50px) scale(1.1); }
    100% { transform: translate(-30px, 30px) scale(0.9); }
}

/* Glassmorphism Upgrades */
.doctor-card, .testimonial-card, .vm-card, .info-card {
    background: rgba(255, 255, 255, 0.4) !important;
    backdrop-filter: blur(25px) saturate(200%) !important;
    -webkit-backdrop-filter: blur(25px) saturate(200%) !important;
    border: 1px solid rgba(255, 255, 255, 0.6) !important;
    box-shadow: 0 8px 32px 0 rgba(0, 90, 82, 0.1) !important;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s !important;
    overflow: hidden;
}
.doctor-card:hover {
    transform: translateY(-12px) scale(1.02) !important;
    box-shadow: 0 20px 50px 0 rgba(0, 90, 82, 0.25) !important;
}
.doctor-image img { transition: transform 0.8s ease; }
.doctor-card:hover .doctor-image img { transform: scale(1.08); }

/* Remove old intersection observer conflicts */
.animate-on-scroll { opacity: 0; visibility: hidden; transition: none !important; transform: none !important; }
`;
fs.appendFileSync(cssPath, cssAppend);

// JS SCRIPT REWRITE
const jsPath = path.join(dir, 'script.js');
const jsContent = `
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if(mobileMenuClose) mobileMenuClose.addEventListener('click', toggleMenu);
    mobileNavLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 2. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    if (window.innerWidth >= 992 && cursor) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth trailing animation using GSAP ticker
        gsap.ticker.add(() => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.transform = \`translate(\${cursorX}px, \${cursorY}px)\`;
        });

        // Hover states
        const hoverElements = document.querySelectorAll('a, button, .doctor-card, input, select, textarea');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Magnetic Buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
            });
        });
    }

    // 3. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                gsap.to(faq.querySelector('.faq-answer'), { maxHeight: 0, duration: 0.4, ease: "power2.out" });
            });
            if (!isActive) {
                item.classList.add('active');
                gsap.to(answer, { maxHeight: answer.scrollHeight, duration: 0.5, ease: "power2.out" });
            }
        });
    });

    // 4. GSAP SCROLL ANIMATIONS
    gsap.registerPlugin(ScrollTrigger);

    // Make elements visible for GSAP
    gsap.set('.animate-on-scroll', { autoAlpha: 1 });

    // Hero Section Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    if (document.querySelector('.hero')) {
        // Split text for hero title manually (since no SplitText plugin)
        const heroTitle = document.querySelector('#hero-title');
        if(heroTitle) {
            heroTitle.innerHTML = heroTitle.textContent.split(' ').map(word => \`<span style="display:inline-block; overflow:hidden;"><span style="display:inline-block;" class="hero-word">\${word}</span></span>\`).join(' ');
        }

        tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.8, delay: 0.2 })
          .from('.hero-word', { y: 100, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.6")
          .from('.hero-content p', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
          .from('.hero-buttons .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.6")
          .from('.trust-metrics .metric', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
          .from('.hero-image-wrapper', { scale: 0.9, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=1.5")
          .from('.floating-card', { y: 30, opacity: 0, duration: 1, ease: "elastic.out(1, 0.5)" }, "-=0.8");
          
        // Parallax image
        gsap.to('.hero-image', {
            yPercent: 15,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
        });
    }

    // Generic section reveals
    document.querySelectorAll('section, .page-header').forEach(section => {
        gsap.from(section.querySelectorAll('.section-header, .about-content p, .vm-card, .info-card, .faq-item'), {
            scrollTrigger: { trigger: section, start: "top 80%" },
            y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out'
        });
    });

    // Staggered Cards (Doctors, Testimonials)
    const cardGrids = document.querySelectorAll('.doctors-grid, .testimonials-grid');
    cardGrids.forEach(grid => {
        gsap.from(grid.querySelectorAll('article'), {
            scrollTrigger: { trigger: grid, start: "top 80%" },
            y: 60, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)"
        });
    });
});
`;
fs.writeFileSync(jsPath, jsContent);
console.log("GSAP Logic fully implemented.");
