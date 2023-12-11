import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { TableTenure } from '../table-mps-tenure/table-mps-tenure.entity';
import { Repository } from 'typeorm';
import { MasterTenure } from './master-mps-tenure.entity';
import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';
import { Tenure } from '../table-mps-property/dto/upload-mps.dto';
import { ITransactionMetadata } from 'src/common/dto/transaction-meta';
import { MPSTenureUpdate } from '../table-mps-tenure/dto/table-mps-tenure.dto';

@Injectable()
export class MPSTenureService {
  constructor(
    @InjectRepository(TableTenure) private tenureRepo: Repository<TableTenure>,
    @InjectRepository(MasterTenure)
    private masterTenureRepo: Repository<MasterTenure>,
    @Inject(MasterMPSGenderService)
    private masterGenderSerivce: MasterMPSGenderService,
  ) {}

  private async getAllMasterTenure() {
    return this.masterTenureRepo.find();
  }

  public async getTenureByProperty(propertyid: number) {
    try {
      const result = await this.tenureRepo
        .createQueryBuilder('tenure')
        .leftJoin('tenure.property', 'property')
        .leftJoin('tenure.tenure', 'ms_tenure')
        .leftJoin('tenure.gender', 'gender')
        .select([
          'tenure.id as id',
          'property.propertyid as propertyid',
          'property.year as year',
          'property.month as month',
          'ms_tenure.tenureid as tenureid',
          'ms_tenure.tenure as tenure',
          'gender.genderid as genderid',
          'gender.gender as gender',
          'tenure.total as total',
        ])
        .where('property.propertyid = :id', { id: propertyid })
        .getRawMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async getDataForExcelTable(propertyid: number) {
    const masterTenure = await this.getAllMasterTenure();
    const tenureByProperty = await this.getTenureByProperty(propertyid);
    const masterGenders = await this.masterGenderSerivce.getAllMPSGender();

    const rows = masterTenure.map((tenure) => {
      const newObj = masterGenders.reduce((o, key) => {
        let val: number | null;

        const index = tenureByProperty.findIndex((item) => {
          return (
            item.genderid === key.genderid && item.tenureid === tenure.tenureid
          );
        });

        if (index > -1) {
          val = tenureByProperty[index].total;
        } else {
          val = null;
        }
        return Object.assign(o, {
          [key.gender]: val,
        });
      }, {});
      return { tenure: tenure.tenure, ...newObj };
    });

    return { rows, masterGenders, gendersNum: masterGenders.length };
  }

  async getTenure(propertyid: number) {
    const masterTenure = await this.getAllMasterTenure();
    const tenureByProperty = await this.getTenureByProperty(propertyid);
    const masterGenders = await this.masterGenderSerivce.getAllMPSGender();

    const rows = masterTenure.map((tenure) => {
      const newObj = masterGenders.reduce((o, key) => {
        let val: number | null;

        const index = tenureByProperty.findIndex((item) => {
          return (
            item.genderid === key.genderid && item.tenureid === tenure.tenureid
          );
        });

        if (index > -1) {
          val = tenureByProperty[index].total;
        } else {
          val = null;
        }
        return Object.assign(o, {
          [key.gender.toLowerCase()]: val,
        });
      }, {});
      return { tenure: tenure.tenure, ...newObj };
    });

    const columns = masterGenders.map((gen) => {
      return {
        title: gen.gender,
        dataIndex: gen.gender.toLowerCase(),
        editable: true,
      };
    });

    const dataSource = rows;

    return {
      dataSource: dataSource,
      columns: [
        { title: 'Masa Kerja', dataIndex: 'tenure', editable: false },
        ...columns,
      ],
    };
  }

  public async insertTenure(
    tenureRepo: Repository<TableTenure>,
    propertyid: number,
    data: Tenure[],
    transactionMetadata: ITransactionMetadata,
  ) {
    try {
      const masterTenure = await this.getAllMasterTenure();

      const now = moment(Date.now()).utcOffset('+0700');
      const masterGender = await this.masterGenderSerivce.getAllMPSGender();

      const dataToInsert = data.map((item) => {
        let tenureid;
        let genderid;
        const index = masterTenure.findIndex((x) => x.tenure === item.tenure);
        const indexGender = masterGender.findIndex(
          (x) => x.gender === item.gender,
        );

        if (index >= 0) tenureid = masterTenure[index].tenureid;

        if (indexGender >= 0) genderid = masterGender[indexGender].genderid;

        return {
          propertyid: propertyid,
          tenureid: tenureid,
          total: item.total,
          genderid,
          createdtime: now.format('YYYY-MM-DD HH:mm:ss'),
          createddate: parseInt(now.format('YYYYMMDD')),
          sourcecreatedmodifiedtime: now.format('YYYY-MM-DD HH:mm:ss'),
          createdby: transactionMetadata.userinfo?.username || 'System Inject',
        };
      });

      const created = await this.deleteRepoByProperty(
        tenureRepo,
        propertyid,
      ).then(async () => {
        return await tenureRepo
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
    repo: Repository<TableTenure>,
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

  async updateTenure(propertyid: number, body: MPSTenureUpdate[]) {
    try {
      const query = await Promise.all(
        body.map(async (item) => {
          const record = await this.tenureRepo
            .createQueryBuilder('tenure')
            .leftJoin('tenure.tenure', 'ms_tenure')
            .leftJoin('tenure.gender', 'gender')
            .select(['tenure.id as id'])
            .where('tenure.propertyid = :propertyid', { propertyid })
            .andWhere('ms_tenure.tenure = :tenure', { tenure: item.tenure })
            .andWhere('gender.gender = :gender', { gender: item.gender })
            .getRawOne();

          if (!record) {
            throw new BadRequestException(
              'Some record is missing in table tenure, please upload from UI first',
            );
          }

          const updateData = await this.tenureRepo
            .createQueryBuilder()
            .update(TableTenure)
            .set({ total: item.total })
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
