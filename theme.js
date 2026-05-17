(function () {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    toggle.textContent = "🌙";
  }

  toggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    toggle.textContent = isLight ? "🌙" : "☀️";
  });

  /* Highlight current page link */
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href && window.location.pathname.toLowerCase().endsWith(href.toLowerCase())) {
      link.classList.add("active");
    }
  });

  /* Intersection Observer for fade-in elements */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  /* Shared modal logic */
  function setupModal() {
    const modal = document.getElementById("imageModal");
    if (!modal) return;
    const modalImg = document.getElementById("zoomedImage");
    const caption = document.getElementById("modalCaption");
    const closeBtn = document.getElementById("modalClose");

    function openModal(src, label) {
      modalImg.src = src;
      if (caption && label) caption.textContent = label;
      modal.style.display = "flex";
      document.body.classList.add("no-scroll");
    }

    function closeModal() {
      modal.style.display = "none";
      document.body.classList.remove("no-scroll");
      setTimeout(() => { modalImg.src = ""; }, 300);
    }

    /* Gallery cards */
    document.querySelectorAll(".gallery-card").forEach(card => {
      card.addEventListener("click", () =>
        openModal(card.dataset.src, card.dataset.label)
      );
    });

    /* Resume preview */
    const resumePreview = document.getElementById("resumePreview");
    if (resumePreview) {
      resumePreview.addEventListener("click", () =>
        openModal(resumePreview.src, "Resume")
      );
    }

    /* Close triggers */
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && modal.style.display === "flex") closeModal();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupModal);
  } else {
    setupModal();
  }
})();