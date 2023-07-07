import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MasterEngagementService } from './master-engagement.service';
import { CreateMasterEngagementDto } from './dto/create-master-engagement.dto';
import { UpdateMasterEngagementDto } from './dto/update-master-engagement.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Master Engagement')
@Controller('master-engagement')
export class MasterEngagementController {
  constructor(
    private readonly masterEngagementService: MasterEngagementService,
  ) {}

  @Post()
  create(@Body() createMasterEngagementDto: CreateMasterEngagementDto) {
    return this.masterEngagementService.create(createMasterEngagementDto);
  }

  @Get()
  findAll() {
    return this.masterEngagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterEngagementService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasterEngagementDto: UpdateMasterEngagementDto,
  ) {
    return this.masterEngagementService.update(+id, updateMasterEngagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterEngagementService.remove(+id);
  }
}
