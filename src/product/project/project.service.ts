import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Project } from './project.entity';
import * as _ from 'lodash';
import { ProductService } from '../product.service';
import { PartnerService } from 'src/customer/partner/partner.service';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(
    @InjectRepository(Project) repo: Repository<Project>
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

  // async create(input: InputSetProduct) {
  //   const [product, partner] = await Promise.all([
  //     this.productService.get(input.categoryID),    
  //     this.partnerService.get(input.partnerID)
  //   ])

  //   const project = this.repo.create({...input, product, partner});
    
  //   return this.repo.save(project)
  // }

  // async update(input: InputSetProduct) {
  //   const [project, product, partner] = await Promise.all([
  //     this.findById(input.id, {relations: ["category", "partner"]}),
  //     this.productService.get(input.categoryID),
  //     this.partnerService.get(input.partnerID)
  //   ])

  //   _.forEach(input, (value, key) => {
  //     if(key === "categoryID") project.product = product;
  //     else if(key === "partnerID") project.partner = partner;
  //     else if(key !== "id") value && (project[key] = value);
  //   })

  //   return this.repo.save(project);
  // }

  // async delete(id: string){
  //   return !!(await this.deleteOneById(id))
  // }
}