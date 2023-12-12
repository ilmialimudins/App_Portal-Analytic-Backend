import { Inject, Injectable } from '@nestjs/common';
import { TableProperty } from './table-mps-property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetOneProperty,
  MPSPropertyBody,
  UpdateAllDto,
} from './dto/table-mps-property.dto';
import { MPSGradeEmployeeStatusService } from '../table-mps-gradeemployeestatus/mps-gradeemployeestatus.service';
import { EntityManager } from 'typeorm';
import { TableGradeEmployeeStatus } from '../table-mps-gradeemployeestatus/table-mps-gradeemployeestatus.entity';
import { MPSEmployeeByGenderService } from '../table-mps-employeebygender/mps-employeebygender.service';
import { MPSOutsourcingPerGenderService } from '../table-mps-outsourcingpergender/mps-outsourcingpergender.service';
import { MPSNewEmployeePerGenderService } from '../table-mps-newemployeepergender/mps-newemployeepergender.service';
import { MPSApplicantPerGenderService } from '../table-mps-applicantpergender/mps-applicantpergender.service';
import { MPSTenureService } from '../master-mps-tenure/mps-tenure.service';
import { MPSTurnOverTerminationTypeService } from '../table-mps-turnoverterminationtype/mps-turnoverterminationtype.service';
import { MPSEducationService } from '../table-mps-education/mps-education.service';
import { MPSGenderAgeService } from '../table-mps-genderage/mps-genderage.service';
import { MPSTraningHourGenderService } from '../table-mps-traininghourgender/mps-traninghourgender.service';
import { MPSTraningHourJobGroupService } from '../table-mps-traininghourjobgroup/mps-traininghourjobgroup.service';
import { TableGenderAge } from '../table-mps-genderage/table-mps-genderage.entity';
import { TableOutsourcingPerGender } from '../table-mps-outsourcingpergender/table-mps-outsourcingpergender.entity';
import { TableNewEmployeePerGender } from '../table-mps-newemployeepergender/table-mps-newemployeepergender.entity';
import { TableApplicantPerGender } from '../table-mps-applicantpergender/table-mps-applicantpergender.entity';
import { TableTurnOverTerminationType } from '../table-mps-turnoverterminationtype/table-mps-turnoverterminationtype.entity';
import { TableTenure } from '../table-mps-tenure/table-mps-tenure.entity';
import { TableEducation } from '../table-mps-education/table-mps-education.entity';
import { TableEmployeeByGender } from '../table-mps-employeebygender/table-mps-employeebygender.entity';
import { TableTrainingHourGender } from '../table-mps-traininghourgender/table-mps-traininghourgender.entity';
import { TableTrainingHourJobGroup } from '../table-mps-traininghourjobgroup/table-mps-traininghourjobgroup.entity';

@Injectable()
export class MPSPropertyService {
  constructor(
    @InjectRepository(TableProperty)
    private mpsPropertyRepo: Repository<TableProperty>,

    private readonly manager: EntityManager,

    @Inject(MPSGradeEmployeeStatusService)
    private gradeEmployeeStatusService: MPSGradeEmployeeStatusService,

    @Inject(MPSEmployeeByGenderService)
    private employeeByGenderService: MPSEmployeeByGenderService,

    @Inject(MPSOutsourcingPerGenderService)
    private outSourcingPerGenderService: MPSOutsourcingPerGenderService,

    @Inject(MPSNewEmployeePerGenderService)
    private newEmployeePerGenderService: MPSNewEmployeePerGenderService,

    @Inject(MPSApplicantPerGenderService)
    private applicantPerGenderService: MPSApplicantPerGenderService,

    @Inject(MPSTenureService)
    private tenureService: MPSTenureService,

    @Inject(MPSTurnOverTerminationTypeService)
    private turnOverTerminationService: MPSTurnOverTerminationTypeService,

    @Inject(MPSEducationService)
    private educationService: MPSEducationService,

    @Inject(MPSGenderAgeService)
    private genderAgeService: MPSGenderAgeService,

    @Inject(MPSTraningHourGenderService)
    private trainingHourGenderService: MPSTraningHourGenderService,

    @Inject(MPSTraningHourJobGroupService)
    private trainingHourJobGroupService: MPSTraningHourJobGroupService,
  ) {}

