import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { scrollToSection } from '../utils/scrollToSection';

const skillCategories = {
  frontend: {
    title: 'Frontend Engineering',
    short: 'Frontend',
    icon: 'fas fa-laptop-code',
    blurb: 'Interfaces that feel polished, responsive, and easy to navigate.',
    summary: 'I build modern React UIs with strong visual hierarchy, responsive layouts, and reusable components.',
    points: ['Responsive UI systems', 'Clean component architecture', 'Interaction-focused design'],
    accent: 'from-black via-gray-800 to-black dark:from-white dark:via-gray-200 dark:to-white',
    skills: [
      { name: 'React.js', level: 95, icon: 'fab fa-react', note: 'Component-driven interfaces and modern flows' },
      { name: 'JavaScript', level: 90, icon: 'fab fa-js-square', note: 'Interactive product logic and dynamic behavior' },
      { name: 'HTML5', level: 95, icon: 'fab fa-html5', note: 'Semantic structure with accessibility in mind' },
      { name: 'CSS3', level: 90, icon: 'fab fa-css3-alt', note: 'Custom layouts, animations, and visual polish' },
      { name: 'Tailwind CSS', level: 88, icon: 'fas fa-wind', note: 'Fast, scalable styling systems for production UI' },
      { name: 'Java', level: 85, icon: 'fas fa-coffee', note: 'Strong programming fundamentals and OOP thinking' }
    ]
  },
  backend: {
    title: 'Backend Development',
    short: 'Backend',
    icon: 'fas fa-server',
    blurb: 'Reliable APIs, secure flows, and practical application structure.',
    summary: 'I focus on backend foundations that support scalable products, from APIs to database-driven features.',
    points: ['REST API design', 'Server-side business logic', 'Database-backed applications'],
    accent: 'from-gray-900 via-gray-700 to-black dark:from-gray-100 dark:via-white dark:to-gray-200',
    skills: [
      { name: 'Node.js', level: 85, icon: 'fab fa-node-js', note: 'Backend services and event-driven app logic' },
      { name: 'Express.js', level: 80, icon: 'fas fa-code', note: 'Routing, middleware, and service structure' },
      { name: 'MongoDB', level: 75, icon: 'fas fa-database', note: 'Flexible data models for modern web apps' },
      { name: 'MySQL', level: 70, icon: 'fas fa-database', note: 'Structured relational database design' },
      { name: 'REST APIs', level: 85, icon: 'fas fa-exchange-alt', note: 'Clean API contracts and integrations' }
    ]
  },
  tools: {
    title: 'Tools And Workflow',
    short: 'Tools',
    icon: 'fas fa-tools',
    blurb: 'A practical toolkit for building, debugging, and shipping efficiently.',
    summary: 'My workflow is built around tools that help me move quickly while keeping code quality high.',
    points: ['Version control habits', 'Debugging and testing workflow', 'Delivery-ready development process'],
    accent: 'from-gray-800 via-gray-600 to-black dark:from-gray-200 dark:via-white dark:to-gray-300',
    skills: [
      { name: 'Git And GitHub', level: 90, icon: 'fab fa-git-alt', note: 'Version control, collaboration, and project history' },
      { name: 'VS Code', level: 95, icon: 'fas fa-code', note: 'Fast coding workflow and daily productivity' },
      { name: 'Postman', level: 85, icon: 'fas fa-paper-plane', note: 'API testing and request validation' },
      { name: 'AWS', level: 65, icon: 'fab fa-aws', note: 'Cloud exposure for deployment and hosting basics' }
    ]
  }
};

