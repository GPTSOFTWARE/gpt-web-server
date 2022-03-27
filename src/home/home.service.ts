import { Injectable } from '@nestjs/common';
import { AboutUsService } from 'src/aboutUs/aboutUs.service';
import { ContactService } from 'src/contact/contact.service';
import { CategoryService } from 'src/product/category/category.service';
import { ProductService } from 'src/product/product.service';
import { Home } from './home.model';

@Injectable()
export class HomeService {
  constructor(
    private contactService: ContactService,
    private aboutUsService: AboutUsService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  async get(): Promise<Home> {
    const [contact, aboutUs, categories, products] = await Promise.all([
      this.contactService.get(),
      this.aboutUsService.get({ select: ['goals', 'introduction'] }),
      this.categoryService.getAll(),
      this.productService.getAll({take: 3, relations: ["category"]})
    ]);
    return { contact, aboutUs, categories, products };
  }
}
