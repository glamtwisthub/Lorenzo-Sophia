(function () {
  var STORAGE_KEY = "lorenzo-giulia-rsvp";
  var nav = document.querySelector("[data-nav]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var closeBtn = document.querySelector("[data-nav-close]");

  function setNav(open) {
    if (!nav) return;
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setNav(!nav.classList.contains("is-open"));
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      setNav(false);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setNav(false);
  });

  var form = document.querySelector("[data-rsvp-form]");
  if (!form) return;

  var stepEls = {
    1: form.querySelector("[data-step='1']"),
    2: form.querySelector("[data-step='2']"),
    3: form.querySelector("[data-step='3']")
  };
  var kicker = document.querySelector("[data-rsvp-kicker]");
  var title = document.querySelector("[data-rsvp-title]");
  var nameInput = form.querySelector("#guest-name");
  var emailInput = form.querySelector("#guest-email");
  var partyInput = form.querySelector("#guest-party");
  var dietInput = form.querySelector("#guest-diet");
  var noteInput = form.querySelector("#guest-note");
  var extras = form.querySelector("[data-yes-extras]");
  var savedBanner = form.querySelector("[data-saved-banner]");
  var emptyHint = form.querySelector("[data-empty]");
  var confirmCopy = form.querySelector("[data-confirm-copy]");
  var confirmName = form.querySelector("[data-confirm-name]");
  var confirmAttend = form.querySelector("[data-confirm-attend]");
  var confirmParty = form.querySelector("[data-confirm-party]");
  var submitBtn = form.querySelector("[data-submit]");

  var state = {
    step: 1,
    name: "",
    email: "",
    attending: "",
    party: "1",
    diet: "",
    note: "",
    error: "",
    loading: false
  };

  var partyLabels = {
    1: "Solo io",
    2: "In due",
    3: "In tre",
    4: "In quattro"
  };

  function loadSaved() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  }

  function persist() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          name: state.name,
          email: state.email,
          attending: state.attending,
          party: state.party,
          diet: state.diet,
          note: state.note
        })
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  function showError(el, message) {
    if (!el) return;
    if (!message) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent = message;
  }

  function firstName(full) {
    var part = (full || "").trim().split(/\s+/)[0];
    return part || "";
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setStep(next) {
    state.step = next;
    Object.keys(stepEls).forEach(function (key) {
      var node = stepEls[key];
      if (!node) return;
      node.classList.toggle("hidden", String(next) !== key);
    });

    if (kicker) {
      kicker.textContent =
        next === 3 ? "Conferma ricevuta — 03" : "Conferma — passo " + next + " di 2";
    }
    if (title) {
      if (next === 1) title.textContent = "Raccontaci chi sei";
      else if (next === 2) title.textContent = "La tua risposta";
      else title.textContent = firstName(state.name) ? "Grazie, " + firstName(state.name) : "Grazie";
    }
  }

  function renderChoices() {
    form.querySelectorAll("[data-attend]").forEach(function (btn) {
      var selected = btn.getAttribute("data-attend") === state.attending;
      btn.classList.toggle("is-selected", selected);
      btn.setAttribute("aria-pressed", selected ? "true" : "false");
      var mark = btn.querySelector("small");
      if (mark) mark.hidden = !selected;
    });
    if (extras) extras.classList.toggle("hidden", state.attending !== "yes");
  }

  function fillFields(data) {
    if (!data) return;
    state.name = data.name || "";
    state.email = data.email || "";
    state.attending = data.attending || "";
    state.party = data.party || "1";
    state.diet = data.diet || "";
    state.note = data.note || "";
    if (nameInput) nameInput.value = state.name;
    if (emailInput) emailInput.value = state.email;
    if (partyInput) partyInput.value = state.party;
    if (dietInput) dietInput.value = state.diet;
    if (noteInput) noteInput.value = state.note;
    renderChoices();
  }

  function renderConfirmation() {
    var yes = state.attending === "yes";
    if (confirmCopy) {
      confirmCopy.textContent = yes
        ? "La tua conferma è arrivata. Invieremo gli orari definitivi e i dettagli del luogo a " +
          (state.email || "la tua email") +
          " appena saranno confermati."
        : "Grazie per averci avvisato. Ci mancherai, e ti manderemo le foto della giornata.";
    }
    if (confirmName) confirmName.textContent = state.name;
    if (confirmAttend) confirmAttend.textContent = yes ? "Accetta con gioia" : "Purtroppo non può";
    if (confirmParty) confirmParty.textContent = yes ? partyLabels[state.party] || state.party : "—";
  }

  var saved = loadSaved();
  if (saved && saved.name && saved.email) {
    fillFields(saved);
    if (savedBanner) savedBanner.classList.remove("hidden");
    if (emptyHint) emptyHint.classList.add("hidden");
  } else if (savedBanner) {
    savedBanner.classList.add("hidden");
  }

  form.querySelectorAll("[data-attend]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.attending = btn.getAttribute("data-attend");
      state.error = "";
      showError(form.querySelector("[data-error='2']"), "");
      renderChoices();
    });
  });

  form.querySelector("[data-next]") &&
    form.querySelector("[data-next]").addEventListener("click", function () {
      state.name = (nameInput && nameInput.value) || "";
      state.email = (emailInput && emailInput.value) || "";
      var errorEl = form.querySelector("[data-error='1']");
      if (!state.name.trim()) {
        showError(errorEl, "Inserisci il tuo nome, così sapremo chi verrà.");
        if (nameInput) nameInput.focus();
        return;
      }
      if (!validEmail(state.email.trim())) {
        showError(errorEl, "Questa email non sembra corretta — la useremo per inviarti i dettagli.");
        if (emailInput) emailInput.focus();
        return;
      }
      showError(errorEl, "");
      setStep(2);
    });

  form.querySelector("[data-back]") &&
    form.querySelector("[data-back]").addEventListener("click", function () {
      showError(form.querySelector("[data-error='2']"), "");
      setStep(1);
    });

  form.querySelector("[data-edit]") &&
    form.querySelector("[data-edit]").addEventListener("click", function () {
      setStep(2);
    });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (state.loading) return;

    state.name = (nameInput && nameInput.value) || state.name;
    state.email = (emailInput && emailInput.value) || state.email;
    state.party = (partyInput && partyInput.value) || state.party;
    state.diet = (dietInput && dietInput.value) || "";
    state.note = (noteInput && noteInput.value) || "";

    var errorEl = form.querySelector("[data-error='2']");
    var loadingEl = form.querySelector("[data-loading]");

    if (!state.attending) {
      showError(errorEl, "Facci sapere se potrai essere con noi.");
      return;
    }

    showError(errorEl, "");
    state.loading = true;
    if (loadingEl) {
      loadingEl.hidden = false;
      loadingEl.textContent = "Invio in corso… un attimo soltanto.";
    }
    if (submitBtn) submitBtn.disabled = true;

    window.setTimeout(function () {
      var ok = persist();
      state.loading = false;
      if (submitBtn) submitBtn.disabled = false;
      if (loadingEl) loadingEl.hidden = true;

      if (!ok) {
        showError(
          errorEl,
          "Non siamo riusciti a salvare la risposta su questo dispositivo. Riprova, oppure scrivici a lorenzo.giulia@esempio.it."
        );
        return;
      }

      if (savedBanner) savedBanner.classList.add("hidden");
      renderConfirmation();
      setStep(3);
    }, 700);
  });

  setStep(1);
  renderChoices();
})();
