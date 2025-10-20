import { motion } from 'framer-motion';
import { GalleryVertical, Gem, Users } from 'lucide-react';

const features = [
  {
    icon: GalleryVertical,
    title: 'Your Personal Glyph',
    description: 'Every confession generates a unique glyph. Download it, keep it as a personal sigil, a reminder of your moment of release.',
  },
  {
    icon: Gem,
    title: 'The Echoji Library',
    description: 'Registered users can collect their generated glyphs, creating a private gallery of their transformed thoughts and feelings over time.',
  },
  {
    icon: Users,
    title: 'The Collaborative Cloud',
    description: 'A future public space where all anonymous glyphs drift together, creating a vast, ever-changing installation of shared human experience.',
  },
];

const Features = () => {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-light mb-16"
        >
          A Universe of Echoes
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center p-8 border border-accent rounded-xl bg-accent/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeOut' }}
            >
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-accent/50 rounded-full border border-accent">
                <feature.icon className="w-8 h-8 text-text/80" />
              </div>
              <h3 className="text-2xl font-medium mb-2">{feature.title}</h3>
              <p className="text-text/60 max-w-xs">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
