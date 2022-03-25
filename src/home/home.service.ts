import { Injectable } from '@nestjs/common';
import { AboutUsService } from 'src/aboutUs/aboutUs.service';
import { ContactService } from 'src/contact/contact.service';
import { CategoryService } from 'src/product/category/category.service';
import { Home } from './home.model';

@Injectable()
export class HomeService {
  constructor(
    private contactService: ContactService,
    private aboutUsService: AboutUsService,
    private categoryService: CategoryService
  ) {}

  async get(): Promise<Home> {
    const [contact, aboutUs, categories] = await Promise.all([
      this.contactService.get(),
      this.aboutUsService.get({ select: ['goals', 'introduction'] }),
      this.categoryService.getAll()
    ]);
    return { contact, aboutUs, categories };
  }
}
