document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="team/"][href$=".html"]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const destination = new URL(link.href, window.location.href);
  if (destination.origin !== window.location.origin || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  event.preventDefault();
  const overlay = document.createElement("div");
  overlay.className = "space-transition";
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");

  const message = document.createElement("p");
  const ship = document.createElement("span");
  ship.className = "ship";
  ship.setAttribute("aria-hidden", "true");
  ship.textContent = "✦";
  message.append(ship, "Entering a new world of ideas…");
  overlay.append(message);
  document.body.append(overlay);
  window.setTimeout(() => window.location.assign(destination.href), 650);
});
