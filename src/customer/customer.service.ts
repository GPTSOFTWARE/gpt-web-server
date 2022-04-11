import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { ContactService } from 'src/contact/contact.service';
import { FindOneOptions, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { InputSetCustomer } from './customer.model';
import { PartnerService } from '../partner/partner.service';
import * as _ from 'lodash';

@Injectable()
export class CustomerService extends BaseService<Customer> {
  constructor(
    @InjectRepository(Customer) repo: Repository<Customer>,
    private contactService: ContactService,
    @Inject(forwardRef(() => PartnerService))
    private partnerService: PartnerService,
  ) {
    super(repo);
  }

  async getAll() {
    const [customers, contact, partners] = await Promise.all([
      this.repo.find(),
      this.contactService.get(),
      this.partnerService.getAll({ select: ['logo'] }),
    ]);
    return { customers, contact, partners };
  }

  get(id: string, options?: FindOneOptions<Customer>) {
    return this.findById(id, options);
  }

  create(input: InputSetCustomer) {

    const customer = this.repo.create(input);

    return this.repo.save(customer);  
  }

  async update(input: InputSetCustomer) {
    const customer = await this.findById(input.id);

    _.forOwn(input, (value, key) => {
        if(key !== "id") value && ( customer[key] = value );
    })

    return this.repo.save(customer);
  }

  async delete(id: string) {
    return !!(await this.deleteOneById(id));
  }
}
