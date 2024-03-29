import { Order } from '@/types/Item';

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
export const stableSort = <T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key,
): ((
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number) =>
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

export const searchItems = (items, searchText) =>
  items.filter((item) => {
    // Realize a busca em cada propriedade do item
    for (const key in item) {
      // Se a propriedade do item for uma string e incluir o texto de pesquisa, retorne true
      if (
        typeof item[key] === 'string' &&
        item[key].toLowerCase().includes(searchText.toLowerCase())
      ) {
        return true;
      }
    }
    return false; // Caso contrário, retorne false
  });
