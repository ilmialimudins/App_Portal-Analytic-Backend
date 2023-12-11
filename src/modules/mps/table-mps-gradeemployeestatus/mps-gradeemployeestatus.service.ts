import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';

import { MasterEmployeeStatus } from '../master-mps-employeestatus/master-mps-employeestatus.entity';
import { MasterGrade } from '../master-mps-grade/master-mps-grade.entity';

import { TableGradeEmployeeStatus } from './table-mps-gradeemployeestatus.entity';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';
import { MPSGradeEmployeeStatusUpdate } from './dto/table-mps-gradeemployeestatus.dto';
import { GradeEmployee } from '../table-mps-property/dto/upload-mps.dto';
import { ITransactionMetadata } from 'src/common/dto/transaction-meta';

@Injectable()
export class MPSGradeEmployeeStatusService {
  constructor(
    @InjectRepository(TableGradeEmployeeStatus)
    private mpsGradeEmployeeStatusRepo: Repository<TableGradeEmployeeStatus>,

    @InjectRepository(MasterGrade)
    private masterGradeRepo: Repository<MasterGrade>,

    @InjectRepository(MasterEmployeeStatus)
    private masterEmployeeStatusRepo: Repository<MasterEmployeeStatus>,

    @Inject(MasterMPSGenderService)
    private masterMPSGenderService: MasterMPSGenderService,
  ) {}

  public async getGradeEmployeeStatus(propertyid: number) {
    return this.mpsGradeEmployeeStatusRepo.find({ where: { propertyid } });
  }

  public async getAllGrade() {
    return this.masterGradeRepo.find();
  }

  public async getAllEmployeeStatus() {
    return this.masterEmployeeStatusRepo.find();
  }

  public async getDataForExcelTable(propertyid: number) {
    const grades = await this.getAllGrade();
    const employeeStatus = await this.getAllEmployeeStatus();
    const genders = await this.masterMPSGenderService.getAllMPSGender();
    const gradeEmployeeStatus = await this.getGradeEmployeeStatus(propertyid);

    const mapGenderStatus = employeeStatus
      .map((status) => {
        return genders.map((gender) => ({
          genderid: gender.genderid,
          gender: gender.gender,
          employeestatusid: status.employeestatusid,
          employeestatus: status.employeestatus,
        }));
      })
      .flat(2);

    const mapGradeEmployeeStatusData = grades.map((grade) => {
      const newObj = mapGenderStatus.reduce((acc, curr) => {
        let val: number | null;

        const index = gradeEmployeeStatus.findIndex((item) => {
          return (
            item.gradeid == grade.gradeid &&
            item.employeestatusid == curr.employeestatusid
          );
        });

        if (index > -1) {
          val = gradeEmployeeStatus[index].total;
        } else {
          val = null;
        }

        return Object.assign(acc, {
          [`${curr.employeestatus}_${curr.gender}`]: val,
        });
      }, {});

      return { grade: grade.grade, ...newObj };
    });

    const gradeEmployeeStatusTable = {
      cols: mapGenderStatus.map((x) => ({
        employeestatus: x.employeestatus,
        gender: x.gender,
      })),
      rows: mapGradeEmployeeStatusData,
      gendersNum: genders.length,
    };
    return gradeEmployeeStatusTable;
  }

