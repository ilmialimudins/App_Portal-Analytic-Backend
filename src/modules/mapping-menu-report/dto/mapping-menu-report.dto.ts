import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MappingMenuReport } from '../mapping-menu-report.entity';

export class MappingMenuReportDto extends AbstractDto {
  @ApiProperty()
  mappingmenureportid: number;

  @ApiProperty()
  menuid: number;

  @ApiProperty()
  reportid: number;

  @ApiProperty()
  sectionid: number;

  @ApiProperty()
  isdelete: string;

  constructor(mappingMenuReportEntity: MappingMenuReport) {
    super(mappingMenuReportEntity, { exludeFields: true });
    this.mappingmenureportid = mappingMenuReportEntity.mappingmenureportid * 1;
    this.menuid = mappingMenuReportEntity.menuid;
    this.reportid = mappingMenuReportEntity.reportid;
    this.sectionid = mappingMenuReportEntity.sectionid;
    this.isdelete = mappingMenuReportEntity.isdelete;
  }
}
