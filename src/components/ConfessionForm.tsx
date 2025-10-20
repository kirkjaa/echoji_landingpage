import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GLYPH_PATHS } from '../lib/glyphs';

const ConfessionForm = ({ onRelease }) => {
  const [text, setText] = useState('');
  const [isReleased, setIsReleased] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;

    const randomGlyph = GLYPH_PATHS[Math.floor(Math.random() * GLYPH_PATHS.length)];
    onRelease(randomGlyph);
    
    setIsReleased(true);
    setText('');

    setTimeout(() => {
      setIsReleased(false);
    }, 2500);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <AnimatePresence>
        {!isReleased ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="relative"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Let go of a thought..."
              className="w-full h-24 p-4 pr-32 bg-accent/30 border border-accent rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-text/50 transition-all duration-300 placeholder:text-text/40"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2 bg-text text-background rounded-md font-semibold hover:bg-text/80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={text.trim() === ''}
            >
              Release
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-center h-24 flex items-center justify-center"
          >
            <p className="text-lg text-text/80">It is transformed.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfessionForm;
