import { Injectable } from '@nestjs/common';
import { AboutUsService } from 'src/aboutUs/aboutUs.service';
import { ContactService } from 'src/contact/contact.service';
import { Home } from './home.model';

@Injectable()
export class HomeService {
  constructor(
    private contactService: ContactService,
    private aboutUsService: AboutUsService,
  ) {}

  async get(): Promise<Home> {
    const [contact, aboutUs] = await Promise.all([
      this.contactService.get(),
      this.aboutUsService.get({ select: ['goals', 'introduction'] }),
    ]);
    return { contact, aboutUs };
  }
}
