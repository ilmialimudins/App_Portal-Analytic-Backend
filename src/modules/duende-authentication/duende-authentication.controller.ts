import { Controller, Get, UseGuards, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DuendeAuthenticationService } from './duende-authentication.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from './dto/userinfo.dto';
import { TokenDto } from './dto/token.dto';
import { PowerBIGetDetailDto } from './dto/powerbi-get-detail.dto';

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('duende-authentication')
@UseGuards(AuthGuard)
export class DuendeAuthenticationController {
  constructor(
    private readonly duendeAuthenticationService: DuendeAuthenticationService,
  ) {}

  @Get('/user-info')
  async getUserInfo(@UserInfo() user: UserInfoDTO): Promise<UserInfoDTO> {
    return user;
  }

  @Post('/getToken')
  async getToken(@Query('authcode') authcode: string) {
    const res = await this.duendeAuthenticationService.getToken(authcode);

    const getToken: TokenDto = res.body;

    return getToken;
  }

  @Post('/refreshToken')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
    const resRefresh = await this.duendeAuthenticationService.refreshToken(
      refreshToken,
    );

    const getRefresh: TokenDto = resRefresh.body;

    return getRefresh;
  }

  @Post('/revokeToken')
  async revokeToken(@Query('access_token') access_token: string) {
    return this.duendeAuthenticationService.revokeToken(access_token);
  }

  @Post('/powerBILogin')
  async powerBILogin(
    @Query('tenantid') tenantid: string,
    @Query('workspaceid') workspaceid: string,
  ) {
    const resLogin = await this.duendeAuthenticationService.powerBILogin(
      tenantid,
    );

    const resToken = resLogin.body.access_token;

    const resEmbedDetail =
      await this.duendeAuthenticationService.powerBIEmbedDetail(
        workspaceid,
        resToken,
      );

    const getEmbedDetail: PowerBIGetDetailDto = resEmbedDetail.body;

    return getEmbedDetail;
  }
}
