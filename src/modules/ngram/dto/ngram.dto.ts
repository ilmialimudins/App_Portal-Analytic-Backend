import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Ngram, QCodeEnum } from '../ngram.entity';

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
  h_companyhashkey: string;

  @ApiProperty()
  h_surveygizmohashkey: string;

  @ApiProperty()
  h_surveyquestionkey: string;

  @ApiProperty()
  h_wordhashkey: string;

  @ApiProperty()
  qcode: QCodeEnum;

  @ApiProperty()
  word: string;

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
    this.h_companyhashkey = ngramEntity.h_companyhashkey;
    this.h_surveygizmohashkey = ngramEntity.h_surveygizmohashkey;
    this.h_surveyquestionkey = ngramEntity.h_surveyquestionhashkey;
    this.h_wordhashkey = ngramEntity.h_companyhashkey;
    this.qcode = ngramEntity.qcode;
    this.word = ngramEntity.word;
    this.n = ngramEntity.n;
    this.ngram = ngramEntity.ngram;
    this.ngramfrequency = ngramEntity.ngramfrequency;
    this.wordrank = ngramEntity.wordrank;
    this.isdelete = ngramEntity.isdelete;
  }
}
