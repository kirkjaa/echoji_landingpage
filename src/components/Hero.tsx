import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EchojiCloud from './EchojiCloud';
import ConfessionForm from './ConfessionForm';

const Hero = () => {
  const [submittedGlyph, setSubmittedGlyph] = useState(null);

  const handleRelease = (glyph) => {
    setSubmittedGlyph(glyph);
    setTimeout(() => setSubmittedGlyph(null), 4000); // Let the new glyph animate for a bit
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <EchojiCloud newGlyph={submittedGlyph} />
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-transparent"></div>

      <div className="relative z-10 text-center px-4 animate-fade-in">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-4"
        >
          Your Echo, Anonymously Beautiful
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-text/70 mb-10"
        >
          Release your thoughts into the cloud. Watch them transform into unreadable, expressive glyphs—a quiet ritual of release, transformed into art.
        </motion.p>
        <ConfessionForm onRelease={handleRelease} />
      </div>
    </section>
  );
};

export default Hero;
