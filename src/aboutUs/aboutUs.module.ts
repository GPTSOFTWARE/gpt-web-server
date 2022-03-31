import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';
import { Personnel } from 'src/aboutUs/personnel/personnel.entity';
import { ProductModule } from 'src/product/product.module';
import { AboutUsController } from './aboutUs.controller';
import { AboutUs } from './aboutUs.entity';
import { AboutUsService } from './aboutUs.service';
import { Department } from './department/department.entity';
import { DepartmentService } from './department/department.service';

@Module({
  imports: [TypeOrmModule.forFeature([AboutUs, Personnel, Department]), ContactModule, ProductModule],
  controllers: [AboutUsController],
  providers: [AboutUsService, DepartmentService],
  exports: [AboutUsService],
})
export class AboutUsModule {}
