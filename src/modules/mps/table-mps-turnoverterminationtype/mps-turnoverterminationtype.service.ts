import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableTurnOverTerminationType } from './table-mps-turnoverterminationtype.entity';
import { Repository } from 'typeorm';
import { MasterTerminationType } from '../master-mps-terminationtype/master-mps-terminationtype.entity';
import { MasterGrade } from '../master-mps-grade/master-mps-grade.entity';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';

@Injectable()
export class MPSTurnOverTerminationTypeService {
  constructor(
    @InjectRepository(TableTurnOverTerminationType)
    private turnOverRepo: Repository<TableTurnOverTerminationType>,

    @InjectRepository(MasterTerminationType)
    private masterTerminationTypeRepo: Repository<MasterTerminationType>,

    @InjectRepository(MasterGrade)
    private masterGradeRepo: Repository<MasterGrade>,

    @Inject(MasterMPSGenderService)
    private masterMPSGenderService: MasterMPSGenderService,
  ) {}

  private async getAllTurnOver() {
    return await this.masterTerminationTypeRepo.find({});
  }

  private async getAllGrade() {
    return await this.masterGradeRepo.find({});
  }

  public async getTurnOverTerminationByPropertyId(propertyId: number) {
    try {
      const result = await this.turnOverRepo
        .createQueryBuilder('turnover')
        .leftJoin('turnover.property', 'property')
        .leftJoin('turnover.grade', 'grade')
        .leftJoin('turnover.terminationtype', 'terminationtype')
        .leftJoin('turnover.gender', 'gender')
        .select([
          'turnover.id as id',
          'property.year as year',
          'property.month as month',
          'grade.gradeid as gradeid',
          'grade.grade as grade',
          'terminationtype.terminationtypeid as terminationtypeid',
          'terminationtype.terminationtype as terminationtype',
          'gender.genderid as genderid',
          'gender.gender as gender',
          'turnover.turnover as total',
        ])
        .where('property.propertyid = :propertyId', { propertyId })
        .getRawMany();
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getDataForExcelTable(propertyid: number) {
    const masterGrade = await this.getAllGrade();
    const masterTermination = await this.getAllTurnOver();
    const masterGender = await this.masterMPSGenderService.getAllMPSGender();

    const turnOverTermination = await this.getTurnOverTerminationByPropertyId(
      propertyid,
    );

    const mappedTerminationGender = masterTermination
      .map((tmt) => {
        return masterGender.map((gender) => ({
          genderid: gender.genderid,
          gender: gender.gender,
          terminationtypeid: tmt.terminationtypeid,
          terminationtype: tmt.terminationtype,
        }));
      })
      .flat(2);

    const rows = masterGrade.map((grade) => {
      const newObj = mappedTerminationGender.reduce((o, key) => {
        let val: number | null;

        const index = turnOverTermination.findIndex((item) => {
          return (
            item.terminationtypeid === key.terminationtypeid &&
            item.gradeid === grade.gradeid &&
            item.genderid === key.genderid
          );
        });

        if (index > -1) {
          val = turnOverTermination[index].total;
        } else {
          val = null;
        }
        return Object.assign(o, {
          [`${key.terminationtype}_${key.gender}`]: val,
        });
      }, {});
      return { grade: grade.grade, ...newObj };
    });

    const terminationTypeTable = {
      cols: mappedTerminationGender.map((x) => ({
        terminationtype: x.terminationtype,
        gender: x.gender,
      })),
      rows: rows,
      gendersNum: masterGender.length,
      masterGender,
    };

    return terminationTypeTable;
  }
}
