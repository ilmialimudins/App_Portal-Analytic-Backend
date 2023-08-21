import {
  Controller,
  Body,
  Get,
  Patch,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import { StopwordsService } from './stopwords.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StopwordsDto } from './dto/stopwords.dto';
import { AddStopwordsDto } from './dto/add-stopwords.dto';
import { UpdateStopwordsDto } from './dto/update-stopwords.dto';

@ApiTags('Stopwords')
@Controller('Stopwords')
export class StopwordsController {
  constructor(private stopwordsService: StopwordsService) {}

  @Get('/')
  @ApiOkResponse({ type: [StopwordsDto] })
  async getAllStopwords(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: StopwordsDto[]; total: number }> {
    return this.stopwordsService.getAllStopwords(page, pageSize);
  }

  @Get('/stopwordsFilter')
  @ApiOkResponse({ type: [StopwordsDto] })
  async getAllStopwordsFilter(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('companyname') companyname: string,
    @Query('tahun_survey') tahun_survey: number,
  ): Promise<{ data: StopwordsDto[]; total: number }> {
    return this.stopwordsService.getStopwordsFilter(
      page,
      pageSize,
      companyname,
      tahun_survey,
    );
  }

  @Post('/createStopwords')
  @ApiOkResponse({ type: [StopwordsDto] })
  async createStopwords(@Body() stopwords: AddStopwordsDto) {
    const checkOne = await this.stopwordsService.checkOneStopwords(stopwords);

    if (checkOne) {
      throw new Error('Duplicate Entry');
    }

    const result = await this.stopwordsService.createStopwords(stopwords);

    return result;
  }

  @Patch('/updateStopwords')
  @ApiOkResponse({ type: [StopwordsDto] })
  async updateStopwords(
    @Query('uuid') uuid: string,
    @Body() Stopwords: UpdateStopwordsDto,
  ) {
    return this.stopwordsService.updateStopwords(uuid, Stopwords);
  }

  @Delete('/deleteStopwords')
  @ApiOkResponse({ type: [StopwordsDto] })
  async deleteStopwords(@Query('uuid') uuid: string) {
    return this.stopwordsService.deleteStopwords(uuid);
  }
}
