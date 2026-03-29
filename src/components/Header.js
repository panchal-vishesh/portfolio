import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '../utils/scrollToSection';

const navItems = [
  { id: 'home', label: 'Home', gradient: 'from-gray-900 to-gray-600' },
  { id: 'about', label: 'About', gradient: 'from-gray-800 to-gray-500' },
  { id: 'skills', label: 'Skills', gradient: 'from-yellow-500 to-orange-500' },
  { id: 'projects', label: 'Projects', gradient: 'from-gray-800 to-gray-600' },
  { id: 'contact', label: 'Contact', gradient: 'from-red-500 to-rose-500' }
];

const Header = ({ darkMode, toggleDarkMode, isScrolled }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isProjectPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/projects/');
  const getHref = (id) => (isProjectPage ? `/#${id}` : `#${id}`);

  useEffect(() => {
    if (isProjectPage) {
      setActiveSection('');
      return undefined;
    }

    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProjectPage]);

  const handleNavClick = (event, sectionId) => {
    if (isProjectPage) {
      return;
    }

    event.preventDefault();
    scrollToSection(sectionId);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full pointer-events-none transition-all duration-300 z-50 ${
          isScrolled
            ? 'py-3 bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/30'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center gap-4">
          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-3 rounded-full border shadow-xl pointer-events-auto z-50 relative transition-all duration-300 ${
              isScrolled
                ? 'bg-white/95 dark:bg-black/90 border-gray-200/70 dark:border-white/15'
                : 'bg-white/90 dark:bg-black/85 border-gray-200/50 dark:border-white/10 backdrop-blur-2xl'
            }`}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                className="w-full h-0.5 bg-gray-900 dark:bg-white rounded-full"
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 9 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.5 bg-gray-900 dark:bg-white rounded-full"
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-full h-0.5 bg-gray-900 dark:bg-white rounded-full"
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -9 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <nav
            className={`hidden lg:flex items-center gap-1 rounded-full px-2 py-2 mx-auto pointer-events-auto transition-all duration-300 ${
              isScrolled
                ? 'bg-white/95 dark:bg-black/90 border border-gray-200/70 dark:border-white/15 shadow-2xl'
                : 'bg-white/90 dark:bg-black/85 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 shadow-xl'
            }`}
          >
            {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={getHref(item.id)}
              onClick={(event) => handleNavClick(event, item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative px-6 py-3 rounded-full font-semibold text-sm transition-all"
              whileTap={{ scale: 0.95 }}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black dark:from-white dark:via-gray-100 dark:to-white rounded-full shadow-2xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {hoveredItem === item.id && activeSection !== item.id && (
                <motion.div
                  key={`hover-\${hoveredItem}`}
                  className="absolute inset-0 bg-gray-50 dark:bg-white/5 rounded-full backdrop-blur-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${
                activeSection === item.id ? 'text-white dark:text-black' : 'text-gray-900 dark:text-gray-100'
              }`}>
                {item.label}
              </span>
            </motion.a>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              id="mobile-menu"
              className="absolute top-20 left-4 right-4 bg-white/95 dark:bg-black/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-gray-200/50 dark:border-white/10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={getHref(item.id)}
                  onClick={(event) => handleNavClick(event, item.id)}
                  className={`block px-6 py-4 rounded-2xl font-semibold text-lg mb-2 transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-200 text-white dark:text-black shadow-lg'
                      : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
