export const generateCNPJ = () => {
  const n = 9;
  const n1 = Math.floor(Math.random() * n);
  const n2 = Math.floor(Math.random() * n);
  const n3 = Math.floor(Math.random() * n);
  const n4 = Math.floor(Math.random() * n);
  const n5 = Math.floor(Math.random() * n);
  const n6 = Math.floor(Math.random() * n);
  const n7 = Math.floor(Math.random() * n);
  const n8 = Math.floor(Math.random() * n);
  const n9 = Math.floor(Math.random() * n);
  const n10 = Math.floor(Math.random() * n);
  const n11 = Math.floor(Math.random() * n);
  const n12 = Math.floor(Math.random() * n);

  let d1 =
    5 * n1 +
    4 * n2 +
    3 * n3 +
    2 * n4 +
    9 * n5 +
    8 * n6 +
    7 * n7 +
    6 * n8 +
    5 * n9 +
    4 * n10 +
    3 * n11 +
    2 * n12;

  d1 = 11 - (d1 % 11);
  d1 = d1 >= 10 ? 0 : d1;

  let d2 =
    6 * n1 +
    5 * n2 +
    4 * n3 +
    3 * n4 +
    2 * n5 +
    9 * n6 +
    8 * n7 +
    7 * n8 +
    6 * n9 +
    5 * n10 +
    4 * n11 +
    3 * n12 +
    2 * d1;

  d2 = 11 - (d2 % 11);
  d2 = d2 >= 10 ? 0 : d2;

  return `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}/${n10}${n11}${n12}-${d1}${d2}`;
};
