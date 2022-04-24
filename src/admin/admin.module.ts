import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUsModule } from 'src/aboutUs/aboutUs.module';
import { CommonModule } from 'src/common/common.module';
import { storage } from 'src/common/utils/multer.config';
import { CustomerModule } from 'src/customer/ customer.module';
import { DepartmentModule } from 'src/department/department.module';
import { HomeModule } from 'src/home/home.module';
import { PartnerModule } from 'src/partner/partner.module';
import { ProductModule } from 'src/product/product.module';
import { ProjectModule } from 'src/project/project.module';
import { AdminController } from './admin.controller';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    forwardRef(() => CommonModule),
    HomeModule,
    AboutUsModule,
    ProductModule,
    ProjectModule,
    CustomerModule,
    PartnerModule,
    DepartmentModule,
    MulterModule.register({ storage }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
