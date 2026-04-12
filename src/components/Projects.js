import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { seoConfig } from '../config/seo';

const ACTIVE_PROJECT_KEY = 'portfolio:active-project';

const categories = [
  { id: 'all',       name: 'All',        icon: 'fas fa-th-large'    },
  { id: 'fullstack', name: 'Full Stack', icon: 'fas fa-layer-group' },
  { id: 'backend',   name: 'Backend',    icon: 'fas fa-server'      },
  { id: 'ai',        name: 'AI / ML',    icon: 'fas fa-brain'       },
];

const getSavedSlug = () =>
  typeof window === 'undefined'
    ? seoConfig.projects[0]?.slug || ''
    : sessionStorage.getItem(ACTIVE_PROJECT_KEY) || seoConfig.projects[0]?.slug || '';

const formatLabel = (label) =>
  label
    .split(/(?=[A-Z])|[\s_-]+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');

const categoryTitle = (c) =>
  ({ ai: 'AI / ML', backend: 'Backend', fullstack: 'Full Stack' }[c] ?? 'Project');

/* ── touch-swipe hook ── */
function useSwipe(onLeft, onRight) {
  const startX = useRef(null);
  return {
    onTouchStart: (e) => { startX.current = e.touches[0].clientX; },
    onTouchEnd:   (e) => {
      if (startX.current === null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(dx) > 50) dx < 0 ? onLeft() : onRight();
      startX.current = null;
    },
  };
}

const Projects = ({ onNavigateToProject }) => {
  const [filter,     setFilter]     = useState('all');
  const [activeSlug, setActiveSlug] = useState(getSavedSlug);
  const [openSection, setOpenSection] = useState({ summary: true, features: true, metrics: false });

  const filteredProjects = useMemo(
    () => filter === 'all' ? seoConfig.projects : seoConfig.projects.filter((p) => p.category === filter),
    [filter]
  );

  const activeProject = useMemo(
    () => filteredProjects.find((p) => p.slug === activeSlug) || filteredProjects[0] || null,
    [activeSlug, filteredProjects]
  );

  useEffect(() => {
    if (!filteredProjects.some((p) => p.slug === activeSlug))
      setActiveSlug(filteredProjects[0]?.slug || '');
  }, [activeSlug, filteredProjects]);

  useEffect(() => {
    if (activeSlug) sessionStorage.setItem(ACTIVE_PROJECT_KEY, activeSlug);
  }, [activeSlug]);

  const changeProject = (dir) => {
    if (!filteredProjects.length || !activeProject) return;
    const i = filteredProjects.findIndex((p) => p.slug === activeProject.slug);
    setActiveSlug(filteredProjects[(i + dir + filteredProjects.length) % filteredProjects.length].slug);
  };

  const swipe = useSwipe(() => changeProject(1), () => changeProject(-1));

  const toggle = (key) => setOpenSection((s) => ({ ...s, [key]: !s[key] }));

  if (!activeProject) return null;

  const activeIndex = filteredProjects.findIndex((p) => p.slug === activeProject.slug);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="bg-white px-4 py-14 dark:bg-black sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">

        {/* ── Heading ── */}
        <motion.div
          className="mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="projects-title"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white"
          >
            Featured Projects
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-400 px-2">
            Full stack, backend, and AI projects with measurable outcomes and direct access to code or live demos.
          </p>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-black dark:bg-white" />
        </motion.div>

        {/* ── Category filter — horizontal scroll on mobile ── */}
        <motion.div
          className="mb-6 sm:mb-8 flex gap-2 overflow-x-auto scrollbar-hide pb-1 sm:flex-wrap sm:justify-center sm:gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((cat) => {
            const sel = filter === cat.id;
            return (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={`shrink-0 flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  sel
                    ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                    : 'border-gray-300 bg-white text-black hover:border-black dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:border-white'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <i className={cat.icon} />
                {cat.name}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Mobile project picker — dot + arrow nav ── */}
        <div className="mb-4 lg:hidden">
          <div
            className="flex items-center justify-between rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-900"
            {...swipe}
          >
            <button
              type="button"
              onClick={() => changeProject(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-300 bg-white text-black transition active:scale-90 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              aria-label="Previous project"
            >
              <i className="fas fa-chevron-left text-xs" />
            </button>

            <div className="flex flex-col items-center gap-1.5 min-w-0 px-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {activeIndex + 1} / {filteredProjects.length}
              </span>
              <span className="truncate text-sm font-bold text-black dark:text-white max-w-[180px] text-center">
                {activeProject.shortTitle}
              </span>
              {/* dot indicators */}
              <div className="flex gap-1.5 mt-0.5">
                {filteredProjects.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setActiveSlug(p.slug)}
                    aria-label={p.shortTitle}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      p.slug === activeProject.slug
                        ? 'w-5 bg-black dark:bg-white'
                        : 'w-2 bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => changeProject(1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-300 bg-white text-black transition active:scale-90 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              aria-label="Next project"
            >
              <i className="fas fa-chevron-right text-xs" />
            </button>
          </div>

          {/* Mobile horizontal project chips */}
          <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {filteredProjects.map((p) => {
              const sel = p.slug === activeProject.slug;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setActiveSlug(p.slug)}
                  className={`shrink-0 flex items-center gap-2 rounded-2xl border-2 px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                    sel
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                      : 'border-gray-200 bg-white text-black dark:border-gray-700 dark:bg-gray-900 dark:text-white'
                  }`}
                >
                  <i className={p.icon} />
                  {p.shortTitle}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">

          {/* ── Sidebar — desktop only ── */}
          <motion.aside
            className="hidden lg:block lg:sticky lg:top-24 lg:self-start rounded-[1.75rem] border-2 border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center justify-between rounded-2xl bg-gray-100 px-4 py-3 dark:bg-black">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Projects</div>
                <div className="mt-1 text-base font-bold text-black dark:text-white">{filteredProjects.length} Total</div>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white text-sm ${activeProject.gradient}`}>
                <i className={activeProject.icon} />
              </div>
            </div>

            <div className="space-y-2">
              {filteredProjects.map((project, index) => {
                const sel = project.slug === activeProject.slug;
                return (
                  <motion.button
                    key={project.slug}
                    type="button"
                    onClick={() => setActiveSlug(project.slug)}
                    className={`w-full rounded-2xl border-2 p-3.5 text-left transition-all duration-300 ${
                      sel
                        ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                        : 'border-gray-200 bg-gray-50 text-black hover:border-gray-400 dark:border-gray-700 dark:bg-black/40 dark:text-white dark:hover:border-gray-500'
                    }`}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm ${sel ? 'bg-white/15 dark:bg-black/15' : 'bg-white dark:bg-gray-800'}`}>
                        <i className={project.icon} />
                      </div>
                      <div className="min-w-0">
                        <div className={`text-[10px] font-bold uppercase tracking-widest ${sel ? 'text-white/60 dark:text-black/50' : 'text-gray-400 dark:text-gray-500'}`}>
                          {String(index + 1).padStart(2, '0')} · {project.category}
                        </div>
                        <div className="mt-0.5 truncate text-sm font-bold">{project.shortTitle}</div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.aside>

          {/* ── Article ── */}
          <AnimatePresence mode="wait">
            <motion.article
              key={activeProject.slug}
              itemScope
              itemType="https://schema.org/CreativeWork"
              className="overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border-2 border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              {...swipe}
            >
              <div className={`bg-gradient-to-br ${activeProject.gradient} p-4 text-white xs:p-5 sm:p-6 lg:p-8`}>

                {/* top row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                      <i className={activeProject.icon} />
                      {categoryTitle(activeProject.category)}
                    </div>
                    <h3
                      className="mt-3 text-xl sm:text-3xl lg:text-4xl font-bold leading-tight"
                      itemProp="name"
                    >
                      {activeProject.name}
                    </h3>
                    <p
                      className="mt-2 text-xs sm:text-sm leading-6 text-white/80"
                      itemProp="description"
                    >
                      {activeProject.longDescription}
                    </p>
                  </div>

                  {/* desktop prev/next */}
                  <div className="hidden sm:flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => changeProject(-1)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 transition hover:bg-white/20 active:scale-90"
                      aria-label="Previous project"
                    >
                      <i className="fas fa-arrow-left text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={() => changeProject(1)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 transition hover:bg-white/20 active:scale-90"
                      aria-label="Next project"
                    >
                      <i className="fas fa-arrow-right text-sm" />
                    </button>
                  </div>
                </div>

                {/* stats */}
                <div className="mt-5 grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-3 sm:gap-3">
                  {Object.entries(activeProject.stats).map(([label, value]) => (
                    <div key={label} className="rounded-xl sm:rounded-2xl border border-white/15 bg-white/10 px-3 py-3 sm:px-4 sm:py-4">
                      <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/65">{formatLabel(label)}</div>
                      <div className="mt-1.5 text-lg sm:text-2xl font-bold leading-none">{value}</div>
                    </div>
                  ))}
                </div>

                {/* tech tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {activeProject.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-white/90">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="mt-5 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigateToProject?.(activeProject.slug, { activeSlug: activeProject.slug })}
                    className="w-full sm:w-auto rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition hover:opacity-90 active:scale-95 text-center"
                    itemProp="url"
                  >
                    <i className="fas fa-folder-open mr-1.5" />
                    Project Details
                  </button>
                  <a
                    href={activeProject.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-white/20 active:scale-95 text-center"
                  >
                    <i className="fab fa-github mr-1.5" />
                    Source Code
                  </a>
                  {activeProject.url && (
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-white/20 active:scale-95 text-center"
                    >
                      <i className="fas fa-external-link-alt mr-1.5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* body */}
              <div className="space-y-4 p-4 sm:space-y-5 sm:p-6 lg:p-8">

                {/* Summary — collapsible on mobile */}
                <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-black/40 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggle('summary')}
                    className="flex w-full items-center justify-between px-4 py-4 sm:px-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-white text-xs ${activeProject.gradient}`}>
                        <i className="fas fa-align-left" />
                      </div>
                      <span className="text-sm font-bold text-black dark:text-white">Project Summary</span>
                    </div>
                    <i className={`fas fa-chevron-${openSection.summary ? 'up' : 'down'} text-xs text-gray-400 transition-transform duration-300`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openSection.summary && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
                          {activeProject.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Features — collapsible on mobile */}
                <div className="rounded-2xl border-2 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggle('features')}
                    className="flex w-full items-center justify-between px-4 py-4 sm:px-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-white text-xs ${activeProject.gradient}`}>
                        <i className="fas fa-list-check" />
                      </div>
                      <span className="text-sm font-bold text-black dark:text-white">Key Features</span>
                    </div>
                    <i className={`fas fa-chevron-${openSection.features ? 'up' : 'down'} text-xs text-gray-400 transition-transform duration-300`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openSection.features && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-2 px-4 pb-4 sm:grid-cols-2 sm:px-5 sm:pb-5">
                          {activeProject.features.map((feature, i) => (
                            <div
                              key={feature}
                              className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 dark:border-gray-700 dark:bg-black/40"
                            >
                              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[11px] font-bold text-white ${activeProject.gradient}`}>
                                {String(i + 1).padStart(2, '0')}
                              </div>
                              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 leading-5">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Metrics — collapsible on mobile */}
                <div className="rounded-2xl border-2 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggle('metrics')}
                    className="flex w-full items-center justify-between px-4 py-4 sm:px-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-white text-xs ${activeProject.gradient}`}>
                        <i className="fas fa-chart-bar" />
                      </div>
                      <span className="text-sm font-bold text-black dark:text-white">Project Metrics</span>
                    </div>
                    <i className={`fas fa-chevron-${openSection.metrics ? 'up' : 'down'} text-xs text-gray-400 transition-transform duration-300`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openSection.metrics && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 px-4 pb-4 sm:px-5 sm:pb-5">
                          {Object.entries(activeProject.metrics).map(([label, value]) => (
                            <div key={label}>
                              <div className="mb-1.5 flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-semibold text-black dark:text-white">{formatLabel(label)}</span>
                                <span className="text-xs sm:text-sm font-bold text-black dark:text-white">{value}%</span>
                              </div>
                              <div className="h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                                <motion.div
                                  className={`h-full rounded-full bg-gradient-to-r ${activeProject.gradient}`}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${value}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8 }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick actions */}
                <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 p-4 sm:p-5 dark:border-gray-700 dark:bg-black/40">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">Quick Actions</div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => onNavigateToProject?.(activeProject.slug, { activeSlug: activeProject.slug })}
                      className="rounded-full bg-black px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:opacity-90 active:scale-95 dark:bg-white dark:text-black text-center"
                    >
                      Full Case Study
                    </button>
                    <a
                      href={activeProject.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border-2 border-gray-300 px-4 py-2.5 text-xs sm:text-sm font-bold text-black transition hover:border-black active:scale-95 dark:border-gray-600 dark:text-white dark:hover:border-white text-center"
                    >
                      GitHub Repo
                    </a>
                    {activeProject.url ? (
                      <a
                        href={activeProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border-2 border-gray-300 px-4 py-2.5 text-xs sm:text-sm font-bold text-black transition hover:border-black active:scale-95 dark:border-gray-600 dark:text-white dark:hover:border-white text-center"
                      >
                        Live Project
                      </a>
                    ) : (
                      <span className="rounded-full border-2 border-dashed border-gray-200 px-4 py-2.5 text-xs sm:text-sm font-bold text-gray-400 dark:border-gray-700 text-center">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
