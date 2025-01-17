import {
  Controller,
  Body,
  Get,
  Patch,
  Post,
  Query,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { StopwordsService } from './stopwords.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StopwordsDto } from './dto/stopwords.dto';
import { AddStopwordsDto } from './dto/add-stopwords.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Response as ExpressResponse } from 'express';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';
import { UserInfo } from 'src/decorators/use-info.decorator';

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
    @Query('word') word: string,
  ): Promise<{
    data: StopwordsDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.stopwordsService.getAllStopwords(page, take, word);
  }

  @Get('/getStopwordsId')
  @ApiOkResponse({ type: StopwordsDto })
  async getStopwordsId(@Query('uuid') uuid: string) {
    return this.stopwordsService.getStopwordsId(uuid);
  }

  @Get('/checkDuplicateStopwords')
  @ApiOkResponse({ type: StopwordsDto })
  async checkDuplicateStopwords(@Query('stopword') stopword: string) {
    const result = await this.stopwordsService.checkDuplicateStopwords(
      stopword,
    );

    if (result) {
      return { isDuplicate: true };
    } else {
      return { isDuplicate: false };
    }
  }

  @Post('/createStopwords')
  @ApiOkResponse({ type: StopwordsDto })
  async createStopwords(
    @Body() stopwords: AddStopwordsDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    const checkOne = await this.stopwordsService.checkOneStopwords(stopwords);

    if (checkOne) {
      return { isDuplicate: true };
    }

    const result = await this.stopwordsService.createStopwords(
      stopwords,
      userinfo,
    );

    return result;
  }

  @Post('/createManyStopwords')
  @ApiOkResponse({ type: StopwordsDto })
  async createManyStopwords(
    @Body() stopwords: AddStopwordsDto[],
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    const duplicate = await this.stopwordsService.checkManyDuplicateStopwords(
      stopwords,
    );

    if (duplicate.anyDuplicate && duplicate.countDuplicate > 0) {
      return { isDuplicate: true };
    }

    return await this.stopwordsService.createManyStopwords(stopwords, userinfo);
  }

  @Patch('/updateStopwords')
  @ApiOkResponse({ type: StopwordsDto })
  async updateStopwords(
    @Query('uuid') uuid: string,
    @Body() stopwords: AddStopwordsDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    const checkOne = await this.stopwordsService.checkOneStopwords(stopwords);

    if (checkOne) {
      return { isDuplicate: true };
    }

    const result = this.stopwordsService.updateStopwords(
      uuid,
      stopwords,
      userinfo,
    );

    return result;
  }

  @Delete('/deleteStopwords')
  @ApiOkResponse({ type: StopwordsDto })
  async deleteStopwords(@Query('uuid') uuid: string) {
    return this.stopwordsService.deleteStopwords(uuid);
  }

  @Post('/generateExcelStopwords')
  @ApiOkResponse({ type: StopwordsDto })
  async generateExcelStopwords(@Res() res: ExpressResponse) {
    const workbook = await this.stopwordsService.generateExcelStopwords();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename=Stopwords.xlsx`);

    await workbook.xlsx.write(res);
    res.end();
  }
}
