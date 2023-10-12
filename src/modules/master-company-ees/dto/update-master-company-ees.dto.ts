import { PartialType } from '@nestjs/swagger';
import { AddCompanyDto } from './add-master-company-ees.dto';

export class UpdateCompanyDto extends PartialType(AddCompanyDto) {}
