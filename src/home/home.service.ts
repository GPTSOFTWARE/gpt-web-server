import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutUsService } from 'src/aboutUs/aboutUs.service';
import { BaseService } from 'src/common/services/base.service';
import { ContactService } from 'src/contact/contact.service';
import { CategoryService } from 'src/product/category/category.service';
import { Repository } from 'typeorm';
import { Home } from './home.entity';
import { HomeSetInput, HomeType } from './home.model';
import * as _ from 'lodash';

@Injectable()
export class HomeService extends BaseService<Home>{
  constructor(
    @InjectRepository(Home) repo: Repository<Home>,
    private contactService: ContactService,
    private aboutUsService: AboutUsService,
    private categoryService: CategoryService,
  ) { super(repo) }

  async get(): Promise<HomeType> {
    const [home, contact, aboutUs, categories] = await Promise.all([
      this.findById("1"),
      this.contactService.get(),
      this.aboutUsService.get({ select: ['goals', 'introduction'] }),
      this.categoryService.getAll({ relations: ['products'] }),
    ]);

    return { home, contact, aboutUs, categories };
  }

  async update(input: HomeSetInput): Promise<Home> {
    const homeData = await this.findById("1");

    _.forEach(input, (value, key) => {
      value && (homeData[key] = value);
    });

    return this.repo.save(homeData);
  }
}
