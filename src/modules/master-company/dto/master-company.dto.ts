import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import type { MasterEESCompany } from '../master-company.entity';

export class MasterCompanyDto extends AbstractDto {
  @ApiProperty()
  d_companyid: number;

  @ApiProperty()
  companyname_alias: string;

  @ApiProperty()
  companyname: string;

  @ApiPropertyOptional()
  companygroup?: string;

  constructor(masterCompanyEntity: MasterEESCompany) {
    super(masterCompanyEntity, { exludeFields: true });
    this.d_companyid = masterCompanyEntity.d_companyid * 1;
    this.companyname = masterCompanyEntity.companyname;
    this.companyname_alias = masterCompanyEntity.companyname_alias;
    this.companygroup = masterCompanyEntity.companygroup || undefined;
  }
}
