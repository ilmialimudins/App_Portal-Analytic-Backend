import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { TableTurnOverTerminationType } from './table-mps-turnoverterminationtype.entity';
import { Repository } from 'typeorm';
import { MasterTerminationType } from '../master-mps-terminationtype/master-mps-terminationtype.entity';
import { MasterGrade } from '../master-mps-grade/master-mps-grade.entity';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';
import { TurnOverTerminationType } from '../table-mps-property/dto/upload-mps.dto';
import { ITransactionMetadata } from 'src/common/dto/transaction-meta';
import { MPSTurnOverTerminationTypeUpdate } from './dto/table-mps-turnoverterminationtype.dto';

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

  async getTurnOverTermination(propertyid: number) {
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
          [`${key.terminationtype.toLowerCase()}_${key.gender.toLowerCase()}`]:
            val,
        });
      }, {});
      return { grade: grade.grade, ...newObj };
    });

    const columns = masterTermination.map((tmt) => {
      return {
        title: tmt.terminationtype,
        editable: true,
        childern: masterGender.map((gender) => {
          return {
            title: gender.gender,
            editable: true,
            dataIndex: `${tmt.terminationtype
              .split(' ')
              .join('')
              .toLowerCase()}_${gender.gender.toLowerCase()}`,
          };
        }),
      };
    });

    const dataSource = rows;

    return {
      dataSource: dataSource,
      columns: [
        { title: 'Golongan', dataIndex: 'golongan', editable: false },
        ...columns,
      ],
    };
  }

  public async insertTurnOverTerminationType(
    turnoverRepo: Repository<TableTurnOverTerminationType>,
    propertyid: number,
    data: TurnOverTerminationType[],
    transactionMetadata: ITransactionMetadata,
  ) {
    try {
      const masterGrade = await this.getAllGrade();
      const masterTerminationType = await this.getAllTurnOver();

      const now = moment(Date.now()).utcOffset('+0700');

      const masterGender = await this.masterMPSGenderService.getAllMPSGender();

      const dataToMaintain = data.map((item) => {
        const indexGrade = masterGrade.findIndex(
          (grade) => grade.grade === item.grade,
        );
        const indexTerminationType = masterTerminationType.findIndex(
          (terminationtype) =>
            terminationtype.terminationtype === item.terminationtype,
        );
        const indexGender = masterGender.findIndex(
          (x) => x.gender === item.gender,
        );

        let gradeid;
        let terminationtypeid;
        let genderid;

        if (indexGender >= 0) genderid = masterGender[indexGender].genderid;

        if (indexGrade > -1) gradeid = masterGrade[indexGrade].gradeid;
        if (indexTerminationType > -1)
          terminationtypeid =
            masterTerminationType[indexTerminationType].terminationtypeid;

        return {
          turnover: item.turnover,
          gradeid: parseInt(gradeid),
          terminationtypeid: parseInt(terminationtypeid),
          propertyid: propertyid,
          genderid,
          createdtime: now.format('YYYY-MM-DD HH:mm:ss'),
          createddate: parseInt(now.format('YYYYMMDD')),
          sourcecreatedmodifiedtime: now.format('YYYY-MM-DD HH:mm:ss'),
          createdby: transactionMetadata.userinfo?.username || 'System Inject',
        };
      });

      const created = await this.deleteRepoByProperty(
        turnoverRepo,
        propertyid,
      ).then(async () => {
        return await turnoverRepo
          .createQueryBuilder()
          .insert()
          .values(dataToMaintain)
          .execute();
      });

      return created.raw.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  private async deleteRepoByProperty(
    repo: Repository<TableTurnOverTerminationType>,
    propertyid: number,
  ) {
    try {
      await repo
        .createQueryBuilder()
        .delete()
        .where('propertyid = :propertyid', { propertyid })
        .execute();

      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateTurnOverTerminationType(
    propertyid: number,
    body: MPSTurnOverTerminationTypeUpdate[],
  ) {
    try {
      const query = await Promise.all(
        body.map(async (item) => {
          const record = await this.turnOverRepo
            .createQueryBuilder('turnoverterminationtype')
            .leftJoin(
              'turnoverterminationtype.terminationtype',
              'terminationtype',
            )
            .leftJoin('turnoverterminationtype.grade', 'grade')
            .leftJoin('turnoverterminationtype.gender', 'gender')
            .select(['turnoverterminationtype.id as id'])
            .where('turnoverterminationtype.propertyid = :propertyid', {
              propertyid,
            })
            .andWhere('grade.grade = :grade', { grade: item.grade })
            .andWhere('terminationtype.terminationtype = :terminationtype', {
              terminationtype: item.terminationtype,
            })
            .andWhere('gender.gender = :gender', { gender: item.gender })
            .getRawOne();

          if (!record) {
            throw new BadRequestException(
              'Some record is missing in table turn over termination type , please upload from UI first',
            );
          }

          const updateData = await this.turnOverRepo
            .createQueryBuilder()
            .update(TableTurnOverTerminationType)
            .set({ turnover: item.turnover })
            .where('id = :id', { id: record.id })
            .execute();

          return updateData;
        }),
      );
      return query;
    } catch (error) {
      throw error;
    }
  }
}
