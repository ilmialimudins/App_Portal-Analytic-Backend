import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterSection } from '../master-section.entity';

export class MasterSectionDto extends AbstractDto {
  @ApiProperty()
  sectionid: number;

  @ApiProperty()
  reportid: number;

  @ApiProperty()
  sectioncode: string;

  @ApiProperty()
  sectionname: string;

  @ApiProperty()
  sectiondesc: string;

  @ApiProperty()
  sectioncodepowerbiid: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterSectionEntity: MasterSection) {
    super(masterSectionEntity, { exludeFields: true });
    this.sectionid = masterSectionEntity.sectionid * 1;
    this.reportid = masterSectionEntity.reportid;
    this.sectioncode = masterSectionEntity.sectioncode;
    this.sectionname = masterSectionEntity.sectionname;
    this.sectiondesc = masterSectionEntity.sectiondesc;
    this.sectioncodepowerbiid = masterSectionEntity.sectioncodepowerbiid;
    this.isdelete = masterSectionEntity.isdelete;
  }
}
