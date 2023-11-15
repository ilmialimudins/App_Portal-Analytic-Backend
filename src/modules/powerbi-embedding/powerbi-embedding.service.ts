import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as superagent from 'superagent';
import { ApiConfigService } from 'src/shared/services/api-config.services';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';

@Injectable()
export class PowerbiEmbeddingService {
  constructor(
    @Inject(ApiConfigService) private configuration: ApiConfigService,
  ) {}
  private async powerBILogin(): Promise<superagent.Response> {
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

  private async powerBIEmbedDetail(
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

  private async powerBIEmbedToken(
    datasetid: string,
    reportid: string,
    accessTokenPowerBI: string,
    userInfo: UserInfoDTO,
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
              username: userInfo.email,
              roles: [
                userInfo.roles.includes('Admin CIR') ? 'Admin CIR' : 'Company',
              ],
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
