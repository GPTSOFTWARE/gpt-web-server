import { AboutUs } from 'src/aboutUs/aboutUs.entity';
import { Category } from 'src/product/category/category.entity';
import { Contact } from 'src/contact/contact.entity';

export type Home = {
  contact: Contact;
  aboutUs: AboutUs;
  categories: Category[];
};
