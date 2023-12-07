import * as moment from 'moment';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { BaseTransaction } from 'src/common/abstract.transaction';
import { SaveUploadMPSDTO } from './dto/upload-mps.dto';
import { TableProperty } from './table-mps-property.entity';
import { GetOneProperty } from './dto/table-mps-property.dto';
import { MPSEducationService } from '../table-mps-education/mps-education.service';
import { TableEducation } from '../table-mps-education/table-mps-education.entity';
import { MPSGenderAgeService } from '../table-mps-genderage/mps-genderage.service';
import { TableGenderAge } from '../table-mps-genderage/table-mps-genderage.entity';
import { MPSGradeEmployeeStatusService } from '../table-mps-gradeemployeestatus/mps-gradeemployeestatus.service';
import { TableGradeEmployeeStatus } from '../table-mps-gradeemployeestatus/table-mps-gradeemployeestatus.entity';
import { MPSTenureService } from '../master-mps-tenure/mps-tenure.service';
import { TableTenure } from '../table-mps-tenure/table-mps-tenure.entity';
import { MPSTurnOverTerminationTypeService } from '../table-mps-turnoverterminationtype/mps-turnoverterminationtype.service';
import { TableTurnOverTerminationType } from '../table-mps-turnoverterminationtype/table-mps-turnoverterminationtype.entity';
import { MPSEmployeeByGenderService } from '../table-mps-employeebygender/mps-employeebygender.service';
import { TableEmployeeByGender } from '../table-mps-employeebygender/table-mps-employeebygender.entity';
import { MPSNewEmployeePerGenderService } from '../table-mps-newemployeepergender/mps-newemployeepergender.service';
import { MPSTraningHourJobGroupService } from '../table-mps-traininghourjobgroup/mps-traininghourjobgroup.service';
import { TableTrainingHourJobGroup } from '../table-mps-traininghourjobgroup/table-mps-traininghourjobgroup.entity';
import { MPSTraningHourGenderService } from '../table-mps-traininghourgender/mps-traninghourgender.service';
import { TableTrainingHourGender } from '../table-mps-traininghourgender/table-mps-traininghourgender.entity';

@Injectable()
export class SaveUploadMPSTransaction extends BaseTransaction<
  SaveUploadMPSDTO,
  { message: string }
