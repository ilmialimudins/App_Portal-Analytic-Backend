import * as excel from 'exceljs';
import { MPSDataDTO, UploadBodyNameDTO } from './dto/upload-mps.dto';
import { BadRequestException, Inject } from '@nestjs/common';
import { CompanyService } from 'src/modules/master-company-ees/master-company-ees.service';
import { convertTableToArray } from 'src/common/utils/convertExcelTabletoArray';
import {
  convertArrayToJSON,
  parseWithHeaderData,
  validateTotal,
} from 'src/common/utils/excelHelper';
import { SaveUploadMPSTransaction } from './save-upload-mps.transaction';
import { UserInfoDTO } from 'src/modules/duende-authentication/dto/userinfo.dto';

export class UploadMPSService {
  constructor(
    @Inject(CompanyService) private companyService: CompanyService,
    @Inject(SaveUploadMPSTransaction)
    private saveUploadMPSTransaction: SaveUploadMPSTransaction,
  ) {}

  private async extractMpsExcelData(filename: string) {
    const workbook = new excel.Workbook();
    const file = await workbook.xlsx.readFile(`./temp/${filename}`);

    const worksheet: excel.Worksheet | undefined = file.getWorksheet(
      'Man Power Statistic',
    );

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!worksheet) {
      throw new BadRequestException(
        'Worksheet not found, please use correct template',
      );
    }
    const company = worksheet.getCell('E6');
    const reportPeroid = worksheet.getCell('E9');
    // const locationcompany = worksheet.getCell('E10');

    if (!company.value) {
      throw new BadRequestException(
        'Company is not defined, something wrong with template',
      );
    }
    if (!reportPeroid.value) {
      throw new BadRequestException(
        'Peroid is not defined, something wrong with template',
      );
    }

    // if (!locationcompany.value) {
    //   throw new BadRequestException(
    //     'Location is not defined, something wrong with template',
    //   );
    // }

    const companyData = await this.companyService.getCompanyByName(
      company.value as string,
    );

    const [month, year] = (reportPeroid.value as string)
      .split(' ')
      .map((x) => parseInt(x));

    if (!companyData) {
      throw new BadRequestException(
        'Company not found, please check your data',
      );
    }

    const dataMPS = {
      gradeEmployee: await this.modifyGradeEmployee(
        convertTableToArray(
          { colStart: 'M', colEnd: 'U', rowStart: 19, rowEnd: 28 },
          worksheet,
        ),
      ),
      education: await this.modifyEducation(
        convertTableToArray(
          { colStart: 'H', colEnd: 'J', rowStart: 27, rowEnd: 32 },
          worksheet,
        ),
      ),
      genderAge: await this.modifyGenderAge(
        convertTableToArray(
          { colStart: 'H', colEnd: 'J', rowStart: 6, rowEnd: 12 },
          worksheet,
        ),
      ),
      tenure: await this.modifyTenure(
        convertTableToArray(
          { colStart: 'H', colEnd: 'J', rowStart: 16, rowEnd: 23 },
          worksheet,
        ),
      ),
      turnOverTerminationType: await this.modifyTurnOverTermination(
        convertTableToArray(
          { colStart: 'M', colEnd: 'AA', rowStart: 6, rowEnd: 15 },
          worksheet,
        ),
      ),
      employeeGender: await this.modifyEmployeeGender(
        convertTableToArray(
          { colStart: 'C', colEnd: 'D', rowStart: 14, rowEnd: 16 },
          worksheet,
        ),
      ),
      newEmployeeGender: await this.modifyNewEmployeeGender(
        convertTableToArray(
          { colStart: 'C', colEnd: 'D', rowStart: 26, rowEnd: 28 },
          worksheet,
        ),
      ),
      outsourceGender: await this.modifyOutsourceGender(
        convertTableToArray(
          { colStart: 'C', colEnd: 'D', rowStart: 20, rowEnd: 22 },
          worksheet,
        ),
      ),
      applicantGender: await this.modifyApplicantGender(
        convertTableToArray(
          { colStart: 'C', colEnd: 'D', rowStart: 32, rowEnd: 34 },
          worksheet,
        ),
      ),
      trainingHourJobGroup: await this.modifyTrainingHourJobGroup(
        convertTableToArray(
          { colStart: 'C', colEnd: 'E', rowStart: 38, rowEnd: 40 },
          worksheet,
        ),
      ),
      trainingHourGender: await this.modifyTrainingHourGender(
        convertTableToArray(
          { colStart: 'H', colEnd: 'J', rowStart: 36, rowEnd: 38 },
          worksheet,
        ),
      ),
    };

