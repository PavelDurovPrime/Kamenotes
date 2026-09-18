// Motion-powered scroll-triggered animations for editorial pages.
// Uses Motion mini build from CDN for minimal footprint (~2.6 KB).
// Respects prefers-reduced-motion.
import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/+esm";

(() => {
  // Bail out if user prefers reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // --- Shared defaults ---
  const DURATION = 0.6;
  const EASE = [0.25, 0.1, 0.25, 1]; // cubic-bezier ease-out
  const STAGGER_DELAY = 0.1;

  // Helper: animate a group of children with stagger when parent enters view.
  function animateGroupOnView(parentSelector, childSelector, options = {}) {
    inView(parentSelector, (el) => {
      const children = el.querySelectorAll(childSelector);
      if (!children.length) return;
      animate(
        children,
        { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0)"] },
        {
          duration: options.duration || DURATION,
          ease: EASE,
          delay: stagger(options.staggerDelay || STAGGER_DELAY),
        }
      );
    }, { amount: 0.15 });
  }

  // Helper: animate a single element on view.
  function animateOnView(selector, keyframes, options = {}) {
    inView(selector, (el) => {
      animate(
        el,
        keyframes,
        {
          duration: options.duration || DURATION,
          ease: EASE,
          delay: options.delay || 0,
        }
      );
    }, { amount: options.amount || 0.2 });
  }

  // ─── 1. HERO SECTION (home page) ───
  // Title, eyebrow and lead text — staggered cascade
  const heroCopy = document.querySelector(".ed-home-hero-copy");
  if (heroCopy) {
    const heroItems = heroCopy.querySelectorAll(".ed-eyebrow, h1, .ed-home-lead");
    if (heroItems.length) {
      // Set initial state immediately
      heroItems.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(28px)";
      });
      // Animate on load (hero is above fold, no inView needed)
      animate(
        heroItems,
        { opacity: [0, 1], transform: ["translateY(28px)", "translateY(0)"] },
        { duration: 0.7, ease: EASE, delay: stagger(0.12) }
      );
    }
  }

  // Hero CTA button
  const heroActions = document.querySelector(".ed-hero-actions");
  if (heroActions) {
    heroActions.style.opacity = "0";
    heroActions.style.transform = "translateY(16px)";
    animate(
      heroActions,
      { opacity: [0, 1], transform: ["translateY(16px)", "translateY(0)"] },
      { duration: 0.5, ease: EASE, delay: 0.5 }
    );
  }

  // ─── 2. HERO BENEFITS (3 benefit cards) ───
  const heroBenefits = document.querySelector(".ed-hero-benefits");
  if (heroBenefits) {
    const benefits = heroBenefits.querySelectorAll(".ed-hero-benefit");
    benefits.forEach((b) => {
      b.style.opacity = "0";
      b.style.transform = "translateY(20px)";
    });
    animate(
      benefits,
      { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] },
      { duration: 0.55, ease: EASE, delay: stagger(0.12, { start: 0.35 }) }
    );
  }

  // ─── 3. SERVICE LINKS (home page list) ───
  animateGroupOnView(
    ".ed-service-links-list",
    ".ed-service-links-item",
    { staggerDelay: 0.08 }
  );

  // ─── 4. ORDER STAGES (Етапи замовлення) ───
  animateOnView(".ed-order-header", {
    opacity: [0, 1],
    transform: ["translateY(20px)", "translateY(0)"],
  });
  animateGroupOnView(".ed-order-grid", ".ed-order-item", {
    staggerDelay: 0.14,
    duration: 0.55,
  });

  // ─── 5. ABOUT STATEMENT ───
  const statement = document.querySelector(".ed-about-home .ed-statement");
  if (statement) {
    inView(statement, () => {
      const h2 = statement.querySelector("h2");
      const textDiv = statement.querySelector("div");
      if (h2) {
        animate(
          h2,
          { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] },
          { duration: 0.6, ease: EASE }
        );
      }
      if (textDiv) {
        animate(
          textDiv,
          { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] },
          { duration: 0.6, ease: EASE, delay: 0.12 }
        );
      }
    }, { amount: 0.25 });
  }

  // ─── 6. CONTACT CTA SECTION ───
  animateOnView(".ed-contact", {
    opacity: [0, 1],
    transform: ["translateY(18px)", "translateY(0)"],
  }, { duration: 0.55, amount: 0.25 });

  // ─── 7. PAGE HEADERS (all editorial pages) ───
  const pageHead = document.querySelector(".ed-page-head");
  if (pageHead) {
    const headItems = pageHead.querySelectorAll(".ed-eyebrow, h1, .ed-intro");
    if (headItems.length) {
      headItems.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(22px)";
      });
      animate(
        headItems,
        { opacity: [0, 1], transform: ["translateY(22px)", "translateY(0)"] },
        { duration: 0.6, ease: EASE, delay: stagger(0.1) }
      );
    }
  }

  // ─── 8. SERVICE CARDS (poslugy.html, other listing pages) ───
  animateGroupOnView(".ed-services-grid", ".ed-service-card", {
    staggerDelay: 0.12,
  });

  // ─── 9. SERVICE TILES ───
  animateGroupOnView(".ed-services-showcase", ".ed-service-tile", {
    staggerDelay: 0.08,
  });

  // ─── 10. REVIEW CARDS ───
  animateOnView(".ed-review-featured", {
    opacity: [0, 1],
    transform: ["translateY(24px)", "translateY(0)"],
  }, { duration: 0.65 });

  animateGroupOnView(".ed-review-grid", ".ed-review-card", {
    staggerDelay: 0.1,
    duration: 0.55,
  });

  // ─── 11. PHOTO GALLERIES ───
  document.querySelectorAll(".ed-gallery, .ed-process-gallery").forEach((gallery) => {
    inView(gallery, () => {
      const photos = gallery.querySelectorAll(".ed-photo");
      if (photos.length) {
        animate(
          photos,
          { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0)"] },
          { duration: 0.5, ease: EASE, delay: stagger(0.08) }
        );
      }
    }, { amount: 0.1 });
  });

  // ─── 12. INSTALL STEP CARDS (montazh.html) ───
  animateGroupOnView(
    ".ed-install-grid, .ed-install-steps",
    ".ed-install-card, .ed-install-step",
    { staggerDelay: 0.1 }
  );

  // ─── 13. FACTS BAR (poslugy.html) ───
  animateGroupOnView(".ed-services-facts", ".ed-services-fact", {
    staggerDelay: 0.08,
  });

  // ─── 14. DECOR CATALOG CARDS (oformlennya.html) ───
  animateGroupOnView(".ed-decor-catalog-grid", ".ed-decor-catalog-card", {
    staggerDelay: 0.06,
  });

  // ─── 15. SECTION HEADINGS (ed-section-head) ───
  document.querySelectorAll(".ed-section-head").forEach((head) => {
    inView(head, () => {
      animate(
        head,
        { opacity: [0, 1], transform: ["translateY(14px)", "translateY(0)"] },
        { duration: 0.5, ease: EASE }
      );
    }, { amount: 0.5 });
  });

  // ─── 16. FOUNDATION CARD (montazh.html) ───
  animateOnView(".ed-foundation-card", {
    opacity: [0, 1],
    transform: ["translateY(20px)", "translateY(0)"],
  }, { duration: 0.6 });

  // ─── 17. SPECIFICATION ITEMS (brukivka.html) ───
  const specItems = document.querySelectorAll(".ed-specification > div");
  specItems.forEach((item) => {
    inView(item, () => {
      animate(
        item,
        { opacity: [0, 1], transform: ["translateY(14px)", "translateY(0)"] },
        { duration: 0.45, ease: EASE }
      );
    }, { amount: 0.3 });
  });

})();
