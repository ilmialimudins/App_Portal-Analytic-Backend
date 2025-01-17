import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { MasterWorkSpaceService } from './master-work-space.service';
import { MasterWorkSpaceDto } from './dto/master-work-space.dto';
import { AddMasterWorkSpaceDto } from './dto/add-master-work-space.dto';
import { UpdateMasterWorkSpaceDto } from './dto/update-master-work-space.dto';
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Master Work Space')
@Controller('masterworkspace')
export class MasterWorkSpaceController {
  constructor(private masterWorkSpaceService: MasterWorkSpaceService) {}

  @Get('/')
  @ApiCreatedResponse({ type: MasterWorkSpaceDto })
  async getMasterWorkSpace() {
    return this.masterWorkSpaceService.getAllMasterWorkSpace();
  }

  @Get('/getMasterWorkSpaceId')
  @ApiCreatedResponse({ type: MasterWorkSpaceDto })
  async getMasterWorkSpaceId(
    @Query('workspaceid') workspaceid: number,
  ): Promise<MasterWorkSpaceDto | undefined> {
    return this.masterWorkSpaceService.getMasterWorkspaceId(workspaceid);
  }

  @Get('/checkDuplicateWorkspacePowerBI')
  @ApiCreatedResponse({ type: MasterWorkSpaceDto })
  async checkDuplicateWorkspacePowerBI(@Query('workspace') workspace: string) {
    const result =
      await this.masterWorkSpaceService.checkDuplicateWorkspacePowerBI(
        workspace,
      );

    if (result) {
      return { isDuplicate: true };
    } else {
      return { isDuplicate: false };
    }
  }

  @Get('/getLastMasterWorkSpaceCode')
  @ApiCreatedResponse({ type: MasterWorkSpaceDto })
  async getLastMasterWorkSpaceCode() {
    return this.masterWorkSpaceService.getLastMasterWorkSpaceCode();
  }

  @Post('/createMasterWorkSpace')
  @ApiCreatedResponse({ type: MasterWorkSpaceDto })
  async createMasterWorkSpace(
    @Body() masterworkspace: AddMasterWorkSpaceDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.masterWorkSpaceService.createMasterWorkSpace(
      masterworkspace,
      userinfo,
    );
  }

  @Patch('/updateMasterWorkSpace')
  @ApiCreatedResponse({ type: MasterWorkSpaceDto })
  async updateMasterWorkSpace(
    @Query('workspaceid') workspaceid: number,
    @Body() masterworkspace: UpdateMasterWorkSpaceDto,
    @UserInfo() userinfo: UserInfoDTO,
  ) {
    return this.masterWorkSpaceService.updateMasterWorkSpace(
      workspaceid,
      masterworkspace,
      userinfo,
    );
  }

  @Delete('/deleteMasterWorkSpace')
  @ApiCreatedResponse({ type: MasterWorkSpaceDto })
  async deleteMasterWorkSpace(@Query('workspaceid') workspaceid: number) {
    return this.masterWorkSpaceService.deleteMasterWorkSpace(workspaceid);
  }
}
