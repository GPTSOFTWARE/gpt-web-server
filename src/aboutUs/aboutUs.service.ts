import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { FindOneOptions, Repository } from 'typeorm';
import { AboutUs } from './aboutUs.entity';
import * as _ from 'lodash';
import { ContactService } from 'src/contact/contact.service';
import { ProductService } from 'src/product/product.service';
import { InputSetAboutUs } from './aboutUs.model';

@Injectable()
export class AboutUsService extends BaseService<AboutUs> {
  constructor(
    @InjectRepository(AboutUs) aboutUsRepo: Repository<AboutUs>,
    private contactService: ContactService,
    private categoryService: ProductService
  ) {
    super(aboutUsRepo);
  }

  getOne() {
    return this.findById("1");  
  }

  async get(options?: FindOneOptions<AboutUs>) {
    const [aboutUs, contact, products] = await Promise.all([
      this.findById('1', options),
      this.contactService.get(),
      this.categoryService.getAll(),
    ]);
    _.forEach(aboutUs, (value, key) => {
      key === 'goals' && (aboutUs[key] = value.split('|'));
      key === 'values' && (aboutUs[key] = value.replace(/\|/g, ', '));
    });

    return { aboutUs, contact, products };
  }

  async update(input: InputSetAboutUs) {
    const aboutUs = await this.findById("1");

    let logo: string;
    if(input.logo) {
      logo = this.uploadFile(input.logo, aboutUs.logo, "aboutUs")
    }

    _.forEach(input, (value, key) => {
      if(value && (key === "goals" || key === "values")) {
        aboutUs[key] = value.join("|")
      }else if(key = "logo") aboutUs.logo = logo;
      else if(key !== "id") aboutUs[key] = value;
    })

    return this.repo.save(aboutUs);
  }
}
