/* ═══════════════════════════════════════════════
   RK.DEV — Shared Script
   ═══════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── CUSTOM CURSOR ── */
  const cur  = document.getElementById("cur");
  const cur2 = document.getElementById("cur2");
  let mx = 0, my = 0, rx = 0, ry = 0;

  if (cur && cur2) {
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    (function loop() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      cur.style.left  = mx + "px";
      cur.style.top   = my + "px";
      cur2.style.left = rx + "px";
      cur2.style.top  = ry + "px";
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cur2.style.width       = "48px";
        cur2.style.height      = "48px";
        cur2.style.borderColor = "var(--green)";
        cur2.style.opacity     = ".8";
      });
      el.addEventListener("mouseleave", () => {
        cur2.style.width       = "32px";
        cur2.style.height      = "32px";
        cur2.style.borderColor = "var(--accent)";
        cur2.style.opacity     = ".4";
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("on"), i * 70);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ── ACTIVE NAV LINK ── */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ── SKILL BAR ANIMATION ── */
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".skill-bar-fill").forEach((bar) => {
            const pct = bar.dataset.pct || "0";
            setTimeout(() => { bar.style.width = pct + "%"; }, 200);
          });
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll(".skill-bar-list").forEach((el) => barObserver.observe(el));

  /* ── NAVBAR SCROLL SHADOW ── */
  const navEl = document.querySelector("nav");
  if (navEl) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        navEl.style.boxShadow = "0 4px 40px rgba(0,0,0,.5)";
      } else {
        navEl.style.boxShadow = "none";
      }
    }, { passive: true });
  }

  /* ── TYPED EFFECT (hero page only) ── */
  const typedEl = document.getElementById("typed-role");
  if (typedEl) {
    const phrases = [
      "DevOps Engineer",
      "Cloud Infrastructure",
      "CI/CD Automation",
      "AWS Specialist",
      "SRE Practitioner",
    ];
    let pi = 0, ci = 0, deleting = false;
    function type() {
      const current = phrases[pi];
      typedEl.textContent = deleting
        ? current.slice(0, ci--)
        : current.slice(0, ci++);
      let delay = deleting ? 60 : 90;
      if (!deleting && ci > current.length) { delay = 1800; deleting = true; }
      if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
      setTimeout(type, delay);
    }
    setTimeout(type, 1200);
  }

  /* ── CONTACT FORM (contact page only) ── */
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector(".form-submit");
      const orig = btn.textContent;
      btn.textContent = "Sending…";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "✓ Sent!";
        btn.style.background = "var(--green)";
        btn.style.color = "var(--bg)";
        form.reset();
        setTimeout(() => {
          btn.textContent = orig;
          btn.disabled = false;
          btn.style.background = "";
          btn.style.color = "";
        }, 3000);
      }, 1200);
    });
  }

  /* ── COPY EMAIL ── */
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        const orig = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = orig; }, 1500);
      });
    });
  });

})();
