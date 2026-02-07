const percentageEl = document.getElementById('percentage');

const formatPercentage = (value) => `${value.toFixed(1)}%`;

const renderPercentage = ({ poeng_tatt, poeng_mulig }) => {
  if (!Number.isFinite(poeng_tatt) || !Number.isFinite(poeng_mulig) || poeng_mulig === 0) {
    percentageEl.textContent = '--%';
    return;
  }

  const percentage = (poeng_tatt / poeng_mulig) * 100;
  percentageEl.textContent = formatPercentage(percentage);
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
