/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseTransaction } from 'src/common/abstract.transaction';
import { ExtractExcelDataSPMDTO } from './dto/upload-spm-invited-respondents.dto';
import { EntityManager, Repository } from 'typeorm';
import { InvitedRespondents } from './spm-invited-respondents.entity';

export class UploadSPMTransaction extends BaseTransaction<
  ExtractExcelDataSPMDTO[],
  { message: string; result: any }
> {
  protected async execute(
    data: ExtractExcelDataSPMDTO[],
    manager: EntityManager,
  ): Promise<{ message: string; result: any }> {
    const repo = manager.getRepository(InvitedRespondents);

    const updateAll = await Promise.all(
      data.map(async (item) => await this.findAndUpdateOne(item, repo)),
    );

    return { message: 'success', result: updateAll };
  }

  private async findAndUpdateOne(
    data: ExtractExcelDataSPMDTO,
    repo: Repository<InvitedRespondents>,
  ) {
    const spmData = await repo.findOne({
      where: {
        companyid: data.companyid,
        surveygroupid: data.surveygroupid,
        surveyid: data.surveyid,
        demographyid: data.demographyid,
        valuedemography: data.valuedemography,
        tahun_survey: data.tahun_survey,
      },
    });

    if (!spmData) {
      return data;
    }

    return await repo.save({
      ...spmData,
      totalinvited_company: data.totalinvited_company,
      totalinvited_demography: data.totalinvited_demography,
      sourcecreatedmodifiedtime: new Date(),
      updatedby: this.metadata.userinfo?.username || 'System-Inject',
    });
  }
}
