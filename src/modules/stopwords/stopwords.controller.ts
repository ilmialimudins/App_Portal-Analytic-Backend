import {
  Controller,
  Body,
  Get,
  Patch,
  Post,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StopwordsService } from './stopwords.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StopwordsDto } from './dto/stopwords.dto';
import { AddStopwordsDto } from './dto/add-stopwords.dto';
import { UpdateStopwordsDto } from './dto/update-stopwords.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Stopwords')
@Controller('Stopwords')
export class StopwordsController {
  constructor(private stopwordsService: StopwordsService) {}

  @Get('/')
  @ApiOkResponse({ type: StopwordsDto })
  async getAllStopwords(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<{
    data: StopwordsDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.stopwordsService.getAllStopwords(page, take);
  }

  @Get('/stopwordsFilter')
  @ApiOkResponse({ type: StopwordsDto })
  async getAllStopwordsFilter(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('companyname') companyname: string,
    @Query('tahun_survey') tahun_survey: number,
  ): Promise<{
    data: StopwordsDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.stopwordsService.getStopwordsFilter(
      page,
      take,
      companyname,
      tahun_survey,
    );
  }

  @Get('/stopwordsFilterStopwords')
  @ApiOkResponse({ type: StopwordsDto })
  async getAllStopwordsFilterStopwords(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('stopword') stopword: string,
  ): Promise<{
    data: StopwordsDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.stopwordsService.getStopwordsFilterStopwords(
      page,
      take,
      stopword,
    );
  }

  @Get('/getStopwordsId')
  @ApiOkResponse({ type: StopwordsDto })
  async getStopwordsId(@Query('uuid') uuid: string) {
    return this.stopwordsService.getStopwordsId(uuid);
  }

  @Post('/createStopwords')
  @ApiOkResponse({ type: StopwordsDto })
  async createStopwords(@Body() stopwords: AddStopwordsDto) {
    const checkOne = await this.stopwordsService.checkOneStopwords(stopwords);

    if (checkOne) {
      throw new Error('Duplicate Entry');
    }

    const result = await this.stopwordsService.createStopwords(stopwords);

    return result;
  }

  @Patch('/updateStopwords')
  @ApiOkResponse({ type: StopwordsDto })
  async updateStopwords(
    @Query('uuid') uuid: string,
    @Body() Stopwords: UpdateStopwordsDto,
  ) {
    return this.stopwordsService.updateStopwords(uuid, Stopwords);
  }

  @Delete('/deleteStopwords')
  @ApiOkResponse({ type: StopwordsDto })
  async deleteStopwords(@Query('uuid') uuid: string) {
    return this.stopwordsService.deleteStopwords(uuid);
  }
}
