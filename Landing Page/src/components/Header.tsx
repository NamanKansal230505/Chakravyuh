import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Use Cases', href: '#use-cases' },
  { name: 'Specifications', href: '#specs' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <Shield className={`w-8 h-8 ${scrolled ? 'text-primary-600' : 'text-white'}`} />
          <span className={`text-xl font-bold font-heading ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            Chakravyuh
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`font-medium transition-colors hover:text-accent-500 ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Button - Desktop */}
        <a
          href="https://chakravyuh-army.lovable.app/"
          className="hidden md:inline-flex btn btn-accent"
        >
          Admin Login
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-20"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
          )}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-10 bg-primary-800 bg-opacity-95"
          >
            <div className="flex flex-col h-full justify-center items-center">
              <ul className="flex flex-col space-y-6 text-center">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white text-2xl font-medium hover:text-accent-400"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li className="pt-6">
                  <a
                    href="#contact"
                    className="btn btn-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    Request Demo
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;