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
      selector: '.img-1',
      url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80'
    },
    {
      selector: '.img-2',
      url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80'
    },
    {
      selector: '.img-3',
      url: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=900&q=80'
    }
  ];

  // Use IntersectionObserver for lazy loading
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const config = imageConfigs.find(c => entry.target.classList.contains(c.selector.replace('.', '')));
          if (config) {
            entry.target.style.backgroundImage = `linear-gradient(120deg, rgba(224, 122, 95, 0.5), rgba(61, 64, 91, 0.3)), url("${config.url}")`;
            observer.unobserve(entry.target);
          }
        }
      });
    },
    {
      rootMargin: '200px', // Start loading 200px before visible
      threshold: 0.01
    }
  );

  // Observe all portfolio images
  document.querySelectorAll('.portfolio-image').forEach((el) => {
    observer.observe(el);
  });
};
