import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PredEngagementFavorableService } from './pred-engagement-favorable.service';
import { CreatePredEngagementFavorableDto } from './dto/create-pred-engagement-favorable.dto';
import { UpdatePredEngagementFavorableDto } from './dto/update-pred-engagement-favorable.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Engagement Favorable')
@Controller('pred-engagement-favorable')
export class PredEngagementFavorableController {
  constructor(
    private readonly predEngagementFavorableService: PredEngagementFavorableService,
  ) {}

  @Post()
  create(
    @Body() createPredEngagementFavorableDto: CreatePredEngagementFavorableDto,
  ) {
    return this.predEngagementFavorableService.create(
      createPredEngagementFavorableDto,
    );
  }

  @Get()
  findAll() {
    return this.predEngagementFavorableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predEngagementFavorableService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePredEngagementFavorableDto: UpdatePredEngagementFavorableDto,
  ) {
    return this.predEngagementFavorableService.update(
      +id,
      updatePredEngagementFavorableDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predEngagementFavorableService.remove(+id);
  }
}
