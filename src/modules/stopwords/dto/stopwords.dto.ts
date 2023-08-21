import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Stopwords } from '../stopwords.entity';

export class StopwordsDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  companyid: number;

  @ApiProperty()
  tahun_survey: number;

  @ApiProperty()
  stopwords: string;

  @ApiProperty()
  isDelete: string;

  constructor(stopwordsEntity: Stopwords) {
    super(stopwordsEntity, { exludeFields: true });
    this.id = stopwordsEntity.id * 1;
    this.uuid = stopwordsEntity.uuid;
    this.companyid = stopwordsEntity.companyid;
    this.tahun_survey = stopwordsEntity.tahun_survey;
    this.stopwords = stopwordsEntity.stopwords;
    this.isDelete = stopwordsEntity.isDelete;
  }
}
