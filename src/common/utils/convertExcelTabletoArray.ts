import * as excel from 'exceljs';
import { getExcelColumn, getIndex } from './excelHelper';
interface Range {
  colStart: string;
  colEnd: string;
  rowStart: number;
  rowEnd: number;
}

export const convertTableToArray = (
  range: Range,

  sheet: excel.Worksheet,
) => {
  const colIndexStart = getIndex(range.colStart);

  const colIndexEnd = getIndex(range.colEnd);

  const data: (string | number)[][] = [];

  for (let i = range.rowStart; i <= range.rowEnd; i++) {
    const array: (string | number)[] = [];

    for (let j = colIndexStart; j <= colIndexEnd; j++) {
      const val = sheet.getCell(`${getExcelColumn(j, i)}`).value;
      const parseValue =
        typeof val === 'string' ? val.toString().trim() : (val as number) * 1;
      array.push(parseValue);
    }
    data.push(array);
  }

  return data;
};
