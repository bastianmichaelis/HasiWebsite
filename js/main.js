/* =========================================================
   Lena Hartmann Fotografie – Interaktionen
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Header: Scroll-Zustand ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile Navigation ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-locked", open);
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-locked");
      })
    );
  }

  /* ---------- Aktiven Menüpunkt markieren ---------- */
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    }
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Portfolio-Filter ---------- */
  const filter = document.querySelector("[data-filter]");
  const galleryItems = Array.from(document.querySelectorAll(".gallery__item"));
  if (filter) {
    filter.addEventListener("click", (ev) => {
      const btn = ev.target.closest("button[data-cat]");
      if (!btn) return;
      filter.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b === btn));
      const cat = btn.dataset.cat;
      galleryItems.forEach((item) => {
        const show = cat === "alle" || item.dataset.cat === cat;
        item.classList.toggle("is-hidden", !show);
      });
    });
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.querySelector(".lightbox");
  if (lightbox && galleryItems.length) {
    const img = lightbox.querySelector(".lightbox__img");
    const cap = lightbox.querySelector(".lightbox__caption");
    const counter = lightbox.querySelector(".lightbox__counter");
    let index = 0;
    let lastFocus = null;

    const visibleItems = () => galleryItems.filter((i) => !i.classList.contains("is-hidden"));

    const render = () => {
      const items = visibleItems();
      const item = items[index];
      if (!item) return;
      const source = item.querySelector("img");
      img.src = item.dataset.full || source.src;
      img.alt = source.alt || "";
      const title = item.querySelector("figcaption strong");
      const label = item.querySelector("figcaption span");
      cap.innerHTML = (title ? `<strong>${title.textContent}</strong>` : "") + (label ? label.textContent : "");
      counter.textContent = `${index + 1} / ${items.length}`;
    };

    const open = (item) => {
      index = visibleItems().indexOf(item);
      if (index < 0) index = 0;
      lastFocus = document.activeElement;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      render();
      lightbox.querySelector(".lightbox__close").focus();
    };
    const close = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      if (lastFocus) lastFocus.focus();
    };
    const step = (dir) => {
      const n = visibleItems().length;
      index = (index + dir + n) % n;
      render();
    };

    galleryItems.forEach((item) => {
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      item.addEventListener("click", () => open(item));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(item); }
      });
    });
    lightbox.querySelector(".lightbox__close").addEventListener("click", close);
    lightbox.querySelector(".lightbox__prev").addEventListener("click", () => step(-1));
    lightbox.querySelector(".lightbox__next").addEventListener("click", () => step(1));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });

    // Touch: Wischen
    let touchX = null;
    lightbox.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener("touchend", (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      touchX = null;
    });
  }

  /* ---------- Kontaktformular ---------- */
  const form = document.querySelector("#kontakt-form");
  if (form) {
    const status = form.querySelector(".form__status");
    const setInvalid = (field, invalid) => field.closest(".field").classList.toggle("is-invalid", invalid);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form__status";
      let valid = true;

      form.querySelectorAll("[required]").forEach((f) => {
        let ok = f.type === "checkbox" ? f.checked : f.value.trim() !== "";
        if (ok && f.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim());
        setInvalid(f, !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        status.textContent = "Bitte fülle alle Pflichtfelder korrekt aus.";
        status.classList.add("is-error");
        return;
      }
      // Honeypot gegen Spam-Bots
      if (form.querySelector('[name="website"]').value) return;

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Wird gesendet …";

      try {
        const endpoint = form.getAttribute("action");
        if (endpoint && endpoint.startsWith("http")) {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: new FormData(form),
          });
          if (!res.ok) throw new Error("Request failed");
        } else {
          // Fallback ohne Formular-Backend: öffnet das E-Mail-Programm
          const d = new FormData(form);
          const subject = encodeURIComponent(`Anfrage: ${d.get("anlass")} – ${d.get("name")}`);
          const body = encodeURIComponent(
            `Name: ${d.get("name")}\nE-Mail: ${d.get("email")}\nTelefon: ${d.get("telefon") || "-"}\nAnlass: ${d.get("anlass")}\nWunschtermin: ${d.get("datum") || "-"}\n\n${d.get("nachricht")}`
          );
          window.location.href = `mailto:${form.dataset.mail}?subject=${subject}&body=${body}`;
        }
        status.textContent = "Vielen Dank! Deine Anfrage ist unterwegs – ich melde mich innerhalb von 48 Stunden.";
        status.classList.add("is-success");
        form.reset();
      } catch (err) {
        status.textContent = "Leider ist etwas schiefgelaufen. Schreib mir gern direkt per E-Mail.";
        status.classList.add("is-error");
      } finally {
        btn.disabled = false;
        btn.textContent = "Anfrage senden";
      }
    });

    form.querySelectorAll("[required]").forEach((f) =>
      f.addEventListener("input", () => setInvalid(f, false))
    );
  }

  /* ---------- Jahr im Footer ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
