const Footer = () => {
  return (
    <footer className="bg-accent/20 py-8">
      <div className="container mx-auto px-6 text-center text-text/50">
        <p>&copy; {new Date().getFullYear()} Echoji. All rights reserved.</p>
        <p className="text-sm mt-2">A space for reflection, not a replacement for professional help.</p>
      </div>
    </footer>
  );
};

export default Footer;
