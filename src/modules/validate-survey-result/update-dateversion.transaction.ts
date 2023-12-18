import { BaseTransaction } from 'src/common/abstract.transaction';
import { UpdateDateVersionDto } from './dto/add-validate-survey-result.dto';
import { EntityManager, Repository } from 'typeorm';
import { ValidateSurveyResult } from './validate-survey-result.entity';

/* eslint-disable */
export class UpdateDateVersion extends BaseTransaction<
  UpdateDateVersionDto[],
  { message: string; result: any }
> {
  protected async execute(
    data: UpdateDateVersionDto[],
    manager: EntityManager,
  ): Promise<{ message: string; result: any }> {
    const repo = manager.getRepository(ValidateSurveyResult);
    const updateAll = await Promise.all(
      data.map(async (item) => await this.updateAllDateVersion(item, repo)),
    );

    return { message: 'success', result: updateAll };
  }

  private async updateAllDateVersion(
    data: UpdateDateVersionDto,
    repo: Repository<ValidateSurveyResult>,
  ) {
    const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

    const dataDateVersion = await repo
      .createQueryBuilder()
      .update(ValidateSurveyResult)
      .set({
        dateversion: createNow,
      })
      .where('surveyid = :surveyid', { surveyid: data.surveyid })
      .andWhere('company = :company', { company: data.company })
      .execute();

    return dataDateVersion;
  }
}
