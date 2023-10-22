import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import type { MasterQcode } from '../master-qcode.entity';

export class MasterQcodeDTO extends AbstractDto {
  @ApiProperty()
  qcodeid: number;

  @ApiPropertyOptional()
  h_qcodehashkey: string;

  @ApiProperty()
  qcode: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  surveyquestion_type: string;

  @ApiProperty()
  new_qcode: string;

  @ApiPropertyOptional()
  recordsource: string;

  @ApiPropertyOptional()
  loadenddate: Date;

  constructor(masterQcode: MasterQcode) {
    super(masterQcode, { exludeFields: true });
  }
}
