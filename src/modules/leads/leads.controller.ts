import { Body, Controller, Post } from '@nestjs/common';
import { CreateLeadDTO } from './dto/create-lead.dto';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private leadService: LeadsService) {}

  @Post('/create')
  createLead(@Body() body: CreateLeadDTO) {
    const assignedData = this.leadService.assignSalesman(body);
    return { message: 'Success', result: assignedData };
  }
}
