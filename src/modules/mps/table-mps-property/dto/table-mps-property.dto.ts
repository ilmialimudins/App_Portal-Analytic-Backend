import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { TableProperty } from '../table-mps-property.entity';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { MPSGradeEmployeeStatusUpdate } from '../../table-mps-gradeemployeestatus/dto/table-mps-gradeemployeestatus.dto';
import { MPSEmployeeByGenderUpdate } from '../../table-mps-employeebygender/dto/table-mps-employeebygender.dto';
import { MPSOutSourcingPerGenderUpdate } from '../../table-mps-outsourcingpergender/dto/table-mps-outsourcingpergender.dto';
import { MPSNewEmployeePerGenderUpdate } from '../../table-mps-newemployeepergender/dto/table-mps-newemployeepergender.dto';
import { MPSApplicantPerGenderUpdate } from '../../table-mps-applicantpergender/dto/table-mps-applicantpergender.dto';
import { MPSTurnOverTerminationTypeUpdate } from '../../table-mps-turnoverterminationtype/dto/table-mps-turnoverterminationtype.dto';
import { MPSTenureUpdate } from '../../table-mps-tenure/dto/table-mps-tenure.dto';
import { MPSEducationUpdate } from '../../table-mps-education/dto/table-mps-education.dto';
import { MPSGenderAgeUpdate } from '../../table-mps-genderage/dto/table-mps-genderage.dto';
import { MPSTrainingHourGenderUpdate } from '../../table-mps-traininghourgender/dto/table-mps-traininghourgender.dto';
import { MPSTrainingHourJobGroupUpdate } from '../../table-mps-traininghourjobgroup/dto/table-mps-traininghourjobgroup.dto';
import { Type } from 'class-transformer';

export class TablePropertyDto extends AbstractDto {
  @ApiProperty()
  propertyid: number;

  @ApiProperty()
  claid: number;

  @ApiProperty()
  directreviewid: number;

  @ApiProperty()
  companyid: number;

  @ApiProperty()
  locationid: number;

  @ApiProperty()
  month: number;

  @ApiProperty()
  year: number;

  @ApiProperty()
  isdelete: string;

  constructor(tablePropertyEntity: TableProperty) {
    super(tablePropertyEntity, { exludeFields: true });
    this.propertyid = tablePropertyEntity.propertyid;
    this.claid = tablePropertyEntity.claid;
    this.directreviewid = tablePropertyEntity.directreviewid;
    this.companyid = tablePropertyEntity.companyid;
    this.locationid = tablePropertyEntity.locationid;
    this.month = tablePropertyEntity.month;
    this.year = tablePropertyEntity.year;
    this.isdelete = tablePropertyEntity.isdelete;
  }
}

export class GetOneProperty {
  @ApiProperty()
  @IsNumber()
  companyid: number;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsNumber()
  month: number;
}

export class MPSPropertyBody {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  businessgroupid: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  ownershipstatusid: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  claid: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  directreviewid: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  locationid: number;
}

export class UpdateAllDto {
  @ApiProperty({ type: () => GetOneProperty })
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  @Type(() => GetOneProperty)
  @ValidateNested()
  getOne: GetOneProperty;

  @ApiProperty({ type: () => MPSPropertyBody })
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  @Type(() => MPSPropertyBody)
  @ValidateNested()
  params: MPSPropertyBody;

  @ApiProperty({ type: () => [MPSGradeEmployeeStatusUpdate] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => MPSGradeEmployeeStatusUpdate)
  @ValidateNested({ each: true })
  gradeemployeestatus: MPSGradeEmployeeStatusUpdate[];

  @ApiProperty({ type: () => [MPSGenderAgeUpdate] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => MPSGenderAgeUpdate)
  @ValidateNested({ each: true })
  genderage: MPSGenderAgeUpdate[];

  @ApiProperty({ type: () => [MPSOutSourcingPerGenderUpdate] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => MPSOutSourcingPerGenderUpdate)
  @ValidateNested({ each: true })
  outsourcingpergender: MPSOutSourcingPerGenderUpdate[];

  @ApiProperty({ type: () => [MPSNewEmployeePerGenderUpdate] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => MPSNewEmployeePerGenderUpdate)
  @ValidateNested({ each: true })
  newemployeepergender: MPSNewEmployeePerGenderUpdate[];

  @ApiProperty({ type: () => [MPSApplicantPerGenderUpdate] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => MPSApplicantPerGenderUpdate)
  @ValidateNested({ each: true })
  applicantpergender: MPSApplicantPerGenderUpdate[];

  @ApiProperty({ type: () => [MPSTurnOverTerminationTypeUpdate] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => MPSTurnOverTerminationTypeUpdate)
  @ValidateNested({ each: true })
  turnovertermintationtype: MPSTurnOverTerminationTypeUpdate[];

  @ApiProperty({ type: () => [MPSTenureUpdate] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => MPSTenureUpdate)
  @ValidateNested({ each: true })
  tenure: MPSTenureUpdate[];

  @ApiProperty({ type: () => [MPSEducationUpdate] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => MPSEducationUpdate)
  @ValidateNested({ each: true })
  education: MPSEducationUpdate[];

  @ApiProperty({ type: () => [MPSEmployeeByGenderUpdate] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => MPSEmployeeByGenderUpdate)
  @ValidateNested({ each: true })
  employeebygender: MPSEmployeeByGenderUpdate[];

  @ApiProperty({ type: () => [MPSTrainingHourGenderUpdate] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => MPSTrainingHourGenderUpdate)
  @ValidateNested({ each: true })
  traininghourgender: MPSTrainingHourGenderUpdate[];

  @ApiProperty({ type: () => [MPSTrainingHourJobGroupUpdate] })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => MPSTrainingHourJobGroupUpdate)
  @ValidateNested({ each: true })
  traininghourjobgroup: MPSTrainingHourJobGroupUpdate[];
}

export class MPSUpdateAll {
  gradeemployeestatus: MPSGradeEmployeeStatusUpdate[];
  genderage: MPSGenderAgeUpdate[];
  outsourcingpergender: MPSOutSourcingPerGenderUpdate[];
  newemployeepergender: MPSNewEmployeePerGenderUpdate[];
  applicantpergender: MPSApplicantPerGenderUpdate[];
  turnoverterminationtype: MPSTurnOverTerminationTypeUpdate[];
  tenure: MPSTenureUpdate[];
  education: MPSEducationUpdate[];
  employeebygender: MPSEmployeeByGenderUpdate[];
  traininghourbygender: MPSTrainingHourGenderUpdate[];
  traininghourbyjobgroup: MPSTrainingHourJobGroupUpdate[];
}
