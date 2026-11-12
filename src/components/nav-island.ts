const THRESHOLD = 40;

export function initNavIsland() {
  const nav = document.querySelector<HTMLElement>("header.nav");
  if (!nav) return () => {};

  const sync = () => {
    nav.classList.toggle("scrolled", window.scrollY > THRESHOLD);
  };

  sync();
  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync, { passive: true });
  return () => {
    window.removeEventListener("scroll", sync);
    window.removeEventListener("resize", sync);
  };
}
