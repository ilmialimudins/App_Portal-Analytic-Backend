import excel from 'exceljs';
import alphabet from 'src/constants/alphabet';

export interface ObjectTable<T> {
  columnStart: string;
  rowHeaderNum: number;
  rowDataNum: number;
  headerTitle: string[];
  tableData: T[];
}

const middleStyle: Partial<excel.Style> = {
  alignment: { horizontal: 'center', vertical: 'middle' },
  font: {
    size: 11,
    bold: true,
  },
  fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e3e2cc' } },
};

const border: Partial<excel.Borders> = {
  top: { style: 'thin' },
  left: { style: 'thin' },
  bottom: { style: 'thin' },
  right: { style: 'thin' },
};

export const addTable = <T extends object>(
  objTable: ObjectTable<T>,
  sheet: excel.Worksheet,
) => {
  const { columnStart, rowHeaderNum, rowDataNum, headerTitle, tableData } =
    objTable;

  const indexColumnStart = alphabet.indexOf(columnStart);
  headerTitle.forEach((item, index) => {
    const col = sheet.getCell(
      `${alphabet.charAt(indexColumnStart + index)}${rowHeaderNum}`,
    );
    const column = sheet.getColumn(
      `${alphabet.charAt(indexColumnStart + index)}`,
    );
    column.width = item.length + 3;
    col.value = item;
    col.style = {
      ...middleStyle,
      font: {
        size: 11,
        bold: false,
      },
    };
    col.border = border;
  });

  tableData.forEach((row, index) => {
    const rowNums = rowDataNum + index;
    const arrayHeaders = Object.keys(row);
    arrayHeaders.forEach((x, i) => {
      const cell = sheet.getCell(
        `${alphabet.charAt(indexColumnStart + i)}${rowNums}`,
      );
      cell.value = isNaN(row[x]) ? row[x] : +row[x];
      cell.style = {
        font: {
          size: 10,
        },
      };
      cell.protection = {
        locked: isNaN(row[x]) ? true : false,
      };
      cell.border = border;
    });
  });
};

export const addTableInvitedTable = <T extends object>(
  objTable: ObjectTable<T>,
  sheet: excel.Worksheet,
  formulae: string[],
) => {
  const { columnStart, rowHeaderNum, headerTitle, tableData, rowDataNum } =
    objTable;

  const indexColumnStart = alphabet.indexOf(columnStart);
  headerTitle.forEach((item, index) => {
    const col = sheet.getCell(
      `${alphabet.charAt(indexColumnStart + index)}${rowHeaderNum}`,
    );
    const column = sheet.getColumn(
      `${alphabet.charAt(indexColumnStart + index)}`,
    );
    column.width = item.length + 3;
    col.value = item;
    col.style = {
      ...middleStyle,
      font: {
        size: 11,
        bold: false,
      },
    };
    col.border = border;
    col.protection = {
      locked: true,
    };
  });

  tableData.forEach((row, index) => {
    const rowNums = rowDataNum + index;
    const arrayHeaders = Object.keys(row);

    arrayHeaders.forEach((x, i) => {
      const cell = sheet.getCell(
        `${alphabet.charAt(indexColumnStart + i)}${rowNums}`,
      );
      sheet.getCell(`F${i + 2}`).dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: formulae,
        showErrorMessage: true,
        errorStyle: 'error',
        error: 'Hanya dapat diisi dengan data yang telah tersedia',
      };
      cell.value = isNaN(row[x]) ? row[x] : row[x];
      cell.style = {
        font: {
          size: 10,
        },
      };
      cell.protection = {
        locked:
          x === 'totalinvited_demography' || x === 'totalinvited_company'
            ? false
            : true,
      };
      cell.border = border;
    });
  });
};

export const addTableValidate = <T extends object>(
  objTable: ObjectTable<T>,
  sheet: excel.Worksheet,
) => {
  const { rowHeaderNum, rowDataNum, headerTitle, tableData } = objTable;

  headerTitle.forEach((item, index) => {
    const col = sheet.getCell(
      `${numberToExcelColumn(index + 1)}${rowHeaderNum}`,
    );
    const column = sheet.getColumn(numberToExcelColumn(index + 1));
    column.width = item.length + 3;
    col.value = item;
    col.style = {
      ...middleStyle,
      font: {
        size: 11,
        bold: false,
      },
    };
    col.border = border;
  });

  tableData.forEach((row, rowIndex) => {
    const rowNums = rowDataNum + rowIndex;
    const arrayHeaders = Object.keys(row);
    arrayHeaders.forEach((headerKey, colIndex) => {
      const cell = sheet.getCell(
        `${numberToExcelColumn(colIndex + 1)}${rowNums}`,
      );
      cell.value = isNaN(row[headerKey]) ? row[headerKey] : +row[headerKey];
      cell.style = {
        font: {
          size: 10,
        },
      };
      cell.protection = {
        locked: isNaN(row[headerKey]) ? true : false,
      };
      cell.border = border;
    });
  });
};

function numberToExcelColumn(num: number): string {
  let excelCol = '';
  while (num > 0) {
    const remainder = (num - 1) % 26;
    excelCol = String.fromCharCode(65 + remainder) + excelCol;
    num = Math.floor((num - 1) / 26);
  }
  return excelCol;
}
