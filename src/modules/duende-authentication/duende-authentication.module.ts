import { Global, Module } from '@nestjs/common';
import { DuendeAuthenticationService } from './duende-authentication.service';
import { DuendeAuthenticationController } from './duende-authentication.controller';
import { DuendeTokenController } from './duende-token.controller';

@Global()
@Module({
  controllers: [DuendeTokenController, DuendeAuthenticationController],
  providers: [DuendeAuthenticationService],
  exports: [DuendeAuthenticationService],
})
export class DuendeAuthenticationModule {}
