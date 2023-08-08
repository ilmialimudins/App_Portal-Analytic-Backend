import { Global, Module } from '@nestjs/common';
import { DuendeAuthenticationService } from './duende-authentication.service';
import { DuendeAuthenticationController } from './duende-authentication.controller';

@Global()
@Module({
  controllers: [DuendeAuthenticationController],
  providers: [DuendeAuthenticationService],
  exports: [DuendeAuthenticationService],
})
export class DuendeAuthenticationModule {}
