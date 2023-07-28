import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { MasterCompanyEES } from '../master-company-ees.entity';

export class MasterCompanyEESDto extends AbstractDto {
  @ApiProperty()
  companyid: number;

  @ApiProperty()
  companycode: number;

  @ApiProperty()
  companynameees: string;

  @ApiProperty()
  companynamemps: string;

  @ApiProperty()
  aliascompany1: string;

  @ApiProperty()
  aliascompany2: string;

  @ApiProperty()
  aliascompany3: string;

  @ApiProperty()
  isdelete: string;

  constructor(masterCompanyEESEntity: MasterCompanyEES) {
    super(masterCompanyEESEntity, { exludeFields: true });
    this.companyid = masterCompanyEESEntity.companyid * 1;
    this.companycode = masterCompanyEESEntity.companycode;
    this.companynameees = masterCompanyEESEntity.companynameees;
    this.companynamemps = masterCompanyEESEntity.companynamemps;
    this.aliascompany1 = masterCompanyEESEntity.aliascompany1;
    this.aliascompany2 = masterCompanyEESEntity.aliascompany2;
    this.aliascompany3 = masterCompanyEESEntity.aliascompany3;
    this.isdelete = masterCompanyEESEntity.isdelete;
  }
}
