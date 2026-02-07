const percentageEl = document.getElementById('percentage');
const matchesEl = document.getElementById('matches');

const formatPercentage = (value) => `${value.toFixed(1)}%`;

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

  matches.forEach(({ opponent, score, result }) => {
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

const renderPercentage = ({ poeng_tatt, poeng_mulig, kamper }) => {
  if (!Number.isFinite(poeng_tatt) || !Number.isFinite(poeng_mulig) || poeng_mulig === 0) {
    percentageEl.textContent = '--%';
  } else {
    const percentage = (poeng_tatt / poeng_mulig) * 100;
    percentageEl.textContent = formatPercentage(percentage);
  }

  renderMatches(kamper);
};

fetch('data.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Could not load data.json');
    }
    return response.json();
  })
  .then(renderPercentage)
  .catch(() => {
    percentageEl.textContent = '--%';
  });
