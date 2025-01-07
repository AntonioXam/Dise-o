// Animación al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Reproducción de audio/video sincronizada
function syncMediaWithAnimation(mediaElement, animationElement) {
    mediaElement.addEventListener('timeupdate', () => {
        // Aquí irá la lógica de sincronización
    });
}

// Animación para reproducción de video
const videoPlayer = document.querySelector('video');
if (videoPlayer) {
    videoPlayer.addEventListener('play', () => {
        const nearbyElements = videoPlayer.parentElement.querySelectorAll('.animate-on-scroll');
        nearbyElements.forEach(element => {
            element.classList.add('slide-in');
        });
    });
}

// Animación para audio
const audioPlayers = document.querySelectorAll('audio');
audioPlayers.forEach(audio => {
    audio.addEventListener('play', () => {
        const playerContainer = audio.closest('.audio-player');
        playerContainer.style.transform = 'scale(1.02)';
    });
    
    audio.addEventListener('pause', () => {
        const playerContainer = audio.closest('.audio-player');
        playerContainer.style.transform = 'scale(1)';
    });
});

// Detector de scroll mejorado
const scrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.classList.add('slide-in');
        }
    });
};

window.addEventListener('scroll', scrollAnimations);

// Funcionalidad del modal de imágenes
document.querySelectorAll('.gallery-item img').forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        modalImg.src = image.src;
        new bootstrap.Modal(modal).show();
    });
});

// Filtros de galería
document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', e => {
        const filter = e.target.dataset.filter;
        const items = document.querySelectorAll('.gallery-item');
        
        document.querySelector('.btn-group .active').classList.remove('active');
        e.target.classList.add('active');

        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lazy loading de imágenes
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
