import { BaseTransaction } from 'src/common/abstract.transaction';
import { SyncRoleUserDTO } from './dto/update-role-user.dto';
import { EntityManager } from 'typeorm';
import { RoleUser } from './role-user.entity';

export class SyncRoleUserTransaction extends BaseTransaction<
  SyncRoleUserDTO,
  { message: string; status: string }
> {
  protected async execute(
    data: SyncRoleUserDTO,
    manager: EntityManager,
  ): Promise<{ message: string; status: string }> {
    const rolesRepository = manager.getRepository(RoleUser);

    const userroles = data.userroles;

    await rolesRepository.delete({ userid: userroles[0].userid });

    // insert new
    await rolesRepository
      .createQueryBuilder()
      .insert()
      .values(
        userroles.map((item) => ({
          userid: item.userid,
          roleid: item.roleid,
          isdelete: 'false',
          createdby: this.metadata.userinfo?.username ?? 'System-Inject',
          updatedby: this.metadata.userinfo?.username ?? 'System-Inject',
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
        })),
      )
      .execute();

    return { message: 'Sync role user success', status: 'success' };
  }
}
