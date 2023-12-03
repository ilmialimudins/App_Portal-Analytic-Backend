import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableEducation } from './table-mps-education.entity';
import { MasterEducation } from '../master-mps-education/master-mps-education.entity';
import { Repository } from 'typeorm';

import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';

@Injectable()
export class MPSEducationService {
  constructor(
    @InjectRepository(TableEducation)
    private educationRepo: Repository<TableEducation>,

    @InjectRepository(MasterEducation)
    private masterEducationRepo: Repository<MasterEducation>,

    @Inject(MasterMPSGenderService)
    private masterMPSGenderService: MasterMPSGenderService,
  ) {}

  public async getEducationByProperty(propertyid: number) {
    try {
      const result = await this.educationRepo
        .createQueryBuilder('education')
        .leftJoin('education.property', 'property')
        .leftJoin('education.education', 'ms_education')
        .leftJoin('education.gender', 'gender')
        .select([
          'education.id as id',
          'property.propertyid as propertyid',
          'property.year as year',
          'property.month as month',
          'ms_education.educationid as educationid',
          'ms_education.education as education',
          'gender.genderid as genderid',
          'gender.gender as gender',
          'education.total as total',
        ])
        .where('property.propertyid = :id', { id: propertyid })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }
  public async getDataForExcelTable(propertyid: number) {
    const getEducation = await this.getEducationByProperty(propertyid);
    const masterEducation = await this.getAllMasterEducation();
    const masterGender = await this.masterMPSGenderService.getAllMPSGender();

    const rows = masterEducation.map((education) => {
      const newObj = masterGender.reduce((o, key) => {
        let val: number | null;

        const index = getEducation.findIndex((item) => {
          return (
            item.genderid === key.genderid &&
            item.educationid === education.educationid
          );
        });

        if (index > -1) {
          val = getEducation[index].total;
        } else {
          val = null;
        }
        return Object.assign(o, {
          [key.gender]: val,
        });
      }, {});
      return { education: education.education, ...newObj };
    });

    return { rows, masterGender, gendersNum: masterGender.length };
  }

  public async getAllMasterEducation() {
    return this.masterEducationRepo.find();
  }
}
