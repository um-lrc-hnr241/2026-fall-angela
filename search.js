const pages = [
  { title: "Team Angela: Consciousness, pain, and Westworld", url: "index.html", text: "Team Angela student team portfolio consciousness Westworld Elaine Scarry The Body in Pain The Making and Unmaking of the World Interior Structure of the Artifact pain language imagination artifacts origin story crew builds" },
  { title: "Meet the team", url: "teams.html", text: "team crew Coile Gregg Patel Brenner Pazona Xie member profiles" },
  { title: "Katherine", url: "team/coile.html", text: "Katherine member Team Angela consciousness space project team profile" },
  { title: "Owen", url: "team/gregg.html", text: "Owen member Team Angela consciousness space project team profile" },
  { title: "Patel", url: "team/patel.html", text: "Patel member Team Angela consciousness space project team profile" },
  { title: "Clinton", url: "team/brenner.html", text: "Clinton member Team Angela consciousness space project team profile" },
  { title: "Pazona", url: "team/pazona.html", text: "Pazona member Team Angela consciousness space project team profile" },
  { title: "Xie", url: "team/xie.html", text: "Xie member Team Angela consciousness space project team profile" },
  { title: "Builds: consciousness, pain, matter, and Build 2", url: "builds.html", text: "builds visual pain matter artwork consciousness Westworld rigidity space Krish Build 2 second dream" }
];

const form = document.querySelector("#site-search");
const input = document.querySelector("#search-query");
const status = document.querySelector("#search-status");
const results = document.querySelector("#search-results");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = input.value.trim().toLocaleLowerCase();
  results.replaceChildren();

  if (!query) {
    status.textContent = "Enter a word or name to search Angela’s portfolio.";
    input.focus();
    return;
  }

  const matches = pages.filter((page) => `${page.title} ${page.text}`.toLocaleLowerCase().includes(query));
  status.textContent = matches.length
    ? `${matches.length} ${matches.length === 1 ? "page" : "pages"} found.`
    : "No pages found. Try another word or name.";

  for (const page of matches) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = page.url;
    link.textContent = page.title;
    item.append(link);
    results.append(item);
  }
});
