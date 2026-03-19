import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useResponsive } from './ResponsiveWrapper';
import { scrollToSection } from '../utils/scrollToSection';

// Advanced particle system
const ParticleField = ({ count = 50 }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10
    })), [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary-400/20 dark:bg-gray-800/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, 20],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

// Advanced typewriter with multiple effects
const TypewriterText = ({ texts, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const typingSpeed = isDeleting ? 50 : 120;
    
    const timer = setTimeout(() => {
      if (!isDeleting && indexRef.current < currentText.length) {
        setDisplayText(currentText.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else if (isDeleting && indexRef.current > 0) {
        setDisplayText(currentText.slice(0, indexRef.current - 1));
        indexRef.current--;
      } else if (!isDeleting && indexRef.current === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && indexRef.current === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting, texts]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        className="ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        |
      </motion.span>
    </span>
  );
};

const Hero = () => {
  const responsive = useResponsive();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const texts = [
    'Full Stack Developer',
    'React Specialist', 
    'AI Enthusiast',
    'Problem Solver',
    'Innovation Driver'
  ];

  // Dynamic background based on device capabilities
  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="home" 
      aria-labelledby="hero-title"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24 lg:pt-32" 
      itemScope 
      itemType="https://schema.org/Person"
    >
      {/* Advanced layered background system */}
      <motion.div 
        className="absolute inset-0 bg-white dark:bg-black"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      />
      
      {/* Particle field for desktop */}
      {!responsive.isMobile && !responsive.prefersReducedMotion && (
        <ParticleField count={responsive.isDesktop ? 60 : 30} />
      )}

      <motion.div
        className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Enhanced Profile Image with advanced effects */}
        <motion.div 
          className="relative flex justify-center mb-6 sm:mb-8 lg:mb-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <div className={`relative ${
            responsive.isMobile ? 'w-24 h-24' : 
            responsive.isTablet ? 'w-32 h-32' : 
            'w-40 h-40 lg:w-48 lg:h-48'
          }`}>
            {/* Animated ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white p-1 dark:shadow-premium-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-white dark:bg-black dark:shadow-inner" />
            </motion.div>
            
            {/* Profile image */}
            <div 
              className="absolute inset-2 rounded-full bg-cover bg-center bg-no-repeat shadow-2xl select-none overflow-hidden"
              style={{
                backgroundImage: 'url(https://res.cloudinary.com/dhyc478ch/image/upload/v1765255302/Untitled_design_comhaa.svg)',
              }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              itemProp="image"
            />
            
            

          </div>
        </motion.div>

        {/* Enhanced name with gradient text */}
        <motion.h1 
          id="hero-title"
          className={`font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight ${
            responsive.isMobile ? 'text-4xl' :
            responsive.isTablet ? 'text-5xl' :
            'text-6xl lg:text-7xl xl:text-8xl'
          }`}
          itemProp="name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="text-black dark:text-white font-display elegant-heading">
            Vishesh Panchal
          </span>
        </motion.h1>

        <p className="sr-only">
          Vishesh Panchal is a full stack developer portfolio focused on React, Node.js, MERN stack, and AI-powered web applications.
        </p>

        {/* Advanced typewriter with responsive sizing */}
        <motion.h2 
          className={`font-light mb-6 sm:mb-8 lg:mb-10 flex items-center justify-center min-h-[2rem] sm:min-h-[3rem] ${
            responsive.isMobile ? 'text-lg' :
            responsive.isTablet ? 'text-xl' :
            'text-2xl lg:text-3xl'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <TypewriterText 
            texts={texts}
            className="text-black dark:text-white font-medium"
          />
        </motion.h2>

        {/* Enhanced description with better typography */}
        <motion.p 
          className={`text-gray-700 dark:text-gray-300 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed ${
            responsive.isMobile ? 'text-base px-4' :
            responsive.isTablet ? 'text-lg px-6' :
            'text-xl px-8'
          }`}
          itemProp="description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Crafting fast, user-focused digital products for startups, teams, and growing businesses.
          Specializing in{' '}
          <motion.a 
            href="#skills" 
            className="text-black dark:text-white font-semibold hover:text-gray-700 dark:hover:text-gray-300 transition-colors relative group"
            whileHover={{ scale: 1.05 }}
          >
            MERN Stack
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
          </motion.a>
          ,{' '}
          <motion.a 
            href="#projects" 
            className="text-black dark:text-white font-semibold hover:text-gray-700 dark:hover:text-gray-300 transition-colors relative group"
            whileHover={{ scale: 1.05 }}
          >
            AI applications
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
          </motion.a>
          , and scalable web solutions that drive innovation.
        </motion.p>

        {/* Enhanced CTA buttons with advanced styling */}
        <motion.div 
          className={`flex gap-4 sm:gap-6 justify-center items-center ${
            responsive.isMobile ? 'flex-col px-4' : 'flex-row px-6'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.a
            href="#projects"
            className={`group relative overflow-hidden rounded-full font-semibold shadow-lg hover:shadow-xl dark:shadow-premium dark:hover:shadow-premium-lg transition-all duration-300 touch-target bg-gradient-to-br from-black via-gray-900 to-black dark:from-white dark:via-gray-100 dark:to-white ${
              responsive.isMobile ? 'w-full px-8 py-4' : 'px-8 py-4'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-white dark:text-black">
              <motion.i 
                className="fas fa-rocket"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Explore My Work</span>
            </span>

          </motion.a>

          <motion.a
            href="#contact"
            className={`group relative overflow-hidden rounded-full font-semibold border-2 border-black dark:border-white/20 dark:shadow-luxury transition-all duration-300 touch-target bg-white dark:bg-black/80 dark:backdrop-blur-xl ${
              responsive.isMobile ? 'w-full px-8 py-4' : 'px-8 py-4'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-black dark:text-white">
              <motion.i 
                className="fas fa-paper-plane"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
              <span>{responsive.isMobile ? 'Contact' : "Let's Connect"}</span>
            </span>

          </motion.a>
        </motion.div>

        {/* Enhanced Resume Buttons */}
        <motion.div 
          className={`flex gap-3 sm:gap-4 justify-center items-center mt-6 sm:mt-8 ${
            responsive.isMobile ? 'flex-col px-4' : 'flex-row px-6'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.a
            href="/Vishesh_Panchal_Resume.pdf"
            download="Vishesh_Panchal_Resume.pdf"
            className={`group relative overflow-hidden rounded-full font-medium shadow-md hover:shadow-lg dark:shadow-premium dark:hover:shadow-premium-lg transition-all duration-300 touch-target bg-gradient-to-br from-black via-gray-900 to-black dark:from-white dark:via-gray-100 dark:to-white ${
              responsive.isMobile ? 'w-full px-6 py-3' : 'px-6 py-3'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-white dark:text-black text-sm">
              <motion.i 
                className="fas fa-download"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
              <span>Download Resume</span>
            </span>
          </motion.a>

          <motion.a
            href="/Vishesh_Panchal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden rounded-full font-medium border-2 border-black dark:border-white/20 dark:shadow-luxury transition-all duration-300 touch-target bg-white dark:bg-black/80 dark:backdrop-blur-xl ${
              responsive.isMobile ? 'w-full px-6 py-3' : 'px-6 py-3'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-black dark:text-white text-sm font-semibold">
              <motion.i 
                className="fas fa-eye"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
              <span>View Resume</span>
            </span>

          </motion.a>
        </motion.div>

        {/* Enhanced Social Links */}
        <motion.div
          className="flex justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {[
            { 
              icon: 'fab fa-github', 
              url: 'https://github.com/visheshpanchal27', 
              label: 'GitHub' 
            },
            { 
              icon: 'fab fa-linkedin', 
              url: 'https://www.linkedin.com/in/vishesh-panchal-144281353', 
              label: 'LinkedIn' 
            },
            { 
              icon: 'fab fa-twitter', 
              url: 'https://twitter.com/visheshpanchal', 
              label: 'Twitter' 
            }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="relative group text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-all duration-300 text-3xl"
              whileHover={{ scale: 1.4, y: -8, rotate: [0, -10, 10, 0] }}
              whileTap={{ scale: 0.85 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 10,
                duration: 0.5, 
                delay: 1.6 + index * 0.1 
              }}
            >
              <i className={`${social.icon} text-xl`} />
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {social.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Enhanced scroll indicator */}
        {!responsive.isMobile && (
          <motion.div
            className="mt-12 sm:mt-16 lg:mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.a 
              href="#about" 
              className="group flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              whileHover={{ y: -2 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              <span className="text-sm font-medium tracking-wide">Discover More</span>
              <motion.div
                className="flex flex-col items-center gap-1"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.i
                  className="fas fa-chevron-down text-lg group-hover:text-black dark:group-hover:text-white"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.i
                  className="fas fa-chevron-down text-sm group-hover:text-black dark:group-hover:text-white -mt-2"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                />
              </motion.div>
            </motion.a>
          </motion.div>
        )}
      </motion.div>
      

    </section>
  );
};

export default Hero;
