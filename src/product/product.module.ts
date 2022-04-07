import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';
import { CustomerModule } from 'src/customer/ customer.module';
import { Project } from './project/project.entity';
import { ProjectService } from './project/project.service';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Project]), ContactModule, CustomerModule],
  providers: [ProductService, ProjectService],
  controllers: [ProductController],
  exports: [ProductService, ProjectService],
})
export class ProductModule {}
