import { loadIncludes } from "./utils/load-includes.js";
import { initNavigation } from "./components/navigation.js";
import { initThemeToggle } from "./components/theme-toggle.js";
import { initHeaderScroll } from "./components/header-scroll.js";
import { initSectionObserver } from "./observers/section-observer.js";
import { initRevealObserver } from "./observers/reveal-observer.js";
import { initWhatsappFallback } from "./components/whatsapp-fallback.js";

const initUI = () => {
  initNavigation();
  initThemeToggle();
  initHeaderScroll();
  initSectionObserver();
  initRevealObserver();
  initWhatsappFallback();
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadIncludes();
  initUI();
});
