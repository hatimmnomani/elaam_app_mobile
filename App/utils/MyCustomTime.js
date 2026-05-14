export function secondsToDhms(seconds) {
  seconds = Number(seconds);

  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formatTimeUnit = (value, unit) =>
    value > 0 ? `${value} ${unit}${value === 1 ? '' : 's'}, ` : '';

  const daysDisplay = formatTimeUnit(days, 'day');
  const hoursDisplay = formatTimeUnit(hours, 'hr');
  const minutesDisplay = formatTimeUnit(minutes, 'min');
  const secondsDisplay =
    remainingSeconds > 0
      ? `${remainingSeconds} sec${remainingSeconds === 1 ? '' : 's'}`
      : '';

  if (seconds < 60) {
    return `0 min ${secondsDisplay}`;
  }

  return daysDisplay + hoursDisplay + minutesDisplay + secondsDisplay;
}
