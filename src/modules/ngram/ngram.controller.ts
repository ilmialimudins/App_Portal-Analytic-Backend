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
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Ngram')
@Controller('Ngram')
export class NgramController {
  constructor(private ngramService: NgramService) {}

  @Get('/ngramFOR')
  @ApiOkResponse({ type: NgramDto })
  async getAllNgramFOR(
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
    return this.ngramService.getAllNgramFOR(
      page,
      take,
      year,
      companyid,
      wordid,
    );
  }

  @Get('/ngramUOR')
  @ApiOkResponse({ type: NgramDto })
  async getAllNgramUOR(
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
    return this.ngramService.getAllNgramUOR(
      page,
      take,
      year,
      companyid,
      wordid,
    );
  }

  @Get('/getNgramId')
  @ApiOkResponse({ type: NgramDto })
  async getNgramId(@Query('uuid') uuid: string) {
    return this.ngramService.getNgramId(uuid);
  }

  @Get('/checkDuplicateNgram')
  @ApiOkResponse({ type: NgramDto })
  async checkDuplicateNgram(@Query('ngram') ngram: string) {
    const result = await this.ngramService.checkDuplicateNgram(ngram);

    if (result) {
      return { isDuplicate: true };
    } else {
      return { isDuplicate: false };
    }
  }

  @Patch('/updateNgram')
  @ApiOkResponse({ type: NgramDto })
  async updateNgram(
    @Query('uuid') uuid: string,
    @Body() Ngram: UpdateNgramDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    const result = await this.ngramService.updateNgram(uuid, Ngram, userinfo);

    return result;
  }

  @Delete('/deleteNgram')
  @ApiOkResponse({ type: NgramDto })
  async deleteNgram(@Query('uuid') uuid: string) {
    return this.ngramService.deleteNgram(uuid);
  }
}
