export const formatDateTime = (dateTime: string) => {
  const d = new Date(dateTime);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
};

export const formatNumber = (n: number) => {
  return new Intl.NumberFormat().format(n);
};
