export const initSectionObserver = () => {
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

  if (!sectionMap.size) {
    return;
  }

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
};
