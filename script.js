// ===== DOM READY =====
document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // 1️⃣ Fade-In Animation (Improved)
  // ==============================
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  fadeElements.forEach(el => {
    observer.observe(el);
  });


  // ==============================
  // 2️⃣ Expand / Collapse Sections
  // ==============================
  const expandButtons = document.querySelectorAll(".expand-btn");

  expandButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;

      if (content.style.display === "block") {
        content.style.display = "none";
        btn.textContent = "View Details";
      } else {
        content.style.display = "block";
        btn.textContent = "Hide Details";
      }
    });
  });


  // ==============================
  // 3️⃣ Smooth Scroll (Internal Links)
  // ==============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });


  // ==============================
  // 4️⃣ Navbar Shadow on Scroll
  // ==============================
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.6)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });

});