// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // DOM Elements
    const startScreen = document.getElementById('startScreen');
    const mainContent = document.getElementById('mainContent');
    const startBtn = document.getElementById('startBtn');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const toothless = document.getElementById('toothless');
    const photoInput1 = document.getElementById('photoInput1');
    const photoInput2 = document.getElementById('photoInput2');
    const photo1 = document.getElementById('photo1');
    const photo2 = document.getElementById('photo2');
    const interactiveCards = document.querySelectorAll('.interactive-card');
    const storyText = document.getElementById('storyText');
    const berkDestination = document.getElementById('berkDestination');
    const backBtn = document.getElementById('backBtn');
    const interactiveSection = document.querySelector('.interactive-section');

    // Start Button Click Handler
    startBtn.addEventListener('click', () => {
        // Hide start screen with fade out
        startScreen.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            startScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Start Toothless animation
            toothless.classList.remove('hidden');
            
            // Play background music
            playMusic();
            
            // Add entrance animation to main content
            mainContent.style.animation = 'fadeIn 1s ease-in';
        }, 500);
    });

    // Music Control
    let isMusicPlaying = false;

    function playMusic() {
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.textContent = '🔊';
            musicToggle.classList.remove('muted');
        }).catch(error => {
            console.log('Autoplay prevented. User interaction required.');
            // Music will play when user clicks the toggle button
        });
    }

    musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        isMusicPlaying = false;
        musicToggle.textContent = '🔇';
        musicToggle.classList.add('muted');
    } else {
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.textContent = '🔊';
            musicToggle.classList.remove('muted');
        }).catch(error => {
            alert('Please interact with the page first to enable audio playback.');
        });
    }
    });

    // Photo Upload Handlers
    if (photoInput1) {
        photoInput1.addEventListener('change', (e) => {
            handlePhotoUpload(e, photo1, photoInput1);
        });
    }

    if (photoInput2) {
        photoInput2.addEventListener('change', (e) => {
            handlePhotoUpload(e, photo2, photoInput2);
        });
    }

    function handlePhotoUpload(event, imgElement, inputElement) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imgElement.src = e.target.result;
                imgElement.style.display = 'block';
                inputElement.parentElement.style.display = 'none';
                
                // Add photo animation
                imgElement.style.animation = 'fadeIn 0.5s ease-in, photoPop 0.5s ease-out';
            };
            reader.readAsDataURL(file);
        }
    }

    // Interactive Cards
    interactiveCards.forEach((card, index) => {
        card.addEventListener('click', () => {
        // Add click animation
        card.style.animation = 'cardClick 0.3s ease-out';
        
        setTimeout(() => {
            card.style.animation = '';
        }, 300);
        
        // Different actions for different cards
        switch(card.dataset.card) {
            case '1':
                // Navigate to Berk Island destination - same pattern as Begin Adventure button
                interactiveSection.style.animation = 'fadeOut 0.5s ease-out';
                const header = document.querySelector('.header');
                if (header) {
                    header.style.display = 'none';
                }
                // Change background music to "Where No One Goes"
                if (backgroundMusic && isMusicPlaying) {
                    backgroundMusic.pause();
                    backgroundMusic.src = 'Where No One Goes.mp3';
                    backgroundMusic.load();
                    backgroundMusic.play().catch(error => {
                        console.log('Music autoplay prevented');
                    });
                }
                setTimeout(() => {
                    interactiveSection.style.display = 'none';
                    berkDestination.classList.remove('hidden');
                    berkDestination.style.animation = 'fadeIn 1s ease-in';
                }, 500);
                break;
            case '2':
                showMessage('🏝️ Welcome to New Berk! A new home for Vikings and Dragons.');
                break;
            case '3':
                showMessage('⚔️ Epic Adventures await! Together we can conquer anything!');
                break;
        }
        });
    });

    function showMessage(message) {
        // Create a temporary message element
        const messageEl = document.createElement('div');
        messageEl.className = 'message-popup';
        
        // Create text element with metallic styling
        const textEl = document.createElement('div');
        textEl.className = 'message-text';
        textEl.textContent = message;
        
        messageEl.appendChild(textEl);
        
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(192, 192, 192, 0.5);
            border-radius: 8px;
            padding: 2rem 3rem;
            z-index: 10000;
            animation: messagePop 0.5s ease-out;
            box-shadow: 
                0 4px 8px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 0 20px rgba(192, 192, 192, 0.3);
            min-width: 300px;
            text-align: center;
        `;
        
        // Style the text with metallic effect
        textEl.style.cssText = `
            font-size: 1.8rem;
            font-weight: 900;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            font-family: 'Georgia', 'Times New Roman', serif;
            background: linear-gradient(
                135deg,
                #e8e8e8 0%,
                #c0c0c0 25%,
                #a0a0a0 50%,
                #c0c0c0 75%,
                #e8e8e8 100%
            );
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: metallicShine 4s ease-in-out infinite;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 10px rgba(192, 192, 192, 0.3));
            line-height: 1.4;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.animation = 'messageFadeOut 0.5s ease-out';
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 500);
        }, 2000);
    }

    // Save story to localStorage
    if (storyText) {
        storyText.addEventListener('input', () => {
            localStorage.setItem('ourStory', storyText.value);
        });
    }

    // Load saved story
    window.addEventListener('load', () => {
        const savedStory = localStorage.getItem('ourStory');
        if (savedStory && storyText) {
            storyText.value = savedStory;
        }
    });

    // Back button handler
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Hide destination section with fade out
            berkDestination.style.animation = 'fadeOut 0.5s ease-out';
            // Change background music back to "Test Driving Toothless"
            if (backgroundMusic && isMusicPlaying) {
                backgroundMusic.pause();
                backgroundMusic.src = 'Test Driving Toothless.mp3';
                backgroundMusic.load();
                backgroundMusic.play().catch(error => {
                    console.log('Music autoplay prevented');
                });
            }
            setTimeout(() => {
                berkDestination.classList.add('hidden');
                interactiveSection.style.display = 'block';
                const header = document.querySelector('.header');
                if (header) {
                    header.style.display = 'block';
                }
                interactiveSection.style.animation = 'fadeIn 1s ease-in';
                
                // Scroll to interactive section
                interactiveSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
        });
    }

    // Cloud overlay click handler - reveal images
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item) => {
        const cloudOverlay = item.querySelector('.cloud-overlay');
        if (cloudOverlay) {
            cloudOverlay.addEventListener('click', (e) => {
                e.stopPropagation();
                // Add revealed class to cloud overlay
                cloudOverlay.classList.add('revealed');
                item.classList.add('revealed');
                
                // Add reveal animation to photo
                const photo = item.querySelector('.destination-photo');
                if (photo) {
                    photo.style.animation = 'fadeIn 1s ease-in, photoReveal 0.8s ease-out';
                }
            });
        }
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes photoPop {
        0% {
            transform: scale(0.8);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes cardClick {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes messagePop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes messageFadeOut {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Toothless animation is now handled entirely by CSS for smooth, realistic flight

// Add sparkle effect on interactive elements
interactiveCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        createSparkles(card);
    });
});

function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkle 1s ease-out forwards;
            z-index: 10;
        `;
        element.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentElement) {
                sparkle.parentElement.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(0) translate(0, 0);
        }
        50% {
            opacity: 1;
            transform: scale(1) translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px);
        }
        100% {
            opacity: 0;
            transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(sparkleStyle);
