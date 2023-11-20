import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DuendeAuthenticationService } from './duende-authentication.service';
import {
  GetTokenBodyDTO,
  GetTokenByRefreshBodyDTO,
  GetTokenByRevokeTokenDTO,
  TokenDto,
} from './dto/token.dto';

@ApiTags('Token')
@Controller('duende-token')
export class DuendeTokenController {
  constructor(
    private readonly duendeAuthenticationService: DuendeAuthenticationService,
  ) {}

  @Post('/getToken')
  async getToken(@Body() body: GetTokenBodyDTO) {
    const res = await this.duendeAuthenticationService.getToken(body);

    const getToken: TokenDto = res.body;

    return getToken;
  }

  @Post('/refreshToken')
  async refreshToken(
    @Body() { refresh_token: refreshToken }: GetTokenByRefreshBodyDTO,
  ) {
    const resRefresh = await this.duendeAuthenticationService.refreshToken(
      refreshToken,
    );

    const getRefresh: TokenDto = resRefresh.body;

    return getRefresh;
  }

  @Post('/revokeToken')
  async revokeToken(@Body() { token: accessToken }: GetTokenByRevokeTokenDTO) {
    const resRevoke = await this.duendeAuthenticationService.revokeToken(
      accessToken,
    );

    const getRevoke: TokenDto = resRevoke.body;

    return getRevoke;
  }
}
