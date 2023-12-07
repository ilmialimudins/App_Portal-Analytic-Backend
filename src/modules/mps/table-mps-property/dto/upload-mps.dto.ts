/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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

export class EducationDTO {}
export class DataMPSDTO {
  education: EducationDTO[];
  genderAge: [];
  gradeEmployee: [];
  tenure: [];
  turnOverTerminationType: [];
  employeeGender: [];
  outsourceGender: [];
  newEmployeeGender: [];
  applicantGender: [];
  trainingHourJobGroup: [];
  trainingHourGender: [];
}
