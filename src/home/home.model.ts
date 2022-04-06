import { AboutUs } from 'src/aboutUs/aboutUs.entity';
import { Category } from 'src/product/category/category.entity';
import { Contact } from 'src/contact/contact.entity';
import { Home } from './home.entity';

export type HomeType = {
  home: Home;
  contact: Contact;
  aboutUs: AboutUs;
  categories: Category[];
};

export type InputSetHome = {
  introduction: string;
  slogan: string;
}