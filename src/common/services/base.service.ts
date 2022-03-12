import { NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';

export class BaseService<T> {
  constructor(protected repo: Repository<T>) {}

  protected async findById(
    id: string,
    options?: FindOneOptions<T>,
  ): Promise<T> {
    let result: T;

    if (options) {
      result = await this.repo.findOne(id, options);
    } else {
      result = await this.repo.findOne(id);
    }

    if (!result) {
      throw new NotFoundException(`Data with id = ${id} does not exist`);
    }

    return result;
  }

  protected async deleteOneById(id: string) {
    this.findById(id);

    return this.repo.delete(id);
  }
}
