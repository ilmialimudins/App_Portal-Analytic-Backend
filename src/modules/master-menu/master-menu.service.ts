import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterMenu } from './master-menu.entity';
import { Repository } from 'typeorm';
import { MasterMenuDto } from './dto/master-menu.dto';
import { AddMasterMenuDto } from './dto/add-master-menu.dto';
import { UpdateMasterMenuDto } from './dto/update-master-menu.dto';

@Injectable()
export class MasterMenuService {
  constructor(
    @InjectRepository(MasterMenu)
    private masterMenuRepository: Repository<MasterMenu>,
  ) {}

  async getAllMasterMenu(
    page: number,
    take: number,
  ): Promise<{
    data: MasterMenuDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    try {
      const offset = (page - 1) * take;

      const data = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .select([
          'menuid',
          'menuname',
          'parentid',
          'sequence',
          'url',
          'issection',
        ])
        .where('mastermenu.isdelete = :isdelete', { isdelete: false })
        .orderBy('parentid')
        .offset(offset)
        .limit(take)
        .getRawMany();

      const itemCount = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .select(['menuname', 'parentid', 'sequence', 'url', 'issection'])
        .where('mastermenu.isdelete = :isdelete', { isdelete: false })
        .getCount();

      const pageCount = Math.ceil(itemCount / take);
      const hasPreviousPage = page > 1;
      const hasNextPage = page < pageCount;

      return {
        data,
        page,
        take,
        itemCount,
        pageCount,
        hasPreviousPage,
        hasNextPage,
      };
    } catch (error) {
      throw error;
    }
  }

  async getMasterMenuId(menuid: number): Promise<MasterMenuDto | undefined> {
    try {
      const query = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .where('mastermenu.menuid = :menuid', { menuid })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async getLastMasterMenuCode() {
    try {
      const query = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .select('mastermenu.menucode')
        .orderBy('mastermenu.menucode', 'DESC')
        .getOne();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async createMasterMenu(mastermenu: AddMasterMenuDto) {
    try {
      const query = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .insert()
        .into(MasterMenu)
        .values({
          menuname: mastermenu.menuname,
          parentid: mastermenu.parentid,
          sequence: mastermenu.sequence,
          url: mastermenu.url,
          issection: mastermenu.issection,
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

  async updateMasterMenu(menuid: number, mastermenu: UpdateMasterMenuDto) {
    try {
      const query = await this.masterMenuRepository
        .createQueryBuilder()
        .update(MasterMenu)
        .set({
          menuname: mastermenu.menuname,
          parentid: mastermenu.parentid,
          sequence: mastermenu.sequence,
          url: mastermenu.url,
          issection: mastermenu.issection,
        })
        .where('menuid = :menuid', { menuid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteMasterMenu(menuid: number) {
    try {
      const query = await this.masterMenuRepository
        .createQueryBuilder()
        .update(MasterMenu)
        .set({ isdelete: 'true' })
        .where('menuid = :menuid', { menuid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }
}