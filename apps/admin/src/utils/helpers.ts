const padLeft = (nr: any, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

export const formatDateTime = (dateTime: string) => {
  const d = new Date(dateTime);
  const dformat = `${[d.getHours(), d.getMinutes()].join(':')} ${[
    d.getDate(),
    d.getMonth() + 1,
    d.getFullYear(),
  ].join('/')}`;
  return dformat;
};

export const formatNumber = (n: number) => {
  return new Intl.NumberFormat().format(n);
};
