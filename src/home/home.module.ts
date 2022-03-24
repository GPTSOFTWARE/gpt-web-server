import { Module } from '@nestjs/common';
import { AboutUsModule } from 'src/aboutUs/aboutUs.module';
import { CategoryModule } from 'src/product/category/category.module';
import { ContactModule } from 'src/contact/contact.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [ContactModule, AboutUsModule, CategoryModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
