import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InputGetRequest, InputSetProduct } from './product.model';
import { Product } from './product.entity';
import * as _ from 'lodash';
import { ContactService } from 'src/contact/contact.service';
import { ProjectService } from './project/project.service';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product) repo: Repository<Product>,
    private contactService: ContactService,
    private projectService: ProjectService
  ) {
    super(repo);
  }

  async getRequest(input?: InputGetRequest) {
    const [products, contact] = await Promise.all([
      this.getAll({relations: ["projects"]}),
      this.contactService.get()
    ])

    let index: number = 0
    if(input && input.productID) {
      let product: Product;
      _.forEach(products, (value, i) => {
        if(value.id.toString() === input.productID){
          index = i;
          product = value;
          return;
        }
      });

      if(input.projectID) {
        const check = _.some(product.projects, ["id", parseInt(input.projectID)])
        
        if(check) {
          const project = await this.projectService.getOne(input.projectID, {relations: ["product"]})
          
          return { project, products, contact, index }
        }else throw new BadRequestException("this")
      }
    }

    return {products, contact, index}
  }

  getFrist(options?: FindOneOptions<Product>) {
    return this.repo.findOne(options);
  }

  getAll(options?: FindManyOptions<Product>) {
    return this.repo.find(options);
  }

  create(input: InputSetProduct){
    return this.repo.save(input);
  }

  async update(input: InputSetProduct) {
    const product = await this.findById(input.id);

    _.forEach(input, (value, key) => {
      if(key !== "id") value && (product[key] = value);
    })

    return this.repo.save(product);
  }

  async delete(id: string) {
    return !!(await this.deleteOneById(id));
  }
}
