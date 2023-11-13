import { Controller, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DuendeAuthenticationService } from './duende-authentication.service';
import { TokenDto } from './dto/token.dto';

@ApiTags('Token')
@Controller('duende-token')
export class DuendeTokenController {
  constructor(
    private readonly duendeAuthenticationService: DuendeAuthenticationService,
  ) {}

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
}