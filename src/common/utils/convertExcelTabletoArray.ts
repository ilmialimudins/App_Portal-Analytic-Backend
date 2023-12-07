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

  const data = [];

  for (let i = range.rowStart; i <= range.rowEnd; i++) {
    const array = [];

    for (let j = colIndexStart; j <= colIndexEnd; j++) {
      const val = sheet.getCell(`${getExcelColumn(j, i)}`).value;
      array.push(val as never);
    }
    data.push(array as never);
  }

  return data;
};
