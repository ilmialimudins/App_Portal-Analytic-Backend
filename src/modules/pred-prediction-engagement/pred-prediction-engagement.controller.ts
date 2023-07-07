import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PredPredictionEngagementService } from './pred-prediction-engagement.service';
import { CreatePredPredictionEngagementDto } from './dto/create-pred-prediction-engagement.dto';
import { UpdatePredPredictionEngagementDto } from './dto/update-pred-prediction-engagement.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Prediction Engagement')
@Controller('pred-prediction-engagement')
export class PredPredictionEngagementController {
  constructor(
    private readonly predPredictionEngagementService: PredPredictionEngagementService,
  ) {}

  @Post()
  create(
    @Body()
    createPredPredictionEngagementDto: CreatePredPredictionEngagementDto,
  ) {
    return this.predPredictionEngagementService.create(
      createPredPredictionEngagementDto,
    );
  }

  @Get()
  findAll() {
    return this.predPredictionEngagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predPredictionEngagementService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updatePredPredictionEngagementDto: UpdatePredPredictionEngagementDto,
  ) {
    return this.predPredictionEngagementService.update(
      +id,
      updatePredPredictionEngagementDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predPredictionEngagementService.remove(+id);
  }
}
