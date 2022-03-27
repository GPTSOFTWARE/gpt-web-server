import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { ContactService } from 'src/contact/contact.service';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { PartnerService } from './partner/partner.service';

@Injectable()
export class CustomerService extends BaseService<Customer> {
  constructor(
    @InjectRepository(Customer) customerRepo: Repository<Customer>,
    private contactService: ContactService,
    private partnerService: PartnerService
  ) {
    super(customerRepo);
  }

  async get() {
    const [customers, contact, partners] = await Promise.all([
      this.repo.find(),
      this.contactService.get(),
      this.partnerService.getAll({select: ["logo"]})
    ]);
    return { customers, contact, partners };
  }
}
