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

// Mejorar el detector de scroll con nuevas animaciones
const scrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            // Alternar entre diferentes animaciones
            if (index % 3 === 0) {
                element.classList.add('bounce-in');
            } else if (index % 3 === 1) {
                element.classList.add('rotate-in');
            } else {
                element.classList.add('slide-in');
            }
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

// Datos de las temporadas
const seasons = [
    {
        number: 1,
        episodes: "6 episodios",
        year: "2005",
        description: "La primera temporada introduce a Michael Scott y el equipo de Dunder Mifflin Scranton.",
        image: "assets/images/T1.jpg"
    },
    {
        number: 2,
        episodes: "22 episodios",
        year: "2005-2006",
        description: "La tensión romántica entre Jim y Pam crece mientras ella planea su boda con Roy. Michael comienza una relación con su jefa Jan Levinson.",
        image: "assets/images/T2.jpg"
    },
    {
        number: 3,
        episodes: "25 episodios",
        year: "2006-2007",
        description: "Jim regresa de Stamford junto con nuevos personajes como Andy Bernard. Pam explora su independencia después de cancelar su boda.",
        image: "assets/images/T3.jpg"
    },
    {
        number: 4,
        episodes: "19 episodios",
        year: "2007-2008",
        description: "Jim y Pam finalmente están juntos, Ryan asciende a ejecutivo corporativo, y la relación entre Michael y Jan alcanza nuevos niveles de disfunción.",
        image: "assets/images/T4.jpg"
    },
    {
        number: 5,
        episodes: "28 episodios",
        year: "2008-2009",
        description: "Michael forma su propia compañía de papel antes de regresar a Dunder Mifflin. Jim y Pam se comprometen.",
        image: "assets/images/T5.jpg"
    },
    {
        number: 6,
        episodes: "26 episodios",
        year: "2009-2010",
        description: "Jim y Pam celebran su boda y esperan su primer hijo. Dunder Mifflin es comprada por Sabre.",
        image: "assets/images/T6.jpg"
    },
    {
        number: 7,
        episodes: "26 episodios",
        year: "2010-2011",
        description: "La última temporada de Michael Scott como gerente regional. Michael encuentra el amor verdadero con Holly y decide mudarse a Colorado.",
        image: "assets/images/T7.jpg"
    },
    {
        number: 8,
        episodes: "24 episodios",
        year: "2011-2012",
        description: "Andy Bernard asume el papel de gerente regional, mientras que Robert California se convierte en el nuevo CEO.",
        image: "assets/images/T8.jpg"
    },
    {
        number: 9,
        episodes: "25 episodios",
        year: "2012-2013",
        description: "La temporada final revela al equipo documental. Dwight finalmente logra su sueño de ser gerente y se casa con Angela.",
        image: "assets/images/T9.jpg"
    }
];

// Configuración del carrusel
class SeasonWheel {
    constructor() {
        this.container = document.querySelector('.season-wheel');
        this.currentIndex = 0;
        this.totalSeasons = seasons.length;
        this.init();
    }

    init() {
        this.createSeasons();
        this.setupControls();
        this.updatePositions();
    }

    createSeasons() {
        seasons.forEach((season, index) => {
            const div = document.createElement('div');
            div.className = `season-item ${index === 0 ? 'active' : ''}`;
            div.innerHTML = `
                <div class="season-content">
                    <img src="${season.image}" alt="Temporada ${season.number}">
                    <h3>Temporada ${season.number}</h3>
                    <p class="text-muted">${season.episodes} - ${season.year}</p>
                    <p>${season.description}</p>
                </div>
            `;
            this.container.appendChild(div);
        });
    }

    setupControls() {
        document.getElementById('prevSeason').addEventListener('click', () => this.rotate(-1));
        document.getElementById('nextSeason').addEventListener('click', () => this.rotate(1));
    }

