import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Ngram } from '../ngram.entity';

export class NgramDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  companyid: number;

  @ApiProperty()
  tahun_survey: number;

  @ApiProperty()
  qcodeid: number;

  @ApiProperty()
  wordid: number;

  @ApiProperty()
  n: number;

  @ApiProperty()
  ngram: string;

  @ApiProperty()
  ngramfrequency: number;

  @ApiProperty()
  wordrank: number;

  @ApiProperty()
  isdelete: string;

  constructor(ngramEntity: Ngram) {
    super(ngramEntity, { exludeFields: true });
    this.id = ngramEntity.id * 1;
    this.uuid = ngramEntity.uuid;
    this.companyid = ngramEntity.companyid;
    this.tahun_survey = ngramEntity.tahun_survey;
    this.qcodeid = ngramEntity.qcodeid;
    this.wordid = ngramEntity.wordid;
    this.n = ngramEntity.n;
    this.ngram = ngramEntity.ngram;
    this.ngramfrequency = ngramEntity.ngramfrequency;
    this.wordrank = ngramEntity.wordrank;
    this.isdelete = ngramEntity.isdelete;
  }
}
