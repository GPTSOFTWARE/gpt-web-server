import { Controller, Get, Render } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get()
  @Render('contact/index')
  async get() {
    return await this.contactService.get();
  }
}
