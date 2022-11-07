import { Request } from 'express';

export const paginator = ({ query }: Request): {
  skip: number,
  take: number
} => {
  let { skip, take } = query;
  
  if (!skip) {
    skip = '0';
  }
  
  if (
    (!take) ||
    (take && take >= '10')
  ) {
    take = '10';
  }
  
  return {
    skip: +skip,
    take: +take
  }
}