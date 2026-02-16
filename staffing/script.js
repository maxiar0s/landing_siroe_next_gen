const form = document.getElementById("lead-form");
const feedback = document.getElementById("form-feedback");
const formRenderedAt = Date.now();

const TRACKED_EVENTS = [
  "cta_staffing_click",
  "cta_adn_ia_click",
  "whatsapp_button_click",
  "form_submit_success",
  "form_submit_error",
];

function trackEvent(eventName, eventParams = {}) {
  if (!TRACKED_EVENTS.includes(eventName)) {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...eventParams });
  }
}

document.querySelectorAll("[data-event]").forEach((item) => {
  item.addEventListener("click", () => {
    trackEvent(item.dataset.event, { location: "landing" });
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in"));
}

function setFeedback(message, type) {
  if (!feedback) {
    return;
  }

  feedback.textContent = message;
  feedback.classList.remove("success", "error");
  if (type) {
    feedback.classList.add(type);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function submitLead(payload) {
  const response = await fetch("https://formsubmit.co/ajax/comercial@siroe.cl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar el formulario");
  }

  return response.json();
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setFeedback("");

    const formData = new FormData(form);
    const nombre = String(formData.get("nombre") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const empresa = String(formData.get("empresa") || "").trim();
    const interes = String(formData.get("interes") || "").trim();
    const mensaje = String(formData.get("mensaje") || "").trim();
    const website = String(formData.get("website") || "").trim();

    if (!nombre || !email || !empresa || !interes || !mensaje) {
      setFeedback("Completa todos los campos obligatorios.", "error");
      trackEvent("form_submit_error", { reason: "missing_fields" });
      return;
    }

    if (!isValidEmail(email)) {
      setFeedback("Ingresa un email valido.", "error");
      trackEvent("form_submit_error", { reason: "invalid_email" });
      return;
    }

    if (website) {
      setFeedback("No se pudo validar el envio.", "error");
      trackEvent("form_submit_error", { reason: "honeypot_triggered" });
      return;
    }

    const elapsedSeconds = Math.floor((Date.now() - formRenderedAt) / 1000);
    if (elapsedSeconds < 4) {
      setFeedback("Espera unos segundos y vuelve a intentar.", "error");
      trackEvent("form_submit_error", { reason: "too_fast" });
      return;
    }

    const payload = {
      nombre,
      email,
      empresa,
      interes,
      mensaje,
      _subject: "Nuevo lead SIROE Next-Gen",
      _template: "table",
    };

    try {
      await submitLead(payload);
      setFeedback("Gracias, recibimos tu solicitud. Te contactaremos pronto.", "success");
      form.reset();
      trackEvent("form_submit_success", { interest: interes });
    } catch (error) {
      setFeedback("Hubo un problema al enviar. Escribenos a comercial@siroe.cl.", "error");
      trackEvent("form_submit_error", { reason: "network_or_endpoint" });
    }
  });
}
