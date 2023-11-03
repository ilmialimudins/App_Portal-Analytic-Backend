import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { SpmInvitedRespondentsDTO } from './spm-invited-respondents.dto';

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
  tahun_survey?: string = '';

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
  page?: number | 0;
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
  page: number;

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

export class ListDemographyValueDTO {
  @ApiProperty()
  @IsString()
  demographyvalue: string;

  @ApiProperty()
  @IsNumber()
  inviteddemography: number;
}
export class GetModifyDemographyDTO {
  @ApiProperty()
  @IsString()
  demography: string;

  @ApiProperty()
  @ValidateNested()
  @IsArray()
  listdemography: ListDemographyValueDTO[];

  @ApiProperty()
  @IsNumber()
  totalinvited_demography: number;
}

export class GetModifyDetailQueryDTO {
  @ApiProperty()
  @ValidateIf((e) => e === undefined)
  @IsNumber()
  tahun_survey: number;

  @ApiProperty()
  @ValidateIf((e) => e === undefined)
  @IsString()
  companyid: number;

  @ApiProperty()
  @ValidateIf((e) => e === undefined)
  @IsString()
  surveygroupid: number;
}

export class CompanyDTO {
  @ApiProperty()
  @IsString()
  companyeesname: string;
}

export class SurveyGroupDTO {
  @ApiProperty()
  @IsString()
  surveygroupdesc: string;
}
export class DetailDTO extends SpmInvitedRespondentsDTO {
  @ApiProperty()
  @IsObject()
  company: CompanyDTO;

  @ApiProperty()
  @IsObject()
  surveygroup: SurveyGroupDTO;
}

export class DemoInvited {
  @ApiProperty()
  @IsString()
  demography: string;

  @ApiProperty()
  @IsNumber()
  totalinvited_demography: number;
}
export class GetModifyDetailResponse {
  @ApiProperty({
    example: `
  {
    "createdby": null,
    "updatedby": null,
    "createdtime": "2022-12-31T17:00:00.000Z",
    "createddate": null,
    "sourcecreatedmodifiedtime": null,
    "sync_date": null,
    "id": 3,
    "surveyid": 1,
    "companyid": "1",
    "surveygroupid": "1",
    "startsurvey": "2022-12-31T17:00:00.000Z",
    "closesurvey": "2023-01-30T17:00:00.000Z",
    "totalinvited_company": 100,
    "demographyid": "1",
    "valuedemography": "Company",
    "totalinvited_demography": 50,
    "is_sync": 1,
    "endcreatedtime": "2022-12-31T17:00:00.000Z",
    "tahun_survey": 2023,
    "is_delete": "0",
    "company": {
        "companyeesname": "PT Sedaya Pratama"
    },
    "surveygroup": {
        "surveygroupdesc": "Testhelo"
    }
  }
  `,
  })
  @ValidateNested()
  detail: DetailDTO;

  @ApiProperty({
    example: `
    [
      {
        "demography": "Directorate",
        "valuedemography": "Value1",
        "totalinvited_demography": 50
      }
      ,
      {
        "demography": "Division",
        "valuedemography": "Value2",
        "totalinvited_demography": 60
      }
    ]
  `,
  })
  @ValidateNested()
  invited_respondents: DemoInvited[];

  @ApiProperty({
    example: `
    [
      {
        "demographycode": "DG001",
        "demographydesc": "Company"
      },
      {
        "demographycode": "DG002",
        "demographydesc": "Company 2"
      }
    ]
  `,
  })
  @ValidateNested()
  demography: GetModifyDemographyDTO[];

  @ApiProperty()
  @IsNumber()
  total_invited_respondents: number;
}
