// Configuración de EmailJS (formulario de contacto)
(function() {
    // Inicializar EmailJS con tu ID público (lo cambiarás después)
    emailjs.init("tu-user-id-publico");
})();

// Navegación suave
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar estado de envío
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Datos del formulario
            const formData = {
                name: this.name.value,
                email: this.email.value,
                phone: this.phone.value,
                service: this.service.options[this.service.selectedIndex].text,
                message: this.message.value
            };

            // Envío con EmailJS (configurar después)
            emailjs.send("tu-service-id", "tu-template-id", formData)
                .then(function(response) {
                    alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
                    contactForm.reset();
                }, function(error) {
                    alert('Error al enviar el mensaje. Por favor, contáctanos directamente por teléfono o email.');
                    console.log('EmailJS error:', error);
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.servicio-card, .sobre-mi-content, .contacto-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Header con efecto al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
    });

    // Contador de visitas simple (opcional)
    if (!localStorage.getItem('visitCount')) {
        localStorage.setItem('visitCount', '1');
    } else {
        let count = parseInt(localStorage.getItem('visitCount'));
        localStorage.setItem('visitCount', (count + 1).toString());
    }
});

// WhatsApp directo
function openWhatsApp() {
    const message = "Hola, me interesa conocer más sobre sus servicios de arquitectura.";
    const url = `https://wa.me/51957443572?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Llamada telefónica
function makeCall() {
    window.location.href = 'tel:+51957443572';
}