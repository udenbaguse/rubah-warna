/**
 * Lazy load portfolio images on mobile
 * Only loads background images when user scrolls near
 */
export const initLazyLoadImages = () => {
  const isMobile = window.innerWidth <= 720;

  if (!isMobile) return; // Skip on desktop/tablet

  // Images to lazy load
  const imageConfigs = [
    {
      selector: ".img-1",
      url: "assets/images/projects/project-1.png",
    },
    {
      selector: ".img-2",
      url: "assets/images/projects/project-2.png",
    },
    {
      selector: ".img-3",
      url: "assets/images/projects/project-3.png",
    },
  ];

  // Use IntersectionObserver for lazy loading
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const config = imageConfigs.find((c) =>
            entry.target.classList.contains(c.selector.replace(".", "")),
          );
          if (config) {
            entry.target.style.backgroundImage = `url("${config.url}")`;
            observer.unobserve(entry.target);
          }
        }
      });
    },
    {
      rootMargin: "200px",
      threshold: 0.01,
    },
  );

  // Observe all portfolio images
  document.querySelectorAll(".portfolio-image").forEach((el) => {
    observer.observe(el);
  });
};
