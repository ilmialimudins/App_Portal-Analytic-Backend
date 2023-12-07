import { BadGatewayException, BadRequestException } from '@nestjs/common';
import alphabet from 'src/constants/alphabet';

export const getExcelColumn = (
  alphabetNumber: number,
  rowNumber = 1,
): string => {
  let column = '';

  const loop = Math.floor(alphabetNumber / alphabet.length);
  const char = alphabet.charAt(alphabetNumber % alphabet.length);

  if (loop > 0) {
    column = `${alphabet.charAt(loop - 1)}${char}`;
  } else {
    column = char;
  }

  return `${column + rowNumber}`;
};

export const getIndex = (string: string) => {
  const lenght = string.length;

  if (lenght === 1) {
    return alphabet.indexOf(string);
  } else if (lenght === 2) {
    return (
      25 * (alphabet.indexOf(string.charAt(0)) + 1) +
      (alphabet.indexOf(string.charAt(0)) +
        1 +
        alphabet.indexOf(string.charAt(1)))
    );
  } else {
    return -1;
  }
};

export const parseWithHeaderData = (
  data: (string | number)[][],
  key: string[],
  type: string,
) => {
  const dataObj: Record<string, string | number>[][] = [];

  data.slice(1).forEach((items: (string | number)[]) => {
    const obj = items.slice(1).map((item: string | number, j: number) => {
      if (isNaN(item as number)) {
        throw new BadGatewayException(`Invalid total on ${type}`);
      }

      return {
        [key[0]]: items[0],
        [key[1]]: data[0].slice(1)[j],
        [key[2]]: !isNaN(item as number) ? item : 0,
      };
    });

    dataObj.push(obj);
  });

  return dataObj.flat(2);
};

export const convertArrayToJSON = (
  data: (string | number)[][],
  customKey: string[] = [],
) => {
  let objectKey = [...data[0]];

  if (customKey.length > 0 && customKey.length === data[0].length) {
    objectKey = customKey;
  }

  return data.slice(1).map((items: (string | number)[]) => {
    return objectKey.reduce(
      (acc: Record<string, string | number>, key: string, index: number) => ({
        ...acc,
        [key.toLocaleLowerCase()]: items[index],
      }),
      {},
    );
  });
};

export const validateTotal = <
  T extends { total?: number; [x: string]: string | number | undefined },
>(
  data: T[],
  scope?: string,
) => {
  data.forEach((item: T) => {
    if (item.total && isNaN(item.total)) {
      throw new BadRequestException(`Invalid total on ${scope}`);
    }
  });

  return data;
};
