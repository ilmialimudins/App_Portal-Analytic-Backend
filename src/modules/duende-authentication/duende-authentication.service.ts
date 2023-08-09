import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiConfigService } from 'src/shared/services/api-config.services';
import * as superagent from 'superagent';

@Injectable()
export class DuendeAuthenticationService {
  constructor(
    @Inject(ApiConfigService) private configuration: ApiConfigService,
  ) {}

  async getUserInfo(bearer: string): Promise<superagent.Response> {
    try {
      const res = await superagent
        .get(this.configuration.duendeAuthority + '/connect/userinfo')
        .set('Authorization', `Bearer ${bearer}`);

      return res;
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException('You are not authorized');
      }
      throw error;
    }
  }
}
