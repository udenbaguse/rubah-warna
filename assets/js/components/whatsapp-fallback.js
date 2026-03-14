export const initWhatsappFallback = () => {
  document.querySelectorAll("a[data-whatsapp-fallback]").forEach((link) => {
    link.addEventListener("click", () => {
      const fallback = link.getAttribute("data-whatsapp-fallback");
      if (!fallback) {
        return;
      }
      const target = link.getAttribute("target") || "_blank";
      setTimeout(() => {
        if (document.visibilityState === "visible") {
          window.open(fallback, target, "noopener");
        }
      }, 900);
    });
  });
};
