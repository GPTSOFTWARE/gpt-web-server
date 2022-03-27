import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/services/base.service";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Product } from "./product.entity";
import * as _ from "lodash";
import { ContactService } from "src/contact/contact.service";
import { CategoryService } from "./category/category.service";

@Injectable()
export class ProductService extends BaseService<Product> {
    constructor(
        @InjectRepository(Product) repo: Repository<Product>,
        private contactService: ContactService,
        private categoryService: CategoryService
    ) {
        super(repo)
    }

    async getOne(id: string ,option?: FindOneOptions<Product>) {
        const product = await this.findById(id, option);
        _.forEach(product, (value, key) => {
            !!(key === "utility") && (product[key] = value.split("|"));
            !!(key === "feature") && (product[key] = value.split("|"));
        }) 

        return product
    }

    async getAll(options?: FindManyOptions<Product>) {
        const products = await this.repo.find(options);

        _.forEach(products, (product) => {
            !!product.utility && (product.utility = product.utility.split("|"));
            !!product.feature && (product.feature = product.feature.split("|"));
        })
        return products;
    }

    async getByCategory(input: InputGetByCategory) {

        if(input.productId) {
            const [category, product, contact, categories] = await Promise.all([
                this.categoryService.get(input.categoryId, {relations: ["products"]}),
                this.getOne(input.productId, {relations: ["category"]}),
                this.contactService.get(),
                this.categoryService.getAll()
            ])

            if(!_.some(category.products, ["id", product.id])) throw new NotFoundException("Not found product");

            return {category, product, contact, categories}
        }

        const [category, contact, categories] = await Promise.all([
            this.categoryService.get(input.categoryId, {relations: ["products"]}),
            this.contactService.get(),
            this.categoryService.getAll()
        ])
        
        return {category, contact, categories}
    }
}