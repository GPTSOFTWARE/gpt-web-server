import { BaseEntity } from 'src/common/entities/base.entity';
import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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
}
