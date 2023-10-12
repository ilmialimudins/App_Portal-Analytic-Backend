import { Controller, Get, UseGuards, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DuendeAuthenticationService } from './duende-authentication.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from './dto/userinfo.dto';
import { TokenDto } from './dto/token.dto';
import { PowerBIEmbedUrlDto } from './dto/powerbi-get-embedurl.dto';
import { PowerBIEmbedTokenDto } from './dto/powerbi-embed-token.dto';

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

  @Post('/powerBIEmbed')
  async powerBIEmbed(
    @Query('workspaceid') workspaceid: string,
    @Query('reportid') reportid: string,
  ) {
    const resLogin = await this.duendeAuthenticationService.powerBILogin();

    const resToken = resLogin.body.access_token;

    const resEmbedUrl =
      await this.duendeAuthenticationService.powerBIEmbedDetail(
        workspaceid,
        reportid,
        resToken,
      );

    const getEmbedUrl: PowerBIEmbedUrlDto = resEmbedUrl.body;

    const resDatasetid = resEmbedUrl.body.datasetId;

    const resEmbedToken =
      await this.duendeAuthenticationService.powerBIEmbedToken(
        resDatasetid,
        reportid,
        resToken,
      );

    const getEmbedToken: PowerBIEmbedTokenDto = resEmbedToken.body;

    const response = {
      embedUrl: getEmbedUrl,
      embedToken: getEmbedToken,
    };

    return response;
  }
}
