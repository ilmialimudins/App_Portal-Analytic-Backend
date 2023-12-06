import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableApplicantPerGender } from './table-mps-applicantpergender.entity';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';

@Injectable()
export class MPSApplicantPerGenderService {
  constructor(
    @InjectRepository(TableApplicantPerGender)
    private applicantPerGenderRepository: Repository<TableApplicantPerGender>,

    @Inject(MasterMPSGenderService)
    private masterMPSGenderService: MasterMPSGenderService,
  ) {}

  public async getApplicantPerGenderByProperty(propertyid: number) {
    try {
      const result = await this.applicantPerGenderRepository
        .createQueryBuilder('applicant')
        .leftJoin('applicant.property', 'property')
        .leftJoin('applicant.newhire', 'newhire')
        .leftJoin('applicant.gender', 'gender')
        .select([
          'applicant.id as id',
          'property.propertyid as propertyid',
          'property.year as year',
          'property.month as month',
          'gender.genderid as genderid',
          'gender.gender as gender',
          'newhire.newhireid as newhireid',
          'newhire.newhire as newhire',
          'applicant.total as total',
        ])
        .where('property.propertyid = :id', { id: propertyid })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getApplicationPerGender(propertyid: number) {
    const getApplicant = await this.getApplicantPerGenderByProperty(propertyid);
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
