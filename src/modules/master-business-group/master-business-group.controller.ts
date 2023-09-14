import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  Delete,
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
    @Query('pageSize') pageSize: number,
  ): Promise<{ data: BusinessGroupDto[]; total: number }> {
    return this.businessGroupService.getAllBusinessGroup(page, pageSize);
  }

  @Get('/getBusinessGroupName')
  @ApiCreatedResponse({ type: BusinessGroupDto })
  async getBusinessGroupName(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('businessgroup') businessgroup: string,
  ): Promise<{ data: BusinessGroupDto[]; total: number }> {
    return this.businessGroupService.getBusinessGroupName(
      page,
      pageSize,
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
