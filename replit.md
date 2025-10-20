# Echoji - Digital Contemplation Space

## Overview
Echoji is a landing page for a digital contemplation experience where users can release their thoughts and watch them transform into beautiful, unreadable glyphs. It's positioned as "ritual, not therapy" - focused on the act of release and artistic transformation.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom dark theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Docker with nginx proxy manager

## Project Structure
```
echoji-landing/
├── src/
│   ├── components/        # React components
│   │   ├── ConfessionForm.tsx    # User input form
│   │   ├── EchojiCloud.tsx       # Animated glyph cloud
│   │   ├── Header.tsx            # Site header
│   │   ├── Hero.tsx              # Main landing section
│   │   ├── HowItWorks.tsx        # Explanation section
│   │   ├── Philosophy.tsx        # About section
│   │   ├── Features.tsx          # Feature showcase
│   │   └── Footer.tsx            # Site footer
│   ├── lib/
│   │   └── glyphs.ts      # SVG path definitions for glyphs
│   ├── styles/
│   │   └── index.css      # Global styles
│   ├── App.tsx            # Root component
│   └── main.tsx           # App entry point
├── public/
│   └── favicon.svg
├── Dockerfile             # Production Docker build
├── docker-compose.yml     # Docker compose config
├── nginx-config-example.conf  # Nginx proxy manager example
└── vite.config.ts         # Vite configuration

```

## Development

### Local Development
```bash
npm install
npm run dev
```
The dev server runs on port 5000 with hot module replacement.

### Build for Production
```bash
npm run build
```

## Deployment to echoji.co

### Docker Deployment
```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

The app will be available on port 8888.

### Nginx Proxy Manager Setup
1. Create a new Proxy Host in Nginx Proxy Manager
2. Set Domain Names: `echoji.co`, `www.echoji.co`
3. Set Forward Hostname/IP: `localhost` (or your Docker container IP)
4. Set Forward Port: `8888`
5. Enable SSL with Let's Encrypt
6. See `nginx-config-example.conf` for advanced configuration options

## Key Features

### Vite Configuration
- **Allowed Hosts**: Configured to accept `echoji.co`, `www.echoji.co`, and all subdomains
- **Dev Server**: Runs on `0.0.0.0:5000` for Replit compatibility
- **Preview Server**: Runs on `0.0.0.0:8888` for production Docker deployment

### Animation System
- 30 initial floating glyphs across 3 depth layers (parallax effect)
- Infinite drift animations with random patterns
- Random "alignment" events where glyphs temporarily converge
- Glow effects with pulsing auras
- Smooth entrance transitions

### Design Theme
- Minimalist dark aesthetic (pure black background)
- Subtle purple glow accents
- Custom serif font (Crimson Pro)
- Japanese characters for spiritual aesthetic
- Responsive layout

## Recent Changes
- **2025-10-20**: Fixed deployment issues for echoji.co
  - Updated vite.config.ts to allow custom domains
  - Fixed TypeScript errors in ConfessionForm and EchojiCloud components
  - Optimized Dockerfile with multi-stage build
  - Updated docker-compose.yml for production
  - Added .dockerignore for faster builds
  - Created nginx configuration example

## Architecture Notes
- Frontend-only application (no backend currently)
- Glyph selection is random, not based on text content (symbolic transformation)
- No data persistence - all animations are client-side
- Future features mentioned: user auth, glyph library, public collaborative cloud

## User Preferences
- Deploy to custom domain: echoji.co and www.echoji.co
- Using own server with nginx proxy manager
- Docker-based deployment on port 8888
