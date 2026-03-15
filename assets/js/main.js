import { loadIncludes } from "./utils/load-includes.js";
import { initNavigation } from "./components/navigation.js";
import { initThemeToggle } from "./components/theme-toggle.js";
import { initHeaderScroll } from "./components/header-scroll.js";
import { initSectionObserver } from "./observers/section-observer.js";
import { initRevealObserver } from "./observers/reveal-observer.js";
import { initWhatsappFallback } from "./components/whatsapp-fallback.js";

const isMobile = typeof window !== "undefined" && window.innerWidth <= 720;

const initUI = () => {
  // Critical: Always init these
  initNavigation();
  initThemeToggle();

  // Non-critical: Defer on mobile for better initial load
  if (isMobile) {
    // Defer non-critical inits on mobile
    requestIdleCallback(
      () => {
        initHeaderScroll();
        initSectionObserver();
        initWhatsappFallback();
      },
      { timeout: 2000 },
    );

    // Reveal observer disabled on mobile (handled by CSS)
  } else {
    // Desktop: init all immediately
    initHeaderScroll();
    initSectionObserver();
    initRevealObserver();
    initWhatsappFallback();
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadIncludes();
  initUI();
});
