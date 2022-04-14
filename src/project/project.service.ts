import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Project } from './project.entity';
import * as _ from 'lodash';
import { ProductService } from '../product/product.service';
import { PartnerService } from 'src/partner/partner.service';
import { InputSetProject } from './project.model';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(
    @InjectRepository(Project) repo: Repository<Project>,
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
    private partnerService: PartnerService,
  ) {
    super(repo);
  }

  async getOne(id: string, option?: FindOneOptions<Project>) {
    const project = await this.findById(id, option);
    _.forEach(project, (value, key) => {
      !!(key === 'utility') && (project[key] = value.split('|'));
      !!(key === 'feature') && (project[key] = value.split('|'));
    });

    return project;
  }

  async getAll(options?: FindManyOptions<Project>) {
    const projects = await this.repo.find(options);

    _.forEach(projects, (project) => {
      !!project.utility && (project.utility = project.utility.split('|'));
      !!project.feature && (project.feature = project.feature.split('|'));
    });
    return projects;
  }

  async create(input: InputSetProject) {
    const [product, partner] = await Promise.all([
      this.productService.getOne(input.productID),
      this.partnerService.get(input.partnerID),
    ]);

    const banner = input.banner
      ? this.handleUploadFile(input.banner, '/img/project/banner', [
          'png',
          'jpg',
          'webp',
        ])
      : null;

    const project = this.repo.create({ ...input, product, partner, banner });

    return this.repo.save(project);
  }

  async update(input: InputSetProject) {
    const [project, product, partner] = await Promise.all([
      this.findById(input.id, { relations: ['category', 'partner'] }),
      this.productService.getOne(input.productID),
      this.partnerService.get(input.partnerID),
    ]);

    const banner = input.banner
      ? this.handleUploadFile(
          input.banner,
          '/img/project/banner',
          ['png', 'jpg', 'webp'],
          project.banner,
        )
      : null;

    _.forEach(input, (value, key) => {
      if (key === 'productID') project.product = product;
      else if (key === 'partnerID') project.partner = partner;
      else if (key === 'banner') project.banner = banner;
      else if (key !== 'id') value && (project[key] = value);
    });

    return this.repo.save(project);
  }

  async delete(id: string) {
    const project = await this.findById(id, { select: ['banner'] });
    project.banner && this.clearFile(project.banner);
    return !!(await this.repo.delete(id));
  }
}
