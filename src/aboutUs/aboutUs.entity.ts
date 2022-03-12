import { Career } from "src/career/career.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { Personnel } from "src/personnel/personnel.entity";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";

@Entity()
export class AboutUs extends BaseEntity{
    @Column()
    woWeAre: string

    @Column()
    why: string

    @Column()
    principles: string

    @Column()
    values: string

    @OneToMany(() => Personnel, personnel => personnel.aboutUs )
    personnels: Personnel[]

    @OneToMany(() => Career, career => career.aboutUs)
    careers: Career[]
}