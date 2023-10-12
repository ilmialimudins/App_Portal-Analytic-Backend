import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { ReplaceWordcloud } from '../replace-wordcloud.entity';

export class ReplaceWordcloudDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  companyid: number;

  @ApiProperty()
  tahun_survey: number;

  @ApiProperty()
  original_text: string;

  @ApiProperty()
  replace_text: string;

  @ApiProperty()
  isdelete: string;

  constructor(replaceWordcloudEntity: ReplaceWordcloud) {
    super(replaceWordcloudEntity, { exludeFields: true });
    this.id = replaceWordcloudEntity.id * 1;
    this.uuid = replaceWordcloudEntity.uuid;
    this.companyid = replaceWordcloudEntity.companyid;
    this.tahun_survey = replaceWordcloudEntity.tahun_survey;
    this.original_text = replaceWordcloudEntity.original_text;
    this.replace_text = replaceWordcloudEntity.replace_text;
    this.isdelete = replaceWordcloudEntity.isdelete;
  }
}
