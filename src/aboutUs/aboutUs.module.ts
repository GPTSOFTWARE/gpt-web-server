import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUsController } from './aboutUs.controller';
import { AboutUs } from './aboutUs.entity';
import { AboutUsService } from './aboutUs.service';

@Module({
  imports: [TypeOrmModule.forFeature([AboutUs])],
  controllers: [AboutUsController],
  providers: [AboutUsService],
  exports: [AboutUsService],
})
export class AboutUsModule {}
