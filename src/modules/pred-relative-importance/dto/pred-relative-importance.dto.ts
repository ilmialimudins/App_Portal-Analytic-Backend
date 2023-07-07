import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { PredRelativeImportance } from 'src/modules/pred-relative-importance/pred-relative-importance.entity';

export class PredRelativeImportanceDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  d_surveygizmoid: number;

  @ApiProperty()
  d_companyid: number;

  @ApiProperty()
  d_factorid: number;

  @ApiProperty()
  d_engagementid: number;

  @ApiProperty()
  tahunsurvey: number;

  @ApiProperty()
  relativeimportance: number;

  constructor(predRelativeImportance: PredRelativeImportance) {
    super(predRelativeImportance, { exludeFields: true });
  }
}
