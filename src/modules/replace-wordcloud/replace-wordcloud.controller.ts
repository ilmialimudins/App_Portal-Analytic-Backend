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
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: ReplaceWordcloudDto[]; total: number }> {
    return this.replaceWordcloudService.getAllReplaceWordcloud(page, pageSize);
  }

  @Get('/replaceWordcloudFilter')
  @ApiOkResponse({ type: ReplaceWordcloudDto })
  async getAllReplaceWordcloudFilter(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('companyname') companyname: string,
    @Query('tahun_survey') tahun_survey: number,
  ): Promise<{ data: ReplaceWordcloudDto[]; total: number }> {
    return this.replaceWordcloudService.getAllReplaceWordcloudFilter(
      page,
      pageSize,
      companyname,
      tahun_survey,
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
