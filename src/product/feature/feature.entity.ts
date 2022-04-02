import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "../product.entity";

@Entity()
export class Feature extends BaseEntity {
    @Column()
    name: string;

    @Column({type: "text"})
    description: string

    @ManyToOne(() => Product, product => product.features, {onDelete: "CASCADE"})
    @JoinColumn()
    product: Product
}