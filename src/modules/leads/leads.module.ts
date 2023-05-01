import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { ResponseTransformInterceptor } from 'src/interceptors/response-transform.interceptor';

@Module({
  controllers: [LeadsController],
  providers: [
    LeadsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
  ],
})
export class LeadsModule {}
