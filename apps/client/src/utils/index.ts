export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat().format(amount);
};

export const formatDateTime = (d: Date) => {
  const dformat = `${[d.getHours(), d.getMinutes()].join(':')} ${[
    d.getDate(),
    d.getMonth() + 1,
    d.getFullYear(),
  ].join('/')}`;
  return dformat;
};
