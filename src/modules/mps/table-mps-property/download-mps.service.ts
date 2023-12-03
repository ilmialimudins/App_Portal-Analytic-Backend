import { Inject, NotFoundException } from '@nestjs/common';
import * as excel from 'exceljs';

import { MPSPropertyService } from './mps-property.service';
import {
  DownloadMPSDTO,
  GenerateSummaryDTO,
  SheetMetadaDTO,
} from './dto/download-mps.dto';
import { CompanyService } from 'src/modules/master-company-ees/master-company-ees.service';
import month from 'src/constants/month';
import { MPSGradeEmployeeStatusService } from '../table-mps-gradeemployeestatus/mps-gradeemployeestatus.service';
import alphabet from 'src/constants/alphabet';
import { getExcelColumn, getIndex } from 'src/common/utils/excelHelper';
import { MPSEducationService } from '../table-mps-education/mps-education.service';
import { addTable } from 'src/common/utils/addExcelTable';
import { MPSGenderAgeService } from '../table-mps-genderage/mps-genderage.service';
import { MPSTenureService } from '../master-mps-tenure/mps-tenure.service';
import { MPSTurnOverTerminationTypeService } from '../table-mps-turnoverterminationtype/mps-turnoverterminationtype.service';
import { MPSEmployeeByGenderService } from '../table-mps-employeebygender/mps-employeebygender.service';

