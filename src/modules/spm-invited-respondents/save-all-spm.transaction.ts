import { BaseTransaction } from 'src/common/abstract.transaction';
import { SaveAllTransactionDTO } from './dto/update-all-spm.dto';
import { EntityManager } from 'typeorm';
import { InvitedRespondents } from './spm-invited-respondents.entity';

export class SaveAllSMPTransaction extends BaseTransaction<
  SaveAllTransactionDTO[],
  InvitedRespondents[]
> {
  protected execute(
    data: SaveAllTransactionDTO[],
    manager: EntityManager,
  ): Promise<InvitedRespondents[]> {
    const repo = manager.getRepository(InvitedRespondents);

    return Promise.all(
      data.map(async (item) => {
        const { id, totalinvited_demography, valuedemography } = item;

        const invitedRespondents = await repo.findOne({ where: { id } });

        if (!invitedRespondents) {
          return {} as InvitedRespondents;
        }

        invitedRespondents.totalinvited_demography = totalinvited_demography;
        invitedRespondents.valuedemography = valuedemography;
        invitedRespondents.sourcecreatedmodifiedtime = new Date();
        invitedRespondents.totalinvited_company =
          invitedRespondents.totalinvited_company || 0;
        invitedRespondents.updatedby =
          this.metadata.userinfo?.username || 'System-Inject';

        return await repo.save(invitedRespondents);
      }),
    );
  }
}
