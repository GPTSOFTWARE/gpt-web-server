import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactModule } from "src/contact/contact.module";
import { CategoryModule } from "./category/category.module";
import { ProductController } from "./product.controller";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product]), CategoryModule, ContactModule],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}