const skillMetrics = [
  { label: 'Core domains', value: '3', detail: 'Frontend, backend, and tooling', icon: 'fas fa-layer-group' },
  { label: 'Main stack focus', value: 'MERN', detail: 'React, Node.js, Express, MongoDB', icon: 'fas fa-cubes' },
  { label: 'Delivery mindset', value: 'Fast', detail: 'Polished UI with practical engineering', icon: 'fas fa-bolt' }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const SkillCard = ({ skill, accent, index }) => (
  <motion.div
    variants={fadeUp}
    className="group relative overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-gray-950"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-black/[0.03] via-transparent to-black/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-white/[0.03] dark:to-white/[0.07]" />
    <div className="relative z-10">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg dark:text-black`}>
            <i className={`${skill.icon} text-lg`} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-black dark:text-white">{skill.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-gray-400 dark:text-gray-500">Skill Depth</p>
          </div>
        </div>
        <span className="text-sm font-bold text-black dark:text-white">{skill.level}%</span>
      </div>

      <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">{skill.note}</p>

      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${accent}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: index * 0.08, ease: 'easeOut' }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Growing</span>
        <span>Production Ready</span>
      </div>
    </div>
  </motion.div>
);

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const category = skillCategories[activeCategory];

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative overflow-hidden bg-white px-4 py-16 dark:bg-black sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-7rem] top-20 h-56 w-56 rounded-full bg-black/5 blur-3xl dark:bg-white/5 sm:h-72 sm:w-72" />
        <div className="absolute right-[-5rem] bottom-10 h-64 w-64 rounded-full bg-gray-200/70 blur-3xl dark:bg-gray-800/40 sm:h-80 sm:w-80" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent dark:via-white/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-white dark:border-white/15 dark:bg-white dark:text-black">
            Skills And Expertise
          </span>
          <h2
            id="skills-title"
            className="mt-5 text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl"
          >
            The stack I use to turn ideas into complete digital products.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            My strengths combine interface design, backend structure, and practical tooling so projects feel smooth
            to use and solid under the hood.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-4 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {skillMetrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={fadeUp}
              className="rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-lg dark:border-white/10 dark:bg-gray-950"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
                  <i className={metric.icon} />
                </div>
                <span className="text-2xl font-bold tracking-tight text-black dark:text-white">{metric.value}</span>
              </div>
              <p className="mt-4 text-sm font-semibold text-black dark:text-white">{metric.label}</p>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{metric.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:flex-wrap sm:justify-center sm:gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {Object.entries(skillCategories).map(([key, item]) => {
            const selected = activeCategory === key;

            return (
              <motion.button
                key={key}
                type="button"
                onClick={() => setActiveCategory(key)}
                variants={fadeUp}
                className={`shrink-0 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  selected
                    ? 'border-black bg-black text-white shadow-lg dark:border-white dark:bg-white dark:text-black'
                    : 'border-gray-200 bg-white text-black hover:border-black dark:border-white/10 dark:bg-gray-950 dark:text-white dark:hover:border-white'
                }`}
                whileTap={{ scale: 0.97 }}
                aria-pressed={selected}
                aria-controls="skills-panel"
              >
                <span className="flex items-center gap-2">
                  <i className={item.icon} />
                  {item.title}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            id="skills-panel"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
            className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
          >
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.08)] dark:border-white/10 dark:from-gray-950 dark:via-black dark:to-gray-950 sm:p-7">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.accent} text-white shadow-xl dark:text-black`}>
                  <i className={`${category.icon} text-xl`} />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
                  {category.short}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-black dark:text-white sm:text-3xl">{category.title}</h3>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">{category.blurb}</p>
                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400">{category.summary}</p>

                <div className="mt-6 space-y-3">
                  {category.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/85 px-4 py-3 text-sm font-medium text-black dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
                    >
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${category.accent} text-white dark:text-black`}>
                        <i className="fas fa-check text-xs" />
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-black bg-black p-6 text-white shadow-2xl dark:border-white dark:bg-white dark:text-black">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70 dark:text-black/60">
                  Next Step
                </p>
                <h3 className="mt-3 text-2xl font-bold">Want to see these skills in real projects?</h3>
                <p className="mt-4 text-sm leading-7 text-white/75 dark:text-black/70">
                  Explore the work section to see how these tools come together in full product builds, UI systems,
                  backend features, and AI-powered use cases.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <motion.a
                    href="#projects"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection('projects');
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] dark:bg-black dark:text-white"
                    whileTap={{ scale: 0.97 }}
                  >
                    <i className="fas fa-arrow-right" />
                    View Projects
                  </motion.a>
                  <motion.a
                    href="#contact"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection('contact');
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 dark:border-black/15 dark:text-black dark:hover:bg-black/5"
                    whileTap={{ scale: 0.97 }}
                  >
                    <i className="fas fa-paper-plane" />
                    Start A Conversation
                  </motion.a>
                </div>
              </div>
            </div>

            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {category.skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  accent={category.accent}
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
