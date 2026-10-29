export function formatDate(date, options = { year: 'numeric', month: 'long', day: 'numeric' }) {
  return new Intl.DateTimeFormat(undefined, options).format(new Date(date))
}
