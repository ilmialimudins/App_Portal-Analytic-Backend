import { ApiProperty } from '@nestjs/swagger';
import {
  GetModifyDetailQueryDTO,
  GetOneInvitedRespondentsQueryDTO,
} from './get-spm-invited-respondents.dto';
import { IsString } from 'class-validator';

export class DelInvitedRespondentsQueryDTO extends GetOneInvitedRespondentsQueryDTO {}

export class DelValueDemoModifyDTO extends GetModifyDetailQueryDTO {
  @ApiProperty()
  @IsString()
  valuedemography: string;

  @ApiProperty()
  @IsString()
  demography: string;
}

export class DelSectionModifyDTO extends GetModifyDetailQueryDTO {
  @ApiProperty()
  @IsString()
  demography: string;
}
