import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { FindOneOptions, Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService extends BaseService<Contact> {
  constructor(@InjectRepository(Contact) contactRepo: Repository<Contact>) {
    super(contactRepo);
  }

  get(options?: FindOneOptions<Contact>): Promise<Contact> {
    return this.findById('1', options);
  }
}
