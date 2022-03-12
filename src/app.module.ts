/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeModule } from './home/home.module';
@Module({
  imports: [HomeModule, TypeOrmModule.forRoot()],
})
export class AppModule {}
