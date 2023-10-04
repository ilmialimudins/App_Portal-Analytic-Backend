import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReplaceWordcloudService } from './replace-wordcloud.service';
import { ReplaceWordcloudDto } from './dto/replace-wordcloud.dto';
import { AddReplaceWordcloudDto } from './dto/add-replace-wordcloud.dto';
import { UpdateReplaceWordcloudDto } from './dto/update-replace-wordcloud.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

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
  ): Promise<{
    data: ReplaceWordcloudDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.replaceWordcloudService.getAllReplaceWordcloud(page, take);
  }

  @Get('/replaceWordcloudFilter')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async getAllReplaceWordcloudFilter(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('companyname') companyname: string,
    @Query('tahun_survey') tahun_survey: number,
  ): Promise<{
    data: ReplaceWordcloudDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.replaceWordcloudService.getAllReplaceWordcloudFilter(
      page,
      take,
      companyname,
      tahun_survey,
    );
  }

  @Get('/replaceWordcloudFilterOriginalText')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async getAllReplaceWordcloudFilterOriginalText(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('original_text') original_text: string,
  ): Promise<{
    data: ReplaceWordcloudDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.replaceWordcloudService.getAllReplaceWordcloudFilterOriginalText(
      page,
      take,
      original_text,
    );
  }

  @Get('/getReplaceWordcloudId')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async getReplaceWordcloudId(@Query('uuid') uuid: string) {
    return this.replaceWordcloudService.getReplaceWordcloudId(uuid);
  }

  @Post('/createReplaceWordcloud')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async createReplaceWordcloud(
    @Body() replacewordcloud: AddReplaceWordcloudDto,
  ) {
    const checkOne =
      await this.replaceWordcloudService.checkOneReplaceWordcloud(
        replacewordcloud,
      );

    if (checkOne) {
      throw new Error('Duplicate Entry');
    }

    const result = await this.replaceWordcloudService.createReplaceWordcloud(
      replacewordcloud,
    );

    return result;
  }

  @Patch('/updateReplaceWordcloud')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async updateReplaceWordcloud(
    @Query('uuid') uuid: string,
    @Body() ReplaceWordcloud: UpdateReplaceWordcloudDto,
  ) {
    return this.replaceWordcloudService.updateReplaceWordcloud(
      uuid,
      ReplaceWordcloud,
    );
  }

  @Delete('/deleteReplaceWordcloud')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async deleteReplaceWordcloud(@Query('uuid') uuid: string) {
    return this.replaceWordcloudService.deleteReplaceWordcloud(uuid);
  }
}
