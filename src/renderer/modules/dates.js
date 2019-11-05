import moment from 'moment';

const DATE_FORMAT = 'DD/MM/YY HH:mm';

export default function formatDate(date) {
  return moment(date, moment.ISO).format(DATE_FORMAT);
}
