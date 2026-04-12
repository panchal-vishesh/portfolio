import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '../utils/scrollToSection';
import ThemeToggle from './ThemeToggle';

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
  const brandHref = isProjectPage ? '/' : '#home';

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

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  const handleNavClick = (event, sectionId) => {
    setMenuOpen(false);

    if (isProjectPage) {
      return;
    }

    event.preventDefault();
    scrollToSection(sectionId);
  };

  const handleBrandClick = (event) => {
    setMenuOpen(false);

    if (isProjectPage) {
      return;
    }

    event.preventDefault();
    scrollToSection('home');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full pointer-events-none transition-all duration-300 z-50 ${
          isScrolled
            ? 'bg-white/80 py-3 shadow-lg shadow-black/5 backdrop-blur-xl dark:bg-black/80 dark:shadow-black/30'
            : 'bg-transparent py-3 sm:py-4'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`relative z-50 rounded-full border p-3 shadow-xl pointer-events-auto transition-all duration-300 lg:hidden ${
                isScrolled
                  ? 'border-gray-200/70 bg-white/95 dark:border-white/15 dark:bg-black/90'
                  : 'border-gray-200/50 bg-white/90 backdrop-blur-2xl dark:border-white/10 dark:bg-black/85'
              }`}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <div className="flex h-5 w-6 flex-col justify-between">
                <motion.span
                  className="h-0.5 w-full rounded-full bg-gray-900 dark:bg-white"
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 9 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="h-0.5 w-full rounded-full bg-gray-900 dark:bg-white"
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="h-0.5 w-full rounded-full bg-gray-900 dark:bg-white"
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -9 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>

            <motion.a
              href={brandHref}
              onClick={handleBrandClick}
              className={`pointer-events-auto inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                isScrolled
                  ? 'border-gray-200/70 bg-white/95 text-gray-900 shadow-xl dark:border-white/15 dark:bg-black/90 dark:text-white'
                  : 'border-gray-200/50 bg-white/90 text-gray-900 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-black/85 dark:text-white'
              }`}
            >
              <img
                src="https://res.cloudinary.com/dhyc478ch/image/upload/v1765255874/Untitled_design1_wwwx1q.svg"
                alt="Vishesh Panchal"
                className="h-8 w-8 rounded-full object-cover"
                draggable={false}
              />
              <span className="hidden xs:inline">Vishesh</span>
              <span className="hidden sm:inline text-gray-500 dark:text-gray-400">Portfolio</span>
            </motion.a>
          </div>

          <nav
            className={`pointer-events-auto mx-auto hidden items-center gap-1 rounded-full px-2 py-2 transition-all duration-300 lg:flex ${
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

          <div className="pointer-events-auto shrink-0">
            <ThemeToggle
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              className={isScrolled ? 'dark:border-white/15 dark:bg-black/90' : 'dark:border-white/10 dark:bg-black/85'}
            />
          </div>
        </div>
      </header>

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
              className="absolute left-4 right-4 top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl border border-gray-200/50 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/95 sm:left-6 sm:right-6 sm:p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400 dark:text-gray-500">
                    Navigation
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                    Jump between sections
                  </p>
                </div>
                <span className="rounded-full border border-gray-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500 dark:border-white/10 dark:text-gray-400">
                  Mobile
                </span>
              </div>
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={getHref(item.id)}
                  onClick={(event) => handleNavClick(event, item.id)}
                  className={`mb-2 block rounded-2xl px-5 py-4 text-base font-semibold transition-all sm:text-lg ${
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