    const checkSame = {};

    Object.keys(dataMPS)
      .filter(
        (key) =>
          key !== 'turnOverTerminationType' &&
          key !== 'outsourceGender' &&
          key !== 'trainingHourJobGroup' &&
          key !== 'trainingHourGender' &&
          key !== 'applicantGender' &&
          key !== 'newEmployeeGender',
      )
      .forEach((key) => {
        const total = dataMPS[key].reduce(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (acc: any, obj: any) => acc + obj.total || 0,
          0,
        );

        checkSame[total] = checkSame[total] + 1 || 1;
      });

    if (Object.keys(checkSame).length !== 1) {
      throw new BadRequestException(
        `Jumlah total pada setiap table tidak sama!`,
      );
    }

    return {
      companymetadata: { ...companyData, locationdesc: '' },
      dataMps: dataMPS as unknown as MPSDataDTO,
      propertymetada: {
        companyid: companyData.companyid,
        month: month,
        year: year,
      },
    };
  }

  public async injectDataMPS(data: UploadBodyNameDTO, userinfo: UserInfoDTO) {
    const transactionData = await this.extractMpsExcelData(data.fileName);
    return await this.saveUploadMPSTransaction
      .setMetadata({ userinfo: userinfo })
      .run({ ...transactionData });
  }

  private async modifyEducation(data: (string | number)[][]) {
    return parseWithHeaderData(
      data,
      ['education', 'gender', 'total'],
      'Education',
    );
  }

  private async modifyGenderAge(data: (string | number)[][]) {
    return parseWithHeaderData(
      data,
      ['genderage', 'gender', 'total'],
      'Education',
    );
  }
  private async modifyTenure(data: (string | number)[][]) {
    return parseWithHeaderData(
      data,
      ['tenure', 'gender', 'total'],
      'Education',
    );
  }

  private async modifyGradeEmployee(data: (string | number)[][]) {
    const dataToObj: Record<string, string | number>[][] = [];
    data.slice(2).forEach((items: (string | number)[]) => {
      const obj = items.slice(1).map((item: string | number, j: number) => {
        if (isNaN(item as number)) {
          throw new BadRequestException(`Invalid total on Grade Employee`);
        }
        return {
          grade: items[0],
          employeestatus: data[0].slice(1)[j],
          gender: data[1].slice(1)[j],
          total: !isNaN(item as number) ? item : 0,
        };
      });

      dataToObj.push(obj);
    });

    return dataToObj.flat(2);
  }

  private async modifyTurnOverTermination(data: (string | number)[][]) {
    const dataToObj: Record<string, string | number>[][] = [];
    data.slice(2).forEach((items: (string | number)[]) => {
      const obj = items.slice(1).map((item: string | number, j: number) => {
        if (isNaN(item as number)) {
          throw new BadRequestException(
            `Invalid total on Turn Over Termination`,
          );
        }

        return {
          grade: items[0],
          terminationtype: data[0].slice(1)[j],
          gender: data[1].slice(1)[j],
          turnover: !isNaN(item as number) ? item : 0,
        };
      });

      dataToObj.push(obj);
    });

    return dataToObj.flat(2);
  }

  private async modifyEmployeeGender(data: (string | number)[][]) {
    const dataToMaintain = convertArrayToJSON(data, ['gender', 'total']);

    return validateTotal(dataToMaintain, 'Employee Gender');
  }

  private async modifyOutsourceGender(data: (string | number)[][]) {
    const dataToMaintain = convertArrayToJSON(data, ['gender', 'total']);

    return validateTotal(dataToMaintain, 'Outsource Gender');
  }

  private async modifyNewEmployeeGender(data: (string | number)[][]) {
    const dataToMaintain = convertArrayToJSON(data, ['gender', 'total']);

    return validateTotal(dataToMaintain, 'New Employee Gender');
  }
  private async modifyApplicantGender(data: (string | number)[][]) {
    const dataToMaintain = convertArrayToJSON(data, ['gender', 'total']);

    return validateTotal(dataToMaintain, 'Applicant Gender');
  }

  private async modifyTrainingHourJobGroup(data: (string | number)[][]) {
    const dataToMaintain = convertArrayToJSON(data, [
      'jobgroup',
      'totalemployee',
      'totaltraining',
    ]);

    return dataToMaintain;
  }

  private async modifyTrainingHourGender(data: (string | number)[][]) {
    const dataToMaintain = convertArrayToJSON(data, [
      'gender',
      'totalemployee',
      'totaltraining',
    ]);

    return dataToMaintain;
  }
}
