import moment from 'moment';

const DATE_FORMAT = 'DD/MM/YY HH:mm';

export function formatDate(date) {
  return moment(date, moment.ISO).format(DATE_FORMAT);
}

export function unixMilli(date) {
  return moment(date).valueOf();
}
