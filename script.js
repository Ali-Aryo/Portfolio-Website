function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

//Scroll Bar
const scrollProgress = document.getElementById('scroll-progress');
const height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener('scroll', () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
});
// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const isCurrentlyDark = body.classList.contains('dark-mode');
    
    if (isCurrentlyDark) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
    
    // Sync both toggles
    const desktopToggle = document.getElementById('theme-switch');
    const mobileToggle = document.getElementById('theme-switch-mobile');
    const isLightMode = body.classList.contains('light-mode');
    
    desktopToggle.checked = isLightMode;
    mobileToggle.checked = isLightMode;
    
    // Reinitialize particles with new theme colors
    if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }
    initializeParticles();
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const desktopToggle = document.getElementById('theme-switch');
    const mobileToggle = document.getElementById('theme-switch-mobile');
    
    // Default to dark mode if no preference saved
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        desktopToggle.checked = true;
        mobileToggle.checked = true;
    } else {
        body.classList.add('dark-mode');
        desktopToggle.checked = false;
        mobileToggle.checked = false;
    }
    
    // Add event listeners
    desktopToggle.addEventListener('change', toggleTheme);
    mobileToggle.addEventListener('change', toggleTheme);
    
    // Initialize particles
    initializeParticles();
});

// Initialize particles.js
function initializeParticles() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const particleColor = isDarkMode ? "#ffffff" : "#000000";
    const lineColor = isDarkMode ? "#ffffff" : "#000000";
    
    particlesJS("particles-js", {
        particles: {
            number: { 
                value: 80, 
                density: { enable: true, value_area: 800 } 
            },
            color: { value: particleColor },
            shape: {
                type: "circle",
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 }
            },
            opacity: {
                value: 0.3,
                random: false,
                anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: lineColor,
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 400, line_linked: { opacity: 1 } },
                bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 }
            }
        },
        retina_detect: true
    });
}

// Project Modal Functionality
const projectData = {
    'mindful-memories': {
        title: 'Mindful Memories',
        description: 'Designed and developed an Android application that facilitates reminiscence therapy for individuals with dementia and their caregivers. This solution effectively enhances cognitive engagement and significantly improves their overall quality of life.',
        image: './assets/mindful memories logo_edited.avif',
        github: 'https://gitlab.com/aliaryo2004/mindful-memories',
        demo: 'https://www.youtube.com/watch?v=0pK_cgNPLDc',
        info: 'https://laraclemos.wixsite.com/mindful-memories'
    },
    'rust-os': {
        title: 'Operating System in Rust',
        description: 'A custom operating system kernel built from scratch using Rust and simulated on bare metal. This project demonstrates low-level system programming concepts including memory management, process scheduling, and hardware interaction while leveraging Rust\'s memory safety features.',
        image: './assets/Rust.png',
        github: 'https://github.com/Ali-Aryo/Operating-System-in-Rust',
        demo: '',
        info: ''
    },
    'ai-fitness': {
        title: 'AI Fitness App',
        description: 'An intelligent fitness application that uses computer vision and machine learning to analyze workout forms and provide real-time feedback. Features include pose detection, rep counting, form analysis, and personalized workout recommendations based on user performance.',
        image: './assets/soon.png',
        github: 'https://github.com/Ali-Aryo/AI-Fitness-Coach',
        demo: '',
        info: ''
    },
    'phishnet-ai': {
        title: 'Phishnet.AI',
        description: 'Trained a machine learning model to detect phishing emails with high accuracy using an open-source dataset, enabling automated classification of malicious messages. Implemented a Support Vector Classifier using scikit-learn and applied TF-IDF vectorization to convert email text into numerical features. Tracked and evaluated model performance using Pandas to iteratively improve classification accuracy.',
        image: './assets/soon.png',
        github: 'https://github.com/Ali-Aryo/PhishNet.AI',
        demo: 'https://www.youtube.com/watch?v=rXw9ejR7Rac',
        info: ''
    }
};

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalGithub = document.getElementById('modal-github');
    const modalDemo = document.getElementById('modal-demo');
    const modalInfo = document.getElementById('modal-info');
    
    // Update modal content
    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalDescription.textContent = project.description;
    
    // Update buttons
    if (project.github) {
        modalGithub.style.display = 'inline-block';
        modalGithub.onclick = () => window.open(project.github, '_blank');
    } else {
        modalGithub.style.display = 'none';
    }
    
    if (project.demo) {
        modalDemo.style.display = 'inline-block';
        modalDemo.onclick = () => window.open(project.demo, '_blank');
    } else {
        modalDemo.style.display = 'none';
    }
    
    if (project.info) {
        modalInfo.style.display = 'inline-block';
        modalInfo.onclick = () => window.open(project.info, '_blank');
    } else {
        modalInfo.style.display = 'none';
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside or pressing Escape
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
    
    // Initialize particles
    initializeParticles();
});
