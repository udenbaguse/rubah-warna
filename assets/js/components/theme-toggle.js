export const initThemeToggle = () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeLabel = themeToggle
    ? themeToggle.querySelector(".theme-label")
    : null;

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
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  if (!themeToggle) {
    return;
  }

  // Use pointerup for faster response on mobile
  themeToggle.addEventListener("pointerup", (e) => {
    e.preventDefault(); // Prevent double-fire with click
    const current =
      document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });

  // Fallback for keyboard navigation
  themeToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const current =
        document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);
    }
  });
};
