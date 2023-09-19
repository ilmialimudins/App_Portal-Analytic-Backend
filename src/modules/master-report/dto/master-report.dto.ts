import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterReport } from '../master-report.entity';

export class MasterReportDto extends AbstractDto {
  @ApiProperty()
  reportid: number;

  @ApiProperty()
  workspaceid: number;

  @ApiProperty()
  reportcode: string;

  @ApiProperty()
  reportname: string;

  @ApiProperty()
  reportdesc: string;

  @ApiProperty()
  reporturl: string;

  @ApiProperty()
  reportpowerbiid: string;

  @ApiProperty()
  datasetpowerbiid: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterReportEntity: MasterReport) {
    super(masterReportEntity, { exludeFields: true });
    this.reportid = masterReportEntity.reportid * 1;
    this.workspaceid = masterReportEntity.workspaceid;
    this.reportcode = masterReportEntity.reportcode;
    this.reportname = masterReportEntity.reportname;
    this.reportdesc = masterReportEntity.reportdesc;
    this.reporturl = masterReportEntity.reporturl;
    this.reportpowerbiid = masterReportEntity.reportpowerbiiid;
    this.datasetpowerbiid = masterReportEntity.datasetpowerbiid;
    this.isdelete = masterReportEntity.isdelete;
  }
}
