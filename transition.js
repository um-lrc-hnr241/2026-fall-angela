const memberTransitions = {
  coile: { className: "katherine", icon: "◇", message: "Katherine’s ideas are coming into view…" },
  gregg: { className: "owen", icon: "☄", message: "Following Owen’s trail across the stars…" },
  patel: { className: "krish", icon: "◉", message: "Exploring Krish’s orbit of ideas…" },
  brenner: { className: "clinton", icon: "🧠", message: "A star enters the brain…", star: true },
  pazona: { className: "pazona", icon: "☾", message: "Entering Pazona’s quiet lunar field…" },
  xie: { className: "xie", icon: "✧", message: "Crossing into Xie’s constellation…" }
};

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="team/"][href$=".html"]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const destination = new URL(link.href, window.location.href);
  if (destination.origin !== window.location.origin || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  event.preventDefault();
  const memberKey = destination.pathname.split("/").pop().replace(/\.html$/, "");
  const transition = memberTransitions[memberKey];
  if (!transition) return;

  const overlay = document.createElement("div");
  overlay.className = `space-transition space-transition--${transition.className}`;
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");

  const message = document.createElement("p");
  const ship = document.createElement("span");
  ship.className = "ship";
  ship.setAttribute("aria-hidden", "true");
  ship.textContent = transition.icon;
  message.append(ship);
  if (transition.star) {
    const star = document.createElement("span");
    star.className = "star";
    star.setAttribute("aria-hidden", "true");
    star.textContent = "★";
    message.append(star);
  }
  message.append(document.createTextNode(transition.message));
  overlay.append(message);
  document.body.append(overlay);
  window.setTimeout(() => window.location.assign(destination.href), 650);
});
