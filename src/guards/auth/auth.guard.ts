import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DuendeAuthenticationService } from 'src/modules/duende-authentication/duende-authentication.service';
import { MasterUserService } from 'src/modules/master-user/master-user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(DuendeAuthenticationService)
    private apiService: DuendeAuthenticationService,

    @Inject(MasterUserService)
    private userService: MasterUserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const headerAuth = request.headers['authorization'];

    if (!headerAuth) {
      throw new UnauthorizedException('You are not authorized');
    }

    const res = await this.apiService.getUserInfo(headerAuth.split(' ')[1]);
    // const res = {
    //   body: {
    //     sub: '4AC3FAE19D723BDA999A7361E49C8229DEF7D1A0DA677C3B588DA68A9205F3D8',
    //     auth_time: 1700742825,
    //     idp: 'aad',
    //     amr: 'external',
    //     name: 'Muhammad Furqan Soedono',
    //     email: 'Muhammad.Furqan@ai.astra.co.id',
    //     email_address: 'Muhammad.Furqan@ai.astra.co.id',
    //     family_name: 'Furqan Soedono',
    //     given_name: 'Muhammad',
    //   },
    //   statusCode: 200,
    // };

    if (res.statusCode === 401) {
      throw new UnauthorizedException('You are not authorized');
    }

    const userInfoEmail = res.body.email;

    const emailUser = await this.userService.getMasterUserEmail(userInfoEmail);

    request.userinfo = emailUser;

    if (emailUser && emailUser.isdelete == 'true') {
      throw new UnauthorizedException('You are not authorized');
    }
    if (!emailUser) {
      throw new UnauthorizedException('You are not authorized');
    }

    return true;
  }
}