> {
  constructor(
    private dataSource: DataSource,
    @Inject(MPSEducationService)
    private mpsEducationService: MPSEducationService,

    @Inject(MPSGenderAgeService)
    private mpsGenderAgeService: MPSGenderAgeService,

    @Inject(MPSGradeEmployeeStatusService)
    private mpsGradeEmployeeStatusService: MPSGradeEmployeeStatusService,

    @Inject(MPSTenureService)
    private mpsTenureService: MPSTenureService,

    @Inject(MPSTurnOverTerminationTypeService)
    private mpsTurnOverTerminationTypeService: MPSTurnOverTerminationTypeService,

    @Inject(MPSEmployeeByGenderService)
    private mpsEmployeeByGenderService: MPSEmployeeByGenderService,

    @Inject(MPSNewEmployeePerGenderService)
    private mpsNewEmployeePerGenderSerice: MPSNewEmployeePerGenderService,

    @Inject(MPSTraningHourJobGroupService)
    private mpsTrainingHourJobGroupService: MPSTraningHourJobGroupService,

    @Inject(MPSTraningHourGenderService)
    private mpsTrainingHourGender: MPSTraningHourGenderService,
  ) {
    super(dataSource);
  }
  protected async execute(
    data: SaveUploadMPSDTO,
    manager: EntityManager,
  ): Promise<{ message: string }> {
    const propertyService = manager.getRepository(TableProperty);

    let dataProperty = await this.getProperty(
      propertyService,
      data.propertymetada,
    );

    if (!dataProperty) {
      dataProperty = await this.createProperty(propertyService, data);
    }

    // Education
    await this.mpsEducationService.insertEducation(
      manager.getRepository(TableEducation),
      dataProperty.propertyid,
      data.dataMps.education,
      this.metadata,
    );

    // Gender Age
    await this.mpsGenderAgeService.insertGenderAge(
      manager.getRepository(TableGenderAge),
      dataProperty.propertyid,
      data.dataMps.genderAge,
      this.metadata,
    );

    // Grade employee status
    await this.mpsGradeEmployeeStatusService.insertGradeEmployeeStatus(
      manager.getRepository(TableGradeEmployeeStatus),
      dataProperty.propertyid,
      data.dataMps.gradeEmployee,
      this.metadata,
    );

    // Tenure
    await this.mpsTenureService.insertTenure(
      manager.getRepository(TableTenure),
      dataProperty.propertyid,
      data.dataMps.tenure,
      this.metadata,
    );

    // Turnover termination type
    await this.mpsTurnOverTerminationTypeService.insertTurnOverTerminationType(
      manager.getRepository(TableTurnOverTerminationType),
      dataProperty.propertyid,
      data.dataMps.turnOverTerminationType,
      this.metadata,
    );

    // Turnover Employee By Gender
    await this.mpsEmployeeByGenderService.insertEmployeeGender(
      manager.getRepository(TableEmployeeByGender),
      dataProperty.propertyid,
      data.dataMps.employeeGender,
      this.metadata,
    );

    //Create Outsource by Gender Services
    await this.mpsNewEmployeePerGenderSerice.uploadDataEmployee(
      manager,
      dataProperty.propertyid,
      data.dataMps.outsourceGender,
      'Outsource',
      this.metadata,
    );

    //Create New Employee by Gender Services
    await this.mpsNewEmployeePerGenderSerice.uploadDataEmployee(
      manager,
      dataProperty.propertyid,
      data.dataMps.newEmployeeGender,
      'NewEmployee',
      this.metadata,
    );

    //Create Applicant by Gender Services
    await this.mpsNewEmployeePerGenderSerice.uploadDataEmployee(
      manager,
      dataProperty.propertyid,
      data.dataMps.applicantGender,
      'Applicant',
      this.metadata,
    );

    // Training Hour Job Group
    await this.mpsTrainingHourJobGroupService.uploadDataTrainingJobGroup(
      manager.getRepository(TableTrainingHourJobGroup),
      dataProperty.propertyid,
      data.dataMps.trainingHourJobGroup,
      this.metadata,
    );

    // Training Hour Gender
    await this.mpsTrainingHourGender.uploadDataTrainingHourGender(
      manager.getRepository(TableTrainingHourGender),
      dataProperty.propertyid,
      data.dataMps.trainingHourGender,
      this.metadata,
    );

    return { message: 'Successfully Inject All Data' };
  }

  private async getProperty(
    repo: Repository<TableProperty>,
    propertymeta: GetOneProperty,
  ) {
    const property = await repo.findOne({
      where: {
        companyid: propertymeta.companyid,
        month: propertymeta.month,
        year: propertymeta.year,
      },
    });
    return property;
  }

  private async createProperty(
    repo: Repository<TableProperty>,
    data: SaveUploadMPSDTO,
  ) {
    return await repo.save(
      repo.create({
        claid: data.companymetadata.claid,
        directreviewid: data.companymetadata.directreviewid,
        companyid: data.propertymetada.companyid,
        month: data.propertymetada.month,
        year: data.propertymetada.year,
        locationid: data.companymetadata.locationid || undefined,
        month_date: moment(
          `${data.propertymetada.year}-${data.propertymetada.month}-01`,
          'YYYY-MM-DD',
        ).format('YYYY-MM-DD HH:mm:ss'),
        isdelete: 'false',
        createdby: this.metadata.userinfo?.username || 'System Inject',
        createdtime: new Date(),
        sourcecreatedmodifiedtime: new Date(),
        createddate: parseInt(moment().format('YYYYMMDD'), 10),
      }),
    );
  }
}
