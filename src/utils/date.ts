export function localTime(date: string | Date | null, showYear = false) {
  if (!date) return '-';

  return new Date(date).toLocaleString('ru-RU', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    year: showYear ? 'numeric' : undefined,
  });
}
