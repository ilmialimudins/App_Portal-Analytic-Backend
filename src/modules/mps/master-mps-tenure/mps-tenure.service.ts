import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableTenure } from '../table-mps-tenure/table-mps-tenure.entity';
import { Repository } from 'typeorm';
import { MasterTenure } from './master-mps-tenure.entity';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';

@Injectable()
export class MPSTenureService {
  constructor(
    @InjectRepository(TableTenure) private tenureRepo: Repository<TableTenure>,
    @InjectRepository(MasterTenure)
    private masterTenureRepo: Repository<MasterTenure>,
    @Inject(MasterMPSGenderService)
    private masterGenderSerivce: MasterMPSGenderService,
  ) {}

  private async getAllMasterTenure() {
    return this.masterTenureRepo.find();
  }

  public async getTenureByProperty(propertyid: number) {
    try {
      const result = await this.tenureRepo
        .createQueryBuilder('tenure')
        .leftJoin('tenure.property', 'property')
        .leftJoin('tenure.tenure', 'ms_tenure')
        .leftJoin('tenure.gender', 'gender')
        .select([
          'tenure.id as id',
          'property.propertyid as propertyid',
          'property.year as year',
          'property.month as month',
          'ms_tenure.tenureid as tenureid',
          'ms_tenure.tenure as tenure',
          'gender.genderid as genderid',
          'gender.gender as gender',
          'tenure.total as total',
        ])
        .where('property.propertyid = :id', { id: propertyid })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getDataForExcelTable(propertyid: number) {
    const masterTenure = await this.getAllMasterTenure();
    const tenureByProperty = await this.getTenureByProperty(propertyid);
    const masterGenders = await this.masterGenderSerivce.getAllMPSGender();

    const rows = masterTenure.map((tenure) => {
      const newObj = masterGenders.reduce((o, key) => {
        let val: number | null;

        const index = tenureByProperty.findIndex((item) => {
          return (
            item.genderid === key.genderid && item.tenureid === tenure.tenureid
          );
        });

        if (index > -1) {
          val = tenureByProperty[index].total;
        } else {
          val = null;
        }
        return Object.assign(o, {
          [key.gender]: val,
        });
      }, {});
      return { tenure: tenure.tenure, ...newObj };
    });

    return { rows, masterGenders, gendersNum: masterGenders.length };
  }
}
