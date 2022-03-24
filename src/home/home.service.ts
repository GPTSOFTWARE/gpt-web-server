import { Injectable } from '@nestjs/common';
import { AboutUsService } from 'src/aboutUs/aboutUs.service';
import { CategoryService } from 'src/product/category/category.service';
import { ContactService } from 'src/contact/contact.service';
import { Home } from './home.model';

@Injectable()
export class HomeService {
  constructor(
    private contactService: ContactService,
    private aboutUsService: AboutUsService,
    private categorySerivce: CategoryService,
  ) {}

  async get(): Promise<Home> {
    const [contact, aboutUs, categories] = await Promise.all([
      this.contactService.get(),
      this.aboutUsService.get({ select: ['goals', 'introduction'] }),
      this.categorySerivce.getAll(),
    ]);
    return { contact, aboutUs, categories };
  }
}
