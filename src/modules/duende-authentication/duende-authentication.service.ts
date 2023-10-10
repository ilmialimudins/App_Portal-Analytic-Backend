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

  async getToken(authCode: string): Promise<superagent.Response> {
    try {
      const res = await superagent
        .post(this.configuration.duendeAuthority + '/connect/token')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          client_id: this.configuration.duendeClientId,
          grant_type: 'authorization_code',
          code: authCode,
          redirect_uri: this.configuration.duendeRedirectUrl,
          code_verifier: this.configuration.duendeCodeVerifier,
          client_secret: this.configuration.duendeClientSecret,
        });

      return res;
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException('You are not authorized');
      }
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<superagent.Response> {
    try {
      const res = await superagent
        .post(this.configuration.duendeAuthority + '/connect/token')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          client_id: this.configuration.duendeClientId,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_secret: this.configuration.duendeClientSecret,
        });

      return res;
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException('You are not authorized');
      }
      throw error;
    }
  }

  async revokeToken(accessToken: string): Promise<superagent.Response> {
    try {
      const res = await superagent
        .post(this.configuration.duendeAuthority + '/connect/revocation')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          token: accessToken,
          token_type_hint: 'access_token',
          client_id: this.configuration.duendeClientId,
          client_secret: this.configuration.duendeClientSecret,
        });

      return res;
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException('You are not authorize');
      }
      throw error;
    }
  }

  async powerBILogin(): Promise<superagent.Response> {
    try {
      const res = await superagent
        .post(
          `https://login.windows.net/${this.configuration.powerBITenantId}/oauth2/token`,
        )
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          grant_type: 'client_credentials',
          resource: 'https://analysis.windows.net/powerbi/api',
          client_id: this.configuration.powerBIClientId,
          client_secret: this.configuration.powerBIClientSecret,
        });

      return res;
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException('You are not authorize');
      }
      throw error;
    }
  }

  async powerBIEmbedDetail(
    workspaceid: string,
    reportid: string,
    accessTokenPowerBI: string,
  ): Promise<superagent.Response> {
    try {
      const res = await superagent
        .get(
          `https://api.powerbi.com/v1.0/myorg/groups/${workspaceid}/reports/${reportid}`,
        )
        .set('Authorization', `Bearer ${accessTokenPowerBI}`);

      return res;
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException('You are not authorized');
      }
      throw error;
    }
  }

  async powerBIEmbedToken(
    datasetid: string,
    reportid: string,
    accessTokenPowerBI: string,
  ): Promise<superagent.Response> {
    try {
      const res = await superagent
        .post('https://api.powerbi.com/v1.0/myorg/GenerateToken')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${accessTokenPowerBI}`)
        .send({
          datasets: [
            {
              id: datasetid,
            },
          ],
          reports: [
            {
              accessLevel: 'View',
              allowEdit: 'false',
              id: reportid,
            },
          ],
          identities: [
            {
              username: 'haifa.amirasari@ai.astra.co.id',
              roles: ['AIHO-CIR'],
              datasets: [datasetid],
            },
          ],
        });

      return res;
    } catch (error) {
      if (error.status === 401) {
        throw new UnauthorizedException('You are not authorize');
      }
      throw error;
    }
  }
}
