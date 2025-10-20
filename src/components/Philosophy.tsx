import { motion } from 'framer-motion';

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-20 sm:py-32 bg-accent/20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Art, Not Therapy. <br />
            Ritual, Not Advice.
          </h2>
          <div className="space-y-6 text-lg text-text/70">
            <p>
              Echoji is a digital temple, a space for contemplation. We believe in the power of release without the need for interpretation. Your secrets become unreadable, transformed into something beautiful and safe.
            </p>
            <p>
              Inspired by the meditative practice of East Asian calligraphy and the ephemeral nature of contemporary digital art, Echoji offers a new kind of ritual. It's a place to let go, to see your inner world reflected as an object of art, and to find peace in anonymity.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="relative h-80 md:h-96"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-text/5 rounded-full blur-3xl"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-9xl font-serif text-text/80 select-none">静</p>
            <p className="text-7xl font-serif text-text/60 select-none absolute -bottom-4 -right-4 translate-x-1/2">心</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
