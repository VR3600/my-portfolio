// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// Sticky Navbar & Active Link on Scroll
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        if (top >= offset && top < offset + height) {
            current = sec.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Typewriter Effect
const roles = [
    "Full-Stack Web Developer",
    "AI Enthusiast",
    "Python & FastAPI Builder",
    "CS Undergrad @ VITS"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeTarget = document.getElementById('typewriter');

function runTypewriter() {
    const currentText = roles[roleIndex];
    
    if (isDeleting) {
        typeTarget.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeTarget.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 45 : 95;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(runTypewriter, speed);
}
runTypewriter();

// 3D Tilt Effect on Cards & Avatar
const tiltElements = document.querySelectorAll('.tilt-card, #hero-tilt');

tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});

// Resume Generator & Download
function downloadResume() {
    const resumeHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Vivek_Rajak_Resume</title>
<style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 35px auto; color: #1e293b; line-height: 1.5; padding: 0 20px; }
    h1 { margin-bottom: 4px; color: #0f172a; }
    .sub { color: #475569; margin-bottom: 15px; font-size: 14px; }
    h2 { font-size: 16px; text-transform: uppercase; border-bottom: 2px solid #0f172a; padding-bottom: 4px; margin-top: 22px; }
    ul { padding-left: 20px; }
    li { margin-bottom: 6px; }
    .proj-title { font-weight: bold; }
</style>
</head>
<body>
    <h1>VIVEK RAJAK</h1>
    <div class="sub">
        Full-Stack Web Developer & AI Enthusiast<br>
        Email: vivekrajak5191@gmail.com | LinkedIn: linkedin.com/in/vivek-rajak-741106307/
    </div>

    <h2>Education</h2>
    <p><strong>B.Tech in Computer Science (CS)</strong><br>
    Vaishnavi Institute of Technology and Science</p>

    <h2>Technical Skills</h2>
    <ul>
        <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript (ES6+), Responsive Web Design, PWA</li>
        <li><strong>Backend & DB:</strong> Python, FastAPI, Node.js, Socket.io, SQLite</li>
        <li><strong>AI & Tools:</strong> On-Device RAG, Local LLMs (Qwen2.5), Git & GitHub, VS Code, Render, Netlify, EmailJS</li>
    </ul>

    <h2>Key Projects</h2>
    <ul>
        <li><span class="proj-title">On-Device Privacy-Preserving RAG (Major Project):</span> Built a confidential PDF & note search application running locally on CPU using Python and Qwen2.5-0.5B.</li>
        <li><span class="proj-title">Legend's Gallery:</span> Progressive Web App photo gallery featuring Email OTP verification, multi-image uploads, and lightbox viewing.</li>
        <li><span class="proj-title">VR Jervis:</span> Personal voice assistant built using Web Speech synthesis and a FastAPI backend server.</li>
        <li><span class="proj-title">DoraChat:</span> Real-time chat room application built with Node.js and Socket.io deployed on Render.</li>
        <li><span class="proj-title">Life RPG:</span> Gamified habit tracker web app with XP progression and level-up mechanics.</li>
    </ul>
</body>
</html>`;

    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Vivek_Rajak_Resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.getElementById('download-resume-btn').addEventListener('click', downloadResume);
document.getElementById('resume-btn-nav').addEventListener('click', downloadResume);

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const msgInput = document.getElementById('message');
const statusText = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('message-error').textContent = '';
    statusText.textContent = '';

    if (nameInput.value.trim().length < 2) {
        document.getElementById('name-error').textContent = 'Please enter your name.';
        valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        valid = false;
    }

    if (msgInput.value.trim().length < 10) {
        document.getElementById('message-error').textContent = 'Message should be at least 10 characters.';
        valid = false;
    }

    if (valid) {
        statusText.style.color = '#00f2fe';
        statusText.textContent = 'Thanks Vivek! Message validated & ready to send.';
        contactForm.reset();
    }
});

// Subtle Background Particle Canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 45; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';

    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();