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

export function formatPhoneNumber(phoneNumberString: string) {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return null;
}
