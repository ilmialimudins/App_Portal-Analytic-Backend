import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableOutsourcingPerGender } from './table-mps-outsourcingpergender.entity';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';

@Injectable()
export class MPSOutsourcingPerGenderService {
  constructor(
    @InjectRepository(TableOutsourcingPerGender)
    private outsourcingPerGenderRepository: Repository<TableOutsourcingPerGender>,

    @Inject(MasterMPSGenderService)
    private masterMPSGenderService: MasterMPSGenderService,
  ) {}

  public async getOutsourcingPerGenderByProperty(propertyid: number) {
    try {
      const result = await this.outsourcingPerGenderRepository
        .createQueryBuilder('outsourceGender')
        .leftJoin('outsourceGender.property', 'property')
        .leftJoin('outsourceGender.newhire', 'newhire')
        .leftJoin('outsourceGender.gender', 'gender')
        .select([
          'outsourceGender.id as id',
          'property.propertyid as propertyid',
          'property.year as year',
          'property.month as month',
          'gender.genderid as genderid',
          'gender.gender as gender',
          'newhire.newhireid as newhireid',
          'newhire.newhire as newhire',
          'outsourceGender.total as total',
        ])
        .where('property.propertyid = :id', { id: propertyid })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getOutSourcingPerGender(propertyid: number) {
    const getApplicant = await this.getOutsourcingPerGenderByProperty(
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
