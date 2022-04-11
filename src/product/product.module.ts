import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from 'src/contact/contact.module';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ContactModule,
    ProjectModule
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
