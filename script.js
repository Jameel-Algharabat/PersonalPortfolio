document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Logo Animation
    const logo = document.getElementById('logo');
    let isExpanded = false;
    let timeoutId;
    let touchStartTime;
    const touchDelay = 100; // ms threshold for touch events

    // Handle both click and touch events
    logo.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
    }, { passive: true });

    logo.addEventListener('touchend', (e) => {
        const touchDuration = Date.now() - touchStartTime;
        if (touchDuration < touchDelay) {
            e.preventDefault();
            toggleLogo();
        }
    });

    logo.addEventListener('click', (e) => {
        if (e.pointerType !== 'touch') { // Prevent double triggering on touch devices
            toggleLogo();
        }
    });

    function toggleLogo() {
        isExpanded = !isExpanded;
        logo.classList.toggle('expanded');

        // Auto collapse after 3 seconds
        clearTimeout(timeoutId);
        if (isExpanded) {
            timeoutId = setTimeout(() => {
                logo.classList.remove('expanded');
                isExpanded = false;
            }, 3000);
        }
    }

    // Typewriter effect
    const typewriter = document.querySelector('.typewriter');
    const words = ['Web Developer', 'Designer', 'Problem Solver', 'Creative Thinker'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typewriterDelay = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typewriterDelay = 50;
        } else {
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typewriterDelay = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typewriterDelay = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typewriterDelay = 500; // Pause before starting new word
        }

        setTimeout(typeEffect, typewriterDelay);
    }

    typeEffect();

    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Navigation
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    });

    // Scroll Animation for Skill Bars
    const skillSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress');

    function showProgress() {
        progressBars.forEach(progress => {
            const value = progress.style.width;
            progress.style.width = '0';
            progress.style.width = value;
        });
    }

    window.addEventListener('scroll', () => {
        const sectionPos = skillSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 2;

        if(sectionPos < screenPos) {
            showProgress();
        }
    });

    // Add this function at the end of your existing JavaScript
    function initMap() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const amman = { lat: 31.9454, lng: 35.9284 };
        
        const darkMapStyle = [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#283d6a" }],
            }
        ];

        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: amman,
            styles: isDark ? darkMapStyle : [],
        });

        new google.maps.Marker({
            position: amman,
            map: map,
            title: "Amman, Jordan",
            animation: google.maps.Animation.DROP
        });
    }

    // Animated number counting
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Add plus symbol and emoji after counting finishes
                obj.innerHTML += `+ <span class="stat-emoji">🎯</span>`;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = document.querySelectorAll('.stat-item');
                statItems.forEach(item => {
                    const statNumber = item.querySelector('.stat-number');
                    const target = parseInt(statNumber.getAttribute('data-target'));
                    animateValue(statNumber, 0, target, 2000);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }

    // Add smooth reveal animation for timeline items
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateX(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Add wave color transition
        const waves = document.querySelectorAll('.wave-path');
        waves.forEach(wave => {
            wave.style.transition = 'fill 0.3s ease';
        });
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Section reveal animation
    const revealSections = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('section-reveal', 'active');
            }
        });
    };

    // Initial check for sections in view
    revealSections();

    // Check on scroll
    window.addEventListener('scroll', revealSections);

    // Project Modal functionality
    const modal = document.getElementById('projectModal');
    const projectLinks = document.querySelectorAll('.project-link');
    const closeModal = document.querySelector('.close-modal');

    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const card = link.closest('.project-card');
            
            // Get project details from data attributes
            const title = card.dataset.title;
            const description = card.dataset.description;
            const image = card.dataset.image;
            const tech = card.dataset.tech.split(',');
            const liveLink = card.dataset.live;
            const githubLink = card.dataset.github;

            // Update modal content
            modal.querySelector('.modal-title').textContent = title;
            modal.querySelector('.modal-description').textContent = description;
            modal.querySelector('.modal-image').src = image;
            
            // Update tech stack
            const techStack = modal.querySelector('.tech-stack');
            techStack.innerHTML = tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
            
            // Update links
            modal.querySelector('.live-link').href = liveLink;
            modal.querySelector('.github-link').href = githubLink;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functionality
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Google Maps initialization
    function initMap() {
        // Replace these coordinates with your desired location
        const location = { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE };
        
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#242f3e"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "lightness": -80
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#746855"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#17263c"
                        }
                    ]
                }
            ]
        });

        // Add a marker
        new google.maps.Marker({
            position: location,
            map: map,
            title: "Find me here!"
        });
    }

    // Handle map errors
    function handleMapError() {
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = '<div class="map-error">Unable to load map. Please try again later.</div>';
        }
    }
}); 