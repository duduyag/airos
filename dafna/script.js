const header = document.querySelector("[data-header]");

const setHeader = () => {
  header.classList.toggle("is-solid", window.scrollY > 28);
};

setHeader();
window.addEventListener("scroll", setHeader, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
