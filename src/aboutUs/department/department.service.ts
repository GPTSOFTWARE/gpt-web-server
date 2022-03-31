import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/services/base.service";
import { Repository } from "typeorm";
import { Department } from "./department.entity";

@Injectable()
export class DepartmentService extends BaseService<Department> {
    constructor(@InjectRepository(Department) repo: Repository<Department>){
        super(repo);
    }
}