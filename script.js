// ========================================
// NEBULAX GAMING - INTERACTIVE SCRIPTS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initNavigation();
    initScrollAnimations();
    initCounters();
    initGameFilters();
    initSpaceShooter();
    initNeonRacer();
    initPricingToggle();
    initAuthTabs();
    initPasswordToggle();
    initPasswordStrength();
    initSmoothScroll();
    initTiltEffect();
    initCustomCursor();
});

// ========================================
// CUSTOM CURSOR EFFECTS
// ========================================

function initCustomCursor() {
    // Only on desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);
    
    // Create trail elements
    const trailCount = 5;
    const trails = [];
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (1 - i / trailCount) * 0.5;
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0
        });
    }
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isMoving = false;
    let moveTimeout;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => {
            isMoving = false;
        }, 100);
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Smooth follow for main cursor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorGlow.style.left = cursorX + 'px';
        cursorGlow.style.top = cursorY + 'px';
        
        // Trail effect
        trails.forEach((trail, index) => {
            const delay = (index + 1) * 0.1;
            trail.x += (mouseX - trail.x) * (0.1 - delay * 0.01);
            trail.y += (mouseY - trail.y) * (0.1 - delay * 0.01);
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
        });
        
        // Create particles when moving fast
        if (isMoving && Math.random() > 0.8) {
            createCursorParticle(mouseX, mouseY);
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .game-card, .feature-card, .team-card, .pricing-card, .cat-btn, input, select, textarea');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorGlow.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorGlow.classList.remove('hover');
        });
    });
    
    // Click effects
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        createRipple(mouseX, mouseY);
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
    
    // Crosshair mode for game sections
    const gameSections = document.querySelectorAll('.experience-section, .try-first-section');
    gameSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            cursor.classList.add('crosshair');
            // Add crosshair dot
            if (!cursor.querySelector('.crosshair-dot')) {
                const dot = document.createElement('div');
                dot.className = 'crosshair-dot';
                cursor.appendChild(dot);
            }
        });
        
        section.addEventListener('mouseleave', () => {
            cursor.classList.remove('crosshair');
            const dot = cursor.querySelector('.crosshair-dot');
            if (dot) dot.remove();
        });
    });
    
    // Text selection cursor
    document.addEventListener('selectstart', () => {
        document.body.classList.add('selecting');
    });
    
    document.addEventListener('selectionchange', () => {
        const selection = window.getSelection();
        if (selection.toString().length === 0) {
            document.body.classList.remove('selecting');
        }
    });
    
    // Section-based cursor colors
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                updateCursorColor(section);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
}

function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    // Random color
    const colors = ['#00f5ff', '#8b5cf6', '#ff2d55', '#ff9500', '#10b981'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(particle);
    
    // Animate and remove
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 3 + 1;
    let opacity = 1;
    let posX = x;
    let posY = y;
    
    function animateParticle() {
        posX += Math.cos(angle) * velocity;
        posY += Math.sin(angle) * velocity;
        opacity -= 0.02;
        
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animateParticle);
        } else {
            particle.remove();
        }
    }
    
    requestAnimationFrame(animateParticle);
}

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function updateCursorColor(section) {
    const cursor = document.querySelector('.custom-cursor');
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (!cursor || !cursorGlow) return;
    
    // Reset classes
    cursor.style.borderColor = '';
    cursorGlow.style.background = '';
    
    // Apply section-specific colors
    if (section.classList.contains('about-section')) {
        cursor.style.borderColor = '#8b5cf6';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%)';
    } else if (section.classList.contains('games-section')) {
        cursor.style.borderColor = '#10b981';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent 70%)';
    } else if (section.classList.contains('experience-section') || section.classList.contains('try-first-section')) {
        cursor.style.borderColor = '#ff9500';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 149, 0, 0.3), transparent 70%)';
    } else if (section.classList.contains('pricing-section')) {
        cursor.style.borderColor = '#ec4899';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(236, 72, 153, 0.3), transparent 70%)';
    } else {
        // Default aqua
        cursor.style.borderColor = '#00f5ff';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 245, 255, 0.3), transparent 70%)';
    }
}