  public async getOneMPSProperty(data: GetOneProperty) {
    try {
      return this.mpsPropertyRepo.findOne({
        where: {
          companyid: data.companyid,
          year: data.year,
          month: data.month,
        },
        relations: {
          company: true,
          location: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getPropertyByParams(body: GetOneProperty) {
    try {
      const result = await this.mpsPropertyRepo
        .createQueryBuilder('property')
        .leftJoin('property.company', 'company')
        .leftJoin('company.cla', 'cla')
        .leftJoin('company.directreview', 'directreview')
        .leftJoin('company.location', 'location')
        .leftJoin('company.businessgroup', 'businessgroup')
        .leftJoin('company.ownershipstatus', 'ownershipstatus')
        .select([
          'property.propertyid as propertyid',
          'company.companyid as companyid',
          'cla.claid as claid',
          'directreview.directreviewid as directreviewid',
          'location.locationid as locationid',
          'businessgroup.businessgroupid as businessgroupid',
          'ownershipstatus.ownershipstatusid as ownershipstatusid',
          'company.companympsname as companyname',
          'cla.cladesc as cladesc',
          'directreview.directreviewdesc as directreviewdesc',
          'location.locationdesc as locationdesc',
          'businessgroup.businessgroupdesc as businessgroupdesc',
          'ownershipstatus.ownershipstatusdesc as ownershipstatusdesc',
          'property.month as month',
          'property.year as year',
        ])
        .where('property.companyid = :companyid', { companyid: body.companyid })
        .andWhere('property.month = :month', { month: body.month })
        .andWhere('property.year = :year', { year: body.year })
        .getRawOne();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateProperty(propertyid: number, body: MPSPropertyBody) {
    try {
      const query = await this.mpsPropertyRepo
        .createQueryBuilder()
        .update(TableProperty)
        .set({
          directreviewid: body.directreviewid,
          claid: body.claid,
          locationid: body.locationid,
          businessgroupid: body.businessgroupid,
          ownershipstatusid: body.ownershipstatusid,
        })
        .where('propertyid = :propertyid', { propertyid })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateAllData(updateall: UpdateAllDto) {
    const queryRunner = this.manager.connection.createQueryRunner();

    const getProperty = await this.getPropertyByParams(updateall.getOne);

    const updateProperty = await this.updateProperty(
      getProperty.propertyid,
      updateall.params,
    );

    console.log(updateProperty);

    await queryRunner.startTransaction();

    try {
      queryRunner.manager.getRepository(TableGradeEmployeeStatus);
      await this.gradeEmployeeStatusService.updateGradeEmployeeStatus(
        getProperty.propertyid,
        updateall.gradeemployeestatus,
      );

      queryRunner.manager.getRepository(TableGenderAge);
      await this.genderAgeService.updateGenderAge(
        getProperty.propertyid,
        updateall.genderage,
      );

      queryRunner.manager.getRepository(TableOutsourcingPerGender);
      await this.outSourcingPerGenderService.updateOutsourcingPerGender(
        getProperty.propertyid,
        updateall.outsourcingpergender,
      );

      queryRunner.manager.getRepository(TableNewEmployeePerGender);
      await this.newEmployeePerGenderService.updateNewEmployeePerGender(
        getProperty.propertyid,
        updateall.newemployeepergender,
      );

      queryRunner.manager.getRepository(TableApplicantPerGender);
      await this.applicantPerGenderService.updateApplicantPerGender(
        getProperty.propertyid,
        updateall.applicantpergender,
      );

      queryRunner.manager.getRepository(TableTurnOverTerminationType);
      await this.turnOverTerminationService.updateTurnOverTerminationType(
        getProperty.propertyid,
        updateall.turnovertermintationtype,
      );

      queryRunner.manager.getRepository(TableTenure);
      await this.tenureService.updateTenure(
        getProperty.propertyid,
        updateall.tenure,
      );

      queryRunner.manager.getRepository(TableEducation);
      await this.educationService.updateEducation(
        getProperty.propertyid,
        updateall.education,
      );

      queryRunner.manager.getRepository(TableEmployeeByGender);
      await this.employeeByGenderService.updateEmployeeByGender(
        getProperty.propertyid,
        updateall.employeebygender,
      );

      queryRunner.manager.getRepository(TableTrainingHourGender);
      await this.trainingHourGenderService.updateTrainingHourGender(
        getProperty.propertyid,
        updateall.traininghourgender,
      );

      queryRunner.manager.getRepository(TableTrainingHourJobGroup);
      await this.trainingHourJobGroupService.updateTrainingHourJobGroup(
        getProperty.propertyid,
        updateall.traininghourjobgroup,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
