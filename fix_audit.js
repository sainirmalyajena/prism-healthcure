const fs = require('fs');
const path = require('path');
const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const faqHtml = `
        <!-- FAQ Section -->
        <section id="faq" class="faq" aria-labelledby="faq-title">
            <div class="container">
                <div class="section-header animate-on-scroll">
                    <h2 id="faq-title">Frequently Asked Questions</h2>
                    <p>Find answers to common questions about our eye treatments and hospital.</p>
                </div>
                <div class="faq-container animate-on-scroll">
                    <div class="faq-item">
                        <div class="faq-question"><h3>Is LASIK surgery painful?</h3><i class="fa-solid fa-chevron-down"></i></div>
                        <div class="faq-answer"><p>No, LASIK is generally painless. We use anesthetic eye drops to numb the eye before the procedure.</p></div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question"><h3>How long does cataract surgery take?</h3><i class="fa-solid fa-chevron-down"></i></div>
                        <div class="faq-answer"><p>Cataract surgery is an outpatient procedure that typically takes only 15 to 30 minutes.</p></div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question"><h3>Do you accept insurance?</h3><i class="fa-solid fa-chevron-down"></i></div>
                        <div class="faq-answer"><p>Yes, Prism Healthcure is empanelled with most major health insurance providers across India.</p></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Inject FAQ into index.html
    if (file === 'index.html') {
        content = content.replace('<!-- Testimonials Section -->', faqHtml);
    }
    
    // Fix Social Links
    content = content.replace(/href="#"/g, 'href="javascript:void(0)" title="Coming Soon"');
    
    // Fix Phone Validation
    content = content.replace(/<input type="tel" name="phone" placeholder="Phone Number"/g, '<input type="tel" name="phone" placeholder="Phone Number" minlength="10" maxlength="15"');

    fs.writeFileSync(path.join(dir, file), content);
});

// CSS Hitbox Fix
const cssPath = path.join(dir, 'styles.css');
const cssAppend = `\n
/* Audit Fix: Mobile Menu Close Hitbox */
.mobile-menu-close {
    padding: 1.5rem !important;
    margin: -1rem !important;
}
`;
fs.appendFileSync(cssPath, cssAppend);

console.log("Audit fixes applied.");
