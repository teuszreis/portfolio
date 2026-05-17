document.addEventListener('DOMContentLoaded', () => {
    
    const btnMenu = document.getElementById('btn-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = btnMenu.querySelector('i');

    btnMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        }
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        });
    });

    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal();

    const backToTopBtn = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove("opacity-0", "pointer-events-none");
            backToTopBtn.classList.add("opacity-100", "pointer-events-auto");
        } else {
            backToTopBtn.classList.add("opacity-0", "pointer-events-none");
            backToTopBtn.classList.remove("opacity-100", "pointer-events-auto");
        }
    });
    
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Copy Email Feature
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('matheusemail2104@gmail.com').then(() => {
                const originalText = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = '<i class="fa-solid fa-check mr-1"></i>Copiado!';
                copyEmailBtn.classList.add('text-neon', 'border-neon');
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalText;
                    copyEmailBtn.classList.remove('text-neon', 'border-neon');
                }, 2000);
            });
        });
    }

    // Form Validation & EmailJS
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Enviando...';
            submitBtn.disabled = true;

            //EMAILJS
            emailjs.sendForm('service_v23d0dn', 'template_91yymt7', this)
                .then(function() {
                    formStatus.innerHTML = '<span class="text-neon"><i class="fa-solid fa-circle-check"></i> Mensagem enviada com sucesso!</span>';
                    contactForm.reset();
                })
                .catch(function(error) {
                    formStatus.innerHTML = '<span class="text-red-500"><i class="fa-solid fa-circle-xmark"></i> Erro ao enviar. Tente novamente.</span>';
                    console.log('Erro EmailJS:', error);
                })
                .finally(function() {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
                });
        }); 
    } 

    const terminalText = document.getElementById('terminal-text');
    if (terminalText) {
        const textArray = [
            "Iniciando sistema...",
            "Carregando módulos de segurança...",
            "Verificando integridade dos arquivos... [OK]",
            "Estabelecendo conexão segura com servidor...",
            "Acesso concedido.",
            "Bem-vindo ao portfólio de Matheus Reis."
        ];
        let textIndex = 0;
        let charIndex = 0;

        function typeWriter() {
            if (textIndex < textArray.length) {
                if (charIndex < textArray[textIndex].length) {
                    terminalText.innerHTML += textArray[textIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 40);
                } else {
                    terminalText.innerHTML += '<br><br>';
                    textIndex++;
                    charIndex = 0;
                    
                    const terminalWindow = document.getElementById('terminal-window');
                    if (terminalWindow) {
                        terminalWindow.scrollTop = terminalWindow.scrollHeight;
                    }
                    
                    setTimeout(typeWriter, 500);
                }
            }
        }
        setTimeout(typeWriter, 800);
    }
    const cursor = document.getElementById('cursor');

    document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
                 cursor.style.top  = e.clientY + 'px';
});

    document.querySelectorAll('a, button, .btn, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}); 