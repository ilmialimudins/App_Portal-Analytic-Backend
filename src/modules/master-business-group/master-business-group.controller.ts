import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { BusinessGroupService } from './master-business-group.service';
import { BusinessGroupDto } from './dto/master-business-group.dto';
import { AddBusinessGroupDto } from './dto/add-master-business-group.dto';
import { UpdateBusinessGroupDto } from './dto/update-master-business-group.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Business Group')
@Controller('businessgroup')
export class BusinessGroupController {
  constructor(private businessGroupService: BusinessGroupService) {}

  @Get('/')
  @ApiCreatedResponse({ type: BusinessGroupDto })
  async getBusinessGroup(
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('businessgroup') businessgroup: string,
  ): Promise<{
    data: BusinessGroupDto[];
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> {
    return this.businessGroupService.getAllBusinessGroup(
      page,
      take,
      businessgroup,
    );
  }

  @Get('/getBusinessGroupId')
  @ApiCreatedResponse({ type: BusinessGroupDto })
  async getBusinessGroupId(
    @Query('businessgroupid') businessgroupid: number,
  ): Promise<BusinessGroupDto | undefined> {
    return this.businessGroupService.getBusinessGroupId(businessgroupid);
  }

  @Get('/checkDuplicateBusinessgroup')
  @ApiCreatedResponse({ type: BusinessGroupDto })
  async checkDuplicateBusinessgroup(
    @Query('businessgroup') businessgroup: string,
  ) {
    const result = await this.businessGroupService.checkDuplicateBusinessgroup(
      businessgroup,
    );

    if (result) {
      throw new BadRequestException('Duplicate Entry');
    } else {
      return businessgroup;
    }
  }

  @Get('/getLastBusinessGroupCode')
  @ApiCreatedResponse({ type: BusinessGroupDto })
  async getLastBusinessGroupCode() {
    return this.businessGroupService.getLastBusinessGroupCode();
  }

  @Post('/createBusinessGroup')
  @ApiCreatedResponse({ type: BusinessGroupDto })
  async createBusinessGroup(@Body() businessgroup: AddBusinessGroupDto) {
    return this.businessGroupService.createBusinessGroup(businessgroup);
  }

  @Patch('/updateBusinessGroup')
  @ApiCreatedResponse({ type: BusinessGroupDto })
  async updateBusinessGroup(
    @Query('businessgroupid') businessgroupid: number,
    @Body() businessgroup: UpdateBusinessGroupDto,
  ) {
    return this.businessGroupService.updateBusinessGroup(
      businessgroupid,
      businessgroup,
    );
  }

  @Delete('/deleteBusinessGroup')
  @ApiCreatedResponse({ type: BusinessGroupDto })
  async deleteBusinessGroup(@Query('businessgroupid') businessgroupid: number) {
    return this.businessGroupService.deleteBusinessGroup(businessgroupid);
  }
}
