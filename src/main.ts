import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/http.exception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'client/views'));
  app.useStaticAssets(join(__dirname, '..', 'client/public'));
  app.setViewEngine('ejs');

  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(3000);
}
bootstrap();
