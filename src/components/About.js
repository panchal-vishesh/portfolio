import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '../utils/scrollToSection';

const highlights = [
  { label: 'Based In',       value: 'Ahmedabad, India',                    icon: 'fas fa-location-dot' },
  { label: 'Current Focus',  value: 'MERN + AI Products',                  icon: 'fas fa-layer-group'  },
  { label: 'Availability',   value: 'Open to freelance & full-time roles',  icon: 'fas fa-briefcase'    },
];

const stats = [
  { number: '4+',    label: 'Production Builds',   detail: 'From portfolio systems to full-stack apps',        icon: 'fas fa-cubes'   },
  { number: '79.2%', label: 'AI Model Accuracy',   detail: 'Deepfake detection in a real project setup',       icon: 'fas fa-brain'   },
  { number: '5+',    label: 'Core Technologies',   detail: 'React, Node.js, MongoDB, Express, Python',         icon: 'fas fa-code'    },
  { number: '100%',  label: 'Build Mindset',        detail: 'Clean UI, practical systems, user-first thinking', icon: 'fas fa-bolt'    },
];

const strengths = [
  { name: 'Frontend Systems', level: 95, description: 'Responsive React interfaces with clean component structure',      icon: 'fas fa-laptop-code' },
  { name: 'Backend Logic',    level: 88, description: 'APIs, auth, data flow, and scalable application structure',       icon: 'fas fa-server'      },
  { name: 'Product Thinking', level: 84, description: 'Balancing performance, usability, and business needs',            icon: 'fas fa-lightbulb'   },
  { name: 'AI Integration',   level: 82, description: 'Practical ML-backed features inside web products',                icon: 'fas fa-microchip'   },
];

const timeline = [
  { title: 'Build modern user experiences',      text: 'Interfaces that feel fast, clear, and polished across desktop and mobile.'                          },
  { title: 'Turn ideas into full-stack products', text: 'From frontend flows to backend APIs, connecting the whole system into one reliable experience.'     },
  { title: 'Keep learning with real projects',   text: 'Each project is a chance to improve architecture, code quality, and problem-solving depth.'          },
];

const whyCards = [
  { title: 'Clean component thinking', text: 'Readable code and maintainable UI structure.'       },
  { title: 'Responsive by default',    text: 'Layouts tuned for mobile, tablet, and desktop.'     },
  { title: 'Performance focused',      text: 'Fast load times and smooth 60fps interactions.'     },
  { title: 'User-first mindset',       text: 'Every decision starts with the end-user experience.' },
];

