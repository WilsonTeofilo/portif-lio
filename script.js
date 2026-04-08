document.addEventListener("DOMContentLoaded", () => {

  /* ---- ANO NO FOOTER ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  /* ---- CONTADOR DE EXPERIÊNCIA (HUD money) ---- */
  const counterEl = document.getElementById("expCounter");
  if (counterEl) {
    const target = 4;
    let current = 0;
    const step = () => {
      if (current < target) {
        current++;
        counterEl.textContent = current;
        setTimeout(step, 120);
      }
    };
    setTimeout(step, 800);
  }

  /* ---- INTERSECTION OBSERVER — ATIVAR SEÇÕES ---- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".hud-navlink");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Adiciona classe visible para animar entrada
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }

        // Atualiza nav ativo
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            link.classList.toggle("active", href === `#${id}`);
          });
        }
      });
    },
    {
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.15,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* ---- MENU P3 — hover ilumina item ---- */
  const menuItems = document.querySelectorAll(".p3-menu-item[data-index]");
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      menuItems.forEach((i) => i.classList.remove("hover-active"));
      item.classList.add("hover-active");
    });
    item.addEventListener("mouseleave", () => {
      item.classList.remove("hover-active");
    });
  });

  /* ---- EFEITO DE SCANLINE ao scroll ---- */
  const scanline = document.createElement("div");
  scanline.style.cssText = `
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: rgba(0,200,255,0.4);
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.1s;
  `;
  document.body.appendChild(scanline);

  let scrollTimer;
  window.addEventListener("scroll", () => {
    scanline.style.opacity = "1";
    scanline.style.top = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + "vh";
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => { scanline.style.opacity = "0"; }, 300);
  }, { passive: true });

  /* ---- FORMULÁRIO ---- */
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector(".p3-btn");
      const original = btn.textContent;

      btn.textContent = "✓ MENSAGEM ENVIADA";
      btn.style.borderColor = "#66ff66";
      btn.style.color = "#66ff66";

      setTimeout(() => {
        btn.textContent = original;
        btn.style.borderColor = "";
        btn.style.color = "";
        form.reset();
      }, 3000);
    });
  }

  /* ---- EFEITO GLITCH no brand/nome ---- */
  const menuSelected = document.querySelector(".p3-menu-item.selected .menu-text");
  if (menuSelected) {
    setInterval(() => {
      menuSelected.style.textShadow = `
        ${(Math.random() * 6 - 3).toFixed(1)}px 0 #ff0044,
        ${(Math.random() * 6 - 3).toFixed(1)}px 0 #00ccff
      `;
      setTimeout(() => {
        menuSelected.style.textShadow = "";
      }, 80);
    }, 4000);
  }

  /* ---- MISSION CARDS — navegação por teclado ---- */
  const missionCards = document.querySelectorAll(".mission-card");
  missionCards.forEach((card) => {
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        card.style.transform = "scale(0.98)";
        setTimeout(() => { card.style.transform = ""; }, 150);
      }
    });
  });

  /* ---- PARTY MEMBERS — entrada em cascata ao aparecer ---- */
  const partyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const members = entry.target.querySelectorAll(".party-member");
        members.forEach((m, i) => {
          m.style.opacity = "0";
          m.style.transform = "translateX(-30px)";
          setTimeout(() => {
            m.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            m.style.opacity = "1";
            m.style.transform = "translateX(0)";
          }, i * 120);
        });
        partyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const partyList = document.querySelector(".party-list");
  if (partyList) partyObserver.observe(partyList);

  /* ---- SKILL ROWS — entrada em cascata ---- */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rows = entry.target.querySelectorAll(".skill-row");
        rows.forEach((r, i) => {
          r.style.opacity = "0";
          r.style.transform = "translateX(-20px)";
          setTimeout(() => {
            r.style.transition = "opacity 0.35s ease, transform 0.35s ease";
            r.style.opacity = "1";
            r.style.transform = "translateX(0)";
          }, i * 80);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const skillsParty = document.querySelector(".skills-party");
  if (skillsParty) skillObserver.observe(skillsParty);

});
