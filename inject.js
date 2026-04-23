const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'prism-healthcure-preview.html');

const whatsappHtml = `
    <!-- Floating WhatsApp Widget -->
    <a href="https://wa.me/919076993279?text=Hi%20Prism%20Healthcure%2C%20I%20would%20like%20to%20book%20an%20appointment." class="whatsapp-widget" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <i class="fa-brands fa-whatsapp"></i>
    </a>
</body>`;

const headInject = `
    <!-- Performance & Favicon -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" as="style">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='%23005a52' d='M256 128C114.6 128 0 256 0 256s114.6 128 256 128 256-128 256-128-114.6-128-256-128zm0 213.3c-47.1 0-85.3-38.2-85.3-85.3s38.2-85.3 85.3-85.3 85.3 38.2 85.3 85.3-38.2 85.3-85.3 85.3z'/></svg>">
</head>`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Inject before </head>
    content = content.replace('</head>', headInject);
    
    // Inject before </body>
    content = content.replace('</body>', whatsappHtml);

    // If index.html, preload hero image
    if (file === 'index.html') {
        content = content.replace('<!-- Performance & Favicon -->', '<!-- Performance & Favicon -->\n    <link rel="preload" href="hero_clinic.png" as="image">');
    }

    // Replace form action and method
    content = content.replace(/<form class="appointment-form" [^>]+>/g, '<form action="https://formsubmit.co/contact@prisimcure.com" method="POST" class="appointment-form">');
    content = content.replace(/<form class="appointment-form">/g, '<form action="https://formsubmit.co/contact@prisimcure.com" method="POST" class="appointment-form">');
    
    // Add hidden input fields to form
    const hiddenInputs = `
                                    <input type="hidden" name="_subject" value="New Appointment Request!">
                                    <input type="hidden" name="_captcha" value="false">
                                    <input type="hidden" name="_template" value="table">`;
    content = content.replace(/<form[^>]+>/g, (match) => {
        if(match.includes('formsubmit.co')) return match + hiddenInputs;
        return match;
    });

    // Replace input tags with proper name attributes so they submit properly
    content = content.replace(/<input type="text" placeholder="Full Name"/g, '<input type="text" name="name" placeholder="Full Name"');
    content = content.replace(/<input type="tel" placeholder="Phone Number"/g, '<input type="tel" name="phone" placeholder="Phone Number"');
    content = content.replace(/<input type="email" placeholder="Email Address"/g, '<input type="email" name="email" placeholder="Email Address"');
    content = content.replace(/<select required>/g, '<select name="service" required>');
    content = content.replace(/<select required aria-label="Select City">/g, '<select name="city" required aria-label="Select City">');
    content = content.replace(/<select required aria-label="Select Service Required">/g, '<select name="service" required aria-label="Select Service Required">');
    content = content.replace(/<textarea placeholder="Any specific symptoms or questions\?"/g, '<textarea name="message" placeholder="Any specific symptoms or questions?"');

    fs.writeFileSync(path.join(dir, file), content);
});

console.log("HTML files updated!");

// Append CSS
const cssPath = path.join(dir, 'styles.css');
const cssAppend = `\n
/* =========================================
   WHATSAPP WIDGET
   ========================================= */
.whatsapp-widget {
    position: fixed;
    bottom: 30px;
    left: 30px; /* changed from right to left to avoid overlapping with up arrows/etc */
    width: 60px;
    height: 60px;
    background-color: #25D366;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    z-index: 9999;
    transition: all 0.3s ease;
    animation: pulse-whatsapp 2s infinite;
}
.whatsapp-widget:hover {
    transform: scale(1.1);
    color: white;
    background-color: #128C7E;
}
@keyframes pulse-whatsapp {
    0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
    70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
    100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}
`;
fs.appendFileSync(cssPath, cssAppend);
console.log("CSS updated!");
