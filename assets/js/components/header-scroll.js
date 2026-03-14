export const initHeaderScroll = () => {
  const header = document.querySelector(".site-header");
  if (!header) {
    return;
  }

  const handleHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  handleHeader();
  window.addEventListener("scroll", handleHeader);
};
