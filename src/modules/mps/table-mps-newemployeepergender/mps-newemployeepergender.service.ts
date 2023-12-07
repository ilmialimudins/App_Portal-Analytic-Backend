import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as moment from 'moment';
import { TableNewEmployeePerGender } from './table-mps-newemployeepergender.entity';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';
import { TableOutsourcingPerGender } from '../table-mps-outsourcingpergender/table-mps-outsourcingpergender.entity';
import { TableApplicantPerGender } from '../table-mps-applicantpergender/table-mps-applicantpergender.entity';
import { ITransactionMetadata } from 'src/common/dto/transaction-meta';

@Injectable()
export class MPSNewEmployeePerGenderService {
  constructor(
    @InjectRepository(TableNewEmployeePerGender)
    private newEmployeePerGenderRepository: Repository<TableNewEmployeePerGender>,

    @Inject(MasterMPSGenderService)
    private masterMPSGenderService: MasterMPSGenderService,
  ) {}

  public async getNewEmployeePerGenderByProperty(propertyid: number) {
    try {
      const result = await this.newEmployeePerGenderRepository
        .createQueryBuilder('newemployee')
        .leftJoin('newemployee.property', 'property')
        .leftJoin('newemployee.newhire', 'newhire')
        .leftJoin('newemployee.gender', 'gender')
        .select([
          'newemployee.id as id',
          'property.propertyid as propertyid',
          'property.year as year',
          'property.month as month',
          'gender.genderid as genderid',
          'gender.gender as gender',
          'newhire.newhireid as newhireid',
          'newhire.newhire as newhire',
          'newemployee.total as total',
        ])
        .where('property.propertyid = :id', { id: propertyid })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async genders() {
    return this.masterMPSGenderService.getAllMPSGender();
  }

  async getNewEmployeePerGender(propertyid: number) {
    const getApplicant = await this.getNewEmployeePerGenderByProperty(
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

  public async uploadDataEmployee(
    manager: EntityManager,
    propertyid: number,
    data: { gender: string; total: number }[],
    type: 'Outsource' | 'NewEmployee' | 'Applicant',
    transactionMetadata: ITransactionMetadata,
  ) {
    let repo:
      | Repository<TableOutsourcingPerGender>
      | Repository<TableNewEmployeePerGender>
      | Repository<TableApplicantPerGender>;
    let newhireid;

    if (type === 'Outsource') {
      repo = manager.getRepository(TableOutsourcingPerGender);
      newhireid = 2;
    } else if (type === 'NewEmployee') {
      repo = manager.getRepository(TableNewEmployeePerGender);
      newhireid = 1;
    } else {
      repo = manager.getRepository(TableApplicantPerGender);
      newhireid = 3;
    }

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
        newhireid,
        createdtime: now.format('YYYY-MM-DD HH:mm:ss'),
        createddate: parseInt(now.format('YYYYMMDD')),
        sourcecreatedmodifiedtime: now.format('YYYY-MM-DD HH:mm:ss'),
        createdby: transactionMetadata.userinfo?.username || 'System Inject',
      };
    });
    const created = await this.deleteRepoByProperty(repo, propertyid).then(
      async () => {
        return await repo
          .createQueryBuilder()
          .insert()
          .values(dataToInsert)
          .execute();
      },
    );

    return created.raw.affectedRows;
  }

  private async deleteRepoByProperty(
    repo:
      | Repository<TableOutsourcingPerGender>
      | Repository<TableNewEmployeePerGender>
      | Repository<TableApplicantPerGender>,
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
