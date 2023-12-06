import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';

import { AuthGuard } from 'src/guards/auth/auth.guard';
import { DownloadMPSDTO } from './dto/download-mps.dto';
import { DownloadMPSService } from './download-mps.service';
import { MPSGradeEmployeeStatusService } from '../table-mps-gradeemployeestatus/mps-gradeemployeestatus.service';
import { MPSGenderAgeService } from '../table-mps-genderage/mps-genderage.service';
import { MPSEducationService } from '../table-mps-education/mps-education.service';
import { MPSEmployeeByGenderService } from '../table-mps-employeebygender/mps-employeebygender.service';
import { MPSTurnOverTerminationTypeService } from '../table-mps-turnoverterminationtype/mps-turnoverterminationtype.service';
import { MPSTraningHourGenderService } from '../table-mps-traininghourgender/mps-traninghourgender.service';
import { MPSTraningHourJobGroupService } from '../table-mps-traininghourjobgroup/mps-traininghourjobgroup.service';
import { MPSApplicantPerGenderService } from '../table-mps-applicantpergender/mps-applicantpergender.service';
import { MPSNewEmployeePerGenderService } from '../table-mps-newemployeepergender/mps-newemployeepergender.service';
import { MPSOutsourcingPerGenderService } from '../table-mps-outsourcingpergender/mps-outsourcingpergender.service';
import { MPSTenureService } from '../master-mps-tenure/mps-tenure.service';
import { MPSPropertyService } from './mps-property.service';

@ApiBearerAuth()
@ApiTags('Man Power Statistics')
@Controller('man-power-statistics')
@UseGuards(AuthGuard)
export class MPSPropertyController {
  constructor(
    private readonly downloadMPSService: DownloadMPSService,
    private readonly gradeEmployeeStatusService: MPSGradeEmployeeStatusService,
    private readonly genderAgeService: MPSGenderAgeService,
    private readonly educationService: MPSEducationService,
    private readonly employeeByGenderService: MPSEmployeeByGenderService,
    private readonly turnOverTerminationService: MPSTurnOverTerminationTypeService,
    private readonly trainingHourGenderService: MPSTraningHourGenderService,
    private readonly trainingHourJobGroupService: MPSTraningHourJobGroupService,
    private readonly applicantPerGenderService: MPSApplicantPerGenderService,
    private readonly newEmployeePerGenderService: MPSNewEmployeePerGenderService,
    private readonly outSourcingPerGenderService: MPSOutsourcingPerGenderService,
    private readonly tenureService: MPSTenureService,
    private readonly propertyService: MPSPropertyService,
  ) {}

  @Get('/getAllData')
  async getAllData(
    @Query('companyid') companyid: number,
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    const getProperty = await this.propertyService.getPropertyByParams(
      companyid,
      month,
      year,
    );

    if (!getProperty)
      throw new BadRequestException(
        'There is no data from that company please upload data first',
      );

    const gradeEmployeeStatus =
      await this.gradeEmployeeStatusService.getGradeEmployeeStatusData(
        getProperty.propertyid,
      );
    const genderAge = await this.genderAgeService.getGenderAge(
      getProperty.propertyid,
    );
    const outsourcingpergender =
      await this.outSourcingPerGenderService.getOutSourcingPerGender(
        getProperty.propertyid,
      );
    const newemployeepergender =
      await this.newEmployeePerGenderService.getNewEmployeePerGender(
        getProperty.propertyid,
      );
    const applicantpergender =
      await this.applicantPerGenderService.getApplicationPerGender(
        getProperty.propertyid,
      );
    const turnOverTerminationService =
      await this.turnOverTerminationService.getTurnOverTermination(
        getProperty.propertyid,
      );
    const tenure = await this.tenureService.getTenure(getProperty.propertyid);
    const education = await this.educationService.getEducation(
      getProperty.propertyid,
    );
    const employeebygender =
      await this.employeeByGenderService.getEmployeePerGender(
        getProperty.propertyid,
      );
    const traininghourgender =
      await this.trainingHourGenderService.getTrainingHourGender(
        getProperty.propertyid,
      );
    const traininghourjobgroup =
      await this.trainingHourJobGroupService.getTrainingHourJobGroup(
        getProperty.propertyid,
      );

    const result = {
      property: getProperty,
      gradeEmployeeStatus: gradeEmployeeStatus,
      genderAge: genderAge,
      outsourcingpergender: outsourcingpergender,
      newemployeepergender: newemployeepergender,
      applicantpergender: applicantpergender,
      turnOverTerminationService: turnOverTerminationService,
      tenure: tenure,
      education: education,
      employeebygender: employeebygender,
      traininghourgender: traininghourgender,
      traininghourjobgroup: traininghourjobgroup,
    };

    return result;
  }

  @Post('/download')
  async getMPSProperty(
    @Body() data: DownloadMPSDTO,
    @Res() res: ExpressResponse,
  ) {
    console.log('get here');
    const { workbook, sheetMetadata } =
      await this.downloadMPSService.downloadMPS(data);

    const companyName = sheetMetadata.companyname.split(' ').join('_');

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=MPS_${companyName}_${data.year}_${data.month}.xlsx`,
    );

    await workbook.xlsx.write(res);

    res.end();
  }
}
