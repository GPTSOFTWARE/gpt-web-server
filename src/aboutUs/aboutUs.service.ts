import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { FindOneOptions, Repository } from 'typeorm';
import { AboutUs } from './aboutUs.entity';
import * as _ from 'lodash';
import { createReadStream } from 'fs';
import { join } from 'path';

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

    if(aboutUs.introduction) {
      aboutUs.introduction = await this.readFile(join(__dirname, "../../client/public", aboutUs.introduction))
    }
    return aboutUs;
  }

  readFile(path: string): Promise<string> {
    let result: string;
    return new Promise((res, rej) => {
      const readStream = createReadStream(path)
      readStream.on('data', data => { result = data.toString()})
      readStream.on('end', () => res(result))
    })
  }
}
