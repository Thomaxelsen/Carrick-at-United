async function loadCarrickStats() {
  const response = await fetch("data.json");
  if (!response.ok) {
    throw new Error(`Failed to load data.json: ${response.status}`);
  }

  const data = await response.json();
  const matches = Array.isArray(data.matches) ? data.matches : [];

  const totalPoints = matches.reduce((sum, match) => sum + (match.points || 0), 0);
  const maxPoints = matches.length * 3;
  const percentage = maxPoints === 0 ? 0 : Math.round((totalPoints / maxPoints) * 100);

  let output = document.querySelector("#points-summary");
  if (!output) {
    output = document.createElement("div");
    output.id = "points-summary";
    document.body.appendChild(output);
  }

  output.textContent = `Poeng: ${totalPoints} / ${maxPoints} (${percentage}%)`;
}

loadCarrickStats().catch((error) => {
  console.error(error);
});
