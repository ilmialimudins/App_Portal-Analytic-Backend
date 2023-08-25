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
  @ApiCreatedResponse({
    type: BusinessLineDto,
  })
  async getBusinessLine(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: BusinessLineDto[]; total: number }> {
    return this.businessLineService.getAllBusinessLine(page, pageSize);
  }

  @Get('/getBusinessLineName')
  @ApiCreatedResponse({
    type: BusinessLineDto,
  })
  async getBusinessLineName(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('businessline') businessline: string,
  ): Promise<{ data: BusinessLineDto[]; total: number }> {
    return this.businessLineService.getBusinessLineName(
      page,
      pageSize,
      businessline,
    );
  }

  @Get('/getBusinessLineId')
  @ApiCreatedResponse({
    type: BusinessLineDto,
  })
  async getBusinessLineId(
    @Query('businesslineid') businesslineid: number,
  ): Promise<BusinessLineDto | undefined> {
    return this.businessLineService.getBusinessLineId(businesslineid);
  }

  @Post('/createBusinessLine')
  @ApiCreatedResponse({
    type: BusinessLineDto,
  })
  async createBusinessLine(@Body() businessline: AddBusinessLineDto) {
    return this.businessLineService.createBusinessLine(businessline);
  }

  @Patch('/updateBusinessLine')
  @ApiCreatedResponse({
    type: BusinessLineDto,
  })
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
  @ApiCreatedResponse({
    type: BusinessLineDto,
  })
  async deleteBusinessLine(@Query('businesslineid') businesslineid: number) {
    return this.businessLineService.deleteBusinessline(businesslineid);
  }
}
