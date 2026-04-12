// Advanced Responsive Configuration System
export const breakpoints = {
  xs: 320,    // Small phones
  sm: 375,    // Large phones
  md: 768,    // Tablets
  lg: 1024,   // Small laptops
  xl: 1280,   // Laptops
  '2xl': 1536, // Large screens
  '3xl': 1920, // Ultra-wide
  '4xl': 2560  // 4K displays
};

export const deviceTypes = {
  mobile: { min: 0, max: 767, type: 'touch' },
  tablet: { min: 768, max: 1023, type: 'hybrid' },
  laptop: { min: 1024, max: 1439, type: 'desktop' },
  desktop: { min: 1440, max: 1919, type: 'desktop' },
  ultrawide: { min: 1920, max: Infinity, type: 'desktop' }
};

// Advanced responsive configuration with fluid scaling
export const responsiveConfig = {
  // Fluid typography with clamp() support
  typography: {
    xs: { 
      mobile: '0.75rem', 
      tablet: '0.8125rem', 
      desktop: '0.875rem',
      clamp: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)'
    },
    sm: { 
      mobile: '0.875rem', 
      tablet: '0.9375rem', 
      desktop: '1rem',
      clamp: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)'
    },
    base: { 
      mobile: '1rem', 
      tablet: '1.0625rem', 
      desktop: '1.125rem',
      clamp: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)'
    },
    lg: { 
      mobile: '1.125rem', 
      tablet: '1.25rem', 
      desktop: '1.375rem',
      clamp: 'clamp(1.125rem, 1rem + 0.625vw, 1.375rem)'
    },
    xl: { 
      mobile: '1.25rem', 
      tablet: '1.4375rem', 
      desktop: '1.625rem',
      clamp: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.625rem)'
    },
    '2xl': { 
      mobile: '1.5rem', 
      tablet: '1.75rem', 
      desktop: '2rem',
      clamp: 'clamp(1.5rem, 1.3rem + 1vw, 2rem)'
    },
    '3xl': { 
      mobile: '1.875rem', 
      tablet: '2.1875rem', 
      desktop: '2.5rem',
      clamp: 'clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem)'
    },
    '4xl': { 
      mobile: '2.25rem', 
      tablet: '2.625rem', 
      desktop: '3rem',
      clamp: 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)'
    },
    '5xl': { 
      mobile: '3rem', 
      tablet: '3.5rem', 
      desktop: '4rem',
      clamp: 'clamp(3rem, 2.5rem + 2.5vw, 4rem)'
    },
    '6xl': { 
      mobile: '3.75rem', 
      tablet: '4.375rem', 
      desktop: '5rem',
      clamp: 'clamp(3.75rem, 3rem + 3.75vw, 5rem)'
    }
  },

  // Fluid spacing system
  spacing: {
    xs: { 
      mobile: '0.5rem', 
      tablet: '0.75rem', 
      desktop: '1rem',
      clamp: 'clamp(0.5rem, 0.4rem + 0.5vw, 1rem)'
    },
    sm: { 
      mobile: '1rem', 
      tablet: '1.25rem', 
      desktop: '1.5rem',
      clamp: 'clamp(1rem, 0.8rem + 1vw, 1.5rem)'
    },
    md: { 
      mobile: '1.5rem', 
      tablet: '1.75rem', 
      desktop: '2rem',
      clamp: 'clamp(1.5rem, 1.3rem + 1vw, 2rem)'
    },
    lg: { 
      mobile: '2rem', 
      tablet: '2.5rem', 
      desktop: '3rem',
      clamp: 'clamp(2rem, 1.6rem + 2vw, 3rem)'
    },
    xl: { 
      mobile: '3rem', 
      tablet: '3.5rem', 
      desktop: '4rem',
      clamp: 'clamp(3rem, 2.5rem + 2.5vw, 4rem)'
    },
    '2xl': { 
      mobile: '4rem', 
      tablet: '5rem', 
      desktop: '6rem',
      clamp: 'clamp(4rem, 3rem + 5vw, 6rem)'
    }
  },

  // Adaptive container system
  container: {
    xs: { padding: '1rem', maxWidth: '100%' },
    sm: { padding: '1.5rem', maxWidth: '640px' },
    md: { padding: '2rem', maxWidth: '768px' },
    lg: { padding: '2.5rem', maxWidth: '1024px' },
    xl: { padding: '3rem', maxWidth: '1280px' },
    '2xl': { padding: '4rem', maxWidth: '1536px' },
    '3xl': { padding: '5rem', maxWidth: '1920px' }
  },

  // Advanced grid system
  grid: {
    mobile: { 
      columns: 1, 
      gap: '1rem',
      minItemWidth: '280px',
      aspectRatio: '1/1.2'
    },
    tablet: { 
      columns: 'auto-fit', 
      gap: '1.5rem',
      minItemWidth: '300px',
      aspectRatio: '1/1.1'
    },
    desktop: { 
      columns: 'auto-fit', 
      gap: '2rem',
      minItemWidth: '320px',
      aspectRatio: '1/1'
    },
    ultrawide: {
      columns: 'auto-fit',
      gap: '2.5rem',
      minItemWidth: '350px',
      aspectRatio: '1/0.9'
    }
  },

  // Performance-optimized animations
  animations: {
    mobile: {
      fast: '0.15s',
      normal: '0.2s',
      slow: '0.3s',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    tablet: {
      fast: '0.2s',
      normal: '0.25s',
      slow: '0.35s',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    desktop: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  },

  // Enhanced touch targets
  touchTargets: {
    minSize: '44px',
    recommended: '48px',
    comfortable: '56px',
    spacing: '8px'
  },

  // Accessibility features
  accessibility: {
    focusRing: '2px solid currentColor',
    focusOffset: '2px',
    reducedMotion: {
      duration: '0.01ms',
      easing: 'linear'
    }
  },

  // Performance thresholds
  performance: {
    lazyLoadOffset: '100px',
    debounceDelay: 150,
    throttleDelay: 16
  }
};

// Advanced utility functions
export const getDeviceType = (width = window.innerWidth) => {
  if (width < deviceTypes.tablet.min) return 'mobile';
  if (width < deviceTypes.laptop.min) return 'tablet';
  if (width < deviceTypes.desktop.min) return 'laptop';
  if (width < deviceTypes.ultrawide.min) return 'desktop';
  return 'ultrawide';
};

export const getDeviceCapabilities = () => {
  return {
    touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    hover: window.matchMedia('(hover: hover)').matches,
    pointer: window.matchMedia('(pointer: fine)').matches ? 'fine' : 'coarse',
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    highContrast: window.matchMedia('(prefers-contrast: high)').matches,
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  };
};

export const getViewportInfo = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const deviceType = getDeviceType(width);
  const capabilities = getDeviceCapabilities();
  const flags = {
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isLaptop: deviceType === 'laptop',
    isDesktop: deviceType === 'desktop',
    isUltrawide: deviceType === 'ultrawide'
  };
  
  return {
    width,
    height,
    deviceType,
    ...flags,
    aspectRatio: width / height,
    pixelRatio: window.devicePixelRatio || 1,
    ...capabilities,
    // Viewport units
    vw: width / 100,
    vh: height / 100,
    vmin: Math.min(width, height) / 100,
    vmax: Math.max(width, height) / 100
  };
};

