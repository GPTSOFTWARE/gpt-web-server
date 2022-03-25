import { BaseEntity } from 'src/common/entities/base.entity';
import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;

  @Column()
  banner: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
