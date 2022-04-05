import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { ContactService } from 'src/contact/contact.service';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerSetInput } from './customer.model';
import { PartnerService } from './partner/partner.service';
import * as _ from 'lodash';

@Injectable()
export class CustomerService extends BaseService<Customer> {
  constructor(
    @InjectRepository(Customer) customerRepo: Repository<Customer>,
    private contactService: ContactService,
    private partnerService: PartnerService,
  ) {
    super(customerRepo);
  }

  async get() {
    const [customers, contact, partners] = await Promise.all([
      this.repo.find(),
      this.contactService.get(),
      this.partnerService.getAll({ select: ['logo'] }),
    ]);
    return { customers, contact, partners };
  }

  create(input: CustomerSetInput) {
    return this.repo.save(input);  
  }

  async update(input: CustomerSetInput) {
    const customer = await this.findById(input.id);

    _.forEach(customer, (value, key) => {
        value && ( customer[key] = value )
    })

    return this.repo.save(customer);
  }

  async delete(id: string) {
    return !!(await this.deleteOneById(id));
  }
}
