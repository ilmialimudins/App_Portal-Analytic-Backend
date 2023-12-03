import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Company } from '../master-company-ees.entity';

export class CompanyDto extends AbstractDto {
  @ApiProperty()
  companyid: number;

  @ApiProperty()
  companycode: string;

  @ApiProperty()
  companyeesname: string;

  @ApiProperty()
  companympsname: string;

  @ApiProperty()
  aliascompany1: string;

  @ApiProperty()
  aliascompany2: string;

  @ApiProperty()
  aliascompany3: string;

  @ApiProperty()
  remark: string;

  @ApiProperty()
  isdelete: string;

  @ApiProperty()
  locationid: number;

  @ApiProperty()
  locationdesc: string;

  constructor(companyEntity: Company) {
    super(companyEntity, { exludeFields: true });
    this.companyid = companyEntity.companyid * 1;
    this.companycode = companyEntity.companycode;
    this.companyeesname = companyEntity.companyeesname;
    this.companympsname = companyEntity.companympsname;
    this.aliascompany1 = companyEntity.aliascompany1;
    this.aliascompany2 = companyEntity.aliascompany2;
    this.aliascompany3 = companyEntity.aliascompany3;
    this.remark = companyEntity.remark;
    this.isdelete = companyEntity.isdelete;

    this.locationid = companyEntity.location.locationid;
    this.locationdesc = companyEntity.location.locationdesc;
  }
}
