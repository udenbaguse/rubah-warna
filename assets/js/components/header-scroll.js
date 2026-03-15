export const initHeaderScroll = () => {
  const header = document.querySelector(".site-header");
  if (!header) {
    return;
  }

  // On mobile, reduce scroll frequency for better performance
  const isMobile = window.innerWidth <= 720;
  let ticking = false;
  let lastScrollY = 0;

  const handleHeader = () => {
    const scrolled = window.scrollY > 20;
    header.classList.toggle("scrolled", scrolled);
    ticking = false;
  };

  const onScroll = () => {
    if (isMobile) {
      // Throttle scroll events on mobile
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleHeader();
          lastScrollY = window.scrollY;
        });
        ticking = true;
      }
    } else {
      // Desktop: direct handling
      handleHeader();
    }
  };

  handleHeader();

  // Use passive listener for better scroll performance
  window.addEventListener("scroll", onScroll, { passive: true });
};
