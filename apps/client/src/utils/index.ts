export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat().format(amount);
};
