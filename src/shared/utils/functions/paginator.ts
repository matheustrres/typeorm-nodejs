import { Request } from 'express';

export const paginator = ({ query }: Request): {
  take: number,
  skip: number
} => {
  let { take, skip } = query;
  
  if (
    (!take) ||
    (take && take >= '10')
  ) {
    take = '10';
  }
  
  if (!skip) {
    skip = '1';
  }
  
  return {
    take: +take,
    skip: +skip
  }
}