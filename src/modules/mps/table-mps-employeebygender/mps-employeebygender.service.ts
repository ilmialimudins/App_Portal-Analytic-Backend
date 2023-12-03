import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableEmployeeByGender } from './table-mps-employeebygender.entity';
import { Repository } from 'typeorm';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';

@Injectable()
export class MPSEmployeeByGenderService {
  constructor(
    @InjectRepository(TableEmployeeByGender)
    private employeeByGenderRepository: Repository<TableEmployeeByGender>,

    @Inject(MasterMPSGenderService)
    private masterMPSGenderService: MasterMPSGenderService,
  ) {}

  public async getEmployeeGenderByProperty(propertyid: number) {
    try {
      const result = await this.employeeByGenderRepository
        .createQueryBuilder('employeeByGender')
        .leftJoin('employeeByGender.property', 'property')
        .leftJoin('employeeByGender.gender', 'gender')
        .select([
          'employeeByGender.id as id',
          'property.propertyid as propertyid',
          'property.year as year',
          'property.month as month',
          'gender.genderid as genderid',
          'gender.gender as gender',
          'employeeByGender.total as total',
        ])
        .where('property.propertyid = :id', { id: propertyid })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getDataForExcelTable(propertyid: number) {
    const employeeByGenderData = await this.getEmployeeGenderByProperty(
      propertyid,
    );

    const genderData = await this.masterMPSGenderService.getAllMPSGender();

    const rows = genderData.map((x) => {
      let total: number | null = null;

      const index = employeeByGenderData.findIndex(
        (item) => item.genderid === x.genderid,
      );

      if (index > -1) {
        total = employeeByGenderData[index].total;
      }

      return { label: x.gender, total: total };
    });

    return { rows: rows, gendersNum: genderData.length };
  }
}
