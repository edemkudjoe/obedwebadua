/* =========================================================
   ojfx — portfolio scripts
   No dependencies. Handles: mobile nav, theme toggle
   (persisted to localStorage), smooth scroll, footer year,
   back-to-top.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Work grid: See more ---------- */
  const seeMoreBtn = document.getElementById("SeeMoreBtn");
  if (seeMoreBtn) {
    seeMoreBtn.addEventListener("click", () => {
      const hiddenItems = document.querySelectorAll(".hidden-work");
      const isExpanding = seeMoreBtn.classList.contains("is-collapsed") === false;

      hiddenItems.forEach((item) => {
      item.style.display = isExpanding ? "block" : "none";
    });

    seeMoreBtn.classList.toggle("is-collapsed");
    seeMoreBtn.innerHTML = isExpanding
      ? 'Show less<span class="btn-arrow">↑</span>'
      : 'See more work<span class="btn-arrow">↓</span>';

    // If collapsing, scroll back up to the work section heading
    if (!isExpanding) {
      document.getElementById("work").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  }
  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");

  const closeNav = () => {
    navList.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu whenever a nav link is used
  navList.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ---------- Theme toggle (light / dark), persisted ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeToggleLabel");
  const STORAGE_KEY = "ojfx-theme";

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    themeLabel.textContent = theme === "light" ? "LIGHT" : "DARK";
    themeToggle.setAttribute("aria-pressed", String(theme === "light"));
  };

  // Respect a saved preference; otherwise fall back to system preference
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    applyTheme("light");
  }

  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  /* ---------- Sticky header shadow on scroll ---------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    header.style.borderBottomColor = window.scrollY > 8
      ? "var(--border)"
      : "transparent";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Footer year ---------- */
  document.getElementById("footerYear").textContent = new Date().getFullYear();

  /* ---------- Back to top ---------- */
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
