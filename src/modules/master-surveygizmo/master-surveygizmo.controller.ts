import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MasterSurveygizmoService } from './master-surveygizmo.service';
import { CreateMasterSurveygizmoDto } from './dto/create-master-surveygizmo.dto';
import { UpdateMasterSurveygizmoDto } from './dto/update-master-surveygizmo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Master Surveygizmo')
@Controller('master-surveygizmo')
export class MasterSurveygizmoController {
  constructor(
    private readonly masterSurveygizmoService: MasterSurveygizmoService,
  ) {}

  @Post()
  create(@Body() createMasterSurveygizmoDto: CreateMasterSurveygizmoDto) {
    return this.masterSurveygizmoService.create(createMasterSurveygizmoDto);
  }

  @Get()
  findAll() {
    return this.masterSurveygizmoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterSurveygizmoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasterSurveygizmoDto: UpdateMasterSurveygizmoDto,
  ) {
    return this.masterSurveygizmoService.update(
      +id,
      updateMasterSurveygizmoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.masterSurveygizmoService.remove(+id);
  }
}
