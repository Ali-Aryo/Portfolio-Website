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
