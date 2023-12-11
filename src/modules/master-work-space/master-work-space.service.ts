import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterWorkSpace } from './master-work-space.entity';
import { Repository } from 'typeorm';
import { MasterWorkSpaceDto } from './dto/master-work-space.dto';
import { AddMasterWorkSpaceDto } from './dto/add-master-work-space.dto';
import { UpdateMasterWorkSpaceDto } from './dto/update-master-work-space.dto';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@Injectable()
export class MasterWorkSpaceService {
  constructor(
    @InjectRepository(MasterWorkSpace)
    private masterWorkSpaceRepository: Repository<MasterWorkSpace>,
  ) {}

  async getAllMasterWorkSpace() {
    try {
      const data = await this.masterWorkSpaceRepository
        .createQueryBuilder('masterworkspace')
        .select([
          'workspaceid',
          'workspacename',
          'workspacedesc',
          'workspacepowerbiid',
        ])
        .where('masterworkspace.isdelete = :isdelete', { isdelete: false })
        .orderBy('masterworkspace.sourcecreatedmodifiedtime', 'DESC')
        .getRawMany();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMasterWorkspaceId(
    workspaceid: number,
  ): Promise<MasterWorkSpaceDto | undefined> {
    try {
      const query = await this.masterWorkSpaceRepository
        .createQueryBuilder('masterworkspace')
        .where('masterworkspace.workspaceid = :workspaceid', { workspaceid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async checkDuplicateWorkspace(workspace: string) {
    try {
      const query = await this.masterWorkSpaceRepository
        .createQueryBuilder('masterworkspace')
        .where('masterworkspace.workspacename = :workspace', { workspace })
        .where('masterworkspace.isdelete = :isdelete', { isdelete: false })
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getLastMasterWorkSpaceCode() {
    try {
      const query = await this.masterWorkSpaceRepository
        .createQueryBuilder('masterworkspace')
        .select('masterworkspace.workspacecode')
        .orderBy('masterworkspace.workspaceid', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createMasterWorkSpace(
    masterworkspace: AddMasterWorkSpaceDto,
    userinfo: UserInfoDTO,
  ) {
    try {
      const createNow = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);

      const year = createNow.getFullYear();
      const month = createNow.getMonth() + 1;
      const date = createNow.getDate();

      const createdDate = parseInt(`${year}${month}${date}`);

      const query = this.masterWorkSpaceRepository
        .createQueryBuilder('masterworkspace')
        .insert()
        .into(MasterWorkSpace)
        .values({
          workspacename: masterworkspace.workspacename,
          workspacedesc: masterworkspace.workspacedesc,
          workspacepowerbiid: masterworkspace.workspacepowerbiid,
          createdby: userinfo.fullname,
          isdelete: 'false',
          createdtime: createNow,
          createddate: createdDate,
          sourcecreatedmodifiedtime: createNow,
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateMasterWorkSpace(
    workspaceid: number,
    masterworkspace: UpdateMasterWorkSpaceDto,
    userinfo: UserInfoDTO,
  ) {
    try {
      const query = await this.masterWorkSpaceRepository
        .createQueryBuilder()
        .update(MasterWorkSpace)
        .set({
          workspacename: masterworkspace.workspacename,
          workspacedesc: masterworkspace.workspacedesc,
          workspacepowerbiid: masterworkspace.workspacepowerbiid,
          updatedby: userinfo.fullname,
        })
        .where('workspaceid = :workspaceid', { workspaceid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteMasterWorkSpace(workspaceid: number) {
    try {
      const query = await this.masterWorkSpaceRepository
        .createQueryBuilder()
        .update(MasterWorkSpace)
        .set({ isdelete: 'true' })
        .where('workspaceid = :workspaceid', { workspaceid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
