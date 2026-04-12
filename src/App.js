import React, { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';
import ResponsiveWrapper from './components/ResponsiveWrapper';
import { ColorProvider } from './components/ColorProvider';
import ProjectPage from './components/ProjectPage';
import { getProjectBySlug } from './config/seo';
import { scrollToSection } from './utils/scrollToSection';
import './styles/responsive.css';
import './styles/premium-dark.css';

const RETURN_STATE_KEY = 'portfolio:return-state';
const ACTIVE_PROJECT_KEY = 'portfolio:active-project';
const LOADING_FADE_DELAY_MS = 2600;
const LOADING_HIDE_DELAY_MS = 3200;
const APP_BOOT_SEQUENCE_ID = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const getInitialDarkMode = () => {
  try {
    const saved = window.localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
  } catch (error) {
    // Ignore storage failures and fall back to the system preference.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const persistTheme = (darkMode) => {
  try {
    window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  } catch (error) {
    // Ignore storage failures so the app can still render.
  }
};

const getRoute = () => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path.startsWith('/projects/')) {
    return {
      type: 'project',
      slug: path.replace('/projects/', '')
    };
  }

  return { type: 'home' };
};

const restoreProjectsSection = (fallbackToProjects = false) => {
  const savedState = sessionStorage.getItem(RETURN_STATE_KEY);

  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      if (parsed.activeSlug) {
        sessionStorage.setItem(ACTIVE_PROJECT_KEY, parsed.activeSlug);
      }

      requestAnimationFrame(() => {
        window.scrollTo({ top: parsed.scrollY || 0, left: 0, behavior: 'auto' });
      });
    } catch (error) {
      if (fallbackToProjects) {
        requestAnimationFrame(() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'auto', block: 'start' });
        });
      }
    }
  } else if (fallbackToProjects) {
    requestAnimationFrame(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }

  sessionStorage.removeItem(RETURN_STATE_KEY);
};

const NotFoundPage = ({ onBack }) => (
  <>
    <SEOHead
      title="Project Not Found | Vishesh Panchal"
      description="The requested project page could not be found. Explore other work from Vishesh Panchal."
      url={window.location.pathname}
    />
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-24 text-slate-800 dark:from-black dark:via-gray-950 dark:to-black dark:text-white sm:pt-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white">Project Not Found</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          The page you requested does not exist, but the portfolio home and featured projects are still available.
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-8 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white dark:bg-white dark:text-black"
        >
          Browse Projects
        </button>
      </div>
    </main>
  </>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [route, setRoute] = useState(() => getRoute());
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const bootSequenceRef = React.useRef(APP_BOOT_SEQUENCE_ID);
  const previousDarkMode = React.useRef();

  useEffect(() => {
    persistTheme(darkMode);
    const root = document.documentElement;
    const nextTheme = darkMode;

    // On first render — apply instantly, no transition, no overlay
    if (previousDarkMode.current === undefined) {
      previousDarkMode.current = nextTheme;
      root.classList.toggle('dark', nextTheme);
      return undefined;
    }

    // On toggle — add transition class, flash overlay, swap theme
    if (previousDarkMode.current === nextTheme) {
      return undefined;
    }

    previousDarkMode.current = nextTheme;
    root.classList.add('dark-transition');
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99998;pointer-events:none;
      background:${nextTheme ? '#000000' : '#ffffff'};
      opacity:0;transition:opacity 0.18s ease;
    `;
    document.body.appendChild(overlay);
    let frameId = null;
    let swapTimer = null;
    let cleanupTimer = null;

    frameId = requestAnimationFrame(() => {
      overlay.style.opacity = '0.3';
      swapTimer = window.setTimeout(() => {
        root.classList.toggle('dark', nextTheme);
        overlay.style.opacity = '0';
        cleanupTimer = window.setTimeout(() => {
          overlay.remove();
          root.classList.remove('dark-transition');
        }, 420);
      }, 180);
    });

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      if (swapTimer !== null) {
        window.clearTimeout(swapTimer);
      }
      if (cleanupTimer !== null) {
        window.clearTimeout(cleanupTimer);
      }
      overlay.remove();
      root.classList.remove('dark-transition');
    };
  }, [darkMode]);

  useEffect(() => {
    if (bootSequenceRef.current === APP_BOOT_SEQUENCE_ID) {
      return undefined;
    }

    bootSequenceRef.current = APP_BOOT_SEQUENCE_ID;
    setFadeOut(false);
    setLoading(true);
    return undefined;
  });

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    setFadeOut(false);
    const fadeTimer = window.setTimeout(() => setFadeOut(true), LOADING_FADE_DELAY_MS);
    const hideTimer = window.setTimeout(() => setLoading(false), LOADING_HIDE_DELAY_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const handleRouteChange = () => {
      const nextRoute = getRoute();
      setRoute(nextRoute);
      setIsScrolled(window.scrollY > 100);

      if (nextRoute.type === 'home') {
        restoreProjectsSection(true);
      } else {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        });
      }
    };

    const handleHashNavigation = () => {
      if (window.location.pathname !== '/') {
        return;
      }

      const sectionId = window.location.hash.replace('#', '');

      if (!sectionId) {
        return;
      }

      requestAnimationFrame(() => {
        scrollToSection(sectionId, { behavior: 'smooth', updateHash: false });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleHashNavigation);
    handleHashNavigation();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  const toggleDarkMode = () => setDarkMode((currentDarkMode) => !currentDarkMode);
  const project = route.type === 'project' ? getProjectBySlug(route.slug) : null;

  const navigateToProject = (slug, options = {}) => {
    sessionStorage.setItem(
      RETURN_STATE_KEY,
      JSON.stringify({
        scrollY: window.scrollY,
        activeSlug: options.activeSlug || slug
      })
    );

    sessionStorage.setItem(ACTIVE_PROJECT_KEY, options.activeSlug || slug);
    window.history.pushState({ type: 'project', slug }, '', `/projects/${slug}`);
    setRoute({ type: 'project', slug });
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const navigateHomeToProjects = () => {
    window.history.pushState({ type: 'home' }, '', '/');
    setRoute({ type: 'home' });
    restoreProjectsSection(true);
  };

  return (
    <ErrorBoundary>
      <HelmetProvider>
        {loading ? (
          <div
            style={{
              opacity: fadeOut ? 0 : 1,
              transform: fadeOut ? 'scale(1.04)' : 'scale(1)',
              transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)',
              pointerEvents: fadeOut ? 'none' : 'auto',
            }}
          >
            <LoadingScreen />
          </div>
        ) : (
          <ResponsiveWrapper>
            <ColorProvider darkMode={darkMode}>
              <div className={`min-h-screen w-full overflow-x-hidden ${darkMode ? 'dark' : ''}`}>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} isScrolled={isScrolled} />

                {route.type === 'home' && (
                  <>
                    <SEOHead />
                    <main className="w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-20 text-slate-800 transition-all duration-700 dark:from-black dark:via-gray-950 dark:to-black dark:text-white sm:pt-24">
                      <Hero />
                      <About />
                      <Skills />
                      <Projects onNavigateToProject={navigateToProject} />
                      <Contact />
                    </main>
                  </>
                )}

                {route.type === 'project' && project && (
                  <ProjectPage project={project} onBack={navigateHomeToProjects} onNavigateToProject={navigateToProject} />
                )}
                {route.type === 'project' && !project && <NotFoundPage onBack={navigateHomeToProjects} />}

                <Footer />
              </div>
            </ColorProvider>
          </ResponsiveWrapper>
        )}
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
