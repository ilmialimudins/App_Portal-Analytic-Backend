import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableEducation } from './table-mps-education.entity';
import { MasterEducation } from '../master-mps-education/master-mps-education.entity';
import { Repository } from 'typeorm';

import { MasterMPSGenderService } from '../master-mps-gender/master-mps-gender.service';
import * as moment from 'moment';
import { Education } from '../table-mps-property/dto/upload-mps.dto';
import { ITransactionMetadata } from 'src/common/dto/transaction-meta';

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

  async getEducation(propertyid: number) {
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
          [key.gender.toLowerCase()]: val,
        });
      }, {});
      return { education: education.education, ...newObj };
    });

    const columns = masterGender.map((gen) => {
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
        { title: 'Pendidikan', dataIndex: 'education', editable: false },
        ...columns,
      ],
    };
  }

  public async insertEducation(
    repo: Repository<TableEducation>,
    propertyid: number,
    data: Education[],
    transactionMetadata: ITransactionMetadata,
  ) {
    try {
      const masterEducation = await this.getAllMasterEducation();

      const masterGender = await this.masterMPSGenderService.getAllMPSGender();

      const now = moment(Date.now()).utcOffset('+0700');

      const dataToInsert = data.map((item) => {
        let educationid;
        let genderid;
        const index = masterEducation.findIndex(
          (x) => x.education === item.education,
        );

        const indexGender = masterGender.findIndex(
          (x) => x.gender === item.gender,
        );

        if (indexGender >= 0) genderid = masterGender[indexGender].genderid;

        if (index >= 0) educationid = masterEducation[index].educationid;

        return {
          propertyid: propertyid,
          educationid: educationid,
          genderid: genderid,
          total: item.total,
          createdtime: now.format('YYYY-MM-DD HH:mm:ss'),
          createddate: parseInt(now.format('YYYYMMDD')),
          sourcecreatedmodifiedtime: now.format('YYYY-MM-DD HH:mm:ss'),
          createdby: transactionMetadata.userinfo?.username || 'System Inject',
        };
      });

      const created = await this.deleteByPropertyRepo(repo, propertyid).then(
        async () => {
          return await repo
            .createQueryBuilder()
            .insert()
            .values(dataToInsert)
            .execute();
        },
      );

      return created.raw.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  private async deleteByPropertyRepo(
    repo: Repository<TableEducation>,
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
