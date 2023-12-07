/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { GetOneProperty } from './table-mps-property.dto';
import { CompanyDto } from 'src/modules/master-company-ees/dto/master-company-ees.dto';

export class UploadMPSDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class UploadBodyNameDTO {
  @ApiPropertyOptional()
  @IsString()
  fileName: string;

  @ApiPropertyOptional()
  @IsString()
  originalFileName: string;
}

export class MPSDataDTO {
  gradeEmployee: GradeEmployee[];
  education: Education[];
  genderAge: GenderAge[];
  tenure: Tenure[];
  turnOverTerminationType: TurnOverTerminationType[];
  employeeGender: EmployeeGender[];
  newEmployeeGender: NewEmployeeGender[];
  outsourceGender: OutsourceGender[];
  applicantGender: ApplicantGender[];
  trainingHourJobGroup: TrainingHourJobGroup[];
  trainingHourGender: TrainingHourGender[];
}

export class SaveUploadMPSDTO {
  dataMps: MPSDataDTO;
  propertymetada: GetOneProperty;
  companymetadata: CompanyDto;
}

export class GradeEmployee {
  grade: string;
  employeestatus: string;
  gender: string;
  total: number;
}

export class Education {
  education: string;
  gender: string;
  total: number;
}

export class GenderAge {
  genderage: string;
  gender: string;
  total: number;
}

export class Tenure {
  tenure: string;
  gender: string;
  total: number;
}

export class TurnOverTerminationType {
  grade: string;
  terminationtype: string;
  gender: string;
  turnover: number;
}

export class EmployeeGender {
  gender: string;
  total: number;
}

export class NewEmployeeGender {
  gender: string;
  total: number;
}

export class OutsourceGender {
  gender: string;
  total: number;
}

export class ApplicantGender {
  gender: string;
  total: number;
}

export class TrainingHourJobGroup {
  jobgroup: string;
  totalemployee: number;
  totaltraining: number;
}

export class TrainingHourGender {
  gender: string;
  totalemployee: number;
  totaltraining: number;
}
