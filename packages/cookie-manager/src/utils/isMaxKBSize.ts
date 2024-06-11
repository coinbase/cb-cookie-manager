import { KB } from '../constants';

const isMaxKBSize = (str: string, max: number) => {
  // length value contains the length of the string in UTF-16 code units.
  // each code unit is 2 bytes wide
  return (str.length * 2) / KB > max;
};

export default isMaxKBSize;
