import { LeaderboardManager } from './modules/leaderboard.js';
import { NFTGallery } from './modules/nft-gallery.js';
import { ProfileManager } from './modules/profile.js';

class App {
    constructor() {
        this.leaderboard = new LeaderboardManager();
        this.nftGallery = new NFTGallery();
        this.profile = new ProfileManager();
    }

    initializeNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        // Mobile menu toggle
        menuToggle?.addEventListener('click', () => {
            navMenu?.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle')) {
                navMenu?.classList.remove('active');
            }
        });

        // Smooth scroll
        this.initializeSmoothScroll();
    }

    initializeSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    document.querySelector('.nav-menu')?.classList.remove('active');
                }
            });
        });
    }

    async initialize() {
        try {
            this.initializeNavigation();
            await Promise.all([
                this.leaderboard.init(),
                this.nftGallery.init(),
                this.profile.init()
            ]);
            console.log('🚀 Balon dFarcaster initialized successfully!');
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.initialize();
});



import { LeaderboardManager } from './modules/leaderboard.js';
import { NFTGallery } from './modules/nft-gallery.js';
import { ProfileManager } from './modules/profile.js';
import { RealtimeManager } from './modules/realtime.js';
import { AnimationManager } from './modules/animations.js';

class App {
    constructor() {
        this.leaderboard = new LeaderboardManager();
        this.nftGallery = new NFTGallery();
        this.profile = new ProfileManager();
        this.realtime = new RealtimeManager();
    }

    async initialize() {
        // Initialize components
        await Promise.all([
            this.leaderboard.init(),
            this.nftGallery.init(),
            this.profile.init()
        ]);

        // Setup realtime updates
        this.realtime.connect();
        this.setupRealtimeUpdates();

        // Add animations
        AnimationManager.addEntryAnimations();
        this.initializeInteractions();

        console.log('🎮 Balon dFarcaster is ready to play!');
    }

    setupRealtimeUpdates() {
        this.realtime.subscribe('leaderboard_update', (data) => {
            this.leaderboard.updateRankings(data);
        });

        this.realtime.subscribe('nft_mint', (data) => {
            this.nftGallery.addNewNFT(data);
        });
    }

    initializeInteractions() {
        // Add hover effects
        document.querySelectorAll('.nft-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
            });
        });

        // Add achievement unlock animations
        this.profile.on('achievement_unlock', (achievement) => {
            this.showAchievementPopup(achievement);
        });
    }

    showAchievementPopup(achievement) {
        // Create and show achievement popup
        const popup = document.createElement('div');
        popup.classList.add('achievement-popup');
        popup.innerHTML = `
            <h3>🏆 New Achievement!</h3>
            <p>${achievement.title}</p>
        `;
        document.body.appendChild(popup);
        
        setTimeout(() => popup.remove(), 3000);
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.initialize();
});


const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
});


// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Optional: Prevent body scrolling when menu is open
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});


import { NFTGallery } from './modules/nft-gallery.js';

// Mobile Menu Items
const mobileMenuItems = [
    { text: 'Leaderboard', href: '#leaderboard' },
    { text: 'NFTs', href: '#nft-gallery' },
    { text: 'Profile', href: '#profile' }
];

// Add items to mobile menu
const navMenu = document.querySelector('.nav-menu');
mobileMenuItems.forEach(item => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.text;
    link.className = 'nav-link';
    navMenu.appendChild(link);
});


import { Leaderboard } from './modules/leaderboard.js';
import { AchievementSystem } from './modules/achievements.js';
import { ProfileCards } from './modules/profile-cards.js';

document.addEventListener('DOMContentLoaded', () => {
    new Leaderboard();
    new AchievementSystem();
    new ProfileCards();
});


import { RewardSystem } from './modules/rewards.js';

// Initialize with other modules
new RewardSystem();
