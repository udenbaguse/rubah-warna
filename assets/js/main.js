import { loadIncludes } from "./utils/load-includes.js";
import { initNavigation } from "./components/navigation.js";
import { initThemeToggle } from "./components/theme-toggle.js";
import { initHeaderScroll } from "./components/header-scroll.js";
import { initSectionObserver } from "./observers/section-observer.js";
import { initRevealObserver } from "./observers/reveal-observer.js";
import { initWhatsappFallback } from "./components/whatsapp-fallback.js";
import { initLazyLoadImages } from "./utils/lazy-load-images.js";

// Config object untuk URL yang reusable
const CONFIG = {
  whatsapp: {
    url: "https://wa.me/6282326480832?text=Halo%20Rubah%20Warna,%20saya%20perlu%20tukang%20cat",
    fallback:
      "https://api.whatsapp.com/send?phone=6282326480832&text=Halo%20Rubah%20Warna,%20saya%20perlu%20tukang%20cat",
    target: "_blank",
    rel: "noopener",
  },
  maps: {
    url: "https://maps.app.goo.gl/Hru2zSPsyTbUxyXx8",
  },
};

const initConfigLinks = () => {
  // Set dynamic links dari config
  document.querySelectorAll("[data-config-link]").forEach((link) => {
    const type = link.dataset.configLink;

    if (type === "whatsapp" && CONFIG.whatsapp) {
      const wa = CONFIG.whatsapp;
      link.href = wa.url;
      link.target = wa.target;
      link.rel = wa.rel;
      if (link.dataset.whatsappFallback === undefined) {
        link.dataset.whatsappFallback = wa.fallback;
      }
    } else if (type === "maps" && CONFIG.maps) {
      link.href = CONFIG.maps.url;
    }
  });
};

const isMobile = typeof window !== "undefined" && window.innerWidth <= 720;

const initUI = () => {
  initConfigLinks(); // Set config links dulu

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
        initLazyLoadImages();
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
