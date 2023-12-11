import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Delete,
  Patch,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReplaceWordcloudService } from './replace-wordcloud.service';
import { ReplaceWordcloudDto } from './dto/replace-wordcloud.dto';
import { AddReplaceWordcloudDto } from './dto/add-replace-wordcloud.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Response as ExpressResponse } from 'express';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';
import { UserInfo } from 'src/decorators/use-info.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Replace Wordcloud')
@Controller('ReplaceWordcloud')
export class ReplaceWordcloudController {
  constructor(private replaceWordcloudService: ReplaceWordcloudService) {}

  @Get('/')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async getAllReplaceWordcloud(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('word') word: string,
  ): Promise<{
    data: ReplaceWordcloudDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.replaceWordcloudService.getAllReplaceWordcloud(
      page,
      take,
      word,
    );
  }

  @Get('/getReplaceWordcloudId')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async getReplaceWordcloudId(@Query('uuid') uuid: string) {
    return this.replaceWordcloudService.getReplaceWordcloudId(uuid);
  }

  @Get('/checkDuplicateReplaceWordCloud')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async checkDuplicateReplaceWordCloud(
    @Query('original_text') original_text: string,
  ) {
    const result =
      await this.replaceWordcloudService.checkDuplicateReplaceWordCloud(
        original_text,
      );

    if (result) {
      return { isDuplicate: true };
    } else {
      return { isDuplicate: false };
    }
  }

  @Post('/createReplaceWordcloud')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async createReplaceWordcloud(
    @Body() replacewordcloud: AddReplaceWordcloudDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    const checkOne =
      await this.replaceWordcloudService.checkOneReplaceWordcloud(
        replacewordcloud,
      );

    if (checkOne) {
      return { isDuplicate: true };
    }

    const result = await this.replaceWordcloudService.createReplaceWordcloud(
      replacewordcloud,
      userinfo,
    );

    return result;
  }

  @Post('/createManyReplacewordcloud')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async createManyReplacewordcloud(
    @Body() replacewordcloud: AddReplaceWordcloudDto[],
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    const duplicate =
      await this.replaceWordcloudService.checkManyDuplicateReplacewordcloud(
        replacewordcloud,
      );

    if (duplicate.anyDuplicate && duplicate.countDuplicate > 0) {
      return { isDuplicate: true };
    }

    return await this.replaceWordcloudService.createManyReplacewordcloud(
      replacewordcloud,
      userinfo,
    );
  }

  @Patch('/updateReplaceWordcloud')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async updateReplaceWordcloud(
    @Query('uuid') uuid: string,
    @Body() replacewordcloud: AddReplaceWordcloudDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    const checkOne =
      await this.replaceWordcloudService.checkOneReplaceWordcloud(
        replacewordcloud,
      );

    if (checkOne) {
      return { isDuplicate: true };
    }

    const result = this.replaceWordcloudService.updateReplaceWordcloud(
      uuid,
      replacewordcloud,
      userinfo,
    );

    return result;
  }

  @Delete('/deleteReplaceWordcloud')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async deleteReplaceWordcloud(@Query('uuid') uuid: string) {
    return this.replaceWordcloudService.deleteReplaceWordcloud(uuid);
  }

  @Post('/generateExcelReplaceWordcloud')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async generateExcelReplaceWordcloud(@Res() res: ExpressResponse) {
    const workbook =
      await this.replaceWordcloudService.generateExcelReplaceWordcloud();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=ReplaceWordcloud.xlsx`,
    );

    await workbook.xlsx.write(res);
    res.end();
  }
}
