import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Product } from './product.entity';
import * as _ from 'lodash';
import { ContactService } from 'src/contact/contact.service';
import { CategoryService } from './category/category.service';
import { InputGetByCategory, InputSetCategory, InputSetProduct } from './product.model';
import { PartnerService } from 'src/customer/partner/partner.service';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product) repo: Repository<Product>,
    private contactService: ContactService,
    private categoryService: CategoryService,
    private partnerService: PartnerService
  ) {
    super(repo);
  }

  /**
   * Product
   */

  async getOne(id: string, option?: FindOneOptions<Product>) {
    const product = await this.findById(id, option);
    _.forEach(product, (value, key) => {
      !!(key === 'utility') && (product[key] = value.split('|'));
      !!(key === 'feature') && (product[key] = value.split('|'));
    });

    return product;
  }

  async getAll(options?: FindManyOptions<Product>) {
    const products = await this.repo.find(options);

    _.forEach(products, (product) => {
      !!product.utility && (product.utility = product.utility.split('|'));
      !!product.feature && (product.feature = product.feature.split('|'));
    });
    return products;
  }

  async getByCategory(input: InputGetByCategory) {
    if (input.productId) {
      const [category, product, contact, categories] = await Promise.all([
        this.categoryService.get(input.categoryId, { relations: ['products'] }),
        this.getOne(input.productId, { relations: ['category'] }),
        this.contactService.get(),
        this.categoryService.getAll(),
      ]);

      if (!_.some(category.products, ['id', product.id]))
        throw new NotFoundException('Not found product');

      return { category, product, contact, categories };
    }

    const [category, contact, categories] = await Promise.all([
      this.categoryService.get(input.categoryId, { relations: ['products'] }),
      this.contactService.get(),
      this.categoryService.getAll(),
    ]);

    return { category, contact, categories };
  }

  async create(input: InputSetProduct) {
    const [category, partner] = await Promise.all([
      this.categoryService.get(input.categoryID),    
      this.partnerService.get(input.partnerID)
    ])

    const product = this.repo.create({...input, category, partner});
    
    return this.repo.save(product)
  }

  async update(input: InputSetProduct) {
    const [product, category, partner] = await Promise.all([
      this.findById(input.id, {relations: ["category", "partner"]}),
      this.categoryService.get(input.categoryID),
      this.partnerService.get(input.partnerID)
    ])

    _.forEach(input, (value, key) => {
      if(key === "categoryID") product.category = category;
      else if(key === "partnerID") product.partner = partner;
      else value && (product[key] = value);
    })

    return this.repo.save(product);
  }

  async delete(id: string){
    return !!(await this.deleteOneById(id))
  }

  /**
   * Category
  */

  setCategory(input: InputSetCategory) {
    if(input.id) {
      return this.categoryService.update(input);
    }
    return this.categoryService.create(input);
  }

  deleteCategory(id: string) {
    return this.categoryService.delete(id);
  }
}
