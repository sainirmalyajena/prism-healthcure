
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
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
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
    if (window.innerWidth >= 992) {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (document.querySelector(".hero")) {
            const heroTitle = document.querySelector("#hero-title");
            if(heroTitle) {
                heroTitle.innerHTML = heroTitle.textContent.split(" ").map(word => `<span style="display:inline-block; overflow:hidden;"><span style="display:inline-block;" class="hero-word">${word}</span></span>`).join(" ");
            }
            tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.8, delay: 0.2 })
              .from(".hero-word", { y: 100, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.6")
              .from(".hero-content p", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
              .from(".hero-buttons .btn", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.6")
              .from(".trust-metrics .metric", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
              .from(".hero-image-wrapper", { scale: 0.9, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=1.5")
              .from(".floating-card", { y: 30, opacity: 0, duration: 1, ease: "elastic.out(1, 0.5)" }, "-=0.8");
            gsap.to(".hero-image", { yPercent: 15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        }
        document.querySelectorAll("section, .page-header").forEach(section => {
            gsap.from(section.querySelectorAll(".section-header, .about-content p, .vm-card, .info-card, .faq-item"), { scrollTrigger: { trigger: section, start: "top 80%" }, y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" });
        });
        const cardGrids = document.querySelectorAll(".doctors-grid, .testimonials-grid");
        cardGrids.forEach(grid => {
            gsap.from(grid.querySelectorAll("article"), { scrollTrigger: { trigger: grid, start: "top 80%" }, y: 60, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)" });
        });
    }
});