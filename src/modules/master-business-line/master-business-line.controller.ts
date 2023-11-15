import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BusinessLineService } from './master-business-line.service';
import { BusinessLineDto } from './dto/master-business-line.dto';
import { AddBusinessLineDto } from './dto/add-master-business-line.dto';
import { UpdateBusinessLineDto } from './dto/update-master-business-line.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Business Line')
@Controller('business-line')
export class BusinessLineController {
  constructor(private businessLineService: BusinessLineService) {}

  @Get('/')
  @ApiCreatedResponse({ type: BusinessLineDto })
  async getBusinessLine(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('businessline') businessline: string,
  ): Promise<{
    data: BusinessLineDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.businessLineService.getAllBusinessLine(
      page,
      take,
      businessline,
    );
  }

  @Get('/getBusinessLineId')
  @ApiCreatedResponse({ type: BusinessLineDto })
  async getBusinessLineId(
    @Query('businesslineid') businesslineid: number,
  ): Promise<BusinessLineDto | undefined> {
    return this.businessLineService.getBusinessLineId(businesslineid);
  }

  @Get('/checkDuplicateBusinessline')
  @ApiCreatedResponse({ type: BusinessLineDto })
  async checkDuplicateBusinessline(
    @Query('businessline') businessline: string,
  ) {
    const result = await this.businessLineService.checkDuplicateBusinessline(
      businessline,
    );

    if (result) {
      return { isDuplicate: true };
    } else {
      return { isDuplicate: false };
    }
  }

  @Get('/getLastBusinessLineCode')
  @ApiCreatedResponse({ type: BusinessLineDto })
  async getLastBusinessLineCode() {
    return this.businessLineService.getLastBusinessLineCode();
  }

  @Post('/createBusinessLine')
  @ApiCreatedResponse({ type: BusinessLineDto })
  async createBusinessLine(@Body() businessline: AddBusinessLineDto) {
    return this.businessLineService.createBusinessLine(businessline);
  }

  @Patch('/updateBusinessLine')
  @ApiCreatedResponse({ type: BusinessLineDto })
  async updateBusinessLine(
    @Query('businesslineid') businesslineid: number,
    @Body() businessline: UpdateBusinessLineDto,
  ) {
    return this.businessLineService.updateBusinessLine(
      businesslineid,
      businessline,
    );
  }

  @Delete('/deleteBusinessLine')
  @ApiCreatedResponse({ type: BusinessLineDto })
  async deleteBusinessLine(@Query('businesslineid') businesslineid: number) {
    return this.businessLineService.deleteBusinessline(businesslineid);
  }
}
