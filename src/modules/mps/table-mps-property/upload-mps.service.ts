import * as excel from 'exceljs';
import { UploadBodyNameDTO } from './dto/upload-mps.dto';
import { BadRequestException, Inject } from '@nestjs/common';
import { CompanyService } from 'src/modules/master-company-ees/master-company-ees.service';
import { convertTableToArray } from 'src/common/utils/convertExcelTabletoArray';

export class UploadMPSService {
  constructor(@Inject(CompanyService) private companyService: CompanyService) {}

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
    const locationcompany = worksheet.getCell('E10');

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

    if (!locationcompany.value) {
      throw new BadRequestException(
        'Location is not defined, something wrong with template',
      );
    }

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
    console.log(month, year);

    const dataMPS = {
      education: convertTableToArray(
        { colStart: 'H', colEnd: 'J', rowStart: 27, rowEnd: 32 },
        worksheet,
      ),
    };

    console.log(dataMPS);
  }

  public async injectDataMPS(data: UploadBodyNameDTO) {
    console.log(data.fileName);
    await this.extractMpsExcelData(data.fileName);

    return 'jancuk';
  }

  public async modifyEducation(data: string | number[][]) {
    console.log(data);
  }
}
