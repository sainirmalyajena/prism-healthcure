const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Fix navigation terminology
    content = content.replace(/>Specialties<\/a>/g, '>Treatments</a>');
    content = content.replace(/>Specialists<\/a>/g, '>Our Doctors</a>');
    content = content.replace(/Our Specialists<\/a>/g, 'Our Doctors</a>');

    fs.writeFileSync(path.join(dir, file), content);
});
console.log("Fixed Navigation Text");
