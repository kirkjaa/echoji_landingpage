import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { GLYPH_PATHS } from '../lib/glyphs';

const getRandomGlyph = () => GLYPH_PATHS[Math.floor(Math.random() * GLYPH_PATHS.length)];

const generateInitialGlyphs = (count: number, layer: number = 0) => {
  // Different parameters for different layers to create parallax effect
  const layerParams = [
    { scaleRange: [0.2, 0.4], opacityRange: [0.1, 0.3], speedFactor: 1.0 },     // Background layer
    { scaleRange: [0.3, 0.6], opacityRange: [0.2, 0.5], speedFactor: 0.7 },   // Middle layer
    { scaleRange: [0.4, 0.8], opacityRange: [0.3, 0.7], speedFactor: 0.4 }    // Foreground layer
  ];
  
  const params = layerParams[layer] || layerParams[0];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `initial-${layer}-${i}`,
    path: getRandomGlyph(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * (params.scaleRange[1] - params.scaleRange[0]) + params.scaleRange[0],
    opacity: Math.random() * (params.opacityRange[1] - params.opacityRange[0]) + params.opacityRange[0],
    duration: Math.random() * 40 + 30,
    rotate: Math.random() * 360,
    layer,
    speedFactor: params.speedFactor
  }));
};

interface GlyphData {
  id: string;
  path: string;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  duration: number;
  rotate: number;
  layer: number;
  speedFactor: number;
}

const FloatingGlyph = ({ glyph }: { glyph: GlyphData }) => {
  const { id, path, x, y, scale, opacity, duration, rotate, layer, speedFactor } = glyph;

  // Different colors for different layers to create depth
  const layerColors = [
    "text-text/30",     // Background layer - more transparent
    "text-text/50",     // Middle layer
    "text-text/70"      // Foreground layer - most opaque
  ];
  
  const layerZ = [
    "z-0",     // Background layer
    "z-10",    // Middle layer
    "z-20"     // Foreground layer
  ];

  const variants = {
    initial: {
      x: `${x}vw`,
      y: `${y}vh`,
      scale: 0,
      opacity: 0,
      rotate: rotate - 20,
    },
    animate: {
      x: `${x}vw`,
      y: `${y}vh`,
      scale,
      opacity,
      rotate,
      transition: {
        duration: 2,
        ease: 'easeOut'
      }
    },
    drift: {
      x: [`${x}vw`, `${x + (Math.random() - 0.5) * 10 * speedFactor}vw`, `${x}vw`],
      y: [`${y}vh`, `${y + (Math.random() - 0.5) * 15 * speedFactor}vh`, `${y}vh`],
      rotate: [rotate, rotate + (Math.random() - 0.5) * 40 * speedFactor, rotate],
      transition: {
        duration,
        repeat: Infinity,
        repeatType: 'mirror' as const,
        ease: 'easeInOut',
      },
    },
  };

  // Glow effect variants
  const glowVariants = {
    initial: { filter: 'drop-shadow(0 0 0px #f5f4f5)' },
    animate: {
      filter: [
        'drop-shadow(0 0 0px #f5f4f5)',
        'drop-shadow(0 0 5px #f5f4f5)',
        'drop-shadow(0 0 0px #f5f4f5)'
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
        delay: Math.random() * 2
      }
    }
  };

  // Aura effect for spiritual glow
  const auraVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 0.3, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 3
      }
    }
  };

  return (
    <motion.div
      key={id}
      className={`absolute ${layerZ[layer] || layerZ[0]}`}
      style={{ willChange: 'transform, opacity' }}
      variants={variants}
      initial="initial"
      animate={["animate", "drift"]}
    >
      {/* Aura effect - subtle glow around the glyph */}
      <motion.div
        className="absolute inset-0 rounded-full"
        variants={auraVariants}
        initial="initial"
        animate="animate"
        style={{
          background: 'radial-gradient(circle, rgba(158, 127, 255, 0.3) 0%, transparent 70%)',
          mixBlendMode: 'screen',
          width: '150px',
          height: '150px',
          marginLeft: '-25px',
          marginTop: '-25px'
        }}
      />
      
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={layerColors[layer] || layerColors[0]}
        whileHover={{
          scale: 1.2,
          filter: 'drop-shadow(0 0 15px #f5f4f5)'
        }}
        variants={glowVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3 }}
      >
        <path d={path} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </motion.div>
  );
};

interface EchojiCloudProps {
  newGlyph: string | null;
}

const EchojiCloud = ({ newGlyph }: EchojiCloudProps) => {
  // Generate glyphs for multiple layers
  const initialGlyphs = useMemo(() => {
    const backgroundLayer = generateInitialGlyphs(15, 0);  // Background layer
    const middleLayer = generateInitialGlyphs(10, 1);      // Middle layer
    const foregroundLayer = generateInitialGlyphs(5, 2);   // Foreground layer
    return [...backgroundLayer, ...middleLayer, ...foregroundLayer];
  }, []);

  const [glyphs, setGlyphs] = useState(initialGlyphs);
  const [alignmentActive, setAlignmentActive] = useState(false);
  const [alignmentTarget, setAlignmentTarget] = useState({ x: 50, y: 50 });

  // Occasional shape alignment effect
  useEffect(() => {
    const alignmentInterval = setInterval(() => {
      // 10% chance to trigger alignment
      if (Math.random() < 0.1) {
        setAlignmentActive(true);
        // Set a random target point for alignment
        setAlignmentTarget({
          x: Math.random() * 80 + 10, // Keep within 10-90% to avoid edges
          y: Math.random() * 80 + 10
        });
        
        // Reset alignment after 3 seconds
        setTimeout(() => {
          setAlignmentActive(false);
        }, 3000);
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(alignmentInterval);
  }, []);

  useEffect(() => {
    if (newGlyph) {
      const newGlyphData = {
        id: `user-${Date.now()}`,
        path: newGlyph,
        x: 50,
        y: 50,
        scale: 0.8,
        opacity: 0.7,
        duration: Math.random() * 30 + 25,
        rotate: Math.random() * 360,
        layer: 2, // Foreground layer for user glyphs
        speedFactor: 0.4
      };
      setGlyphs(prev => [...prev, newGlyphData]);

      // Remove the oldest glyph if the cloud gets too crowded
      if (glyphs.length > 35) {
        setTimeout(() => {
          setGlyphs(prev => prev.slice(1));
        }, 2000);
      }
    }
  }, [newGlyph]);

  return (
    <div className="absolute inset-0 z-0">
      {/* Background gradient for the spiritual glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-glow-start to-glow-end"></div>
      
      {/* Render all glyphs with occasional alignment */}
      {glyphs.map((glyph) => (
        <FloatingGlyph
          key={glyph.id}
          glyph={{
            ...glyph,
            // If alignment is active, gradually move glyphs toward the target point
            x: alignmentActive ? alignmentTarget.x : glyph.x,
            y: alignmentActive ? alignmentTarget.y : glyph.y
          }}
        />
      ))}
    </div>
  );
};

export default EchojiCloud;
