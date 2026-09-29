// Silent Resonance & Regen - One Visions — Premiere Script
(function () {
  "use strict";

  // 1. Footer Year Update
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Premiere Countdown Target: December 19, 2026 at 6:00 PM (18:00 EST)
  function getPremiereTargetDate() {
    return new Date("2026-12-19T18:00:00-05:00").getTime();
  }

  const cd = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs"),
  };

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function updateCountdown() {
    if (!cd.days) return;

    const now = Date.now();
    const diff = Math.max(0, getPremiereTargetDate() - now);
    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    cd.days.textContent = pad(days);
    cd.hours.textContent = pad(hours);
    cd.mins.textContent = pad(mins);
    cd.secs.textContent = pad(secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 3. Scroll-Driven Atmospheric Theme Transition for HAVEN Section
  const havenSection = document.getElementById("haven");
  if (havenSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.add("haven-active");
          } else {
            document.body.classList.remove("haven-active");
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(havenSection);
  }

  // 4. Interactive Trailer Player
  const TRAILER_EMBED_URL = "https://www.youtube.com/embed/rCM53GOJLuU?si=orme2Jgp7F-IxLVk&autoplay=1&rel=0";

  const trailerBackdrop = document.getElementById("trailer-backdrop");
  const trailerIframe = document.getElementById("trailer-iframe");

  if (trailerBackdrop && trailerIframe) {
    trailerIframe.src = TRAILER_EMBED_URL;
    trailerBackdrop.style.display = "none";
    trailerIframe.style.display = "block";

    trailerBackdrop.addEventListener("click", function () {
      if (TRAILER_EMBED_URL) {
        trailerIframe.src = TRAILER_EMBED_URL;
        trailerBackdrop.style.display = "none";
        trailerIframe.style.display = "block";
      } else {
        alert("The official trailer will be launched soon! Stay tuned.");
      }
    });
  }

  // 5. Eventbrite Integration Configuration
  const EVENTBRITE_URL = "https://www.eventbrite.com/e/silent-resonance-screening-tickets-2000779252604?aff=oddtdtcreator";
  const EVENTBRITE_ID = "2000779252604";
  const widgetContainer = document.getElementById("eventbrite-widget");

  function loadEventbriteWidget() {
    if (!EVENTBRITE_ID) return;

    const script = document.createElement("script");
    script.src = "https://www.eventbrite.com/static/widgets/eb_widgets.js";
    script.onload = function () {
      if (window.EBWidgets) {
        // A) Embed inline checkout widget inside #eventbrite-widget
        if (widgetContainer) {
          widgetContainer.innerHTML = "";
          window.EBWidgets.createWidget({
            widgetType: "checkout",
            eventId: EVENTBRITE_ID,
            iframeAutoHeight: true,
            parent: widgetContainer,
          });
        }

        // B) Initialize modal triggers for each button ID so Eventbrite SDK attaches internally
        const buttonIds = ["eventbrite-nav-btn", "eventbrite-hero-btn", "eventbrite-screening-btn"];
        buttonIds.forEach((id) => {
          const btn = document.getElementById(id);
          if (btn) {
            window.EBWidgets.createWidget({
              widgetType: "checkout",
              eventId: EVENTBRITE_ID,
              modal: true,
              modalTriggerElementId: id,
            });
          }
        });
      }
    };
    document.body.appendChild(script);

    // Intercept click on all ticket buttons to prevent browser navigation and ensure instant modal overlay
    const ticketButtons = document.querySelectorAll('#eventbrite-nav-btn, #eventbrite-hero-btn, #eventbrite-screening-btn');
    ticketButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (window.EBWidgets && window.EBWidgets.createWidget) {
          window.EBWidgets.createWidget({
            widgetType: "checkout",
            eventId: EVENTBRITE_ID,
            modal: true,
          });
        } else {
          window.open(EVENTBRITE_URL, "_blank");
        }
      });
    });
  }

  loadEventbriteWidget();

  // 6. Meet The Cast Carousel Drag & Navigation
  const carousel = document.getElementById("cast-carousel");
  const prevBtn = document.getElementById("cast-prev");
  const nextBtn = document.getElementById("cast-next");

  if (carousel) {
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: -280, behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: 280, behavior: "smooth" });
      });
    }

    // Mouse Drag to Scroll Interactivity
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener("mousedown", (e) => {
      isDown = true;
      carousel.classList.add("grabbing");
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("mouseleave", () => {
      isDown = false;
      carousel.classList.remove("grabbing");
    });

    carousel.addEventListener("mouseup", () => {
      isDown = false;
      carousel.classList.remove("grabbing");
    });

    carousel.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    });
  }
})();


