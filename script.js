document.getElementById('year').textContent = new Date().getFullYear();

const roles = [
    "Full-Stack Web Developer & AI Enthusiast",
    "On-Device RAG & Local LLM Builder",
    "Progressive Web App (PWA) Architect",
    "B.Tech CS @ Vaishnavi Institute of Technology & Science"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typed-role');

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typedElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 35 : 70;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }
    setTimeout(typeEffect, speed);
}
setTimeout(typeEffect, 1200);

const cards3D = document.querySelectorAll('.card-3d');
cards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.className = 'fa-solid fa-bars-staggered text-lg';
    } else {
        menuIcon.className = 'fa-solid fa-xmark text-lg';
    }
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.className = 'fa-solid fa-bars-staggered text-lg';
    });
});

const themes = [
    { class: '', name: 'Cyber Neon' },
    { class: 'theme-aurora', name: 'Aurora Matrix' },
    { class: 'theme-solar', name: 'Solar Flare' }
];
let currentTheme = 0;

function cycleTheme() {
    document.body.classList.remove('theme-aurora', 'theme-solar');
    currentTheme = (currentTheme + 1) % themes.length;
    if (themes[currentTheme].class) {
        document.body.classList.add(themes[currentTheme].class);
    }
    const label = document.getElementById('theme-label');
    if (label) label.textContent = themes[currentTheme].name;
}

function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.project-filter-btn');

    buttons.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.className = 'project-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-500 text-slate-950 transition-all';
        } else {
            btn.className = 'project-filter-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/5 text-slate-300 hover:bg-white/10 transition-all';
        }
    });

    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

const projectDetails = [
    {
        tag: "Major Capstone AI Project",
        title: "On-Device Privacy-Preserving RAG",
        desc: "A complete local Retrieval-Augmented Generation (RAG) web application designed for confidential PDFs and personal notes without sending any data to external cloud servers.",
        highlights: [
            "Powered by Python and CPU-friendly local Qwen2.5-0.5B LLM.",
            "Extracts, chunks, and embeds PDF documents locally for semantic search.",
            "Runs 100% offline with zero API costs and complete data privacy."
        ]
    },
    {
        tag: "Progressive Web App (PWA)",
        title: "Legend's Gallery",
        desc: "A custom mobile-ready photo gallery web application with secure OTP verification and responsive lightbox viewing.",
        highlights: [
            "Integrated EmailJS for real-time 6-digit OTP email verification.",
            "Supports multi-photo selection, instant previews, and full-screen zoom.",
            "Configured with Web App Manifest & Service Worker for home-screen install."
        ]
    },
    {
        tag: "Voice AI & FastAPI",
        title: "VR Jervis — Personal Voice Assistant",
        desc: "An interactive J.A.R.V.I.S.-style voice assistant combining browser speech recognition with a Python FastAPI intelligence backend.",
        highlights: [
            "Hands-free voice command recognition and natural speech synthesis output.",
            "Futuristic sci-fi HUD interface with reactive audio wave animations.",
            "FastAPI proxy server handles AI responses securely."
        ]
    },
    {
        tag: "Real-Time WebSockets",
        title: "DoraChat — Live Messaging Platform",
        desc: "A themed real-time chat application allowing users to join rooms and exchange instant messages with zero page reloads.",
        highlights: [
            "Built on Node.js, Express, and Socket.io bi-directional events.",
            "Features live join/leave notifications and responsive chat bubbles.",
            "Deployed continuously on Render cloud hosting."
        ]
    },
    {
        tag: "Full-Stack Gamified App",
        title: "Life RPG — Gamified Habit Tracker",
        desc: "Turns daily tasks, coding practice, and study routines into an interactive Role-Playing Game with XP bars and level progression.",
        highlights: [
            "Backed by a lightweight relational SQLite database and Python backend.",
            "Dynamic XP calculation, streak tracking, and quest completion rewards.",
            "Designed with a high-contrast gamer dashboard aesthetic."
        ]
    }
];

