import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from './SEOHead';
import { seoConfig } from '../config/seo';

const ProjectPage = ({ project, onBack, onNavigateToProject }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    url: `${seoConfig.baseUrl}/projects/${project.slug}`,
    creator: {
      '@type': 'Person',
      name: seoConfig.name,
      url: seoConfig.baseUrl
    },
    keywords: project.tech.join(', '),
    about: project.features,
    sameAs: [project.codeUrl, project.url].filter(Boolean)
  };

  return (
    <>
      <SEOHead
        title={project.seoTitle}
        description={project.seoDescription}
        url={`/projects/${project.slug}`}
        type="article"
        structuredData={structuredData}
      />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 pt-24 text-slate-800 transition-all duration-700 dark:from-black dark:via-gray-950 dark:to-black dark:text-white sm:pt-28">
        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <motion.button
              type="button"
              onClick={onBack}
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-black dark:text-slate-300 dark:hover:text-white sm:mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <i className="fas fa-arrow-left" />
              Back to all projects
            </motion.button>

            <motion.div
              className={`overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${project.gradient} p-5 shadow-2xl sm:rounded-[2rem] sm:p-8`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  {project.category === 'ai' ? 'AI / Machine Learning' : project.category === 'backend' ? 'Backend Development' : 'Full Stack Development'}
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white">
                  <i className={`${project.icon} text-2xl`} />
                </div>
              </div>

              <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">
                {project.name}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85 sm:mt-5 sm:text-lg sm:leading-relaxed">
                {project.longDescription}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-black"
                >
                  View Source Code
                </a>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-center text-sm font-semibold text-white"
                  >
                    Open Live Demo
                  </a>
                )}
              </div>
            </motion.div>

            <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[1.5fr_1fr]">
              <motion.section
                className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-gray-900 sm:p-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-black dark:text-white">Project Overview</h2>
                <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>

                <h3 className="mt-8 text-xl font-bold text-black dark:text-white">Key Features</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <div
                      key={feature}
                      className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-slate-700 dark:border-gray-700 dark:bg-black/40 dark:text-slate-200"
                    >
                      {feature}
                    </div>
                  ))}
                </div>

                <h3 className="mt-8 text-xl font-bold text-black dark:text-white">Technology Stack</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.section>

              <motion.aside
                className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-gray-900 sm:p-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <h2 className="text-2xl font-bold text-black dark:text-white">Project Metrics</h2>
                <div className="mt-5 space-y-3">
                  {Object.entries(project.metrics).map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-black/40"
                    >
                      <div className="text-3xl font-bold text-black dark:text-white">{value}%</div>
                      <div className="mt-1 text-sm capitalize text-slate-500 dark:text-slate-400">{label}</div>
                    </div>
                  ))}
                </div>

                <h3 className="mt-8 text-xl font-bold text-black dark:text-white">Highlights</h3>
                <div className="mt-4 space-y-3">
                  {Object.entries(project.stats).map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3 dark:bg-black/40">
                      <span className="text-sm capitalize text-slate-500 dark:text-slate-400">{label}</span>
                      <span className="text-sm font-semibold text-black dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.aside>
            </div>

            <motion.section
              className="mt-8 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-gray-900 sm:p-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Keep Exploring
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-black dark:text-white">Jump To Another Project</h2>
                </div>
                <button
                  type="button"
                  onClick={onBack}
                  className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:text-slate-200"
                >
                  Return To Projects Section
                </button>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {seoConfig.projects
                  .filter((item) => item.slug !== project.slug)
                  .map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => onNavigateToProject?.(item.slug, { activeSlug: item.slug })}
                      className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-4 text-left transition hover:border-gray-300 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white`}>
                        <i className={item.icon} />
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-black dark:text-white">{item.shortTitle}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
                    </button>
                  ))}
              </div>
            </motion.section>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProjectPage;
