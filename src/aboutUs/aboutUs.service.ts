import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { FindOneOptions, Repository } from 'typeorm';
import { AboutUs } from './aboutUs.entity';
import * as _ from 'lodash';
import { ContactService } from 'src/contact/contact.service';
import { CategoryService } from 'src/product/category/category.service';

@Injectable()
export class AboutUsService extends BaseService<AboutUs> {
  constructor(
    @InjectRepository(AboutUs) aboutUsRepo: Repository<AboutUs>,
    private contactService: ContactService,
    private categoryService: CategoryService
  ) {
    super(aboutUsRepo);
  }

  async get(options?: FindOneOptions<AboutUs>): Promise<any> {
    const [aboutUs, contact, categories] = await Promise.all([
      this.findById('1', options),
      this.contactService.get(),
      this.categoryService.getAll()
    ]);
    _.forEach(aboutUs, (value, key) => {
      key === 'goals' && (aboutUs[key] = value.split('|'));
      key === 'values' && (aboutUs[key] = value.replace(/\|/g, ', '));
    });

    return { aboutUs, contact, categories };
  }
}
