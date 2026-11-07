// BESTAR METAL — script.js (vanilla JavaScript, no libraries)
// config.js must be loaded before this file.
(function () {
  "use strict";

  var C = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function waLink() {
    var n = String(C.whatsappNumber || "").replace(/\D/g, "");
    return n ? "https://wa.me/" + n : "";
  }
  function mailLink() { return C.email ? "mailto:" + C.email : ""; }

  // 1. Fill shared company info from config.js
  $$("[data-site-text]").forEach(function (el) {
    var v = C[el.getAttribute("data-site-text")];
    if (typeof v === "string" && v) { el.textContent = v; }
  });

  $$("[data-site-link]").forEach(function (el) {
    var k = el.getAttribute("data-site-link");
    var href = "";
    if (k === "email") { href = mailLink(); }
    else if (k === "whatsapp") { href = waLink(); }
    else if (C.socialLinks && /^https:\/\//.test(C.socialLinks[k] || "")) { href = C.socialLinks[k]; }
    if (href) {
      el.setAttribute("href", href);
      if (k !== "email") { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener noreferrer"); }
    } else {
      var box = el.closest("[data-optional]") || el;
      box.hidden = true; // empty config value: hide the element
    }
  });
  var social = $("[data-social-block]");
  if (social && !$$("li:not([hidden])", social).length) { social.hidden = true; }

  // 2. Mobile menu
  var toggle = $(".nav-toggle"), menu = $("#site-menu");
  function closeMenu() {
    if (menu) { menu.classList.remove("is-open"); }
    if (toggle) { toggle.setAttribute("aria-expanded", "false"); }
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { closeMenu(); toggle.focus(); }
    });
  }

  // 3. Back-to-top button
  var top = $(".to-top");
  if (top) {
    var onScroll = function () { top.hidden = window.scrollY < 600; };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    top.addEventListener("click", function () { window.scrollTo({ top: 0 }); });
  }

  // 4. Lazy loading for any image that does not set it explicitly
  $$("img:not([loading]):not([fetchpriority])").forEach(function (i) { i.setAttribute("loading", "lazy"); });

  // 5. Footer year
  $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  // 6. Inquiry form (Formspree). Never shows "success" unless the server confirmed it.
  var form = $("#inquiry-form");
  if (form) {
    var status = $("#form-status"), note = $("#form-setup-note"), btn = $("button[type=submit]", form);
    var endpoint = C.formspreeEndpoint || "";
    var configured = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint);
    if (note) { note.hidden = configured; }

    var show = function (ok, msg, linkHref, linkText) {
      status.hidden = false;
      status.className = "form-status " + (ok ? "form-status--ok" : "form-status--err");
      status.textContent = msg + " ";
      if (linkHref) {
        var a = document.createElement("a");
        a.href = linkHref; a.textContent = linkText;
        status.appendChild(a);
      }
      status.focus();
    };
    var mailtoFromForm = function (fd) {
      var lines = ["Name", "Company", "Email", "Country", "Product type", "Estimated quantity", "Project description"];
      var keys = ["name", "company", "email", "country", "product_type", "quantity", "description"];
      var body = lines.map(function (l, i) { return l + ": " + (fd.get(keys[i]) || ""); }).join("\n");
      return mailLink() + "?subject=" + encodeURIComponent("Project inquiry") + "&body=" + encodeURIComponent(body);
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var fd = new FormData(form);
      if (fd.get("_gotcha")) { return; } // spam trap filled in: ignore silently
      if (!configured) {
        show(false, "This form is not connected yet, so nothing has been sent.", mailtoFromForm(fd), "Send these details by email instead.");
        return;
      }
      btn.disabled = true;
      fetch(endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) { throw new Error("bad response"); }
          form.reset();
          show(true, "Thank you. Your inquiry has been submitted. We will reply by email.");
        })
        .catch(function () {
          show(false, "Your inquiry could not be sent.", mailtoFromForm(fd), "Please send it by email instead.");
        })
        .then(function () { btn.disabled = false; });
    });
  }
})();