  async getGradeEmployeeStatusData(propertyid: number) {
    const grades = await this.getAllGrade();
    const employeeStatus = await this.getAllEmployeeStatus();
    const genders = await this.masterMPSGenderService.getAllMPSGender();
    const gradeEmployeeStatus = await this.getGradeEmployeeStatus(propertyid);

    const mapGenderStatus = employeeStatus
      .map((status) => {
        return genders.map((gender) => ({
          genderid: gender.genderid,
          gender: gender.gender,
          employeestatusid: status.employeestatusid,
          employeestatus: status.employeestatus,
        }));
      })
      .flat(2);

    const rows = grades.map((grade) => {
      const newObj = mapGenderStatus.reduce((acc, curr) => {
        let val: number | null;

        const index = gradeEmployeeStatus.findIndex((item) => {
          return (
            item.gradeid == grade.gradeid &&
            item.employeestatusid == curr.employeestatusid
          );
        });

        if (index > -1) {
          val = gradeEmployeeStatus[index].total;
        } else {
          val = null;
        }

        return Object.assign(acc, {
          [`${curr.employeestatus.toLowerCase()}_${curr.gender.toLowerCase()}`]:
            val,
        });
      }, {});

      return { grade: grade.grade, ...newObj };
    });

    const columns = employeeStatus.map((status) => {
      return {
        title: status.employeestatus,
        editable: true,
        childern: genders.map((gender) => {
          return {
            title: gender.gender,
            editable: true,
            dataIndex: `${status.employeestatus.toLowerCase()}_${gender.gender.toLowerCase()}`,
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

  public async insertGradeEmployeeStatus(
    gradeEmployeeRepo: Repository<TableGradeEmployeeStatus>,
    propertyid: number,
    data: GradeEmployee[],
    transactionMetadata: ITransactionMetadata,
  ) {
    try {
      const masterGrade = await this.getAllGrade();
      const masterEmployeeStatus = await this.getAllEmployeeStatus();

      const masterGender = await this.masterMPSGenderService.getAllMPSGender();

      const now = moment(Date.now()).utcOffset('+0700');

      const dataToMaintain = data.map((item) => {
        const indexGrade = masterGrade.findIndex(
          (grade) => grade.grade === item.grade,
        );
        const indexEmployeeStatus = masterEmployeeStatus.findIndex(
          (employeestat) => employeestat.employeestatus === item.employeestatus,
        );

        const indexGender = masterGender.findIndex(
          (x) => x.gender === item.gender,
        );
        let genderid;
        let gradeid;
        let employeestatusid;

        if (indexGender >= 0) genderid = masterGender[indexGender].genderid;

        if (indexGrade > -1) gradeid = masterGrade[indexGrade].gradeid;
        if (indexEmployeeStatus > -1)
          employeestatusid =
            masterEmployeeStatus[indexEmployeeStatus].employeestatusid;

        return {
          total: item.total,
          gradeid: parseInt(gradeid),
          employeestatusid: parseInt(employeestatusid),
          propertyid: propertyid,
          genderid: genderid,
          createdtime: now.format('YYYY-MM-DD HH:mm:ss'),
          createddate: parseInt(now.format('YYYYMMDD')),
          sourcecreatedmodifiedtime: now.format('YYYY-MM-DD HH:mm:ss'),
          createdby: transactionMetadata.userinfo?.username || 'System Inject',
        };
      });

      const created = await this.deleteRepoByProperty(
        gradeEmployeeRepo,
        propertyid,
      ).then(async () => {
        return await gradeEmployeeRepo
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
    gradeEmployeeRepo: Repository<TableGradeEmployeeStatus>,
    propertyid: number,
  ) {
    try {
      await gradeEmployeeRepo
        .createQueryBuilder()
        .delete()
        .where('propertyid = :propertyid', { propertyid })
        .execute();

      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateGradeEmployeeStatus(
    propertyid: number,
    body: MPSGradeEmployeeStatusUpdate[],
  ) {
    try {
      const query = await Promise.all(
        body.map(async (item) => {
          const record = await this.mpsGradeEmployeeStatusRepo
            .createQueryBuilder('gradeemployeestatus')
            .leftJoin('gradeemployeestatus.grade', 'grade')
            .leftJoin('gradeemployeestatus.gender', 'gender')
            .leftJoin('gradeemployeestatus.employeestatus', 'employeestatus')
            .select(['gradeemployeestatus.id as id'])
            .where('gradeemployeestatus.propertyid = :propertyid', {
              propertyid,
            })
            .andWhere('grade.grade = :grade', { grade: item.grade })
            .andWhere('employeestatus.employeestatus = :employeestatus', {
              employeestatus: item.employeestatus,
            })
            .andWhere('gender.gender = :gender', { gender: item.gender })
            .getRawOne();

          if (!record) {
            throw new BadRequestException(
              'Some record is missing in table grade employee status, please upload from UI first',
            );
          }

          const updateData = await this.mpsGradeEmployeeStatusRepo
            .createQueryBuilder()
            .update(TableGradeEmployeeStatus)
            .set({
              total: item.total,
            })
            .where('id = :id', {
              id: record.id,
            })
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
