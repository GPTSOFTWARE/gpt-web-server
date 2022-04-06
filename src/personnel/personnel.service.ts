import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AboutUsService } from "src/aboutUs/aboutUs.service";
import { BaseService } from "src/common/services/base.service";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Personnel } from "./personnel.entity";
import { InputSetPersonnel } from "./personnel.model";
import * as _ from "lodash";

@Injectable()
export class PersonnelService extends BaseService<Personnel> {
    constructor(
        @InjectRepository(Personnel) repo: Repository<Personnel>,
        private aboutUsService: AboutUsService
    ) {
        super(repo)
    }

    get(id: string, options?: FindOneOptions<Personnel>){
        return this.findById(id, options);
    }

    getAll(options?: FindManyOptions<Personnel>) {
        return this.repo.find(options);
    }

    async create(input: InputSetPersonnel){
        const aboutUs = await this.aboutUsService.getOne();

        const data = _.cloneDeep(input);
        data.bio = input.bio.join("|");
        
        const personnel = this.repo.create({...data, aboutUs})

        return this.repo.save(personnel)
    }

    async update(input: InputSetPersonnel) {
        const personnel = await this.findById(input.id);

        _.forEach(input, (value, key) => {
            if(value && key === "bio") personnel.bio = value.join("|")
            else if(key !== "id") value && (personnel[key] = value);
        })

        return this.repo.save(personnel);
    }

    async delete(id: string) {
        return !!(await this.deleteOneById(id));
    }
}