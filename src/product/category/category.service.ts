import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InputSetCategory } from '../product.model';
import { Category } from './category.entity';
import * as _ from 'lodash';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(@InjectRepository(Category) repo: Repository<Category>) {
    super(repo);
  }

  get(id: string, options?: FindOneOptions<Category>) {
    return this.findById(id, options);
  }

  getAll(options?: FindManyOptions<Category>) {
    return this.repo.find(options);
  }

  create(input: InputSetCategory){
    return this.repo.save(input);
  }

  async update(input: InputSetCategory) {
    const category = await this.findById(input.id);

    _.forEach(input, (value, key) => {
      if(key !== "id") value && (category[key] = value);
    })

    return this.repo.save(category);
  }

  async delete(id: string) {
    return !!(await this.deleteOneById(id));
  }
}
