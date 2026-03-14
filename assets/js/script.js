const loadIncludes = async () => {
  const includeTargets = document.querySelectorAll("[data-include]");
  await Promise.all(
    Array.from(includeTargets).map(async (el) => {
      const file = el.getAttribute("data-include");
      if (!file) {
        return;
      }
      const response = await fetch(file);
      el.innerHTML = await response.text();
    })
  );
};

const initUI = () => {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector(".site-header");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeLabel = themeToggle ? themeToggle.querySelector(".theme-label") : null;

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      toggle.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          const target = document.querySelector(href);
          if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
        navLinks.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    }
    if (themeLabel) {
      themeLabel.textContent = theme === "dark" ? "Gelap" : "Terang";
    }
  };

  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  const handleHeader = () => {
    if (!header) {
      return;
    }
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  handleHeader();
  window.addEventListener("scroll", handleHeader);

  const navItems = Array.from(document.querySelectorAll(".nav-link"));
  const sectionMap = new Map(
    navItems
      .map((link) => {
        const id = link.getAttribute("href");
        if (!id || !id.startsWith("#")) {
          return null;
        }
        const section = document.querySelector(id);
        return section ? [section, link] : null;
      })
      .filter(Boolean)
  );

  if (sectionMap.size) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navItems.forEach((item) => item.classList.remove("active"));
            const link = sectionMap.get(entry.target);
            if (link) {
              link.classList.add("active");
            }
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sectionMap.forEach((_, section) => navObserver.observe(section));
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.reset();
      alert("Terima kasih! Tim Rubah Warna akan menghubungi Anda segera.");
    });
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadIncludes();
  initUI();
});
