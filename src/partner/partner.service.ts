import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Partner } from './partner.entity';
import * as _ from 'lodash';
import { InputSetPartner } from '../customer/customer.model';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class PartnerService extends BaseService<Partner> {
  constructor(
    @InjectRepository(Partner) repo: Repository<Partner>,
    private customerService: CustomerService
  ) {
    super(repo);
  }

  getAll(options?: FindManyOptions<Partner>) {
    return this.repo.find(options);
  }

  get(id: string, options?: FindOneOptions<Partner>){
    return this.repo.findOne(id, options);
  }

  async create(input: InputSetPartner): Promise<Partner> {
    
    const customer = await this.customerService.get(input.customerID);

    const partner = this.repo.create({
      ...input,
      customer: customer
    })

    return this.repo.save(partner);
  }

  async update(input: InputSetPartner): Promise<Partner> {
    const [partner, customer] = await Promise.all([
      this.findById(input.id),
      this.customerService.get(input.customerID)
    ]);
    
    _.forEach(input, (value, key) => {
      if(key === "customerID" && value) partner.customer = customer;
      else if(key !== "id") value && (partner[key] = value)
    })

    return this.repo.save(partner);
  }

  async delete(id: string): Promise<boolean> {
    return !!(await this.deleteOneById(id));
  }
}
