import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Philosophy from './components/Philosophy';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Philosophy />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