// Particle Background
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        
        // Random colors
        const colors = ['#00f5ff', '#8b5cf6', '#ff2d55', '#ff9500', '#10b981'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
    }
}

// Navigation
function initNavigation() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    
    // Add scrolled class on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.feature-card, .team-card, .game-card, .pricing-card, .info-card, .feature-item');
    
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        revealOnScroll.observe(el);
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Game Filters
function initGameFilters() {
    const filterBtns = document.querySelectorAll('.cat-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            gameCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Space Shooter Game
function initSpaceShooter() {
    const canvas = document.getElementById('spaceShooter');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startGame');
    const restartBtn = document.getElementById('restartGame');
    const overlay = document.getElementById('gameOverlay');
    const gameUI = document.getElementById('gameUI');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const scoreEl = document.getElementById('score');
    const livesEl = document.getElementById('lives');
    const levelEl = document.getElementById('level');
    const finalScoreEl = document.getElementById('finalScore');
    
    let gameRunning = false;
    let score = 0;
    let lives = 3;
    let level = 1;
    let animationId;
    
    // Game objects
    const player = {
        x: canvas.width / 2,
        y: canvas.height - 80,
        width: 40,
        height: 40,
        speed: 5,
        color: '#00f5ff'
    };
    
    let bullets = [];
    let enemies = [];
    let stars = [];
    let particles = [];
    let keys = {};
    
    // Initialize stars background
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 2 + 0.5
        });
    }
    
    // Prevent arrow key scrolling when game is active
    function preventArrowScroll(e) {
        if (gameRunning && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.code)) {
            e.preventDefault();
        }
    }
    
    // Add/remove scroll prevention
    function enableScrollPrevention() {
        window.addEventListener('keydown', preventArrowScroll, { passive: false });
    }
    
    function disableScrollPrevention() {
        window.removeEventListener('keydown', preventArrowScroll);
    }
    
    // Input handling
    document.addEventListener('keydown', (e) => {
        keys[e.code] = true;
        if (e.code === 'Space' && gameRunning) {
            e.preventDefault();
            shoot();
        }
    });
    
    document.addEventListener('keyup', (e) => {
        keys[e.code] = false;
    });
    
    function shoot() {
        bullets.push({
            x: player.x,
            y: player.y - 20,
            width: 4,
            height: 15,
            speed: 10,
            color: '#00f5ff'
        });
    }
    
    function spawnEnemy() {
        const size = 30 + Math.random() * 20;
        enemies.push({
            x: Math.random() * (canvas.width - size),
            y: -size,
            width: size,
            height: size,
            speed: 2 + level * 0.5,
            color: '#ff2d55',
            hp: 1 + Math.floor(level / 3)
        });
    }
    
    function createExplosion(x, y, color) {
        for (let i = 0; i < 15; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 30,
                color: color,
                size: Math.random() * 4 + 2
            });
        }
    }
    
    function update() {
        if (!gameRunning) return;
        
        // Move player
        if (keys['ArrowLeft'] && player.x > player.width / 2) {
            player.x -= player.speed;
        }
        if (keys['ArrowRight'] && player.x < canvas.width - player.width / 2) {
            player.x += player.speed;
        }
        if (keys['ArrowUp'] && player.y > player.height) {
            player.y -= player.speed;
        }
        if (keys['ArrowDown'] && player.y < canvas.height - player.height) {
            player.y += player.speed;
        }
        
        // Update bullets
        bullets = bullets.filter(bullet => {
            bullet.y -= bullet.speed;
            return bullet.y > -bullet.height;
        });
        
        // Update enemies
        if (Math.random() < 0.02 + level * 0.005) {
            spawnEnemy();
        }
        
        enemies = enemies.filter(enemy => {
            enemy.y += enemy.speed;
            
            // Check collision with player
            const dx = enemy.x - player.x;
            const dy = enemy.y - player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < enemy.width / 2 + player.width / 2) {
                lives--;
                createExplosion(enemy.x, enemy.y, enemy.color);
                updateUI();
                
                if (lives <= 0) {
                    gameOver();
                }
                return false;
            }
            
            // Check collision with bullets
            for (let i = bullets.length - 1; i >= 0; i--) {
                const bullet = bullets[i];
                const bdx = enemy.x - bullet.x;
                const bdy = enemy.y - bullet.y;
                const bdist = Math.sqrt(bdx * bdx + bdy * bdy);
                
                if (bdist < enemy.width / 2 + bullet.width) {
                    enemy.hp--;
                    bullets.splice(i, 1);
                    
                    if (enemy.hp <= 0) {
                        score += 100;
                        createExplosion(enemy.x, enemy.y, enemy.color);
                        
                        // Level up
                        if (score > level * 1000) {
                            level++;
                        }
                        
                        updateUI();
                        return false;
                    }
                }
            }
            
            return enemy.y < canvas.height + enemy.height;
        });
        
        // Update stars
        stars.forEach(star => {
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        
        // Update particles
        particles = particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            p.size *= 0.95;
            return p.life > 0;
        });
    }
    
    function draw() {
        // Clear canvas
        ctx.fillStyle = '#0a0a15';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw stars
        ctx.fillStyle = '#ffffff';
        stars.forEach(star => {
            ctx.globalAlpha = Math.random() * 0.5 + 0.3;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;
        
        if (gameRunning) {
            // Draw player
            ctx.save();
            ctx.translate(player.x, player.y);
            
            // Glow effect
            ctx.shadowBlur = 20;
            ctx.shadowColor = player.color;
            
            // Ship body
            ctx.fillStyle = player.color;
            ctx.beginPath();
            ctx.moveTo(0, -20);
            ctx.lineTo(-15, 20);
            ctx.lineTo(0, 10);
            ctx.lineTo(15, 20);
            ctx.closePath();
            ctx.fill();
            
            // Engine flame
            ctx.fillStyle = '#ff9500';
            ctx.beginPath();
            ctx.moveTo(-5, 20);
            ctx.lineTo(0, 30 + Math.random() * 10);
            ctx.lineTo(5, 20);
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
            
            // Draw bullets
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f5ff';
            ctx.fillStyle = '#00f5ff';
            bullets.forEach(bullet => {
                ctx.fillRect(bullet.x - bullet.width / 2, bullet.y, bullet.width, bullet.height);
            });
            
            // Draw enemies
            enemies.forEach(enemy => {
                ctx.shadowBlur = 15;
                ctx.shadowColor = enemy.color;
                ctx.fillStyle = enemy.color;
                
                ctx.beginPath();
                ctx.arc(enemy.x, enemy.y, enemy.width / 2, 0, Math.PI * 2);
                ctx.fill();
                
                // Enemy detail
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(enemy.x - 5, enemy.y - 5, 3, 0, Math.PI * 2);
                ctx.arc(enemy.x + 5, enemy.y - 5, 3, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Draw particles
            particles.forEach(p => {
                ctx.shadowBlur = 5;
                ctx.shadowColor = p.color;
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life / 30;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }
    }
    
    function gameLoop() {
        update();
        draw();
        animationId = requestAnimationFrame(gameLoop);
    }
    
    function updateUI() {
        scoreEl.textContent = score;
        livesEl.textContent = lives;
        levelEl.textContent = level;
    }
    
    function startGame() {
        gameRunning = true;
        score = 0;
        lives = 3;
        level = 1;
        bullets = [];
        enemies = [];
        particles = [];
        player.x = canvas.width / 2;
        player.y = canvas.height - 80;
        
        overlay.style.display = 'none';
        gameUI.style.display = 'flex';
        gameOverScreen.style.display = 'none';
        
        // Enable scroll prevention when game starts
        enableScrollPrevention();
        
        updateUI();
        gameLoop();
    }
    
    function gameOver() {
        gameRunning = false;
        cancelAnimationFrame(animationId);
        finalScoreEl.textContent = score;
        gameOverScreen.style.display = 'flex';
        
        // Disable scroll prevention when game ends
        disableScrollPrevention();
    }
    
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', () => {
        gameOverScreen.style.display = 'none';
        startGame();
    });
    
    // Initial draw
    draw();
}

// Neon Racer Game
function initNeonRacer() {
    const canvas = document.getElementById('neonRacer');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startRacing');
    const restartBtn = document.getElementById('restartRacing');
    const overlay = document.getElementById('racingOverlay');
    const gameUI = document.getElementById('racingUI');
    const gameOverScreen = document.getElementById('racingOverScreen');
    const speedEl = document.getElementById('speed');
    const distanceEl = document.getElementById('distance');
    const positionEl = document.getElementById('position');
    const finalPositionEl = document.getElementById('finalPosition');
    
    let gameRunning = false;
    let speed = 0;
    let distance = 0;
    let position = 1;
    let animationId;
    
    // Game objects
    const player = {
        x: canvas.width / 2,
        y: canvas.height - 100,
        width: 40,
        height: 70,
        speed: 5,
        maxSpeed: 15,
        angle: 0
    };
    
    let roadOffset = 0;
    let obstacles = [];
    let opponents = [];
    let particles = [];
    let keys = {};
    
    // Prevent arrow key scrolling when game is active
    function preventArrowScrollRacing(e) {
        if (gameRunning && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
            e.preventDefault();
        }
    }
    
    // Add/remove scroll prevention
    function enableScrollPreventionRacing() {
        window.addEventListener('keydown', preventArrowScrollRacing, { passive: false });
    }
    
    function disableScrollPreventionRacing() {
        window.removeEventListener('keydown', preventArrowScrollRacing);
    }
    
    // Input handling
    document.addEventListener('keydown', (e) => {
        keys[e.code] = true;
    });
    
    document.addEventListener('keyup', (e) => {
        keys[e.code] = false;
    });
    
    function spawnObstacle() {
        const lane = Math.floor(Math.random() * 3);
        const laneWidth = canvas.width / 3;
        obstacles.push({
            x: lane * laneWidth + laneWidth / 2,
            y: -100,
            width: 50,
            height: 50,
            type: Math.random() > 0.5 ? 'rock' : 'barrier'
        });
    }
    
    function createParticle(x, y, color) {
        for (let i = 0; i < 5; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                life: 20,
                color: color,
                size: Math.random() * 3 + 1
            });
        }
    }
    
    function update() {
        if (!gameRunning) return;
        
        // Accelerate
        if (keys['ArrowUp'] && speed < player.maxSpeed) {
            speed += 0.2;
        } else if (speed > 0) {
            speed -= 0.1;
        }
        
        // Steering
        if (keys['ArrowLeft'] && player.x > 50) {
            player.x -= player.speed;
            player.angle = -0.1;
        } else if (keys['ArrowRight'] && player.x < canvas.width - 50) {
            player.x += player.speed;
            player.angle = 0.1;
        } else {
            player.angle = 0;
        }
        
        // Update road
        roadOffset += speed;
        if (roadOffset > 100) roadOffset = 0;
        
        // Update distance
        distance += speed / 10;
        
        // Spawn obstacles
        if (Math.random() < 0.02 && speed > 5) {
            spawnObstacle();
        }
        
        // Update obstacles
        obstacles = obstacles.filter(obs => {
            obs.y += speed;
            
            // Check collision
            if (Math.abs(obs.x - player.x) < 40 && 
                Math.abs(obs.y - player.y) < 60) {
                speed *= 0.5;
                createParticle(player.x, player.y, '#ff2d55');
            }
            
            return obs.y < canvas.height + 100;
        });
        
        // Update opponents (simulated)
        if (Math.random() < 0.01) {
            position = Math.max(1, Math.min(8, position + Math.floor(Math.random() * 3) - 1));
        }
        
        // Update particles
        particles = particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            return p.life > 0;
        });
        
        // Create exhaust particles
        if (speed > 5) {
            createParticle(player.x, player.y + 35, '#ff9500');
        }
        
        // Check finish
        if (distance > 5000) {
            gameOver();
        }
        
        updateUI();
    }
    
    function draw() {
        // Clear canvas
        ctx.fillStyle = '#0a0a15';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (gameRunning) {
            // Draw road
            const laneWidth = canvas.width / 3;
            
            // Road glow
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#00f5ff';
            
            // Lane lines
            ctx.strokeStyle = 'rgba(0, 245, 255, 0.3)';
            ctx.lineWidth = 2;
            for (let i = 1; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(i * laneWidth, 0);
                ctx.lineTo(i * laneWidth, canvas.height);
                ctx.stroke();
            }
            
            // Moving road lines
            ctx.strokeStyle = '#ff9500';
            ctx.lineWidth = 4;
            for (let i = -1; i < canvas.height / 100 + 1; i++) {
                const y = i * 100 + roadOffset;
                ctx.beginPath();
                ctx.moveTo(laneWidth - 20, y);
                ctx.lineTo(laneWidth - 20, y + 50);
                ctx.moveTo(laneWidth * 2 - 20, y);
                ctx.lineTo(laneWidth * 2 - 20, y + 50);
                ctx.stroke();
            }
            
            ctx.shadowBlur = 0;
            
            // Draw obstacles
            obstacles.forEach(obs => {
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ff2d55';
                ctx.fillStyle = '#ff2d55';
                
                if (obs.type === 'rock') {
                    ctx.beginPath();
                    ctx.arc(obs.x, obs.y, 25, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(obs.x - 25, obs.y - 25, 50, 50);
                }
            });
            
            // Draw player car
            ctx.save();
            ctx.translate(player.x, player.y);
            ctx.rotate(player.angle);
            
            // Car glow
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#00f5ff';
            
            // Car body
            ctx.fillStyle = '#00f5ff';
            ctx.beginPath();
            ctx.moveTo(0, -35);
            ctx.lineTo(-20, 35);
            ctx.lineTo(0, 25);
            ctx.lineTo(20, 35);
            ctx.closePath();
            ctx.fill();
            
            // Car detail
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-10, -10, 20, 20);
            
            ctx.restore();
            
            // Draw particles
            particles.forEach(p => {
                ctx.shadowBlur = 5;
                ctx.shadowColor = p.color;
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life / 20;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            
            // Draw speed lines
            if (speed > 10) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 2;
                for (let i = 0; i < 10; i++) {
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + speed * 3);
                    ctx.stroke();
                }
            }
        }
    }
    
    function gameLoop() {
        update();
        draw();
        animationId = requestAnimationFrame(gameLoop);
    }
    
    function updateUI() {
        speedEl.textContent = Math.floor(speed * 20);
        distanceEl.textContent = Math.floor(distance);
        positionEl.textContent = position;
    }
    
    function startGame() {
        gameRunning = true;
        speed = 0;
        distance = 0;
        position = 1;
        obstacles = [];
        particles = [];
        player.x = canvas.width / 2;
        
        overlay.style.display = 'none';
        gameUI.style.display = 'flex';
        gameOverScreen.style.display = 'none';
        
        // Enable scroll prevention when game starts
        enableScrollPreventionRacing();
        
        gameLoop();
    }
    
    function gameOver() {
        gameRunning = false;
        cancelAnimationFrame(animationId);
        finalPositionEl.textContent = position;
        gameOverScreen.style.display = 'flex';
        
        // Disable scroll prevention when game ends
        disableScrollPreventionRacing();
    }
    
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', () => {
        gameOverScreen.style.display = 'none';
        startGame();
    });
    
    // Initial draw
    draw();
}

