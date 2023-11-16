import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DuendeAuthenticationService } from './duende-authentication.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserInfo } from 'src/decorators/use-info.decorator';
import { UserInfoDTO } from './dto/userinfo.dto';

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
}
