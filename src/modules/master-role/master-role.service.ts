import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterRole } from './master-role.entity';
import { Repository } from 'typeorm';
import { MasterRoleDto } from './dto/master-role.dto';
import { AddMasterRoleDto } from './dto/add-master-role.dto';
import { UpdateMasterRoleDto } from './dto/update-master-role.dto';

@Injectable()
export class MasterRoleService {
  constructor(
    @InjectRepository(MasterRole)
    private masterRoleRepository: Repository<MasterRole>,
  ) {}

  async getAllMasterRole(
    page: number,
    pageSize: number,
  ): Promise<{ data: MasterRoleDto[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.masterRoleRepository
        .createQueryBuilder('masterrole')
        .select(['roleid', 'rolename', 'roledesc'])
        .where('masterrole.isdelete = :isdelete', { isdelete: false })
        .orderBy('rolename')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.masterRoleRepository
        .createQueryBuilder('masterrole')
        .select(['roleid', 'rolename', 'roledesc'])
        .where('masterrole.isdelete = :isdelete', { isdelete: false })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getMasterRoleName(
    page: number,
    pageSize: number,
    rolename: string,
  ): Promise<{ data: MasterRole[]; total: number }> {
    try {
      const offset = (page - 1) * pageSize;

      const data = await this.masterRoleRepository
        .createQueryBuilder('masterrole')
        .select(['roleid', 'rolename', 'roledesc'])
        .where('masterrole.isdelete = :isdelete', { isdelete: false })
        .andWhere('masterrole.rolename = :rolename', { rolename })
        .orderBy('rolename')
        .offset(offset)
        .limit(pageSize)
        .getRawMany();

      const total = await this.masterRoleRepository
        .createQueryBuilder('masterrole')
        .select(['roleid', 'rolename', 'roledesc'])
        .andWhere('masterrole.rolename = :rolename', { rolename })
        .where('masterrole.isdelete = :isdelete', { isdelete: false })
        .getCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getMasterRoleId(roleid: number): Promise<MasterRoleDto | undefined> {
    try {
      const query = await this.masterRoleRepository
        .createQueryBuilder('masterrole')
        .where('masterrole.roleid = :roleid', { roleid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async createMasterRole(masterrole: AddMasterRoleDto) {
    try {
      const query = await this.masterRoleRepository
        .createQueryBuilder('masterrole')
        .insert()
        .into(MasterRole)
        .values({
          rolename: masterrole.rolename,
          roledesc: masterrole.roledesc,
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

  async updateMasterRole(roleid: number, masterrole: UpdateMasterRoleDto) {
    try {
      const query = await this.masterRoleRepository
        .createQueryBuilder()
        .update(MasterRole)
        .set({
          rolename: masterrole.rolename,
          roledesc: masterrole.roledesc,
        })
        .where('roleid = :roleid', { roleid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteMasterRole(roleid: number) {
    try {
      const query = await this.masterRoleRepository
        .createQueryBuilder()
        .update(MasterRole)
        .set({ isdelete: 'true' })
        .where('roleid = :roleid', { roleid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}
