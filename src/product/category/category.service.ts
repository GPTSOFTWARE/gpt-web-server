import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { ContactService } from 'src/contact/contact.service';
import {
  FilterQuery,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category) repo: Repository<Category>,
    private contactService: ContactService
  ) {
    super(repo);
  }

  async getOne(id: string, option?: FindOneOptions<Category>) {

    const [categories, category, contact] = await Promise.all([
      this.getAll(),
      this.findById(id, option),
      this.contactService.get()
    ])

    return {categories, category, contact, index: parseInt(category.id)}
  }

  async getAll() {

    return await this.repo.find();
  }
}