import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { FindManyOptions, Repository } from 'typeorm';
import { PartnerSetInput } from '../customer.model';
import { Partner } from './partner.entity';
import * as _ from 'lodash';

@Injectable()
export class PartnerService extends BaseService<Partner> {
  constructor(@InjectRepository(Partner) repo: Repository<Partner>) {
    super(repo);
  }

  getAll(options?: FindManyOptions<Partner>) {
    return this.repo.find(options);
  }

  create(input: PartnerSetInput): Promise<Partner> {
    return this.repo.save(input);
  }

  async update(input: PartnerSetInput): Promise<Partner> {
    const partner = await this.findById(input.id);
    
    _.forEach(partner, (value, key) => {
      value && (partner[key] = value)
    })

    return this.repo.save(partner);
  }

  async detele(id: string): Promise<boolean> {
    return !!(await this.deleteOneById(id));
  }
}
