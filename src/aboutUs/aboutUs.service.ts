import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { FindOneOptions, Repository } from 'typeorm';
import { AboutUs } from './aboutUs.entity';
import * as _ from 'lodash';

@Injectable()
export class AboutUsService extends BaseService<AboutUs> {
  constructor(@InjectRepository(AboutUs) aboutUsRepo: Repository<AboutUs>) {
    super(aboutUsRepo);
  }

  async get(options?: FindOneOptions<AboutUs>): Promise<AboutUs> {
    const aboutUs = await this.findById('1', options);
    _.forEach(aboutUs, (value, key) => {
      key === 'goals' && (aboutUs[key] = value.split('|'));
      key === 'values' && (aboutUs[key] = value.replace(/\|/g, ', '));
    });

    return aboutUs;
  }
}