export class DownloadMPSService {
  private middleStyle: Partial<excel.Style>;
  private border: Partial<excel.Borders>;
  constructor(
    @Inject(MPSPropertyService) private propertyService: MPSPropertyService,

    @Inject(CompanyService) private companyService: CompanyService,

    @Inject(MPSGradeEmployeeStatusService)
    private gradeEmployeeService: MPSGradeEmployeeStatusService,

    @Inject(MPSEducationService)
    private educationService: MPSEducationService,

    @Inject(MPSGenderAgeService)
    private genderAgeService: MPSGenderAgeService,

    @Inject(MPSTenureService)
    private tenureService: MPSTenureService,

    @Inject(MPSTurnOverTerminationTypeService)
    private turnOverTerminationTypeService: MPSTurnOverTerminationTypeService,

    @Inject(MPSEmployeeByGenderService)
    private employeeByGenderService: MPSEmployeeByGenderService,
  ) {
    this.middleStyle = {
      alignment: { horizontal: 'center', vertical: 'middle' },
      font: {
        size: 11,
        bold: true,
      },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'e3e2cc' } },
    };

    this.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  }

  public async downloadMPS(data: DownloadMPSDTO) {
    try {
      let propertyid = 0;
      const sheetMetadata: SheetMetadaDTO = {
        companyname: '',
        companyid: 0,
        locationname: '',
        locationid: 0,
      };
      const property = await this.propertyService.getOneMPSProperty(data);

      if (property) {
        propertyid = property.propertyid;
        const { company, location } = property;
        sheetMetadata.companyname = company.companympsname;
        sheetMetadata.companyid = company.companyid;
        sheetMetadata.locationname = location.locationdesc || '';
        sheetMetadata.locationid = location.locationid || 0;
      } else {
        const company = await this.companyService.getCompanyId(data.companyid);

        if (!company) {
          throw new NotFoundException('No Company Found With That ID');
        }
        sheetMetadata.companyname = company.companympsname;
        sheetMetadata.companyid = company.companyid;
        sheetMetadata.locationname = company.locationdesc || '';
        sheetMetadata.locationid = company.locationid || 0;
      }

      const workbook: excel.Workbook = new excel.Workbook();
      const sheet: excel.Worksheet = workbook.addWorksheet(
        'Man Power Statistic',
      );

      this.createInfoTable(
        {
          companyname: sheetMetadata.companyname,
          locationname: sheetMetadata.locationname,
          year: data.year,
          month: data.month,
        },
        sheet,
      );

      await this.generateExcelTableGradeEmployeeStatus(propertyid, sheet);

      await this.generateExcelTableEducation(propertyid, sheet);

      await this.generateExcelTableGenderAge(propertyid, sheet);

      await this.generateExcelTableTenure(propertyid, sheet);

      await this.generateExcelTableTurnOverTerminationType(propertyid, sheet);

      await this.generateExcelTableEmployeeByGender(propertyid, sheet);

      await sheet.protect('secret', {});

      return { sheetMetadata, workbook, propertyid };
    } catch (error) {
      throw error;
    }
  }

  private async createInfoTable(
    data: {
      companyname: string;
      locationname: string;
      year: number;
      month: number;
    },
    sheet: excel.Worksheet,
  ) {
    const c4 = sheet.getCell('C4');
    c4.value = 'INFORMASI UMUM';
    c4.style = {
      ...this.middleStyle,
      font: {
        size: 10,
        bold: true,
      },
    };
    c4.border = this.border;
    sheet.mergeCells('C4:F4');
    sheet.getCell('C6').value = 'Nama Perusahaan';
    sheet.getCell('C7').value = 'Lini Bisnis';
    sheet.getCell('C8').value = 'Email PIC';
    sheet.getCell('C9').value = 'Report Peroid';
    sheet.getCell('E9').value = `${data.month} ${data.year}`;

    sheet.getCell('C10').value = 'Lokasi';
    sheet.getCell('E10').value = data.locationname;

    sheet.getCell('E6').value = data.companyname;
    sheet.getColumn('E').width = data.companyname.length + 10;

    this.createOuterBorder(sheet, { row: 4, col: 3 }, { row: 11, col: 6 });

    /*
    Title Merge Cell
  */
    sheet.getRow(1).height = 30;
    sheet.getCell('C1').value =
      'PEOPLE RELATED DATA - ASTRA SUSTAINABILITY REPORT';
    sheet.getCell('C1').style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
      font: {
        size: 16,
        bold: true,
      },
    };

    sheet.mergeCells('C1:AB1');
    /**End Title Merge Cell*/

    /**Month Year */
    sheet.getCell('C2').value = `Status: ${month[data.month - 1]} ${data.year}`;
    sheet.getCell('C2').style = this.middleStyle;
    sheet.mergeCells('C2:AB2');
    /**End Month Year */

    /**Input Section Title */
    sheet.getCell('H4').value = 'People Related Data';
    sheet.getCell('H4').style = this.middleStyle;
    sheet.mergeCells('H4:AB4');
    /**End Input Section Title */
  }

  private async createOuterBorder(
    worksheet: excel.Worksheet,
    start = { row: 1, col: 1 },
    end = { row: 1, col: 1 },
  ) {
    const borderStyle: Partial<excel.Border> = {
      style: 'medium',
    };
    for (let i = start.row; i <= end.row; i++) {
      const leftBorderCell = worksheet.getCell(i, start.col);
      const rightBorderCell = worksheet.getCell(i, end.col);
      leftBorderCell.border = {
        ...leftBorderCell.border,
        left: borderStyle,
      };
      rightBorderCell.border = {
        ...rightBorderCell.border,
        right: borderStyle,
      };
    }

    for (let i = start.col; i <= end.col; i++) {
      const topBorderCell = worksheet.getCell(start.row, i);
      const bottomBorderCell = worksheet.getCell(end.row, i);
      topBorderCell.border = {
        ...topBorderCell.border,
        top: borderStyle,
      };
      bottomBorderCell.border = {
        ...bottomBorderCell.border,
        bottom: borderStyle,
      };
    }
  }

  private async generateSum(
    { amount, total }: GenerateSummaryDTO,
    sheet: excel.Worksheet,
  ) {
    /**Generate Ammount */ const ammountCell = sheet.getCell(
      `${amount.colStart}${amount.rowStart}`,
    );
    ammountCell.value = 'Jumlah';

    ammountCell.style = {
      ...this.middleStyle,
      font: {
        size: 10,
        bold: false,
      },
    };
    ammountCell.border = this.border;

    for (let i = amount.rowStart + 1; i <= amount.rowEnd; i++) {
      const cell = sheet.getCell(`${amount.colStart}${i}`);
      cell.value = {
        formula: `SUM(${amount.colRangeStart}${i}:${amount.colRangeEnd}${i})`,
        date1904: false,
      };
      cell.border = this.border;
    }

    /**Generate Total */
    const valueColStart = getIndex(total.colStart);
    const valueColEnd = getIndex(total.colEnd);

    const totalCell = sheet.getCell(`${total.colStart}${total.rowStart}`);
    totalCell.value = 'Total';
    totalCell.font = {
      bold: true,
    };
    totalCell.border = this.border;

    for (let i = valueColStart + 1; i <= valueColEnd; i++) {
      const cell = sheet.getCell(`${getExcelColumn(i, total.rowStart)}`);
      cell.value = {
        formula: `SUM(${getExcelColumn(
          i,
          total.rowRangeStart,
        )}:${getExcelColumn(i, total.rowRangeEnd)})`,
        date1904: false,
      };
      cell.border = this.border;
    }
  }

  private async generateExcelTableGradeEmployeeStatus(
    propertyid: number,
    sheet: excel.Worksheet,
  ) {
    const data = await this.gradeEmployeeService.getDataForExcelTable(
      propertyid,
    );

    const m6 = sheet.getCell('M19');
    m6.value = 'Golongan';
    m6.style = {
      ...this.middleStyle,
      font: {
        size: 10,
        bold: false,
      },
    };
    m6.border = this.border;
    sheet.mergeCells('M19:M20');

    const headerColStart = alphabet.indexOf('N');
    const headerRowStart = 19;

    data.cols.forEach((item, index) => {
      const col = sheet.getCell(
        `${alphabet.charAt(headerColStart + index)}${headerRowStart}`,
      );
      col.value = item.employeestatus;
      col.style = {
        ...this.middleStyle,
        font: {
          size: 10,
          bold: false,
        },
      };
      col.border = this.border;

      if (index % data.gendersNum === 0 || index === 0) {
        sheet.mergeCells(
          `${alphabet.charAt(
            headerColStart + index,
          )}${headerRowStart}:${alphabet.charAt(
            headerColStart + index + data.gendersNum - 1,
          )}${headerRowStart}`,
        );
      }

      /**Sub Header */

      const colSubHeader = sheet.getCell(
        `${alphabet.charAt(headerColStart + index)}${headerRowStart + 1}`,
      );
      colSubHeader.value = item.gender;
      colSubHeader.style = {
        ...this.middleStyle,
        font: {
          size: 10,
          bold: false,
        },
      };
      colSubHeader.border = this.border;
    });

    const titleCell = sheet.getCell('M18');
    titleCell.value = 'Data Karyawan Berdasarkan Perjanjian Kerja dan Golongan';
    titleCell.font = {
      bold: true,
    };

    const valueStart = alphabet.indexOf('M');
    data.rows.forEach((row, indexRow) => {
      const rowNums = headerRowStart + 2 + indexRow;
      const arrayHeaders = Object.keys(row);
      arrayHeaders.forEach((x, i) => {
        const cell = sheet.getCell(
          `${alphabet.charAt(valueStart + i)}${rowNums}`,
        );
        cell.value = isNaN(row[x]) ? row[x] : +row[x];
        cell.border = this.border;
        cell.protection = {
          locked: isNaN(row[x]) ? true : false,
        };
      });
    });

    this.generateSum(
      {
        amount: {
          colRangeStart: 'N',
          colRangeEnd: 'U',
          colStart: 'V',
          rowStart: 20,
          rowEnd: 28,
        },
        total: {
          colStart: 'M',
          colEnd: 'V',
          rowStart: 29,
          rowRangeStart: 21,
          rowRangeEnd: 28,
        },
      },
      sheet,
    );

    const v19 = sheet.getCell('V19');
    v19.value = 'Jumlah';
    v19.style = {
      ...this.middleStyle,
      font: {
        size: 10,
        bold: false,
      },
    };
    v19.border = this.border;
    sheet.mergeCells('V19:V20');
  }

  private async generateExcelTableEducation(
    propertyid: number,
    sheet: excel.Worksheet,
  ) {
    const data = await this.educationService.getDataForExcelTable(propertyid);

    const titleCell = sheet.getCell('H26');
    titleCell.value = 'Karyawan Berdasarkan Tingkat Pendidikan';
    titleCell.font = {
      bold: true,
    };

    addTable(
      {
        columnStart: 'H',
        rowHeaderNum: 27,
        rowDataNum: 28,
        headerTitle: [
          'Pendidikan',
          ...data.masterGender.map((item) => item.gender),
        ],
        tableData: data.rows,
      },
      sheet,
    );

    this.generateSum(
      {
        amount: {
          colRangeStart: 'I',
          colRangeEnd: 'J',
          colStart: 'K',
          rowStart: 27,
          rowEnd: 32,
        },
        total: {
          colStart: 'H',
          colEnd: 'K',
          rowStart: 33,
          rowRangeStart: 28,
          rowRangeEnd: 32,
        },
      },
      sheet,
    );
  }

  private async generateExcelTableGenderAge(
    propertyid: number,
    sheet: excel.Worksheet,
  ) {
    const data = await this.genderAgeService.getDataForExcelTable(propertyid);

    const titleCell = sheet.getCell('H5');
    titleCell.value = 'Karyawan Berdasarkan Kelompok Usia';
    titleCell.font = {
      bold: true,
    };

    addTable(
      {
        columnStart: 'H',
        rowHeaderNum: 6,
        rowDataNum: 7,
        headerTitle: [
          'Kel Usia',
          ...data.masterGenders.map((item) => item.gender),
        ],
        tableData: data.rows,
      },
      sheet,
    );

    this.generateSum(
      {
        amount: {
          colRangeStart: 'I',
          colRangeEnd: 'J',
          colStart: 'K',
          rowStart: 6,
          rowEnd: 12,
        },
        total: {
          colStart: 'H',
          colEnd: 'K',
          rowStart: 13,
          rowRangeStart: 7,
          rowRangeEnd: 12,
        },
      },
      sheet,
    );
  }

  private async generateExcelTableTenure(
    propertyid: number,
    sheet: excel.Worksheet,
  ) {
    const data = await this.tenureService.getDataForExcelTable(propertyid);

    const titleCell = sheet.getCell('H15');
    titleCell.value = 'Karyawan Berdasarkan Masa Kerja';
    titleCell.font = {
      bold: true,
    };
    addTable(
      {
        columnStart: 'H',
        rowHeaderNum: 16,
        rowDataNum: 17,
        headerTitle: [
          'Masa Kerja',
          ...data.masterGenders.map((item) => item.gender),
        ],
        tableData: data.rows,
      },
      sheet,
    );

    this.generateSum(
      {
        amount: {
          colRangeStart: 'I',
          colRangeEnd: 'J',
          colStart: 'K',
          rowStart: 16,
          rowEnd: 23,
        },
        total: {
          colStart: 'H',
          colEnd: 'K',
          rowStart: 24,
          rowRangeStart: 17,
          rowRangeEnd: 23,
        },
      },
      sheet,
    );
  }

  private async generateExcelTableTurnOverTerminationType(
    propertyid: number,
    sheet: excel.Worksheet,
  ) {
    const data = await this.turnOverTerminationTypeService.getDataForExcelTable(
      propertyid,
    );

    const m6 = sheet.getCell('M6');
    m6.value = 'Golongan';
    m6.style = {
      ...this.middleStyle,
      font: {
        size: 10,
        bold: false,
      },
    };
    m6.border = this.border;
    sheet.mergeCells('M6:M7');

    const headerColStart = alphabet.indexOf('N');
    const headerRowStart = 6;

    data.cols.forEach((item, index) => {
      const col = sheet.getCell(
        `${getExcelColumn(headerColStart + index, headerRowStart)}`,
      );

      col.value = item.terminationtype;
      col.style = {
        ...this.middleStyle,
        font: {
          size: 10,
          bold: false,
        },
      };
      col.border = this.border;

      if (index % data.gendersNum === 0 || index === 0) {
        sheet.mergeCells(
          `${getExcelColumn(
            headerColStart + index,
            headerRowStart,
          )}:${getExcelColumn(
            headerColStart + index + data.gendersNum - 1,
            headerRowStart,
          )}`,
        );
      }

      /**Sub Header */

      const colSubHeader = sheet.getCell(
        `${getExcelColumn(headerColStart + index, headerRowStart + 1)}`,
      );
      colSubHeader.value = item.gender;
      colSubHeader.style = {
        ...this.middleStyle,
        font: {
          size: 10,
          bold: false,
        },
      };
      colSubHeader.border = this.border;
    });

    const valueStart = alphabet.indexOf('M');
    data.rows.forEach((row, indexRow) => {
      const rowNums = headerRowStart + 2 + indexRow;
      const arrayHeaders = Object.keys(row);
      arrayHeaders.forEach((x, i) => {
        const cell = sheet.getCell(
          `${getExcelColumn(valueStart + i, rowNums)}`,
        );
        cell.value = isNaN(row[x]) ? row[x] : +row[x];
        cell.border = this.border;
        cell.protection = {
          locked: isNaN(row[x]) ? true : false,
        };
      });
    });

    const titleCell = sheet.getCell('M5');
    titleCell.value = 'Data Employee Turn Over';
    titleCell.font = {
      bold: true,
    };

    this.generateSum(
      {
        amount: {
          colRangeStart: 'N',
          colRangeEnd: 'AA',
          colStart: 'AB',
          rowStart: 7,
          rowEnd: 15,
        },
        total: {
          colStart: 'M',
          colEnd: 'AB',
          rowStart: 16,
          rowRangeStart: 8,
          rowRangeEnd: 15,
        },
      },
      sheet,
    );

    const ab6 = sheet.getCell('AB6');
    ab6.value = 'Jumlah';
    ab6.style = {
      ...this.middleStyle,
      font: {
        size: 10,
        bold: false,
      },
    };
    ab6.border = this.border;
    sheet.mergeCells('AB6:AB7');
  }

  private async generateExcelTableEmployeeByGender(
    propertyid: number,
    sheet: excel.Worksheet,
  ) {
    const data = await this.employeeByGenderService.getDataForExcelTable(
      propertyid,
    );

    const titleCell = sheet.getCell('C13');
    titleCell.value = 'Total Karyawan Berdasarkan Gender';
    titleCell.font = {
      bold: true,
    };
    const totalCell = sheet.getCell('C17');
    totalCell.value = 'Total';
    totalCell.font = {
      bold: true,
    };
    totalCell.border = this.border;
    const totalSum = sheet.getCell('D17');
    totalSum.value = { formula: 'SUM(D15:D16)', date1904: false };
    totalSum.border = this.border;

    addTable(
      {
        columnStart: 'C',
        rowHeaderNum: 14,
        rowDataNum: 15,
        headerTitle: ['Gender', 'Total'],
        tableData: data.rows,
      },
      sheet,
    );
  }
}
