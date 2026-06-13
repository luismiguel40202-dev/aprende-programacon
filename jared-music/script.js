// ===== MENÚ MÓVIL =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== REPRODUCTOR DE MÚSICA =====
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');

const songs = [
    { title: 'Lejos de tus Besos', artist: 'Jared Music Oficial', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'Miles de Kilómetros', artist: 'Jared Music Oficial', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { title: 'Corazón en Videollamada', artist: 'Jared Music Oficial', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { title: 'Siempre Esperándote', artist: 'Jared Music Oficial', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
    if (index < 0) {
        currentSongIndex = songs.length - 1;
    } else if (index >= songs.length) {
        currentSongIndex = 0;
    } else {
        currentSongIndex = index;
    }

    const song = songs[currentSongIndex];
    audioPlayer.src = song.url;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
}

function playSong(title, index) {
    loadSong(index - 1);
    audioPlayer.play();
    isPlaying = true;
    updatePlayBtn();
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
    updatePlayBtn();
}

function updatePlayBtn() {
    if (isPlaying) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function prevSong() {
    loadSong(currentSongIndex - 1);
    if (isPlaying) {
        audioPlayer.play();
    }
}

function nextSong() {
    loadSong(currentSongIndex + 1);
    if (isPlaying) {
        audioPlayer.play();
    }
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audioPlayer.addEventListener('ended', nextSong);
audioPlayer.addEventListener('play', () => {
    isPlaying = true;
    updatePlayBtn();
});

audioPlayer.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayBtn();
});

// Cargar la primera canción al inicio
loadSong(0);

// ===== FORMULARIO DE CONTACTO =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const nombre = document.querySelector('input[placeholder="Tu Nombre"]').value;
    const email = document.querySelector('input[placeholder="Tu Correo Electrónico"]').value;
    const asunto = document.querySelector('input[placeholder="Asunto"]').value;
    const mensaje = document.querySelector('textarea[placeholder="Tu Mensaje"]').value;

    if (nombre && email && mensaje) {
        // Simulación de envío
        alert(`¡Gracias por tu mensaje, ${nombre}!\n\nTu mensaje ha sido recibido. Pronto te contactaremos a ${email}.`);
        
        // Limpiar formulario
        contactForm.reset();
    } else {
        alert('Por favor, completa todos los campos requeridos.');
    }
});

// ===== EFECTO SCROLL SUAVE PARA NAVEGACIÓN =====
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

// ===== EFECTO SCROLL NAVBAR =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 2px 30px rgba(0, 168, 255, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 168, 255, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== OBSERVADOR PARA ANIMACIONES AL SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInDown 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===== FUNCIÓN PARA COMPARTIR EN REDES SOCIALES =====
function shareOnSocial(platform) {
    const title = 'Jared Music Oficial - Convirtiendo emociones en melodías';
    const url = window.location.href;
    const text = 'Escucha la música de Jared Music Oficial';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        case 'instagram':
            // Instagram no permite compartir directamente desde web
            alert('Comparte en Instagram desde la app móvil');
            return;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// ===== CARGAR SONGS DINÁMICAMENTE AL INICIAR =====
window.addEventListener('load', () => {
    console.log('Página cargada correctamente');
    console.log(`Canciones disponibles: ${songs.length}`);
});

// ===== DETECTAR CONEXIÓN A INTERNET =====
window.addEventListener('online', () => {
    console.log('Conexión restaurada');
});

window.addEventListener('offline', () => {
    console.log('Sin conexión a internet');
});

// ===== FUNCIÓN AUXILIAR PARA ANALYTICS =====
function trackEvent(eventName, eventData) {
    console.log(`Evento: ${eventName}`, eventData);
    // Aquí puedes integrar Google Analytics u otro servicio de tracking
}

// Rastrear reproducciones
audioPlayer.addEventListener('play', () => {
    trackEvent('song_played', {
        song: songs[currentSongIndex].title,
        timestamp: new Date()
    });
});

// ===== MODO OSCURO/CLARO (Opcional) =====
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
}

// Cargar tema guardado
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
});