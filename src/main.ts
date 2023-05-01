import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RequestTransformPipe } from './pipes/request-transform.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new RequestTransformPipe(),
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  await app.listen(
    `${process.env.PORT ? parseInt(process.env.PORT) : 3000}`,
    '0.0.0.0',
  );
  console.info(`server running on ${await app.getUrl()}`);
}
bootstrap();
