import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/services/base.service";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService extends BaseService<Category> {
    constructor(@InjectRepository(Category) repo: Repository<Category>){
        super(repo)
    }

    get(id: string, options?: FindOneOptions<Category>) {
        return this.findById(id, options);
    }

    getAll(options?: FindManyOptions<Category>) {
        return this.repo.find(options);
    } 
}