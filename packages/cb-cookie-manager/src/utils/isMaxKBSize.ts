import { KB } from '../constants';

const isMaxKBSize = (str: string, max: number) => {
  return Buffer.from(str).length / KB > max;
};

export default isMaxKBSize;
