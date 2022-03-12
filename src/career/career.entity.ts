import { AboutUs } from "src/aboutUs/aboutUs.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Career extends BaseEntity {
    @ManyToOne(() => AboutUs, aboutUs => aboutUs.careers, {onDelete: "CASCADE"})
    @JoinColumn()
    aboutUs: AboutUs
}