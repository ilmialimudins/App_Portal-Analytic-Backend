import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsString, ValidateNested } from 'class-validator';
import { DetailInvitedRespondentsDTO } from './get-spm-invited-respondents.dto';

export class DetailSPMDTO {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  surveygroupid: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  companyid: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  tahun_survey: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  surveyid: number;
}

export class SaveAllSpmDTO {
  @ApiProperty({ type: DetailSPMDTO })
  @Type(() => DetailSPMDTO)
  @ValidateNested()
  detail: DetailSPMDTO;

  @ApiProperty({
    type: [DetailInvitedRespondentsDTO],
  })
  @Type(() => DetailInvitedRespondentsDTO)
  @ValidateNested()
  invited_respondents: DetailInvitedRespondentsDTO[];

  @ApiProperty()
  @IsNumber()
  total_invited_respondents: number;
}

export class SaveAllTransactionDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  totalinvited_demography: number;

  @ApiProperty()
  @IsString()
  valuedemography: string;

  @ApiProperty()
  @IsNumber()
  totalinvited_company: number;
}
