# NebulaX Gaming

![NebulaX Gaming](https://img.shields.io/badge/NebulaX-Gaming-00f5ff?style=for-the-badge&logo=gamepad)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

A stunning, feature-rich gaming website with a dark theme and immersive interactive experiences.

## Live Demo

Visit the live site: [NebulaX Gaming](https://yourusername.github.io/nebulax-gaming)

## Features

### 7 Unique Screens

1. **Landing Page** - Eye-catching hero section with glitch effects, animated statistics, and floating shapes
2. **About Us** - Company story with hexagonal animations, team profiles, and milestone statistics
3. **Games** - 15 interactive game cards with flip animations, categorized into:
   - Spaceship Games (5)
   - Racing Games (5)
   - Mind Games (5)
4. **Free Experience** - Playable space shooter demo with canvas-based game engine
5. **Try First** - Interactive neon racing demo with keyboard controls
6. **Subscription Plans** - Three-tier pricing (Starter, Pro, Ultimate) with monthly/yearly toggle
7. **Sign In/Up** - Comprehensive authentication forms with social login options

### Design Highlights

- **Dark Theme**: Black, Navy Blue base with Aqua, Red, Orange accents
- **Animations**: Glitch effects, particle backgrounds, scroll reveals, tilt effects
- **Interactive Games**: Two fully playable HTML5 Canvas games
- **Responsive**: Fully responsive design for all devices
- **Modern UI**: Glassmorphism, gradients, and glow effects

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, flexbox/grid
- **JavaScript** - Vanilla JS, Canvas API
- **Bootstrap 5** - Grid system and components
- **Font Awesome** - Icons
- **Google Fonts** - Orbitron & Rajdhani

## Games Included

### Spaceship Games
- Star Voyager
- Asteroid Hunter
- Galaxy Defender
- Orbital Command
- Cosmic Explorer

### Racing Games
- Neon Racer
- Velocity X
- Off-Road Fury
- Formula Prime
- Hydro Thunder

### Mind Games
- Quantum Chess
- Neural Link
- Mind Maze
- Logic Gates
- Code Breaker

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local server (optional, for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nebulax-gaming.git
```

2. Navigate to the project directory:
```bash
cd nebulax-gaming
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

4. Visit `http://localhost:8000` in your browser

## Project Structure

```
nebulax-gaming/
├── index.html          # Main HTML file
├── styles.css          # Custom styles and animations
├── script.js           # JavaScript functionality and games
├── README.md           # Project documentation
└── assets/             # Images and media (optional)
```

## Game Controls

### Space Shooter (Free Experience)
- **Arrow Keys** - Move spaceship
- **Spacebar** - Shoot
- Avoid enemies and survive as long as possible!

### Neon Racer (Try First)
- **Left/Right Arrows** - Steer
- **Up Arrow** - Accelerate
- Avoid obstacles and reach the finish line!

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --color-black: #0a0a0f;
    --color-aqua: #00f5ff;
    --color-purple: #8b5cf6;
    --color-red: #ff2d55;
    --color-orange: #ff9500;
}
```

### Games
Add new games by duplicating game card structure in `index.html`:
```html
<div class="game-card" data-category="category">
    <div class="game-card-inner">
        <!-- Game content -->
    </div>
</div>
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance

- Optimized animations using CSS transforms
- Efficient particle systems
- Lazy loading for game assets
- Minimal external dependencies

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Fonts by [Google Fonts](https://fonts.google.com)
- Icons by [Font Awesome](https://fontawesome.com)
- Framework by [Bootstrap](https://getbootstrap.com)

## Contact

- Website: [nebulaxgaming.com](https://nebulaxgaming.com)
- Twitter: [@NebulaXGaming](https://twitter.com/NebulaXGaming)
- Discord: [Join our server](https://discord.gg/nebulax)

---

Built with passion for gamers worldwide. Enter the next dimension of gaming!

![NebulaX Logo](https://via.placeholder.com/200x50/0a0a0f/00f5ff?text=NEBULAX)
