# Architecture Documentation

## System Overview

Echoji is a single-page application (SPA) built with React and TypeScript. It runs entirely in the browser with no backend dependencies.

```
┌─────────────────────────────────────────┐
│           User's Browser                │
│  ┌───────────────────────────────────┐  │
│  │      React Application            │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │    App (Root)               │  │  │
│  │  │  ┌────────────────────────┐ │  │  │
│  │  │  │  Header               │ │  │  │
│  │  │  ├────────────────────────┤ │  │  │
│  │  │  │  Hero                 │ │  │  │
│  │  │  │   ├─ EchojiCloud      │ │  │  │
│  │  │  │   └─ ConfessionForm   │ │  │  │
│  │  │  ├────────────────────────┤ │  │  │
│  │  │  │  HowItWorks           │ │  │  │
│  │  │  ├────────────────────────┤ │  │  │
│  │  │  │  Philosophy           │ │  │  │
│  │  │  ├────────────────────────┤ │  │  │
│  │  │  │  Features             │ │  │  │
│  │  │  ├────────────────────────┤ │  │  │
│  │  │  │  Footer               │ │  │  │
│  │  │  └────────────────────────┘ │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Component Architecture

### Component Hierarchy

```
App
├── Header
│   └── EnsoLogo (inline component)
├── Hero
│   ├── EchojiCloud
│   │   └── FloatingGlyph (multiple instances)
│   └── ConfessionForm
├── HowItWorks
├── Philosophy
├── Features
└── Footer
```

### Data Flow

```
User Input → ConfessionForm → onRelease callback → Hero state → EchojiCloud prop
                                                                      ↓
                                                              New glyph added
                                                              to cloud state
```

**Flow Steps:**

1. User types text in `ConfessionForm`
2. User clicks "Release" button
3. `ConfessionForm` selects random glyph from `GLYPH_PATHS`
4. Calls `onRelease(glyph)` callback passed from `Hero`
5. `Hero` updates `submittedGlyph` state
6. State passed to `EchojiCloud` as `newGlyph` prop
7. `EchojiCloud` adds glyph to its internal `glyphs` array
8. New glyph animates into view
9. After 4 seconds, `Hero` clears `submittedGlyph` state

## State Management

### Component-Level State

No global state management (Redux, Zustand, etc.) is needed. All state is local to components:

**Hero Component:**
```typescript
const [submittedGlyph, setSubmittedGlyph] = useState<string | null>(null);
```
- Holds the most recently submitted glyph
- Cleared after 4 seconds
- Passed to EchojiCloud

**ConfessionForm Component:**
```typescript
const [text, setText] = useState('');
const [isReleased, setIsReleased] = useState(false);
```
- `text`: User's input
- `isReleased`: Controls success message animation

**EchojiCloud Component:**
```typescript
const [glyphs, setGlyphs] = useState(initialGlyphs);
const [alignmentActive, setAlignmentActive] = useState(false);
const [alignmentTarget, setAlignmentTarget] = useState({ x: 50, y: 50 });
```
- `glyphs`: Array of all floating glyphs
- `alignmentActive`: Whether alignment event is happening
- `alignmentTarget`: Target coordinates for alignment

## Animation Architecture

### Framer Motion Integration

```
motion.div (FloatingGlyph)
├── variants: { initial, animate, drift }
├── whileHover: { scale, filter }
└── children
    ├── motion.div (Aura)
    │   └── variants: { initial, animate }
    └── motion.svg (Glyph)
        └── variants: { initial, animate }
```

### Animation Layers

**Layer 0 (Background):**
- z-index: 0
- 15 glyphs
- Scale: 0.2 - 0.4
- Opacity: 0.1 - 0.3
- Speed factor: 1.0 (slowest)

**Layer 1 (Middle):**
- z-index: 10
- 10 glyphs
- Scale: 0.3 - 0.6
- Opacity: 0.2 - 0.5
- Speed factor: 0.7

**Layer 2 (Foreground):**
- z-index: 20
- 5 glyphs (initial) + user submissions
- Scale: 0.4 - 0.8
- Opacity: 0.3 - 0.7
- Speed factor: 0.4 (fastest)

### Animation Timing

```
Entrance:    2 seconds (scale 0 → final, fade in)
Drift:       30-70 seconds per cycle (infinite mirror)
Alignment:   Every 15 seconds (10% chance), lasts 3 seconds
Glow:        4 seconds per pulse (infinite)
Aura:        8 seconds per pulse (infinite)
```

## Performance Optimizations

### React Optimizations

1. **useMemo for Initial Glyphs:**
   ```typescript
   const initialGlyphs = useMemo(() => {
     // Generate 30 glyphs
   }, []);
   ```
   Prevents re-generation on every render

2. **Functional State Updates:**
   ```typescript
   setGlyphs(prev => [...prev, newGlyphData]);
   ```
   Ensures correct state when async updates occur

### CSS Optimizations

1. **willChange Hints:**
   ```typescript
   style={{ willChange: 'transform, opacity' }}
   ```
   Tells browser to optimize for these properties

2. **Transform over Position:**
   - Uses `transform: translate()` instead of `top/left`
   - GPU-accelerated, smoother animations

3. **Requestanimationframe:**
   - Framer Motion handles this internally
   - Syncs with browser paint cycle

### Bundle Optimization

**Vite handles:**
- Code splitting
- Tree shaking
- Minification
- CSS extraction

**Final bundle (~200KB gzipped):**
- React + React-DOM: ~130KB
- Framer Motion: ~50KB
- Application code: ~20KB

## Build Process

```
Source Files (.tsx, .ts, .css)
         ↓
    TypeScript Compiler (tsc)
         ↓
    Type checking & compilation
         ↓
    Vite Bundler
         ↓
    ├── Tree shaking
    ├── Minification
    ├── Code splitting
    └── CSS extraction
         ↓
    dist/ folder
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js
    │   ├── index-[hash].css
    │   └── [other assets]
    └── favicon.svg
