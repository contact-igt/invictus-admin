export const formatDateRange = (start: string, end: string) => {
  const s = new Date(start);
  const e = new Date(end);
  const month = s.toLocaleString('en-US', { month: 'long' });
  const d1 = s.getDate();
  const d2 = e.getDate();
  return d1 === d2 ? `${d1} ${month}` : `${d1} ${month} to ${d2} ${month}`;
};

export const formatTimeRange = (start: string, end: string) => {
  const format = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    const period = h >= 12 ? 'pm' : 'am';
    const hour12 = h % 12 || 12;
    const min = m.toString().padStart(2, '0');
    return `${hour12}:${min}${period}`;
  };
  return `${format(start)}-${format(end)}`;
};