function openProjectModal(index) {
    const item = projectDetails[index];
    document.getElementById('modal-tag').textContent = item.tag;
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-desc').textContent = item.desc;
    const list = document.getElementById('modal-highlights');
    list.innerHTML = item.highlights.map(h => `<li>${h}</li>`).join('');
    document.getElementById('project-modal').classList.remove('hidden');
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.add('hidden');
}

function openResumeModal() {
    document.getElementById('resume-modal').classList.remove('hidden');
}

function closeResumeModal() {
    document.getElementById('resume-modal').classList.add('hidden');
}

function downloadResumeFile() {
    const resumeHTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Vivek_Rajak_Resume</title>
<style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 24px; }
    h1 { margin: 0; font-size: 28px; color: #0284c7; }
    .subtitle { font-weight: 600; color: #475569; margin-bottom: 8px; }
    .contact { font-size: 13px; color: #334155; border-bottom: 2px solid #0284c7; padding-bottom: 14px; margin-bottom: 20px; }
    h2 { font-size: 15px; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 22px; }
    ul { padding-left: 20px; margin: 8px 0; }
    li { margin-bottom: 6px; font-size: 14px; }
    p { font-size: 14px; margin: 6px 0; }
</style>
</head>
<body>
    <h1>VIVEK RAJAK</h1>
    <div class="subtitle">Full-Stack Web Developer & AI Enthusiast</div>
    <div class="contact">
        Email: vivekrajak5191@gmail.com | LinkedIn: https://www.linkedin.com/in/vivek-rajak-741106307/<br>
        Education: B.Tech Computer Science — Vaishnavi Institute of Technology and Science
    </div>
    <h2>Professional Summary</h2>
    <p>Passionate Full-Stack Web Developer and B.Tech Computer Science student at Vaishnavi Institute of Technology and Science. Experienced in building responsive web applications, Progressive Web Apps (PWAs), real-time Socket.io chat platforms, and privacy-preserving On-Device RAG AI systems.</p>
    <h2>Education</h2>
    <p><strong>Bachelor of Technology (B.Tech) in Computer Science & Engineering</strong><br>Vaishnavi Institute of Technology and Science (Pursuing)</p>
    <h2>Technical Skills</h2>
    <ul>
        <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript (ES6+), Responsive Web Design, 3D CSS, PWA</li>
        <li><strong>Backend & Database:</strong> Python, FastAPI, Node.js, Socket.io, SQLite, REST APIs</li>
        <li><strong>AI & Tools:</strong> On-Device RAG, Local LLMs (Qwen2.5), Git & GitHub, VS Code, Render, Netlify</li>
    </ul>
    <h2>Key Projects</h2>
    <ul>
        <li><strong>On-Device Privacy-Preserving RAG:</strong> Confidential PDF & Note search web app powered by Python and local Qwen2.5 LLM running 100% offline.</li>
        <li><strong>Legend's Gallery (PWA):</strong> Installable photo gallery app with EmailJS OTP authentication and lightbox controls hosted on Netlify.</li>
        <li><strong>VR Jervis:</strong> J.A.R.V.I.S.-inspired AI voice assistant built with Web Speech API and FastAPI backend proxy.</li>
        <li><strong>DoraChat:</strong> Real-time multi-user chat web app using Node.js, Socket.io, and Render cloud hosting.</li>
        <li><strong>Life RPG:</strong> Gamified habit and productivity tracker built with FastAPI and SQLite.</li>
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

function printResume() {
    window.print();
}

function copyEmail() {
    const email = "vivekrajak5191@gmail.com";
    const tempInput = document.createElement("textarea");
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    const copyText = document.getElementById("copy-btn-text");
    copyText.textContent = "Copied!";
    setTimeout(() => {
        copyText.textContent = "Copy";
    }, 2200);
}

const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const feedbackBox = document.getElementById('form-feedback');

function validateEmailFormat(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateField(input, errorEl, validIcon, condition) {
    if (condition) {
        errorEl.classList.add('hidden');
        input.classList.remove('border-rose-500');
        input.classList.add('border-emerald-400');
        if (validIcon) validIcon.classList.remove('hidden');
        return true;
    } else {
        errorEl.classList.remove('hidden');
        input.classList.add('border-rose-500');
        input.classList.remove('border-emerald-400');
        if (validIcon) validIcon.classList.add('hidden');
        return false;
    }
}

nameInput.addEventListener('input', () => {
    validateField(nameInput, document.getElementById('name-error'), document.getElementById('name-valid'), nameInput.value.trim().length >= 2);
});

emailInput.addEventListener('input', () => {
    validateField(emailInput, document.getElementById('email-error'), document.getElementById('email-valid'), validateEmailFormat(emailInput.value.trim()));
});

subjectInput.addEventListener('input', () => {
    validateField(subjectInput, document.getElementById('subject-error'), null, subjectInput.value.trim().length >= 3);
});

messageInput.addEventListener('input', () => {
    validateField(messageInput, document.getElementById('message-error'), null, messageInput.value.trim().length >= 10);
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const isNameValid = validateField(nameInput, document.getElementById('name-error'), document.getElementById('name-valid'), nameInput.value.trim().length >= 2);
    const isEmailValid = validateField(emailInput, document.getElementById('email-error'), document.getElementById('email-valid'), validateEmailFormat(emailInput.value.trim()));
    const isSubjectValid = validateField(subjectInput, document.getElementById('subject-error'), null, subjectInput.value.trim().length >= 3);
    const isMessageValid = validateField(messageInput, document.getElementById('message-error'), null, messageInput.value.trim().length >= 10);

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        feedbackBox.className = "p-4 rounded-xl text-sm font-medium bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 flex items-center justify-between gap-4";
        feedbackBox.innerHTML = `
            <span><i class="fa-solid fa-circle-check mr-2 text-emerald-400"></i>Thank you, <strong>${nameInput.value.trim()}</strong>! Your message is validated and ready.</span>
            <a href="mailto:vivekrajak5191@gmail.com?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${encodeURIComponent('From: ' + nameInput.value.trim() + ' (' + emailInput.value.trim() + ')\n\n' + messageInput.value.trim())}"
               class="px-3 py-1.5 rounded-lg bg-emerald-400 text-slate-950 font-bold text-xs shrink-0">Open Mail App ↗</a>
        `;
        contactForm.reset();
        document.getElementById('name-valid').classList.add('hidden');
        document.getElementById('email-valid').classList.add('hidden');
    } else {
        feedbackBox.className = "p-4 rounded-xl text-sm font-medium bg-rose-500/15 border border-rose-400/40 text-rose-200";
        feedbackBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-2"></i>Please fix the highlighted fields above before sending.`;
    }
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

window.onload = function () {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 38;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particleCount = 650;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
        new THREE.Color('#00f2fe'),
        new THREE.Color('#a855f7'),
        new THREE.Color('#ec4899'),
        new THREE.Color('#38bdf8')
    ];

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 110;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 110;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

        const pickedColor = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = pickedColor.r;
        colors[i * 3 + 1] = pickedColor.g;
        colors[i * 3 + 2] = pickedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.45,
        vertexColors: true,
        transparent: true,
        opacity: 0.85
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const icoGeo = new THREE.IcosahedronGeometry(11, 1);
    const icoMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        wireframe: true,
        transparent: true,
        opacity: 0.08
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    scene.add(icoMesh);

    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate3D() {
        requestAnimationFrame(animate3D);
        particles.rotation.y += 0.0009;
        particles.rotation.x += 0.0004;

        icoMesh.rotation.y -= 0.002;
        icoMesh.rotation.x += 0.0015;

        camera.position.x += (mouseX * 4 - camera.position.x) * 0.04;
        camera.position.y += (-mouseY * 4 - camera.position.y) * 0.04;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate3D();
};