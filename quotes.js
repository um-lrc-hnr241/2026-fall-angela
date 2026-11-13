document.querySelectorAll("[data-quote-form]").forEach((form) => {
  const member = form.dataset.member;
  const storageKey = `angela-quote-${member}`;
  const input = form.querySelector('textarea[name="quote"]');
  const display = document.querySelector("[data-saved-quote]");
  const clearButton = form.querySelector("[data-clear-quote]");
  const status = form.querySelector(".quote-status");

  const showSavedQuote = () => {
    let savedQuote = "";
    try {
      savedQuote = window.localStorage.getItem(storageKey) || "";
    } catch {
      status.textContent = "Browser storage is unavailable; this quote cannot be saved.";
    }
    display.textContent = savedQuote;
    display.hidden = !savedQuote;
    clearButton.hidden = !savedQuote;
  };

  showSavedQuote();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const quote = input.value.trim();
    if (!quote) {
      status.textContent = "Enter a quote before saving.";
      input.focus();
      return;
    }
    try {
      window.localStorage.setItem(storageKey, quote);
      status.textContent = "Your quote is saved in this browser.";
      input.value = "";
      showSavedQuote();
    } catch {
      status.textContent = "Browser storage is unavailable; your quote was not saved.";
    }
  });

  clearButton.addEventListener("click", () => {
    try {
      window.localStorage.removeItem(storageKey);
      status.textContent = "Your saved quote was removed.";
      showSavedQuote();
    } catch {
      status.textContent = "Browser storage is unavailable; the quote could not be removed.";
    }
  });
});
