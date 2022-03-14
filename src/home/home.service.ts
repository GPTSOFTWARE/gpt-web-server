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
      this.contactService.get({
        select: ['facebook', 'instagram', 'linkedin'],
      }),
      this.aboutUsService.get({ select: ['introduction', 'logo', 'values'] }),
    ]);
    return { contact, aboutUs };
  }
}
