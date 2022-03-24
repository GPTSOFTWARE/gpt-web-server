import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/services/base.service";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Product } from "./product.entity";
import * as _ from "lodash";
import { ContactService } from "src/contact/contact.service";

@Injectable()
export class ProductService extends BaseService<Product> {
    constructor(
        @InjectRepository(Product) repo: Repository<Product>,
        private contactService: ContactService,
    ) {
        super(repo)
    }

    async getOne(id: string ,option?: FindOneOptions<Product>) {
        const [product, contact] = await Promise.all([
            this.findById(id, option),
            this.contactService.get()
        ]);
        _.forEach(product, (value, key) => {
            !!(key === "utility") && (product[key] = value.split("|"));
            !!(key === "feature") && (product[key] = value.split("|"));
        }) 

        return {product, contact}
    }

    async getAll(options?: FindManyOptions<Product>) {
        const products = await this.repo.find(options);

        _.forEach(products, (product) => {
            !!product.utility && (product.utility = product.utility.split("|"));
            !!product.feature && (product.feature = product.feature.split("|"));
        })
        return products;
    }
}