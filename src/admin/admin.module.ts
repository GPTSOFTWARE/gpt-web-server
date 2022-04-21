import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUsModule } from 'src/aboutUs/aboutUs.module';
import { CommonModule } from 'src/common/common.module';
import { HomeModule } from 'src/home/home.module';
import { AdminController } from './admin.controller';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    forwardRef(() => CommonModule),
    HomeModule,
    AboutUsModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}
