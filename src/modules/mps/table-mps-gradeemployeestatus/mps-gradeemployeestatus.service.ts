import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MasterEmployeeStatus } from '../master-mps-employeestatus/master-mps-employeestatus.entity';
import { MasterGrade } from '../master-mps-grade/master-mps-grade.entity';

import { TableGradeEmployeeStatus } from './table-mps-gradeemployeestatus.entity';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';

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
}
