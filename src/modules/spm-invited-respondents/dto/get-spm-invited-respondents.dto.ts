import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

export class GetOneInvitedRespondentsQueryDTO {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  companyid: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  surveyid: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  surveygroupid: number;

  @ApiProperty()
  @IsString()
  valuedemography: string;

  @ApiProperty()
  @IsString()
  demographyid: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  tahun_survey: number;
}

export class GetInvitedRespondentsResultDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  companyid: number;

  @ApiProperty()
  surveygroupid: number;

  @ApiProperty()
  startsurvey: Date;

  @ApiProperty()
  closesurvey: Date;

  @ApiProperty()
  surveyid: number;

  @ApiProperty()
  totalinvited_company: number;

  @ApiProperty()
  valuedemography: string;

  @ApiProperty()
  demographyid: number;

  @ApiProperty()
  totalinvited_demography: number;

  @ApiProperty()
  sourcecreatedmodifiedtime: Date;

  @ApiProperty()
  createdby: string;

  @ApiProperty()
  createdtime: Date;

  @ApiProperty()
  createddate: number;

  @ApiProperty()
  endcreatedtime: Date;

  @ApiProperty()
  tahun_survey: number;

  @ApiProperty()
  is_delete: string;
}

export class GetSurveyInvitedRespondentsQueryDTO {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  companyid: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  surveygroupid: number;
}

export class GetSurveyInvitedRespondentsResultsDTO {
  @ApiProperty()
  surveyid: number;

  @ApiProperty()
  @IsNumber()
  companyid: number;

  @ApiProperty()
  tahun_survey: number;
}

export class GetInvitedRespondentsQueryDTO {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  surveyid: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  companyid: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  surveygroupid: number;
}

export class GetManyInvitedRespondentsQueryDTO extends GetInvitedRespondentsQueryDTO {
  @ApiPropertyOptional()
  @IsInt()
  @Type(() => Number)
  tahun_survey?: number;
}

export class GetModifyListQueryDTO {
  @ApiProperty()
  @ValidateIf((e) => e === '')
  @IsString()
  filter?: string = '';

  @ApiProperty()
  @ValidateIf((e) => e === '')
  @IsString()
  search?: string = '';

  @ApiProperty()
  @ValidateIf((e) => e === undefined)
  @IsNumber()
  @Type(() => Number)
  limit?: number | 10;

  @ApiProperty()
  @ValidateIf((e) => e === undefined)
  @IsNumber()
  @Type(() => Number)
  offset?: number | 0;
}

export class GetModifyResponse {
  @ApiProperty({
    example: `
    {
      "acknowledge": 0,
      "message": "",
      "errorCode": 200,
      "result": {
          "data": [
              {
                  "id": 4,
                  "tahun_survey": 2023,
                  "company": {
                      "companyeesname": "PT Sedaya Pratama"
                  },
                  "surveygroup": {
                      "surveygroupdesc": "Test"
                  }
              },
              {
                  "id": 5,
                  "tahun_survey": 2023,
                  "company": {
                      "companyeesname": "PT Nirmala Agro Lestari"
                  },
                  "surveygroup": {
                      "surveygroupdesc": "Testing 2"
                  }
              }
          ],
          "limit": 10,
          "offset": 0,
          "size": 2
      }
  }
    `,
  })
  @ValidateNested()
  @Type(() => GetModifyListManyDTO)
  data: GetModifyListManyDTO[];

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  size: number;
}

export class GetModifyListManyDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  tahun_survey: number;

  @ApiProperty()
  @IsString()
  company: { companyeesname: string };

  @ApiProperty()
  @IsString()
  surveygroup: { surveygroupdesc: string };
}
