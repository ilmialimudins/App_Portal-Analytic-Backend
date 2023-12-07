import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { TableEmployeeByGender } from './table-mps-employeebygender.entity';
import { Repository } from 'typeorm';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';
import { EmployeeGender } from '../table-mps-property/dto/upload-mps.dto';
import { ITransactionMetadata } from 'src/common/dto/transaction-meta';

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

  async getEmployeePerGender(propertyid: number) {
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

  public async insertEmployeeGender(
    employeeByGenderRepo: Repository<TableEmployeeByGender>,
    propertyid: number,
    data: EmployeeGender[],
    transactionMetadata: ITransactionMetadata,
  ) {
    try {
      const now = moment(Date.now()).utcOffset('+0700');
      const masterGender = await this.masterMPSGenderService.getAllMPSGender();

      const dataToInsert = data.map((item) => {
        let genderid;
        const indexGender = masterGender.findIndex(
          (x) => x.gender === item.gender,
        );

        if (indexGender >= 0) genderid = masterGender[indexGender].genderid;

        return {
          propertyid: propertyid,
          total: item.total,
          genderid,
          createdtime: now.format('YYYY-MM-DD HH:mm:ss'),
          createddate: parseInt(now.format('YYYYMMDD')),
          sourcecreatedmodifiedtime: now.format('YYYY-MM-DD HH:mm:ss'),
          createdby: transactionMetadata.userinfo?.username || 'System Inject',
        };
      });

      const created = await this.deleteRepoByProperty(
        employeeByGenderRepo,
        propertyid,
      ).then(async () => {
        return await employeeByGenderRepo
          .createQueryBuilder()
          .insert()
          .values(dataToInsert)
          .execute();
      });

      return created.raw.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  private async deleteRepoByProperty(
    repo: Repository<TableEmployeeByGender>,
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
}
