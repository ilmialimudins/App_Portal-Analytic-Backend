import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterMenu } from '../master-menu.entity';

export class MasterMenuDto extends AbstractDto {
  @ApiProperty()
  menuid: number;

  @ApiProperty()
  menucode: string;

  @ApiProperty()
  menuname: string;

  @ApiProperty()
  parentid: number;

  @ApiProperty()
  sequence: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  issection: number;

  @ApiProperty()
  isdelete: string;

  constructor(masterMenuEntity: MasterMenu) {
    super(masterMenuEntity, { exludeFields: true });
    this.menuid = masterMenuEntity.menuid * 1;
    this.menucode = masterMenuEntity.menucode;
    this.menuname = masterMenuEntity.menuname;
    this.parentid = masterMenuEntity.parentid;
    this.sequence = masterMenuEntity.sequence;
    this.url = masterMenuEntity.url;
    this.issection = masterMenuEntity.issection;
    this.isdelete = masterMenuEntity.isdelete;
  }
}
