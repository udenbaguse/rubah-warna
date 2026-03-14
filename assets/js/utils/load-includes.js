export const loadIncludes = async () => {
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
