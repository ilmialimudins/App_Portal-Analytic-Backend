import { Body, Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NgramService } from './ngram.service';
import { NgramDto } from './dto/ngram.dto';
import { UpdateNgramDto } from './dto/update-ngram.dto';

@ApiTags('Ngram')
@Controller('Ngram')
export class NgramController {
  constructor(private ngramService: NgramService) {}

  @Get('/')
  @ApiOkResponse({ type: NgramDto })
  async getAllNgram(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: NgramDto[]; total: number }> {
    return this.ngramService.getAllNgram(page, pageSize);
  }

  @Get('/getAllNgramFilter')
  @ApiOkResponse({ type: NgramDto })
  async getAllNgramFilter(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('companyname') companyname: string,
    @Query('tahun_survey') tahun_survey: number,
  ): Promise<{ data: NgramDto[]; total: number }> {
    return this.ngramService.getAllNgramFilter(
      page,
      pageSize,
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
    @Query('pageSize') pageSize: number,
    @Query('companyname') companyname: string,
    @Query('tahun_survey') tahun_survey: number,
    @Query('qcode') qcode: string,
    @Query('word') word: string,
  ): Promise<{ data: NgramDto[]; total: number }> {
    return this.ngramService.getNgramByWord(
      page,
      pageSize,
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