const fadeUp = {
  hidden:   { opacity: 0, y: 28 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* animated counter */
const StatCard = ({ stat }) => (
  <motion.div
    variants={fadeUp}
    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-gray-950"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-black/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-white/[0.03] dark:to-white/[0.07]" />
    <div className="relative z-10 flex items-start justify-between gap-3">
      <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white text-sm dark:bg-white dark:text-black">
        <i className={stat.icon} />
      </div>
      <span className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">{stat.number}</span>
    </div>
    <p className="relative z-10 mt-3 text-sm font-semibold text-black dark:text-white">{stat.label}</p>
    <p className="relative z-10 mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">{stat.detail}</p>
  </motion.div>
);

/* collapsible strength bar */
const StrengthBar = ({ strength, index }) => (
  <motion.div
    variants={fadeUp}
    className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]"
  >
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white text-sm shadow-md dark:bg-white dark:text-black">
        <i className={strength.icon} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm sm:text-base font-semibold text-black dark:text-white truncate">{strength.name}</h4>
          <span className="shrink-0 text-sm font-bold text-black dark:text-white">{strength.level}%</span>
        </div>
        <p className="mt-0.5 text-xs leading-5 text-gray-500 dark:text-gray-400 line-clamp-2">{strength.description}</p>
      </div>
    </div>
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-black via-gray-700 to-black dark:from-white dark:via-gray-300 dark:to-white"
        initial={{ width: 0 }}
        whileInView={{ width: `${strength.level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: index * 0.1, ease: 'easeOut' }}
      />
    </div>
  </motion.div>
);

const About = () => {
  const [activeTab, setActiveTab] = useState('story');

  const tabs = [
    { id: 'story',     label: 'My Story',   icon: 'fas fa-user'        },
    { id: 'strengths', label: 'Strengths',  icon: 'fas fa-star'        },
    { id: 'why',       label: 'Why Me',     icon: 'fas fa-handshake'   },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-white px-3 py-14 dark:bg-black sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-16 h-56 w-56 rounded-full bg-black/5 blur-3xl dark:bg-white/5 sm:h-72 sm:w-72" />
        <div className="absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-gray-200/60 blur-3xl dark:bg-gray-800/40 sm:h-80 sm:w-80" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent dark:via-white/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ── Heading ── */}
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-white dark:border-white/15 dark:bg-white dark:text-black">
            <i className="fas fa-user" /> About Me
          </span>
          <h2
            id="about-title"
            className="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
          >
            Building thoughtful digital products with clean engineering.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300 px-2">
            I'm{' '}
            <span className="font-semibold text-black dark:text-white" itemProp="name">Vishesh Panchal</span>,
            a <span itemProp="jobTitle">full-stack developer</span> focused on MERN stack, AI-backed features,
            and modern web experiences that feel smooth, useful, and production-ready.
          </p>
        </motion.div>

        {/* ── Highlight chips ── */}
        <motion.div
          className="mb-8 sm:mb-12 flex flex-wrap justify-center gap-2 sm:gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {highlights.map((h) => (
            <motion.div
              key={h.label}
              variants={fadeUp}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 sm:px-4 shadow-sm dark:border-white/10 dark:bg-gray-950"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white text-xs dark:bg-white dark:text-black">
                <i className={h.icon} />
              </div>
              <div className="leading-none">
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">{h.label}</p>
                <p className="mt-0.5 text-xs font-semibold text-black dark:text-white">{h.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Stats grid ── */}
        <motion.div
          className="mb-8 sm:mb-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
        </motion.div>

        {/* ── Mobile tabs / Desktop two-col ── */}
        <div className="lg:hidden">
          {/* tab bar */}
          <div className="mb-5 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-xs font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                    : 'border-gray-200 bg-white text-black dark:border-gray-700 dark:bg-gray-900 dark:text-white'
                }`}
              >
                <i className={tab.icon} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* tab panels */}
          <AnimatePresence mode="wait">
            {activeTab === 'story' && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* bio card */}
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-5 shadow-md dark:border-white/10 dark:from-gray-950 dark:via-black dark:to-gray-950">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white dark:bg-white dark:text-black">Full-Stack Developer</span>
                    <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-medium text-gray-600 dark:border-white/10 dark:text-gray-300">MERN / AI / UI Systems</span>
                  </div>
                  <div className="space-y-3 text-sm leading-7 text-gray-700 dark:text-gray-300" itemProp="description">
                    <p>I enjoy building interfaces that feel premium without becoming heavy or confusing. My work blends polished frontend detail with backend logic so the final product is attractive, reliable, and easy to use.</p>
                    <p>I've worked on e-commerce flows, AI-powered features, secure application structure, and responsive layouts — turning complex requirements into simple experiences.</p>
                    <p>Right now I'm focused on cleaner architecture, stronger UX decisions, and scalable development habits for high-impact freelance work and full-time roles.</p>
                  </div>
                </div>

                {/* working style */}
                <div className="rounded-2xl border border-black bg-black p-5 text-white dark:border-white dark:bg-white dark:text-black">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 dark:text-black/50 mb-4">Working Style</p>
                  <div className="space-y-4">
                    {timeline.map((item, i) => (
                      <div key={item.title} className="relative pl-6">
                        <span className="absolute left-0 top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-white dark:bg-black">
                          <span className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
                        </span>
                        {i < timeline.length - 1 && (
                          <span className="absolute left-[5px] top-4 h-[calc(100%+0.5rem)] w-px bg-white/20 dark:bg-black/20" />
                        )}
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="mt-0.5 text-xs leading-5 text-white/70 dark:text-black/65">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'strengths' && (
              <motion.div
                key="strengths"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md dark:border-white/10 dark:bg-gray-950 space-y-3"
              >
                <div className="mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Core Strengths</p>
                  <h3 className="mt-1 text-lg font-bold text-black dark:text-white">What I bring to a project</h3>
                </div>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="space-y-3"
                >
                  {strengths.map((s, i) => <StrengthBar key={s.name} strength={s} index={i} />)}
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'why' && (
              <motion.div
                key="why"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-black bg-black p-5 text-white dark:border-white dark:bg-white dark:text-black"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 dark:text-black/50">Why Work With Me</p>
                <h3 className="mt-2 text-lg font-bold">I care about both the code and the experience.</h3>
                <p className="mt-3 text-sm leading-6 text-white/75 dark:text-black/70">
                  I ship products that feel clean visually, stay structured under the hood, and solve real problems without unnecessary complexity.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-2 xs:grid-cols-2">
                  {whyCards.map((card) => (
                    <div key={card.title} className="rounded-xl border border-white/10 bg-white/5 p-3 dark:border-black/10 dark:bg-black/5">
                      <p className="text-xs font-bold">{card.title}</p>
                      <p className="mt-1 text-xs text-white/65 dark:text-black/60 leading-5">{card.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-1 gap-2 xs:grid-cols-2">
                  <motion.a
                    href="#projects"
                    onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                    className="flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black transition hover:opacity-90 active:scale-95 dark:bg-black dark:text-white"
                    whileTap={{ scale: 0.97 }}
                  >
                    <i className="fas fa-arrow-right" /> View Projects
                  </motion.a>
                  <motion.a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 active:scale-95 dark:border-black/20 dark:text-black dark:hover:bg-black/5"
                    whileTap={{ scale: 0.97 }}
                  >
                    <i className="fas fa-paper-plane" /> Let's Connect
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Desktop two-column layout ── */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">

          {/* left col */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            {/* bio */}
            <motion.div
              variants={fadeUp}
              className="overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.08)] dark:border-white/10 dark:from-gray-950 dark:via-black dark:to-gray-950"
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="rounded-full bg-black px-3 py-1 text-xs font-bold uppercase tracking-widest text-white dark:bg-white dark:text-black">Full-Stack Developer</span>
                <span className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-gray-600 dark:border-white/10 dark:text-gray-300">MERN / AI / UI Systems</span>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-4 text-base leading-8 text-gray-700 dark:text-gray-300" itemProp="description">
                  <p>I enjoy building interfaces that feel premium without becoming heavy or confusing. My work blends polished frontend detail with backend logic so the final product is attractive, reliable, and easy to use.</p>
                  <p>I've worked on e-commerce flows, AI-powered features, secure application structure, and responsive layouts — turning complex requirements into simple experiences people understand quickly.</p>
                  <p>Right now I'm focused on cleaner architecture, stronger UX decisions, and scalable development habits for high-impact freelance work and full-time roles.</p>
                </div>

                {/* working style */}
                <div className="rounded-[1.75rem] border border-black/10 bg-black p-5 text-white shadow-2xl dark:border-white/10 dark:bg-white dark:text-black">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/65 dark:text-black/55 mb-5">Working Style</p>
                  <div className="space-y-4">
                    {timeline.map((item, i) => (
                      <div key={item.title} className="relative pl-6">
                        <span className="absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white dark:bg-black">
                          <span className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
                        </span>
                        {i < timeline.length - 1 && (
                          <span className="absolute left-[6px] top-5 h-[calc(100%+0.75rem)] w-px bg-white/20 dark:bg-black/20" />
                        )}
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-white/70 dark:text-black/65">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
            </motion.div>
          </motion.div>

          {/* right col */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {/* strengths */}
            <motion.div
              variants={fadeUp}
              className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-7 shadow-[0_20px_70px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-gray-950"
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gray-400 dark:text-gray-500">Core Strengths</p>
                  <h3 className="mt-1.5 text-2xl font-bold text-black dark:text-white">What I bring to a project</h3>
                </div>
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black p-3">
                  <i className="fas fa-star text-lg" />
                </div>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="space-y-4"
              >
                {strengths.map((s, i) => <StrengthBar key={s.name} strength={s} index={i} />)}
              </motion.div>
            </motion.div>

            {/* why me */}
            <motion.div
              variants={fadeUp}
              className="rounded-[2rem] border border-black bg-black p-7 text-white shadow-2xl dark:border-white dark:bg-white dark:text-black"
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65 dark:text-black/55">Why Work With Me</p>
              <h3 className="mt-3 text-2xl font-bold">I care about both the code and the experience.</h3>
              <p className="mt-3 text-sm leading-7 text-white/75 dark:text-black/70">
                I ship products that feel clean visually, stay structured under the hood, and solve real problems without unnecessary complexity.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {whyCards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 dark:border-black/10 dark:bg-black/5">
                    <p className="text-sm font-semibold">{card.title}</p>
                    <p className="mt-1 text-sm text-white/65 dark:text-black/60 leading-5">{card.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:opacity-90 hover:scale-[1.02] active:scale-95 dark:bg-black dark:text-white"
                  whileTap={{ scale: 0.97 }}
                >
                  <i className="fas fa-arrow-right" /> View Projects
                </motion.a>
                <motion.a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 active:scale-95 dark:border-black/15 dark:text-black dark:hover:bg-black/5"
                  whileTap={{ scale: 0.97 }}
                >
                  <i className="fas fa-paper-plane" /> Let's Work Together
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
