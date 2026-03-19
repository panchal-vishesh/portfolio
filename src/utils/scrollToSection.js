export const HEADER_OFFSET = 96;

export const scrollToSection = (sectionId, options = {}) => {
  if (typeof window === 'undefined') {
    return false;
  }

  const {
    behavior = 'smooth',
    updateHash = true,
    offset = HEADER_OFFSET
  } = options;

  const element = document.getElementById(sectionId);

  if (!element) {
    return false;
  }

  const top = Math.max(element.getBoundingClientRect().top + window.scrollY - offset, 0);

  window.scrollTo({
    top,
    left: 0,
    behavior
  });

  if (updateHash) {
    const nextUrl = sectionId === 'home' ? '/' : `/#${sectionId}`;
    window.history.replaceState(window.history.state, '', nextUrl);
  }

  return true;
};
