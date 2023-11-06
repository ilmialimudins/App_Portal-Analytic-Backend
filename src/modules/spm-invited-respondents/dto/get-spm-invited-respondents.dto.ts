import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
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
                  "companyid": 1,
                  "surveygroupid": 1,
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
  companyid: number;

  @ApiProperty()
  @IsNumber()
  surveygroupid: number;

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
export class DetailDTO {
  @ApiProperty()
  @IsNumber()
  surveyid: number;

  @ApiProperty()
  @IsNumber()
  surveygroupid: number;

  @ApiProperty()
  @IsNumber()
  companyid: number;

  @ApiProperty()
  startsurvey: string;

  @ApiProperty()
  closesurvey: string;

  @ApiProperty()
  totalinvited_company: number;

  @ApiProperty()
  demographyid: number;

  @ApiProperty()
  valuedemography: string;

  @ApiProperty()
  tahun_survey: number;

  @ApiProperty()
  company: string;

  @ApiProperty()
  surveygroup: string;
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
    "surveygroupid": 1,
    "companyid": "1",
    "startsurvey": "2022-12-31T17:00:00.000Z",
    "closesurvey": "2023-01-30T17:00:00.000Z",
    "totalinvited_company": 270,
    "demographyid": "1",
    "valuedemography": "Company",
    "tahun_survey": 2023,
    "company": "PT Sedaya Pratama",
    "surveygroup": "Testhelo"
  }
  `,
  })
  @ValidateNested()
  detail: DetailDTO;

  @ApiProperty({
    example: `
    [
      {
        "demography": "Company",
        "listdemography": [
            {
                "demographyvalue": "Company",
                "inviteddemography": 270
            }
        ],
        "totalinvited_demography": 270
      },
      {
        "demography": "Company 2",
        "listdemography": [
            {
                "demographyvalue": "Company",
                "inviteddemography": 270
            },
            {
                "demographyvalue": "Company 2",
                "inviteddemography": 270
            }
        ],
        "totalinvited_demography": 540
      },
      {
        "demography": "Jabatan",
        "listdemography": [
            {
                "demographyvalue": "Jabatan",
                "inviteddemography": 270
            }
        ],
        "totalinvited_demography": 270
      },
      {
        "demography": "Golongan",
        "listdemography": [
            {
                "demographyvalue": "Golongan",
                "inviteddemography": 270
            }
        ],
        "totalinvited_demography": 270
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
