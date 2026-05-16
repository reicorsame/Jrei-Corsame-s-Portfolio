(function () {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  /* Light Mode Saver */
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    toggle.textContent = "🌙";
  }

  toggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    toggle.textContent = isLight ? "🌙" : "☀️";
  });

  /* Highlight the current page link */
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href && window.location.pathname.toLowerCase().endsWith(href.toLowerCase())) {
      link.classList.add("active");
    }
  });

  
})();