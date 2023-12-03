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
}
