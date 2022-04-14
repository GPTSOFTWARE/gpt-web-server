/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUsModule } from './aboutUs/aboutUs.module';
import { ContactModule } from './contact/contact.module';
import { CustomerModule } from './customer/ customer.module';
import { DepartmentModule } from './department/department.module';
import { HomeModule } from './home/home.module';
import { PartnerModule } from './partner/partner.module';
import { PersonnelModule } from './personnel/personnel.module';
import { ProductModule } from './product/product.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    HomeModule,
    ContactModule,
    AboutUsModule,
    CustomerModule,
    ProductModule,
    DepartmentModule,
    PersonnelModule,
    ProjectModule,
    PartnerModule,
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule {}