```

## Deployment Architecture

```
┌─────────────────────────────────────────────┐
│              Internet                        │
└───────────────┬─────────────────────────────┘
                │ HTTPS (443)
                ↓
┌─────────────────────────────────────────────┐
│      Nginx Proxy Manager                    │
│  ┌───────────────────────────────────────┐  │
│  │  SSL Termination (Let's Encrypt)      │  │
│  │  echoji.co → localhost:8888           │  │
│  └───────────────────────────────────────┘  │
└───────────────┬─────────────────────────────┘
                │ HTTP (8888)
                ↓
┌─────────────────────────────────────────────┐
│      Docker Container (echoji)              │
│  ┌───────────────────────────────────────┐  │
│  │  Vite Preview Server                  │  │
│  │  Serving /app/dist/*                  │  │
│  │  Port: 8888                           │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Request Flow

```
User Browser
     ↓ HTTPS request (echoji.co)
Nginx Proxy Manager
     ↓ Proxy to localhost:8888
Vite Preview Server
     ↓ Serve static files from dist/
Browser receives:
     ├── index.html
     ├── JavaScript bundle
     ├── CSS bundle
     └── favicon.svg
Browser renders React app
```

## Security Architecture

### Client-Side Security

1. **No Data Storage:**
   - User input never leaves browser memory
   - Cleared immediately after glyph generation
   - No localStorage, sessionStorage, or cookies

2. **XSS Prevention:**
   - React escapes all dynamic content by default
   - No `dangerouslySetInnerHTML` usage
   - SVG paths are hardcoded, not user-generated

3. **Content Security Policy:**
   ```http
   X-Frame-Options: SAMEORIGIN
   X-Content-Type-Options: nosniff
   X-XSS-Protection: 1; mode=block
   ```

### Server-Side Security

1. **HTTPS Only:**
   - Force SSL enabled in Nginx
   - HSTS headers
   - Let's Encrypt SSL certificate

2. **Nginx Security:**
   - Block common exploits enabled
   - Rate limiting (if configured)
   - Request size limits

## Scalability Considerations

### Current Architecture

**Pros:**
- Static files = infinite horizontal scaling
- CDN-ready
- No backend = no database bottleneck
- Zero cost scaling (static hosting)

**Cons:**
- No data persistence
- No user accounts (yet)
- Limited to client-side features

### Future Scaling Path

```
Current: Static SPA
    ↓
Add backend API (Node.js/Express)
    ├── User authentication
    ├── Glyph library storage
    └── Public cloud aggregation
    ↓
Add database (PostgreSQL)
    ├── User accounts
    ├── Saved glyphs
    └── Cloud state
    ↓
Add caching layer (Redis)
    ├── Session management
    ├── API response caching
    └── Real-time features
    ↓
Microservices architecture (if needed)
    ├── Auth service
    ├── Glyph service
    └── Cloud aggregation service
```

## Technology Decisions

### Why React?

- Component reusability
- Large ecosystem
- Virtual DOM for efficient updates
- Great TypeScript support

### Why Framer Motion?

- Declarative animations
- Spring physics
- Gesture support
- Small bundle size (~50KB)

### Why Tailwind CSS?

- Utility-first = fast development
- Purges unused CSS
- Customizable theme
- No CSS-in-JS runtime cost

### Why Vite?

- Fastest dev server
- Excellent TypeScript support
- Smaller production bundles
- Modern ESM-based

### Why Docker?

- Consistent environment
- Easy deployment
- Portable across servers
- Isolation and security

## Monitoring & Observability

### Current State

No monitoring infrastructure yet (static site doesn't need much).

### Recommended Future Additions

1. **Error Tracking:**
   - Sentry for client-side errors
   - Track animation performance issues

2. **Analytics:**
   - Privacy-respecting analytics (Plausible/Fathom)
   - Track glyph releases (anonymously)
   - Monitor user engagement

3. **Performance Monitoring:**
   - Web Vitals tracking
   - Animation frame drops
   - Bundle size monitoring

4. **Server Monitoring:**
   - Uptime monitoring (UptimeRobot)
   - SSL certificate expiry alerts
   - Docker container health checks
