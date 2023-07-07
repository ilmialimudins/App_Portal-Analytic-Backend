import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PredRelativeImportanceService } from './pred-relative-importance.service';
import { CreatePredRelativeImportanceDto } from './dto/create-pred-relative-importance.dto';
import { UpdatePredRelativeImportanceDto } from './dto/update-pred-relative-importance.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Relative Importance')
@Controller('pred-relative-importance')
export class PredRelativeImportanceController {
  constructor(
    private readonly predRelativeImportanceService: PredRelativeImportanceService,
  ) {}

  @Post()
  create(
    @Body() createPredRelativeImportanceDto: CreatePredRelativeImportanceDto,
  ) {
    return this.predRelativeImportanceService.create(
      createPredRelativeImportanceDto,
    );
  }

  @Get()
  findAll() {
    return this.predRelativeImportanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predRelativeImportanceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePredRelativeImportanceDto: UpdatePredRelativeImportanceDto,
  ) {
    return this.predRelativeImportanceService.update(
      +id,
      updatePredRelativeImportanceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predRelativeImportanceService.remove(+id);
  }
}
