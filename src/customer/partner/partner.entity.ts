import { BaseEntity } from 'src/common/entities/base.entity';
import { Product } from 'src/product/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from '../customer.entity';

@Entity()
export class Partner extends BaseEntity {
  @Column()
  logo: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Product, (product) => product.partner)
  products: Product[];

  @ManyToOne(() => Customer, customer => customer.partners, {onDelete: "CASCADE"})
  @JoinColumn()
  customer: Customer
}
