/**
 * NEXUSGLOBALSERVICES INTERACTIVE CORE CONTROLLER
 * High Performance Vanilla JS Suite for Navigation, UI Carousels & Analytics
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Menu Toggle Engine
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });

        // Close Menu automatically on mobile after option landing execution
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            });
        });
    }

    // 2. High Performance Testimonial Carousel Engine
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track ? track.children : []);
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentIndex = 0;

    if (track && slides.length > 0) {
        const updateSlidePosition = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateSlidePosition();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            updateSlidePosition();
        });

        // Automatic rotational shift rule every 7 seconds
        setInterval(() => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateSlidePosition();
        }, 7000);
    }

    // 3. Smooth Dynamic Intersection Counter Metric Tracker
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const runCounters = () => {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            let count = 0;
            const speed = target / 40; // Normalize increment pacing matching scales

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.floor(count);
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = target + (target === 1000 || target === 25 ? '+' : '');
                }
            };
            updateCount();
        });
    };

    // Trigger counters exactly when stats viewport cross section happens
    if (statNumbers.length > 0) {
        const obsOptions = { threshold: 0.5, rootMargin: "0px" };
        const statObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, obsOptions);
        
        const statSection = document.querySelector('.stat-banner');
        if (statSection) statObserver.observe(statSection);
    }

    // 4. Smooth FAQ Accordion Component Integration
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.parentElement;
            const icon = trigger.querySelector('i');
            
            parent.classList.toggle('open');
            if (parent.classList.contains('open')) {
                icon.classList.replace('fa-plus', 'fa-minus');
            } else {
                icon.classList.replace('fa-minus', 'fa-plus');
            }
        });
    });

    // 5. Intelligent Client-Side Intake Validation Engine
    const form = document.getElementById('loanContactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            const fields = [
                { id: 'fullName', validation: val => val.trim().length > 1 },
                { id: 'phoneNumber', validation: val => /^\d{10}$/.test(val.trim()) },
                { id: 'emailAddress', validation: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
                { id: 'cityName', validation: val => val.trim().length > 1 },
                { id: 'loanProduct', validation: val => val !== "" }
            ];

            fields.forEach(field => {
                const inputElement = document.getElementById(field.id);
                const parentGroup = inputElement.parentElement;
                
                if (!field.validation(inputElement.value)) {
                    parentGroup.classList.add('invalid');
                    isFormValid = false;
                } else {
                    parentGroup.classList.remove('invalid');
                }
            });

            if (isFormValid) {
                // Mock execution message - link directly to production data handlers here
                alert('Success! Your credit evaluation file has been generated. An expert NexusGlobal executive will call you shortly.');
                form.reset();
            }
        });

        // Instant validation cleanup on keypress interaction
        form.querySelectorAll('input, select').forEach(element => {
            element.addEventListener('input', () => {
                element.parentElement.classList.remove('invalid');
            });
        });
    }

    // 6. Navigation Link Highlighting via Page Scroll Positions
    const activeSections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        activeSections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const targetNavLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (targetNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
                    targetNavLink.classList.add('active');
                }
            }
        });
    });
});