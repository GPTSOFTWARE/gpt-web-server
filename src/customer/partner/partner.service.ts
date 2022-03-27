import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/services/base.service";
import { FindManyOptions, Repository } from "typeorm";
import { Partner } from "./partner.entity";

@Injectable()
export class PartnerService extends BaseService<Partner> {
    constructor(@InjectRepository(Partner) repo: Repository<Partner>){
        super(repo);
    }

    getAll(options?: FindManyOptions<Partner>) {
        return this.repo.find(options)
    }
}