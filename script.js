const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], #home');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    }, { passive: true });

    sections.forEach(section => {
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (navLink) {
            ScrollTrigger.create({
                trigger: section,
                start: "top 40%",
                end: "bottom 40%",
                onToggle: self => {
                    if (self.isActive) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        navLink.classList.add('active');
                    }
                }
            });
        }
    });

    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "100px top",
        onToggle: self => {
            if (self.isActive) {
                navLinks.forEach(link => link.classList.remove('active'));
                const homeLink = document.querySelector('.nav-link[href="#home"]');
                if (homeLink) homeLink.classList.add('active');
            }
        }
    });

    ScrollTrigger.create({
        trigger: "body",
        start: () => `bottom-${window.innerHeight + 10} bottom`,
        end: "bottom bottom",
        onToggle: self => {
            if (self.isActive) {
                navLinks.forEach(link => link.classList.remove('active'));
                const contactLink = document.querySelector('.nav-link[href="#contact"]');
                if (contactLink) contactLink.classList.add('active');
            }
        }
    });

    ScrollTrigger.refresh();
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) homeLink.classList.add('active');


    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const heroColumn = document.querySelector('.hero-content .col-lg-8');
        if (heroColumn) {
            gsap.from(heroColumn.children, {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.3
            });
        }

        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        const aboutImg = document.querySelector('.about-img-container');
        const abouttext = document.querySelector('.about-text');

        if (aboutImg && abouttext) {
            gsap.from(aboutImg, {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 80%"
                },
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
            gsap.from(abouttext, {
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 80%"
                },
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }

        gsap.utils.toArray(".skill-box").forEach((box, i) => {
            gsap.from(box, {
                scrollTrigger: {
                    trigger: box,
                    start: "top 90%",
                    end: "bottom 10%",
                    toggleActions: "play reverse play reverse",
                },
                y: 30,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        const timelineLeft = gsap.utils.toArray('.timeline-item.left');
        const timelineRight = gsap.utils.toArray('.timeline-item.right');

        timelineLeft.forEach(item => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play reverse play reverse"
                },
                x: -80,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

        timelineRight.forEach(item => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play reverse play reverse"
                },
                x: 80,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });

        gsap.utils.toArray(".project-row").forEach(row => {
            const imageContainer = row.querySelector(".project-visual-container");
            const contentContainer = row.querySelector(".project-content");

            if (imageContainer) {
                gsap.from(imageContainer, {
                    scrollTrigger: {
                        trigger: row,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play reverse play reverse"
                    },
                    x: -80,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            }

            if (contentContainer) {
                gsap.from(contentContainer, {
                    scrollTrigger: {
                        trigger: row,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play reverse play reverse"
                    },
                    x: 80,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            }
        });

        const cards = gsap.utils.toArray('.certificate-card, .contact-card');
        cards.forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%"
                },
                y: 40,
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        gsap.to(".marquee-content", {
            xPercent: -50,
            repeat: -1,
            duration: 25,
            ease: "linear"
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    const themeIconDark = document.querySelector('.theme-icon-dark');
    const themeIconLight = document.querySelector('.theme-icon-light');

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIconDark.classList.add('d-none');
        themeIconLight.classList.remove('d-none');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');

        if (isLightMode) {
            themeIconDark.classList.add('d-none');
            themeIconLight.classList.remove('d-none');
            localStorage.setItem('theme', 'light');
        } else {
            themeIconDark.classList.remove('d-none');
            themeIconLight.classList.add('d-none');
            localStorage.setItem('theme', 'dark');
        }
    });


    emailjs.init("idYZELW7BzaQzCWyS");

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            emailjs.sendForm('service_ho2v7dt', 'template_kmt7s5b', this)
                .then(() => {
                    const toastElement = document.getElementById('formFeedbackToast');
                    const toastBody = document.getElementById('toastMessage');
                    if (toastElement && toastBody) {
                        toastBody.innerText = "Message sent successfully! I’ll get back to you soon.";
                        const toast = new bootstrap.Toast(toastElement);
                        toast.show();
                    }
                    this.reset();
                }, (error) => {
                    const toastElement = document.getElementById('formFeedbackToast');
                    const toastBody = document.getElementById('toastMessage');
                    if (toastElement && toastBody) {
                        toastBody.innerText = "Failed to send message. Please try again.";
                        const toast = new bootstrap.Toast(toastElement);
                        toast.show();
                    }
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});
