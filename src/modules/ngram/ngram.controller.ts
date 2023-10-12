import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NgramService } from './ngram.service';
import { NgramDto } from './dto/ngram.dto';
import { UpdateNgramDto } from './dto/update-ngram.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Ngram')
@Controller('Ngram')
export class NgramController {
  constructor(private ngramService: NgramService) {}

  @Get('/')
  @ApiOkResponse({ type: NgramDto })
  async getAllNgram(
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<{
    data: NgramDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.ngramService.getAllNgram(page, take);
  }

  @Get('/getAllNgramFilter')
  @ApiOkResponse({ type: NgramDto })
  async getAllNgramFilter(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('companyname') companyname: string,
    @Query('tahun_survey') tahun_survey: number,
  ): Promise<{
    data: NgramDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.ngramService.getAllNgramFilter(
      page,
      take,
      companyname,
      tahun_survey,
    );
  }

  @Get('/getNgramId')
  @ApiOkResponse({ type: NgramDto })
  async getNgramId(@Query('uuid') uuid: string) {
    return this.ngramService.getNgramId(uuid);
  }

  @Get('/getNgramByWord')
  @ApiOkResponse({ type: NgramDto })
  async getNgramByWord(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('companyname') companyname: string,
    @Query('tahun_survey') tahun_survey: number,
    @Query('qcode') qcode: string,
    @Query('word') word: string,
  ): Promise<{
    data: NgramDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.ngramService.getNgramByWord(
      page,
      take,
      companyname,
      tahun_survey,
      qcode,
      word,
    );
  }

  @Patch('/updateNgram')
  @ApiOkResponse({ type: NgramDto })
  async updateNgram(
    @Query('uuid') uuid: string,
    @Body() Ngram: UpdateNgramDto,
  ) {
    return this.ngramService.updateNgram(uuid, Ngram);
  }

  @Delete('/deleteNgram')
  @ApiOkResponse({ type: NgramDto })
  async deleteNgram(@Query('uuid') uuid: string) {
    return this.ngramService.deleteNgram(uuid);
  }
}
