import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BusinessLineService } from './master-business-line.service';
import { BusinessLineDto } from './dto/master-business-line.dto';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { AddBusinessLineDto } from './dto/add-master-business-line.dto';
import { UpdateBusinessLineDto } from './dto/update-master-business-line.dto';

@ApiTags('Business Line')
@Controller('business-line')
export class BusinessLineController {
  constructor(private businessLineService: BusinessLineService) {}

  @Get('/')
  @ApiCreatedResponse({
    type: BusinessLineDto,
  })
  async getBusinessLine(
    @Query() pageOptions: PageOptionsDTO,
  ): Promise<PageDto<BusinessLineDto>> {
    return this.businessLineService.getAllBusinessLine(pageOptions);
  }

  @Get('/getOne')
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
