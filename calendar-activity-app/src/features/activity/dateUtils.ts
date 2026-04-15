function pad2(value: number) {
  return String(value).padStart(2, '0');
}

function isValidISODate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function addLocalDays(date: Date, deltaDays: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + deltaDays);
  return d;
}

function addLocalMonths(date: Date, deltaMonths: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + deltaMonths);
  return d;
}

function isoDateToLocalMidnight(isoDate: string) {
  // Construct in local time to avoid UTC shifting issues.
  const [y, m, d] = isoDate.split('-').map((v) => Number(v));
  return new Date(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0, 0);
}

function localDateToISO(date: Date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function addISODate(
  isoDate: string,
  { days = 0, weeks = 0, months = 0 }: { days?: number; weeks?: number; months?: number }
) {
  if (!isValidISODate(isoDate)) return isoDate;
  const base = isoDateToLocalMidnight(isoDate);
  const withDays = addLocalDays(base, days + weeks * 7);
  const withMonths = months ? addLocalMonths(withDays, months) : withDays;
  return localDateToISO(withMonths);
}
