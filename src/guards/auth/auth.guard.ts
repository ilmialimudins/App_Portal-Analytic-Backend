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
