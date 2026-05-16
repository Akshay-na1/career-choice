document.addEventListener('DOMContentLoaded', () => {
    // Scroll animation observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .fade-right, .fade-left');
    animatedElements.forEach(el => observer.observe(el));

    // Navbar style on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.background = 'rgba(11, 15, 25, 0.9)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(26, 31, 46, 0.6)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Notification System
    const notificationContainer = document.getElementById('notification-container');
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationBadge = document.getElementById('notificationBadge');
    
    let unreadCount = 0;

    window.showNotification = (title, message) => {
        if (!notificationContainer) return;
        
        unreadCount++;
        if (notificationBadge) {
            notificationBadge.textContent = unreadCount;
            notificationBadge.classList.remove('hidden');
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <button class="toast-close">&times;</button>
        `;

        notificationContainer.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);

        // Handle close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        });

        // Auto close after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 500);
            }
        }, 5000);
    };

    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            unreadCount = 0;
            if (notificationBadge) {
                notificationBadge.textContent = 0;
                notificationBadge.classList.add('hidden');
            }
            // You can also toggle a dropdown of notifications here
        });
    }

    // Demo notification and Login logic
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'dashboard.html';
        });
    }

    setTimeout(() => {
        const path = window.location.pathname;
        if (path.includes('index.html') || path.endsWith('/')) {
            showNotification('Welcome!', 'Explore new career paths tailored for you.');
        } else if (path.includes('login.html')) {
            showNotification('Security Alert', 'Please ensure you are using a secure network.');
        } else if (path.includes('dashboard.html')) {
            showNotification('Meeting Reminder', 'Mentorship call with Sarah in 15 mins.');
        }
    }, 2000);

    // Career Details Modal Logic
    const careerData = {
        tech: {
            title: "Technology",
            icon: "💻",
            desc: "A fast-paced industry with a constant need for developers, designers, and systems engineers. Ideal for problem solvers.",
            colleges: ["MIT - Computer Science", "Stanford University - Software Eng.", "Local State University - IT Programs"],
            degrees: ["B.S. in Computer Science", "Coding Bootcamps (Full Stack)", "Cybersecurity Certifications"]
        },
        health: {
            title: "Healthcare",
            icon: "🩺",
            desc: "A rewarding field dedicated to helping others. It offers unparalleled job security and numerous specialization paths.",
            colleges: ["Johns Hopkins University", "NYU College of Nursing", "Community College Nursing Programs"],
            degrees: ["B.S. in Nursing (BSN)", "Pre-Med Track", "Health Administration & Technician Certs"]
        },
        trades: {
            title: "Skilled Trades",
            icon: "🛠️",
            desc: "Hands-on careers that are essential to modern society. Paid apprenticeships allow you to earn while you learn.",
            colleges: ["Lincoln Tech", "Apex Technical School", "Local Trade Unions & Apprenticeships"],
            degrees: ["Journeyman Electrician License", "Master Plumber Certification", "HVAC Technical Degree"]
        },
        arts: {
            title: "Creative Arts",
            icon: "🎨",
            desc: "Transform your passion into a profession. Opportunities range from graphic design to digital media and entertainment.",
            colleges: ["Rhode Island School of Design (RISD)", "Parsons School of Design", "California Institute of the Arts"],
            degrees: ["B.F.A in Graphic Design", "Digital Media & Animation", "Creative Writing & Communications"]
        }
    };

    const modal = document.getElementById('careerModal');
    const closeBtn = document.getElementById('closeModal');
    
    if (modal) {
        document.querySelectorAll('.career-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const careerId = btn.getAttribute('data-career');
                const data = careerData[careerId];
                
                if (data) {
                    document.getElementById('modalTitle').textContent = data.title;
                    document.getElementById('modalIcon').textContent = data.icon;
                    document.getElementById('modalDescription').textContent = data.desc;
                    
                    document.getElementById('modalColleges').innerHTML = data.colleges
                        .map(c => `<li>${c}</li>`).join('');
                        
                    document.getElementById('modalDegrees').innerHTML = data.degrees
                        .map(d => `<li>${d}</li>`).join('');
                    
                    modal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });

        const closeModal = () => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        };

        closeBtn.addEventListener('click', closeModal);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