// Device type checkers
export const isMobile = (width = window.innerWidth) => width < deviceTypes.tablet.min;
export const isTablet = (width = window.innerWidth) => 
  width >= deviceTypes.tablet.min && width < deviceTypes.laptop.min;
export const isLaptop = (width = window.innerWidth) => 
  width >= deviceTypes.laptop.min && width < deviceTypes.desktop.min;
export const isDesktop = (width = window.innerWidth) => 
  width >= deviceTypes.desktop.min && width < deviceTypes.ultrawide.min;
export const isUltrawide = (width = window.innerWidth) => width >= deviceTypes.ultrawide.min;

// Responsive value getter
export const getResponsiveValue = (values, deviceType = getDeviceType()) => {
  if (typeof values === 'string' || typeof values === 'number') return values;
  
  return values[deviceType] || 
         values.desktop || 
         values.tablet || 
         values.mobile || 
         values.default || 
         Object.values(values)[0];
};

// CSS clamp generator
export const generateClamp = (min, preferred, max) => {
  return `clamp(${min}, ${preferred}, ${max})`;
};

// Fluid typography generator
export const getFluidTypography = (size) => {
  const config = responsiveConfig.typography[size];
  return config?.clamp || config?.desktop || config || size;
};

// Fluid spacing generator
export const getFluidSpacing = (size) => {
  const config = responsiveConfig.spacing[size];
  return config?.clamp || config?.desktop || config || size;
};

// Enhanced media queries
export const mediaQueries = {
  // Device sizes
  mobile: `(max-width: ${deviceTypes.mobile.max}px)`,
  tablet: `(min-width: ${deviceTypes.tablet.min}px) and (max-width: ${deviceTypes.tablet.max}px)`,
  laptop: `(min-width: ${deviceTypes.laptop.min}px) and (max-width: ${deviceTypes.laptop.max}px)`,
  desktop: `(min-width: ${deviceTypes.desktop.min}px) and (max-width: ${deviceTypes.desktop.max}px)`,
  ultrawide: `(min-width: ${deviceTypes.ultrawide.min}px)`,
  
  // Minimum widths
  minTablet: `(min-width: ${deviceTypes.tablet.min}px)`,
  minLaptop: `(min-width: ${deviceTypes.laptop.min}px)`,
  minDesktop: `(min-width: ${deviceTypes.desktop.min}px)`,
  
  // Capabilities
  touch: '(hover: none) and (pointer: coarse)',
  hover: '(hover: hover) and (pointer: fine)',
  coarsePointer: '(pointer: coarse)',
  finePointer: '(pointer: fine)',
  
  // Preferences
  reducedMotion: '(prefers-reduced-motion: reduce)',
  reducedData: '(prefers-reduced-data: reduce)',
  highContrast: '(prefers-contrast: high)',
  darkMode: '(prefers-color-scheme: dark)',
  lightMode: '(prefers-color-scheme: light)',
  
  // Orientation
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  
  // High DPI
  retina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  highDPI: '(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)'
};

// Performance utilities
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Intersection Observer helper
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: responsiveConfig.performance.lazyLoadOffset,
    threshold: 0.1
  };
  
  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// CSS Custom Properties Generator
export const generateCSSCustomProperties = () => {
  const properties = {};
  
  // Typography
  Object.entries(responsiveConfig.typography).forEach(([key, value]) => {
    if (value.clamp) {
      properties[`--font-size-${key}`] = value.clamp;
    }
  });
  
  // Spacing
  Object.entries(responsiveConfig.spacing).forEach(([key, value]) => {
    if (value.clamp) {
      properties[`--spacing-${key}`] = value.clamp;
    }
  });
  
  return properties;
};

// Apply CSS custom properties to document
export const applyCSSCustomProperties = () => {
  const properties = generateCSSCustomProperties();
  const root = document.documentElement;
  
  Object.entries(properties).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

export default responsiveConfig;