    rotate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.totalSeasons) % this.totalSeasons;
        this.updatePositions();
    }

    updatePositions() {
        const items = document.querySelectorAll('.season-item');
        items.forEach((item, index) => {
            const diff = (index - this.currentIndex + this.totalSeasons) % this.totalSeasons;
            const angle = (360 / this.totalSeasons) * diff;
            const scale = index === this.currentIndex ? 1 : 0.7;
            const zIndex = index === this.currentIndex ? 2 : 1;
            
            item.style.transform = `
                translate(-50%, -50%) 
                rotate(${angle}deg) 
                translateY(-250px) 
                rotate(-${angle}deg)
                scale(${scale})
            `;
            item.style.zIndex = zIndex;
            item.classList.toggle('active', index === this.currentIndex);
        });
    }
}

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new SeasonWheel();
});

// Animación de aparición para las temporadas
const observerOptions = {
    threshold: 0.2
};

const seasonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.season-container').forEach(season => {
    seasonObserver.observe(season);
});

/* Animación de aparición para las tarjetas de temporada */
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Animar elementos del hero
    setTimeout(() => {
        document.querySelectorAll('.hero-section h1, .hero-section p').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // Función para animar elementos cuando son visibles
    function animateOnScroll() {
        const elements = document.querySelectorAll(`
            .animate-fade-up, 
            .animate-fade-scale, 
            .seasons .card,
            .synopsis,
            .synopsis img,
            .synopsis-content,
            .stat-box,
            .seasons h2
        `);
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
                element.classList.add('active');
            }
        });
    }

    // Animar elementos iniciales
    function animateInitialElements() {
        const synopsis = document.querySelector('.synopsis');
        const synopsisImg = document.querySelector('.synopsis img');
        const synopsisContent = document.querySelector('.synopsis-content');
        const statBoxes = document.querySelectorAll('.stat-box');
        const seasonsTitle = document.querySelector('.seasons h2');

        if (synopsis) synopsis.classList.add('active');
        if (synopsisImg) synopsisImg.classList.add('active');
        if (synopsisContent) synopsisContent.classList.add('active');
        if (seasonsTitle) seasonsTitle.classList.add('active');
        
        statBoxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add('active');
            }, 600 + (index * 200));
        });
    }

    // Animar cards de temporadas en secuencia
    function animateSeasonCards() {
        const cards = document.querySelectorAll('.seasons .card');
        
        // Primero ocultamos todas las cards
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'perspective(1000px) rotateY(45deg) scale(0.8)';
        });

        // Luego las animamos en secuencia
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.classList.add('active');
            }, 100 + (index * 200)); // Más tiempo entre cada card
        });
    }

    // Función para reiniciar animaciones cuando las cards vuelven a estar en vista
    function checkSeasonCardsVisibility() {
        const cards = document.querySelectorAll('.seasons .card');
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
            
            if (isVisible && !card.classList.contains('active')) {
                setTimeout(() => {
                    card.classList.add('active');
                }, index * 200);
            }
        });
    }

    // Asegurar que las imágenes estén cargadas antes de animar
    window.addEventListener('load', () => {
        animateInitialElements();
        animateSeasonCards();
        animateOnScroll();
    });

    // Animar elementos al hacer scroll
    window.addEventListener('scroll', () => {
        animateOnScroll();
    });

    // Añadir el listener para el scroll
    window.addEventListener('scroll', checkSeasonCardsVisibility);
});

// Función para animar el hero
function animateHero() {
    const heroTitle = document.querySelector('.hero-section h1');
    const heroText = document.querySelector('.hero-section p');
    
    // Primero removemos las clases active
    heroTitle.classList.remove('active');
    heroText.classList.remove('active');
    
    // Forzamos un reflow para reiniciar las animaciones
    void heroTitle.offsetWidth;
    void heroText.offsetWidth;
    
    // Volvemos a añadir las clases active
    heroTitle.classList.add('active');
    heroText.classList.add('active');
}

// Añadir el evento click al hero
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('click', animateHero);
        // Animación inicial
        animateHero();
    }
});
