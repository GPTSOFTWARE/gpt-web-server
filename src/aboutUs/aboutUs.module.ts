import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';
import { Personnel } from 'src/personnel/personnel.entity';
import { ProductModule } from 'src/product/product.module';
import { AboutUsController } from './aboutUs.controller';
import { AboutUs } from './aboutUs.entity';
import { AboutUsService } from './aboutUs.service';

@Module({
  imports: [TypeOrmModule.forFeature([AboutUs, Personnel]), ContactModule, ProductModule],
  controllers: [AboutUsController],
  providers: [AboutUsService],
  exports: [AboutUsService],
})
export class AboutUsModule {}
