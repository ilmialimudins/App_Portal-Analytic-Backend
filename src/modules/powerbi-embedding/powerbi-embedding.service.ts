import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as superagent from 'superagent';
import { ApiConfigService } from 'src/shared/services/api-config.services';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';
import { PowerBIEmbedUrlDto } from '../duende-authentication/dto/powerbi-get-embedurl.dto';
import { PowerBIEmbedTokenDto } from '../duende-authentication/dto/powerbi-embed-token.dto';

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

  public async getPowerBIMetadata(
    workspaceid: string,
    reportid: string,
    userInfo: UserInfoDTO,
  ) {
    try {
      const resLogin = await this.powerBILogin();

      const resToken = resLogin.body.access_token;

      const resEmbedUrl = await this.powerBIEmbedDetail(
        workspaceid,
        reportid,
        resToken,
      );

      const getEmbedUrl: PowerBIEmbedUrlDto = resEmbedUrl.body;

      const resDatasetid = resEmbedUrl.body.datasetId;

      const resEmbedToken = await this.powerBIEmbedToken(
        resDatasetid,
        reportid,
        resToken,
        userInfo,
      );

      const getEmbedToken: PowerBIEmbedTokenDto = resEmbedToken.body;

      const response = {
        embedUrl: getEmbedUrl,
        embedToken: getEmbedToken,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }
}
