import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableGenderAge } from './table-mps-genderage.entity';
import { MasterAgeGroup } from '../master-mps-agegroup/master-mps-agegroup.entity';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';

@Injectable()
export class MPSGenderAgeService {
  constructor(
    @InjectRepository(TableGenderAge)
    private genderAgeRepo: Repository<TableGenderAge>,

    @InjectRepository(MasterAgeGroup)
    private masterAgeGroupRepo: Repository<MasterAgeGroup>,

    @Inject(MasterMPSGenderService)
    private masterGenderSerivce: MasterMPSGenderService,
  ) {}

  private async getAllMasterAgeGroup() {
    return this.masterAgeGroupRepo.find();
  }

  public async getGenderAgeByProperty(propertyid: number) {
    try {
      const result = await this.genderAgeRepo
        .createQueryBuilder('genderage')
        .leftJoin('genderage.property', 'property')
        .leftJoin('genderage.gender', 'ms_gender')
        .leftJoin('genderage.agegroup', 'agegroup')
        .select([
          'genderage.id as id',
          'property.propertyid as propertyid',
          'property.year as year',
          'property.month as month',
          'ms_gender.genderid as genderid',
          'ms_gender.gender as gender',
          'agegroup.agegroupid as agegroupid',
          'agegroup.agegroup as agegroup',
          'genderage.total as total',
        ])
        .where('property.propertyid = :id', { id: propertyid })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getDataForExcelTable(propertyid: number) {
    const masterGenders = await this.masterGenderSerivce.getAllMPSGender();
    const masterAgeGroup = await this.masterAgeGroupRepo.find();

    const genderAge = await this.getGenderAgeByProperty(propertyid);

    const rows = masterAgeGroup.map((agegroup) => {
      const newObj = masterGenders.reduce((o, key) => {
        let val: number | null;

        const index = genderAge.findIndex((item) => {
          return (
            item.genderid === key.genderid &&
            item.agegroupid === agegroup.agegroupid
          );
        });

        if (index > -1) {
          val = genderAge[index].total;
        } else {
          val = null;
        }
        return Object.assign(o, {
          [key.gender]: val,
        });
      }, {});
      return { grade: agegroup.agegroup, ...newObj };
    });

    return { rows, masterGenders, gendersNum: masterGenders.length };
  }

  async getGenderAge(propertyid: number) {
    const masterGenders = await this.masterGenderSerivce.getAllMPSGender();
    const masterAgeGroup = await this.masterAgeGroupRepo.find();

    const genderAge = await this.getGenderAgeByProperty(propertyid);

    const rows = masterAgeGroup.map((agegroup) => {
      const newObj = masterGenders.reduce((o, key) => {
        let val: number | null;

        const index = genderAge.findIndex((item) => {
          return (
            item.genderid === key.genderid &&
            item.agegroupid === agegroup.agegroupid
          );
        });

        if (index > -1) {
          val = genderAge[index].total;
        } else {
          val = null;
        }
        return Object.assign(o, {
          [key.gender.toLowerCase()]: val,
        });
      }, {});
      return { grade: agegroup.agegroup, ...newObj };
    });

    const columns = masterGenders.map((gender) => {
      return {
        title: gender.gender,
        dataIndex: gender.gender.toLowerCase(),
        editable: true,
      };
    });

    const dataSource = rows;

    return {
      dataSource: dataSource,
      columns: [
        { title: 'Umur', dataIndex: 'agegroup', editable: false },
        ...columns,
      ],
    };
  }
}
