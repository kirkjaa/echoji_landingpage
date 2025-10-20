import { motion } from 'framer-motion';

const EnsoLogo = () => (
  <motion.div
    className="relative"
    initial={{ scale: 1 }}
    animate={{
      scale: [1, 1.02, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
  >
    <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:rotate-[-15deg]">
      <circle cx="32" cy="32" r="18" stroke="#f5f4f5" strokeWidth="6" fill="none" className="opacity-70" />
      <path d="M52 32C52 43.0457 43.0457 52 32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C38.2931 12 43.9101 14.9435 47.5 19.5" stroke="#f5f4f5" strokeWidth="6" strokeLinecap="round" fill="none"/>
    </svg>
    
    {/* Ripple/echo effect circles */}
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1, opacity: 0.3 }}
      animate={{
        scale: [1, 1.6],
        opacity: [0.3, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeOut"
        }
      }}
    >
      <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="18" stroke="#f5f4f5" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
    
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1, opacity: 0.2 }}
      animate={{
        scale: [1, 1.6],
        opacity: [0.2, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeOut",
          delay: 1
        }
      }}
    >
      <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="18" stroke="#f5f4f5" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
    
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1, opacity: 0.1 }}
      animate={{
        scale: [1, 1.6],
        opacity: [0.1, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeOut",
          delay: 2
        }
      }}
    >
      <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="18" stroke="#f5f4f5" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
  </motion.div>
);

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <EnsoLogo />
          <span className="text-2xl tracking-wider font-medium">Echoji</span>
        </a>
        <nav>
          <a href="#philosophy" className="text-lg text-text/80 hover:text-text transition-colors duration-300">
            The Ritual
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
