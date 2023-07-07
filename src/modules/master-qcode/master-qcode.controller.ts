import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MasterQcodeService } from './master-qcode.service';
import { CreateMasterQcodeDto } from './dto/create-master-qcode.dto';
import { UpdateMasterQcodeDto } from './dto/update-master-qcode.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Master Qcode')
@Controller('master-qcode')
export class MasterQcodeController {
  constructor(private readonly masterQcodeService: MasterQcodeService) {}

  @Post()
  create(@Body() createMasterQcodeDto: CreateMasterQcodeDto) {
    return this.masterQcodeService.create(createMasterQcodeDto);
  }

  @Get()
  findAll() {
    return this.masterQcodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterQcodeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasterQcodeDto: UpdateMasterQcodeDto,
  ) {
    return this.masterQcodeService.update(+id, updateMasterQcodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterQcodeService.remove(+id);
  }
}
