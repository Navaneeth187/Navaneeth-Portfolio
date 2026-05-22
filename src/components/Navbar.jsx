import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass py-3'
          : 'bg-transparent py-5'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl font-bold text-textMain tracking-tight group flex items-center gap-1"
          aria-label="Navaneeth Babu - Return to Homepage"
        >
          <span className="font-mono text-primary">&lt;</span>
          Navaneeth<span className="text-primary group-hover:animate-pulse">_</span>
          <span className="font-mono text-primary">/&gt;</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              aria-label={`Navigate to ${link.name}`}
              className={({ isActive }) =>
                `text-sm font-medium transition-all hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-4 focus:ring-offset-background rounded-sm ${
                  isActive ? 'text-primary' : 'text-textMuted'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Resume Button (Desktop) */}
        <div className="hidden md:block group relative">
          <a
            href="/Navaneeth_Babu_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Navaneeth_Babu_Resume.pdf"
            className="px-5 py-2 text-sm font-semibold border border-cardBorder bg-cardBg text-textMain rounded-full hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 flex items-center gap-2"
            aria-label="Download Resume PDF"
            title="Download Resume"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-textMain p-2 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-background border-b border-cardBorder shadow-xl overflow-hidden"
          >
            <nav className="px-4 py-6 flex flex-col space-y-4" role="navigation" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                      isActive ? 'text-primary bg-cardBg border border-cardBorder' : 'text-textMuted hover:text-textMain'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-cardBorder mt-4">
                <a
                  href="/Navaneeth_Babu_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Navaneeth_Babu_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full text-center px-5 py-3 text-base font-semibold border border-primary bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-background transition-all"
                  aria-label="Download Resume PDF"
                >
                  Download Resume
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
