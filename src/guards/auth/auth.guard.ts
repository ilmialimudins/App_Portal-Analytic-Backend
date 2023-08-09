import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DuendeAuthenticationService } from 'src/modules/duende-authentication/duende-authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(DuendeAuthenticationService)
    private apiService: DuendeAuthenticationService,
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

    request.userinfo = res.body;

    return true;
  }
}
