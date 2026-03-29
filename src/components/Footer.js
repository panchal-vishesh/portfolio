import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const isProjectPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/projects/');
  
  const footerClasses = "bg-white dark:bg-black text-black dark:text-white relative overflow-hidden border-t-2 border-gray-200 dark:border-white/10";
  const patternClasses = "absolute top-0 left-0 w-full h-full bg-gray-900/5 dark:bg-gray-800/10";

  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/visheshpanchal27', label: 'GitHub', hoverColor: '#333' },
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/vishesh-panchal-144281353', label: 'LinkedIn', hoverColor: '#0077B5' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com/visheshpanchal', label: 'Twitter', hoverColor: '#1DA1F2' },
    { icon: 'fas fa-envelope', url: 'mailto:visheshpanchal864@gmail.com', label: 'Email', hoverColor: '#EA4335' }
  ];

  const quickLinks = [
    { name: 'About', href: isProjectPage ? '/#about' : '#about' },
    { name: 'Skills', href: isProjectPage ? '/#skills' : '#skills' },
    { name: 'Projects', href: isProjectPage ? '/#projects' : '#projects' },
    { name: 'Contact', href: isProjectPage ? '/#contact' : '#contact' }
  ];

  return (
    <footer className={footerClasses}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={patternClasses}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 xs:px-6 py-12 xs:py-16 safe-area-inset responsive-padding">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand Section */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="fluid-text-xl xs:fluid-text-2xl font-bold mb-3 xs:mb-4 text-black dark:text-white elegant-heading">
              Vishesh Panchal
            </h3>
            <p className="text-slate-600 dark:text-gray-400 mb-6 leading-relaxed max-w-md">
              Full Stack Developer passionate about creating innovative digital solutions. 
              Let's build something amazing together!
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 xs:gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-100 dark:bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 dark:text-white border border-gray-200 dark:border-white/10 transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:shadow-luxury touch-target"
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-black dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-slate-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <i className="fas fa-chevron-right text-xs text-slate-400 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-colors"></i>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-black dark:text-white">Let's Connect</h4>
            <div className="space-y-3">
              <motion.a
                href="mailto:visheshpanchal864@gmail.com"
                className="flex items-center gap-3 text-slate-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300 group"
                whileHover={{ x: 5 }}
              >
                <i className="fas fa-envelope text-slate-400 dark:text-gray-600 group-hover:text-black dark:group-hover:text-white transition-colors"></i>
                <span className="text-sm">visheshpanchal864@gmail.com</span>
              </motion.a>
              
              <motion.div
                className="flex items-center gap-3 text-slate-600 dark:text-gray-400"
                whileHover={{ x: 5 }}
              >
                <i className="fas fa-map-marker-alt text-slate-400 dark:text-gray-600"></i>
                <span className="text-sm">India</span>
              </motion.div>
              
              <motion.div
                className="flex items-center gap-3 text-slate-600 dark:text-gray-400"
                whileHover={{ x: 5 }}
              >
                <i className="fas fa-briefcase text-slate-400 dark:text-gray-600"></i>
                <span className="text-sm">Open to opportunities</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t-2 border-gray-200 dark:border-white/10 mt-12 pt-8"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 xs:gap-4">
            <motion.p 
              className="text-slate-500 dark:text-gray-500 text-sm font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              &copy; {currentYear} Vishesh Panchal. All rights reserved.
            </motion.p>
            
            <motion.div
              className="flex items-center gap-4 text-sm text-slate-500 dark:text-gray-500 font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <span>Made with</span>
              <motion.i 
                className="fas fa-heart text-red-500 dark:text-red-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              ></motion.i>
              <span>and</span>
              <motion.i 
                className="fab fa-react text-blue-500 dark:text-blue-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              ></motion.i>
            </motion.div>
          </div>
        </motion.div>


      </div>
    </footer>
  );
};

export default Footer;
