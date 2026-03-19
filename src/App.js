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
import ThemeToggle from './components/ThemeToggle';
import ProjectPage from './components/ProjectPage';
import { getProjectBySlug } from './config/seo';
import { scrollToSection } from './utils/scrollToSection';
import './styles/responsive.css';
import './styles/premium-dark.css';

const RETURN_STATE_KEY = 'portfolio:return-state';
const ACTIVE_PROJECT_KEY = 'portfolio:active-project';

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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-28 text-slate-800 dark:from-black dark:via-gray-950 dark:to-black dark:text-white">
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [route, setRoute] = useState(() => getRoute());
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

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

  const toggleDarkMode = () => setDarkMode(!darkMode);
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
          <LoadingScreen />
        ) : (
          <ResponsiveWrapper>
            <ColorProvider darkMode={darkMode}>
              <div className={`min-h-screen w-full ${darkMode ? 'dark' : ''}`}>
                <div className="fixed top-6 right-8 z-[100]">
                  <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                </div>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} isScrolled={isScrolled} />

                {route.type === 'home' && (
                  <>
                    <SEOHead />
                    <main className="pt-24 w-full bg-gradient-to-br from-slate-50 via-white to-gray-50 text-slate-800 transition-all duration-700 dark:from-black dark:via-gray-950 dark:to-black dark:text-white">
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
