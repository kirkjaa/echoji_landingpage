import { motion } from 'framer-motion';
import { PenLine, Sparkles, Cloud } from 'lucide-react';

const steps = [
  {
    icon: PenLine,
    title: 'Confess',
    description: 'Write down a thought, a secret, or a feeling. The space is yours, free of judgment.',
  },
  {
    icon: Sparkles,
    title: 'Transform',
    description: 'Release your words. Watch as they dissolve and reform into a unique, unreadable glyph.',
  },
  {
    icon: Cloud,
    title: 'Release',
    description: 'Your personal glyph joins the collective cloud, an anonymous echo in a shared, silent space.',
  },
];

const HowItWorks = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  };

  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-light mb-4"
        >
          The Ritual of Release
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg text-text/70 mb-16"
        >
          A simple, three-step process to turn introspection into art.
        </motion.p>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div key={index} className="flex flex-col items-center" variants={itemVariants}>
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-accent/50 rounded-full border border-accent">
                <step.icon className="w-8 h-8 text-text/80" />
              </div>
              <h3 className="text-2xl font-medium mb-2">{step.title}</h3>
              <p className="text-text/60 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
