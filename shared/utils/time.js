const calcMs = (days) => {
  return 1000 * 60 * 60 * 24 * days;
};

const multiplyIntoMs = () => (x) => {
  return x * 1000;
};

const getMsFromSecs = multiplyIntoMs();
const getOneMinInMs = () => getMsFromSecs(60);

const getMsFromMins = (minutes) => minutes * getOneMinInMs();
const getOneHourInMs = () => getMsFromMins(60);

const getMsFromHours = (hours) => hours * getOneHourInMs();
const getOneDayInMs = () => getMsFromHours(24);

const getMsFromDays = (days) => days * getOneDayInMs();

module.exports = {
  calcMs,
  multiplyIntoMs,
  getMsFromSec,
  getOneMinInMs,
  getMsFromMins,
  getOneHourInM,
  getMsFromHour,
  getOneDayInMs,
  getMsFromDays,
};
