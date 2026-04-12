import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { t, labels } from '../utils/i18n';

const contactInfo = [
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    value: 'visheshpanchal864@gmail.com',
    detail: 'Best for freelance work, collaborations, and hiring conversations.',
    link: 'mailto:visheshpanchal864@gmail.com'
  },
  {
    icon: 'fas fa-location-dot',
    label: 'Location',
    value: 'Ahmedabad, India',
    detail: 'Working remotely with clients, teams, and founders worldwide.',
    link: null
  },
  {
    icon: 'fas fa-briefcase',
    label: 'Status',
    value: 'Open to opportunities',
    detail: 'Available for freelance projects and full-time roles.',
    link: null
  }
];

const contactHighlights = [
  { label: 'Reply focus', value: 'Clear and fast', icon: 'fas fa-reply' },
  { label: 'Project type', value: 'Web apps and UI systems', icon: 'fas fa-window-maximize' },
  { label: 'Collaboration', value: 'Freelance and long-term', icon: 'fas fa-handshake' }
];

const socialLinks = [
  { icon: 'fab fa-github', url: 'https://github.com/visheshpanchal27', label: 'GitHub' },
  { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/vishesh-panchal-144281353', label: 'LinkedIn' },
  { icon: 'fab fa-twitter', url: 'https://twitter.com/visheshpanchal', label: 'Twitter' }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await emailjs.send(
        'service_rad30ti',
        'template_6sww8lv',
        formData,
        'u92ZvICoQgvFk7T10'
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-white px-4 py-14 dark:bg-black sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-7rem] top-16 h-56 w-56 rounded-full bg-black/5 blur-3xl dark:bg-white/5 sm:h-72 sm:w-72" />
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
            Let's Work Together
          </span>
          <h2
            id="contact-title"
            className="mt-5 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl"
          >
            Ready to build something modern, useful, and memorable?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            If you have a product idea, freelance project, redesign, or development opportunity, let's talk about
            how we can turn it into a clean and high-impact experience.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {contactHighlights.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="rounded-[1.75rem] border border-gray-200 bg-white p-5 shadow-lg dark:border-white/10 dark:bg-gray-950"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
                  <i className={item.icon} />
                </div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                  {item.label}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold text-black dark:text-white">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.08)] dark:border-white/10 dark:from-gray-950 dark:via-black dark:to-gray-950 sm:p-7"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-black via-gray-800 to-black text-white shadow-xl dark:from-white dark:via-gray-200 dark:to-white dark:text-black">
                <i className="fas fa-comments text-xl" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
                Contact Details
              </p>
              <h3 className="mt-2 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Start the conversation
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                I enjoy working on thoughtful digital products, clean interfaces, full-stack features, and practical
                improvements that make a project feel more complete.
              </p>

              <div className="mt-6 space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="rounded-[1.5rem] border border-black/10 bg-white/85 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-lg dark:bg-white dark:text-black">
                        <i className={info.icon} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400 dark:text-gray-500">
                          {info.label}
                        </p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="mt-2 block break-all text-sm font-semibold text-black transition-colors hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="mt-2 text-sm font-semibold text-black dark:text-white">{info.value}</p>
                        )}
                        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{info.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-[2rem] border border-black bg-black p-6 text-white shadow-2xl dark:border-white dark:bg-white dark:text-black"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70 dark:text-black/60">
                Follow Me
              </p>
              <h3 className="mt-3 text-2xl font-bold">Stay connected beyond email.</h3>
              <p className="mt-4 text-sm leading-7 text-white/75 dark:text-black/70">
                You can also reach out through social platforms to see my work, connect professionally, or start a
                conversation there first.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 dark:border-black/15 dark:text-black dark:hover:bg-black/5 xs:w-auto"
                    whileTap={{ scale: 0.97 }}
                  >
                    <i className={social.icon} />
                    {social.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-gray-200 bg-white p-5 shadow-[0_20px_70px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-gray-950 sm:p-7"
            >
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
                  Send Message
                </p>
                <h3 className="mt-2 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Tell me about your project
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                  Share what you are building, what you need help with, and the kind of outcome you want. I will get
                  back to you as soon as possible.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    {t('name', labels.name)}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-4 text-black outline-none transition-all duration-300 focus:border-black focus:bg-white dark:border-white/10 dark:bg-black/50 dark:text-white dark:focus:border-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    {t('email', labels.email)}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-4 text-black outline-none transition-all duration-300 focus:border-black focus:bg-white dark:border-white/10 dark:bg-black/50 dark:text-white dark:focus:border-white"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-4 text-black outline-none transition-all duration-300 focus:border-black focus:bg-white dark:border-white/10 dark:bg-black/50 dark:text-white dark:focus:border-white"
                  placeholder="Project discussion, redesign, collaboration..."
                />
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  {t('message', labels.message)}
                </label>
                <textarea
                  name="message"
                  rows="7"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full resize-none rounded-2xl border border-gray-300 bg-gray-50 px-4 py-4 text-black outline-none transition-all duration-300 focus:border-black focus:bg-white dark:border-white/10 dark:bg-black/50 dark:text-white dark:focus:border-white"
                  placeholder="Tell me about your project goals, timeline, or what kind of help you need..."
                />
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  className="mt-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/20 dark:text-green-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <i className="fas fa-check-circle mr-2" />
                  Message sent successfully. I will get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <i className="fas fa-exclamation-circle mr-2" />
                  Failed to send message. Please try again or email me directly.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-black via-gray-900 to-black px-6 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.01] dark:from-white dark:via-gray-100 dark:to-white dark:text-black disabled:cursor-not-allowed disabled:opacity-50"
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin dark:border-black/20 dark:border-t-black" />
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
