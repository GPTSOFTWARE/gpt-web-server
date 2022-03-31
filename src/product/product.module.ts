import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';
import { Category } from './category/category.entity';
import { CategoryService } from './category/category.service';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), ContactModule],
  providers: [ProductService, CategoryService],
  controllers: [ProductController],
  exports: [ProductService, CategoryService],
})
export class ProductModule {}
