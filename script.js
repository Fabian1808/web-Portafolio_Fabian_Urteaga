import { gsap } from 'https://cdn.skypack.dev/gsap';
        import ScrollTrigger from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
        
        gsap.registerPlugin(ScrollTrigger);

        // Animaciones GSAP
        const animations = {
            init() {
                // Hero animations
                gsap.from('.hero-content > *', {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power4.out'
                });

                // Scroll animations
                gsap.utils.toArray('.animate-on-scroll').forEach(element => {
                    gsap.from(element, {
                        scrollTrigger: {
                            trigger: element,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        },
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out'
                    });
                });
            }
        };

        // Cursor personalizado
        const cursor = {
            init() {
                const cursor = document.querySelector('.cursor-dot');
                const cursorGlow = document.querySelector('.cursor-glow');
                
                document.addEventListener('mousemove', e => {
                    gsap.to(cursor, {
                        x: e.clientX,
                        y: e.clientY,
                        duration: 0.1
                    });
                    gsap.to(cursorGlow, {
                        x: e.clientX,
                        y: e.clientY,
                        duration: 0.3
                    });
                });
            }
        };

        // Inicialización
        document.addEventListener('DOMContentLoaded', () => {
            animations.init();
            cursor.init();
            
            // Remover pantalla de carga
            const loadingScreen = document.getElementById('loading-screen');
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => loadingScreen.remove()
            });
        });

        // Form handling
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Aquí iría la lógica de envío del formulario
        });

        // Intersection Observer para animaciones
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(
            el => observer.observe(el)
        );