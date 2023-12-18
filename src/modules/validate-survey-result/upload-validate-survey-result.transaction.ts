import { BaseTransaction } from 'src/common/abstract.transaction';
import { ExtractedExcelDataSurveyDTO } from './dto/upload-validate-survey-result.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ValidateSurveyResult } from './validate-survey-result.entity';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateDateVersion } from './update-dateversion.transaction';

/* eslint-disable */
@Injectable()
export class UploadSurveyTransaction extends BaseTransaction<
  ExtractedExcelDataSurveyDTO[],
  { message: string; result: any }
> {
  constructor(
    private datasource: DataSource,
    @Inject(UpdateDateVersion)
    private updateDateVersion: UpdateDateVersion,
  ) {
    super(datasource);
  }

  protected async execute(
    data: ExtractedExcelDataSurveyDTO[],
    manager: EntityManager,
  ): Promise<{ message: string; result: any }> {
    const repo = manager.getRepository(ValidateSurveyResult);

    const dataRemoveDuplicate = {};

    const updateAll = await Promise.all(
      data.map(async (item) => {
        dataRemoveDuplicate[item.surveyid] = {
          company: item.company,
          surveyid: item.surveyid,
        };
        return await this.findAndUpdateOne(item, repo);
      }),
    );

    this.updateDateVersion.run(Object.values(dataRemoveDuplicate));

    return { message: 'success', result: updateAll };
  }

  private async findAndUpdateOne(
    data: ExtractedExcelDataSurveyDTO,
    repo: Repository<ValidateSurveyResult>,
  ) {
    const surveyData = await repo.findOne({
      where: {
        respondentid: data.respondentid,
        surveyid: data.surveyid,
        company: data.company,
        tahunsurvey: data.tahunsurvey,
      },
    });

    if (!surveyData) {
      return data;
    }

    return await repo.update(
      {
        respondentid: surveyData.respondentid,
        surveyid: surveyData.surveyid,
        company: surveyData.company,
      },
      {
        surveyid: data.surveyid,
        respondentid: data.respondentid,
        businesslinecode: data.businesslinecode,
        businessline: data.businessline,
        company: data.company,
        division: data.division,
        department: data.department,
        branch: data.branch,
        directorate: data.directorate,
        education: data.education,
        grade: data.grade,
        jobtitle: data.jobtitle,
        locationname: data.locationname,
        age: data.age,
        agegeneration: data.agegeneration,
        agegroup: data.agegroup,
        serviceyears: data.serviceyears,
        gender: data.gender,
        region: data.region,
        area: data.area,
        plant: data.plant,
        kebun: data.kebun,
        jobsites: data.jobsites,
        statuskaryawan: data.statuskaryawan,
        functionname: data.functionname,
        salesoffice: data.salesoffice,
        tahunlahir: data.tahunlahir,
        tahunmasuk_perusahaan: data.tahunmasuk_perusahaan,
        tahunmasuk_astra: data.tahunmasuk_astra,
        tahunsurvey: data.tahunsurvey,
        entryyear_difference: data.entryyear_difference,
        fillingtime: data.fillingtime,
        similaranswer: data.similaranswer,
        completeanswer: data.completeanswer,
        age_this_year: data.age_this_year,
        age_when_entering_company: data.age_when_entering_company,
        updatedby: this.metadata.userinfo?.username || 'System-Inject',
      },
    );
  }
}
