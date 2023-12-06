import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableNewEmployeePerGender } from './table-mps-newemployeepergender.entity';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';

@Injectable()
export class MPSNewEmployeePerGenderService {
  constructor(
    @InjectRepository(TableNewEmployeePerGender)
    private newEmployeePerGenderRepository: Repository<TableNewEmployeePerGender>,

    @Inject(MasterMPSGenderService)
    private masterMPSGenderService: MasterMPSGenderService,
  ) {}

  public async getNewEmployeePerGenderByProperty(propertyid: number) {
    try {
      const result = await this.newEmployeePerGenderRepository
        .createQueryBuilder('newemployee')
        .leftJoin('newemployee.property', 'property')
        .leftJoin('newemployee.newhire', 'newhire')
        .leftJoin('newemployee.gender', 'gender')
        .select([
          'newemployee.id as id',
          'property.propertyid as propertyid',
          'property.year as year',
          'property.month as month',
          'gender.genderid as genderid',
          'gender.gender as gender',
          'newhire.newhireid as newhireid',
          'newhire.newhire as newhire',
          'newemployee.total as total',
        ])
        .where('property.propertyid = :id', { id: propertyid })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async genders() {
    return this.masterMPSGenderService.getAllMPSGender();
  }

  async getNewEmployeePerGender(propertyid: number) {
    const getApplicant = await this.getNewEmployeePerGenderByProperty(
      propertyid,
    );
    const masterGender = await this.masterMPSGenderService.getAllMPSGender();

    const rows = masterGender.map((x) => {
      let total: number | null = null;

      const index = getApplicant.findIndex(
        (item) => item.genderid === x.genderid,
      );

      if (index > -1) {
        total = getApplicant[index].total;
      }

      return { label: x.gender, total: total };
    });

    const columns = [
      { title: 'Gender', dataIndex: 'gender', editable: false },
      { title: 'Total', dataIndex: 'total', editable: true },
    ];

    const dataSource = rows;

    return {
      dataSource: dataSource,
      columns: columns,
    };
  }
}
