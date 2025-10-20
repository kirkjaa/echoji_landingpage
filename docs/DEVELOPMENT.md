# Development Guide

This guide covers setting up a local development environment for Echoji.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- VS Code (recommended) or your preferred editor

### Initial Setup

```bash
# Navigate to project directory
cd echoji-landing

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5000`

## Project Structure

```
echoji-landing/
├── src/
│   ├── components/       # React components
│   ├── lib/             # Utility functions and data
│   ├── styles/          # Global styles
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── docs/                # Documentation
└── [config files]       # Various config files
```

## Key Technologies

### React + TypeScript

All components are written in TypeScript with strict type checking:

```typescript
interface ComponentProps {
  onAction: (value: string) => void;
  isActive: boolean;
}

const MyComponent = ({ onAction, isActive }: ComponentProps) => {
  // Component logic
};
```

### Framer Motion

Used for all animations. Key patterns:

```typescript
// Basic animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Gesture animations
<motion.div
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive element
</motion.div>
```

### Tailwind CSS

Using custom theme defined in `tailwind.config.js`:

```javascript
// Custom colors
bg-background    // #000000
text-text        // #f5f4f5
border-accent    // #292828

// Custom animations
animate-fade-in
animate-fade-in-slow
```

## Component Architecture

### ConfessionForm

Handles user input and submission:

```typescript
interface ConfessionFormProps {
  onRelease: (glyph: string) => void;
}
```

**Key Features:**
- Controlled textarea input
- Random glyph selection on submit
- Success animation with AnimatePresence
- Auto-clear after submission

### EchojiCloud

The main animation component:

```typescript
interface EchojiCloudProps {
  newGlyph: string | null;
}
```

**Key Features:**
- 3-layer parallax system (background, middle, foreground)
- 30 initial glyphs with varied sizes and speeds
- Random alignment events every 15 seconds
- Infinite drift animations
- Glow and aura effects

**Performance Considerations:**
- Uses `useMemo` to prevent re-generating initial glyphs
- CSS `willChange` for smooth transforms
- Limits total glyphs to 35 (removes oldest)

### Hero

Main landing section that connects ConfessionForm and EchojiCloud:

```typescript
const Hero = () => {
  const [submittedGlyph, setSubmittedGlyph] = useState<string | null>(null);

  const handleRelease = (glyph: string) => {
    setSubmittedGlyph(glyph);
    setTimeout(() => setSubmittedGlyph(null), 4000);
  };

  return (
    <section>
      <EchojiCloud newGlyph={submittedGlyph} />
      <ConfessionForm onRelease={handleRelease} />
    </section>
  );
};
```

## Glyph System

### SVG Path Data

Glyphs are defined as SVG path strings in `src/lib/glyphs.ts`:

```typescript
export const GLYPH_PATHS: string[] = [
  "M20 80 C40 20, 60 20, 80 80",
  "M50 20 V80 M20 50 H80",
  // ... 13 more unique paths
];
```

**Design Principles:**
- Abstract calligraphic strokes
- Evocative but not legible
- Designed for 100x100 viewBox
- Stroke-based (not filled)

### Adding New Glyphs

1. Create SVG path using tool like Figma or Illustrator
2. Normalize to 100x100 coordinate system
3. Add to `GLYPH_PATHS` array
4. Test in cloud animation

## Styling Guidelines

### Color Palette

```css
--background: #000000;     /* Pure black */
--text: #f5f4f5;          /* Off-white */
--accent: #292828;        /* Dark gray */
--glow-purple: rgba(158, 127, 255, 0.1);
```

### Typography

- **Primary Font**: Crimson Pro (serif)
- **Headings**: font-light, tracking-tighter
- **Body**: text-lg, text-text/70

### Spacing

Follow Tailwind's spacing scale:
- Small gaps: 4, 6, 8
- Medium gaps: 10, 12, 16
- Large gaps: 20, 24, 32

## Development Workflow

### Making Changes

1. **Make your changes** in the codebase

2. **Test locally:**
   ```bash
   npm run dev
   ```

3. **Check for TypeScript errors:**
   ```bash
   npm run build
   ```

4. **Lint code:**
   ```bash
   npm run lint
   ```

### Code Style

- Use TypeScript strict mode
- Define interfaces for all props
- Use functional components with hooks
- Prefer `const` over `let`
- Use meaningful variable names
- Add comments for complex logic

### File Naming

- Components: PascalCase (e.g., `ConfessionForm.tsx`)
- Utilities: camelCase (e.g., `glyphs.ts`)
- Styles: kebab-case (e.g., `index.css`)

## Testing Locally

### Development Server

```bash
npm run dev
```

Access at `http://localhost:5000`

Features:
- Hot Module Replacement (HMR)
- Fast Refresh for React
- Instant error overlay

### Production Preview

```bash
npm run build
npm run preview
```

Access at `http://localhost:8888`

Tests the actual production build.

### Docker Testing

```bash
docker-compose up --build
```

Access at `http://localhost:8888`

Tests the full production Docker setup.

## Common Tasks

### Add a New Component

1. Create file in `src/components/`:
   ```typescript
   // NewComponent.tsx
   interface NewComponentProps {
     title: string;
   }

   const NewComponent = ({ title }: NewComponentProps) => {
     return <div>{title}</div>;
   };

   export default NewComponent;
   ```

2. Import and use:
   ```typescript
   import NewComponent from './components/NewComponent';
   ```

### Update Animation

Modify component with Framer Motion:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  Content
</motion.div>
```

### Add Tailwind Classes

Use Tailwind utilities directly:

```typescript
<div className="bg-background text-text p-4 rounded-lg">
  Content
</div>
```

For custom values, extend `tailwind.config.js`.

## Debugging

### React DevTools

Install React DevTools browser extension for component inspection.

### Vite Debug Mode

```bash
DEBUG=vite:* npm run dev
```

### TypeScript Errors

Check full error output:

```bash
npx tsc --noEmit
```

### Animation Performance

Use browser DevTools:
1. Open Performance tab
2. Record interaction
3. Look for dropped frames
4. Optimize animations with `will-change` CSS property

## Environment Variables

Currently not using env vars, but if needed:

1. Create `.env` file:
   ```
   VITE_API_URL=https://api.example.com
   ```

2. Access in code:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

3. Add to `.gitignore`

## Build Optimization

### Analyze Bundle

```bash
npm run build
```

Check `dist/` folder size and contents.

### Code Splitting

Vite automatically splits code. For manual splitting:

```typescript
const LazyComponent = lazy(() => import('./LazyComponent'));
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Framer Motion API](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
