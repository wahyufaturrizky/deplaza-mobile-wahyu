// export const URL = "https://dev-rest-api.deplaza.id/"
export const URL = 'https://rest-api.deplaza.id/';
export const URLDev = 'https://dev-rest-api.deplaza.id/';

export const formatRupiah = bilangan => {
  let number_string = bilangan.toString();
  let sisa = number_string.length % 3;
  let rupiah = number_string.substr(0, sisa);
  let ribuan = number_string.substr(sisa).match(/\d{3}/g);
  let separator = '.';

  if (ribuan) {
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  return rupiah;
};
export const capitalLetters = s => {
  let word = s.toLowerCase();
  return word
    .trim()
    .split(' ')
    .map(i => i[0].toUpperCase() + i.substr(1))
    .reduce((ac, i) => `${ac} ${i}`);
};
