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

  async getAllMasterMenu() {
    try {
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
        .getMany();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllMasterMenuParent() {
    try {
      const data = await this.masterMenuRepository
        .createQueryBuilder('mastermenu')
        .select(['menuid', 'menuname', 'parentid'])
        .where('mastermenu.isdelete = :isdelete', { isdelete: false })
        .andWhere('mastermenu.parentid = :parentid', { parentid: 0 })
        .orderBy('parentid')
        .getMany();

      return data;
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
          url: mastermenu.url,
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
