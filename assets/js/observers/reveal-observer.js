export const initRevealObserver = () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // On mobile, use simpler reveal or disable for performance
  const isMobile = window.innerWidth <= 720;

  if (prefersReducedMotion || isMobile) {
    // Show all reveals immediately on mobile/reduced motion
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("show");
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  // Desktop: use intersection observer with higher threshold for better performance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // Stop observing after reveal
        }
      });
    },
    {
      threshold: 0.1, // Lower threshold for faster reveal
      rootMargin: "50px", // Start revealing slightly before visible
    },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
};