// Pricing Toggle
function initPricingToggle() {
    const toggle = document.getElementById('billingToggle');
    const prices = document.querySelectorAll('.price .amount');
    
    if (!toggle) return;
    
    toggle.addEventListener('change', function() {
        const isYearly = this.checked;
        
        prices.forEach(price => {
            const monthly = price.getAttribute('data-monthly');
            const yearly = price.getAttribute('data-yearly');
            
            // Animate price change
            price.style.opacity = '0';
            price.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                price.textContent = isYearly ? yearly : monthly;
                price.style.opacity = '1';
                price.style.transform = 'translateY(0)';
            }, 200);
        });
    });
}

// Auth Tabs
function initAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    const switchLinks = document.querySelectorAll('.switch-tab');
    
    function switchTab(target) {
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-tab') === target) {
                tab.classList.add('active');
            }
        });
        
        forms.forEach(form => {
            form.classList.remove('active');
            if (form.id === target + 'Form') {
                form.classList.add('active');
            }
        });
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.getAttribute('data-tab'));
        });
    });
    
    switchLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab(this.getAttribute('data-target'));
        });
    });
}

// Password Toggle
function initPasswordToggle() {
    const toggles = document.querySelectorAll('.toggle-password');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Password Strength
function initPasswordStrength() {
    const passwordInput = document.getElementById('signupPassword');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        
        const colors = ['#ff2d55', '#ff9500', '#fbbf24', '#10b981'];
        const texts = ['Weak', 'Fair', 'Good', 'Strong'];
        
        if (strengthFill) {
            strengthFill.style.width = (strength / 4 * 100) + '%';
            strengthFill.style.background = colors[strength - 1] || '#ff2d55';
        }
        
        if (strengthText) {
            strengthText.textContent = texts[strength - 1] || 'Password strength';
            strengthText.style.color = colors[strength - 1] || '#9ca3af';
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Tilt Effect for Cards
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Form Submissions
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('auth-form')) {
        e.preventDefault();
        
        // Show success message
        const btn = e.target.querySelector('.btn-auth');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i> Success!';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }
});

// Pricing button clicks
document.querySelectorAll('.btn-pricing').forEach(btn => {
    btn.addEventListener('click', function() {
        // Scroll to auth section
        document.getElementById('auth').scrollIntoView({ behavior: 'smooth' });
    });
});

// Play button clicks
document.querySelectorAll('.btn-play').forEach(btn => {
    btn.addEventListener('click', function() {
        // Show coming soon alert
        const card = this.closest('.game-card');
        const gameName = card.querySelector('h3').textContent;
        
        // Create custom alert
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(145deg, #1a2a4a, #0a0a0f);
            border: 1px solid #00f5ff;
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 0 50px rgba(0, 245, 255, 0.3);
        `;
        alert.innerHTML = `
            <i class="fas fa-gamepad" style="font-size: 3rem; color: #00f5ff; margin-bottom: 1rem;"></i>
            <h3 style="font-family: 'Orbitron', sans-serif; color: #fff; margin-bottom: 0.5rem;">${gameName}</h3>
            <p style="color: #9ca3af; margin-bottom: 1.5rem;">Coming Soon! Stay tuned for updates.</p>
            <button style="padding: 0.75rem 2rem; background: linear-gradient(135deg, #00f5ff, #8b5cf6); border: none; border-radius: 50px; color: #000; font-weight: 600; cursor: pointer;">Got it!</button>
        `;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9999;
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(alert);
        
        alert.querySelector('button').addEventListener('click', () => {
            alert.remove();
            overlay.remove();
        });
        
        overlay.addEventListener('click', () => {
            alert.remove();
            overlay.remove();
        });
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.shape, .hero-image');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add typing effect to hero subtitle
document.addEventListener('DOMContentLoaded', function() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 1000);
});

// Console easter egg
console.log('%c NEBULAX GAMING ', 'background: linear-gradient(135deg, #00f5ff, #8b5cf6); color: #000; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
console.log('%c Welcome to the next dimension of gaming! ', 'color: #00f5ff; font-size: 14px;');
console.log('%c Built with passion for gamers worldwide. ', 'color: #9ca3af; font-size: 12px;');
