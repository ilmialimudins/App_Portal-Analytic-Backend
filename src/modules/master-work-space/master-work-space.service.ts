import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterWorkSpace } from './master-work-space.entity';
import { Repository } from 'typeorm';
import { MasterWorkSpaceDto } from './dto/master-work-space.dto';
import { AddMasterWorkSpaceDto } from './dto/add-master-work-space.dto';
import { UpdateMasterWorkSpaceDto } from './dto/update-master-work-space.dto';

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
        .orderBy('workspacename')
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

  async getLastMasterWorkSpaceCode() {
    try {
      const query = await this.masterWorkSpaceRepository
        .createQueryBuilder('masterworkspace')
        .select('masterworkspace.workspacecode')
        .orderBy('masterworkspace.workspacecode', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createMasterWorkSpace(masterworkspace: AddMasterWorkSpaceDto) {
    try {
      const query = this.masterWorkSpaceRepository
        .createQueryBuilder('masterworkspace')
        .insert()
        .into(MasterWorkSpace)
        .values({
          workspacename: masterworkspace.workspacename,
          workspacedesc: masterworkspace.workspacedesc,
          workspacepowerbiid: masterworkspace.workspacepowerbiid,
          isdelete: 'false',
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
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
  ) {
    try {
      const query = await this.masterWorkSpaceRepository
        .createQueryBuilder()
        .update(MasterWorkSpace)
        .set({
          workspacename: masterworkspace.workspacename,
          workspacedesc: masterworkspace.workspacedesc,
          workspacepowerbiid: masterworkspace.workspacepowerbiid,
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
      await this.masterWorkSpaceRepository
        .createQueryBuilder()
        .update(MasterWorkSpace)
        .set({ isdelete: 'true' })
        .where('workspaceid = :workspaceid', { workspaceid })
        .execute();

      return `Data berhasil di hapus`;
    } catch (error) {
      throw error;
    }
  }
}
