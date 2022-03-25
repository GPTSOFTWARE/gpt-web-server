/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUsModule } from './aboutUs/aboutUs.module';
import { ContactModule } from './contact/contact.module';
import { CustomerModule } from './customer/ customer.module';
import { HomeModule } from './home/home.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [
    HomeModule,
    ContactModule,
    AboutUsModule,
    CustomerModule,
    ProductModule,
    TypeOrmModule.forRoot(),
  ],
})
export class AppModule {}
