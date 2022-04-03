import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUsModule } from 'src/aboutUs/aboutUs.module';
import { ContactModule } from 'src/contact/contact.module';
import { ProductModule } from 'src/product/product.module';
import { HomeController } from './home.controller';
import { Home } from './home.entity';
import { HomeService } from './home.service';

@Module({
  imports: [ContactModule, AboutUsModule, ProductModule, TypeOrmModule.forFeature([Home])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
