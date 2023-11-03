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
    @Query('year') year: number,
    @Query('company') companyid: number,
    @Query('word') wordid: number,
  ): Promise<{
    data: NgramDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.ngramService.getAllNgram(page, take, year, companyid, wordid);
  }

  @Get('/getNgramId')
  @ApiOkResponse({ type: NgramDto })
  async getNgramId(@Query('uuid') uuid: string) {
    return this.ngramService.getNgramId(uuid);
  }

  @Get('/getWordFor')
  @ApiOkResponse({ type: NgramDto })
  async getWordFor() {
    return this.ngramService.getWordFor();
  }

  @Get('/getWordUor')
  @ApiOkResponse({ type: NgramDto })
  async getWordUor() {
    return this.ngramService.getWordUor();
  }

  @Get('/checkDuplicateNgram')
  @ApiOkResponse({ type: NgramDto })
  async checkDuplicateNgram(@Query('ngram') ngram: string) {
    const result = await this.ngramService.checkDuplicateNgram(ngram);

    if (result) {
      return { message: 'Duplicate Entry' };
    } else {
      return ngram;
    }
  }

  @Patch('/updateNgram')
  @ApiOkResponse({ type: NgramDto })
  async updateNgram(
    @Query('uuid') uuid: string,
    @Body() Ngram: UpdateNgramDto,
  ) {
    const result = await this.ngramService.updateNgram(uuid, Ngram);

    if (result.affected === 0) {
      throw new Error('Duplicate Entry');
    }

    return result;
  }

  @Delete('/deleteNgram')
  @ApiOkResponse({ type: NgramDto })
  async deleteNgram(@Query('uuid') uuid: string) {
    return this.ngramService.deleteNgram(uuid);
  }
}
