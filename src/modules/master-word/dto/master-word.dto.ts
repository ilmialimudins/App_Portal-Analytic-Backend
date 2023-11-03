import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterWord } from '../master-word.entity';

export class MasterWordDto extends AbstractDto {
  @ApiProperty()
  wordid: number;

  @ApiProperty()
  h_wordhashkey: string;

  @ApiProperty()
  word: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterWordEntity: MasterWord) {
    super(masterWordEntity, { exludeFields: true });
    this.wordid = masterWordEntity.wordid * 1;
    this.h_wordhashkey = masterWordEntity.h_wordhashkey;
    this.word = masterWordEntity.word;
    this.isdelete = masterWordEntity.isdelete;
  }
}
