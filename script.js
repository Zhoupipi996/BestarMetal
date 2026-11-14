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

  // Analytics hook. Does nothing until a privacy-compliant analytics tool is added to the pages.
  // Supported when present on the page: gtag (Google Analytics 4) or plausible.
  function track(name, params) {
    try {
      if (typeof window.gtag === "function") { window.gtag("event", name, params || {}); }
      else if (typeof window.plausible === "function") { window.plausible(name, { props: params || {} }); }
    } catch (e) { /* never break the page because of analytics */ }
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a,button") : null;
    if (!a) { return; }
    var ev = a.getAttribute("data-track");
    if (!ev) {
      var k = a.getAttribute("data-site-link");
      if (k === "whatsapp") { ev = "whatsapp_click"; } else if (k === "email") { ev = "email_click"; }
    }
    if (ev) { track(ev, { page: location.pathname }); }
  });

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
      box.hidden = true;
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

  // 6. OEM/ODM quote form -> RG Forms (Google Apps Script web app).
  // Shows "success" only when the server answers { result: "success" }.
  var form = $("#inquiry-form");
  if (form) {
    var status = $("#form-status"), note = $("#form-setup-note"), btn = $("button[type=submit]", form);
    var endpoint = C.formEndpoint || "";
    var configured = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint);
    if (note) { note.hidden = configured; }

    // Pre-fill category and source information from the link the visitor used
    var q = new URLSearchParams(location.search);
    var catMap = {
      "Custom Stainless Steel Furniture": "Custom Metal Furniture",
      "Commercial Stainless Steel Products": "Commercial Stainless Steel  Products",
      "Custom Architectural Metalwork": "Custom Architectural Metalwork",
      "Custom Metal Fixtures & Displays": "Metal Shelving & Display Fixtures",
      "Custom Metal Fabrication": "Other/Not sure yet"
    };
    var cat = q.get("category"), sel = form.elements.product_category;
    if (cat && sel) {
      var want = catMap[cat] || cat;
      $$("option", sel).forEach(function (o) { if (o.value === want) { sel.value = want; } });
    }
    ["from", "utm_source", "utm_medium", "utm_campaign"].forEach(function (k) {
      var f = form.elements[k]; var v = q.get(k);
      if (f && v) { f.value = v.slice(0, 80); }
    });

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
    var val = function (name) { return (form.elements[name] && form.elements[name].value || "").trim(); };
    var sourceNote = function () {
      var parts = [];
      ["from", "utm_source", "utm_medium", "utm_campaign"].forEach(function (k) { if (val(k)) { parts.push(k + "=" + val(k)); } });
      parts.push("page=" + location.pathname);
      return "\n\n[Website source: " + parts.join("; ") + "]";
    };
    // Field keys follow the RG Forms form definition
    // Cloudflare Turnstile writes its token into a hidden "cf-turnstile-response" field
    var captchaToken = function () {
      var el = form.querySelector('[name="cf-turnstile-response"]');
      return el && el.value ? el.value : "";
    };
    var resetCaptcha = function () {
      try { if (window.turnstile && typeof window.turnstile.reset === "function") { window.turnstile.reset(); } } catch (e) { /* ignore */ }
    };
    var payloadFields = function () {
      return {
        full_name: val("name"), email: val("email"), phone: val("phone"),
        project_description: val("description") + sourceNote(),
        company_name: val("company"), country: val("country"),
        product_type: val("product_category"), oem_or_odm_requirement: val("oem_odm"),
        estimated_order_quantity: val("quantity"), expected_timeline: val("timeline"),
        _hp: val("_hp"),
        _captcha: captchaToken()
      };
    };
    var mailtoFromForm = function () {
      var f = payloadFields();
      var labels = ["Name", "Company", "Business email", "Phone", "Country", "Product type", "OEM or ODM", "Estimated order quantity", "Expected timeline", "Project description"];
      var keys = ["full_name", "company_name", "email", "phone", "country", "product_type", "oem_or_odm_requirement", "estimated_order_quantity", "expected_timeline", "project_description"];
      var body = labels.map(function (l, i) { return l + ": " + (f[keys[i]] || ""); }).join("\n");
      return mailLink() + "?subject=" + encodeURIComponent("OEM/ODM project inquiry") + "&body=" + encodeURIComponent(body);
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (val("_hp")) { return; } // spam trap filled in: ignore silently
      if (!configured) {
        show(false, "This form is not connected yet, so nothing has been sent.", mailtoFromForm(), "Send these details by email instead.");
        return;
      }
      if (!captchaToken()) {
        show(false, "Please complete the security check above and submit again.", mailtoFromForm(), "Or send these details by email instead.");
        return;
      }
      btn.disabled = true;
      var ctl = typeof AbortController === "function" ? new AbortController() : null;
      var timer = ctl ? setTimeout(function () { ctl.abort(); }, 30000) : null;
      // text/plain avoids a CORS preflight that Google Apps Script cannot answer; the body is still JSON
      fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ tab: C.formTab || "contact", fields: payloadFields() }),
        signal: ctl ? ctl.signal : undefined
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data || data.result !== "success") { throw new Error("rejected"); }
          form.reset();
          show(true, "Thank you. Your OEM/ODM inquiry has been submitted. We will reply to your business email.");
          track("quote_form_submit_success", { page: location.pathname });
        })
        .catch(function () {
          show(false, "Your inquiry could not be sent.", mailtoFromForm(), "Please send it by email instead.");
        })
        .then(function () { if (timer) { clearTimeout(timer); } btn.disabled = false; resetCaptcha(); });
    });
  }
})();
