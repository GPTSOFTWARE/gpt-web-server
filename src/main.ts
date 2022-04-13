import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { staticFolder } from './common/utils/constant';
import { HttpExceptionFilter } from './common/exception/http.exception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(staticFolder, "views"));
  app.useStaticAssets(join(staticFolder, "public"));
  app.setViewEngine('ejs');

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
