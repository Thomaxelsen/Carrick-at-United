const pointsPerGameEl = document.getElementById('points-per-game');
const winPercentageEl = document.getElementById('win-percentage');
const pointPercentageEl = document.getElementById('point-percentage');
const matchesEl = document.getElementById('matches');

const formatPercentage = (value) => `${value.toFixed(1)}%`;
const formatRate = (value) => value.toFixed(2);

const renderMatches = (matches = []) => {
  if (!matchesEl) {
    return;
  }

  matchesEl.innerHTML = '';

  if (!Array.isArray(matches) || matches.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'matches-item';
    emptyItem.textContent = 'No matches available';
    matchesEl.appendChild(emptyItem);
    return;
  }

  const orderedMatches = [...matches].reverse();

  orderedMatches.forEach(({ opponent, score, result }) => {
    const item = document.createElement('li');
    item.className = 'matches-item';

    const label = document.createElement('span');
    label.textContent = `${opponent} · ${result}`;

    const scoreEl = document.createElement('span');
    scoreEl.className = 'matches-score';
    scoreEl.textContent = score;

    item.appendChild(label);
    item.appendChild(scoreEl);
    matchesEl.appendChild(item);
  });
};

const renderStats = ({ kamper }) => {
  const matches = Array.isArray(kamper) ? kamper : [];
  const matchesPlayed = matches.length;
  const wins = matches.filter(({ result }) => result === 'W').length;
  const draws = matches.filter(({ result }) => result === 'D').length;
  const losses = matches.filter(({ result }) => result === 'L').length;
  const pointsTaken = wins * 3 + draws;

  if (matchesPlayed === 0) {
    pointsPerGameEl.textContent = '--';
    winPercentageEl.textContent = '--%';
    pointPercentageEl.textContent = '--%';
  } else {
    const pointsPerGame = pointsTaken / matchesPlayed;
    const winPercentage = (wins / matchesPlayed) * 100;
    const pointPercentage = (pointsTaken / (matchesPlayed * 3)) * 100;

    pointsPerGameEl.textContent = formatRate(pointsPerGame);
    winPercentageEl.textContent = formatPercentage(winPercentage);
    pointPercentageEl.textContent = formatPercentage(pointPercentage);
  }

  renderMatches(kamper);
};

fetch('data.json', { cache: 'no-store' })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Could not load data.json');
    }
    return response.json();
  })
  .then(renderStats)
  .catch(() => {
    pointsPerGameEl.textContent = '--';
    winPercentageEl.textContent = '--%';
    pointPercentageEl.textContent = '--%';
  });
