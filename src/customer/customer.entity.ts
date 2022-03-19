import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Customer extends BaseEntity {
    
    @Column()
    logo: string

    @Column()
    name: string

    @Column()
    shortDes: string

}
