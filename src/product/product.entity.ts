import { Category } from 'src/product/category/category.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Partner } from 'src/customer/partner/partner.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Feature } from './feature/feature.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  utility: string;

  @Column({ type: 'text' })
  feature: string;

  @Column()
  banner: string;

  @ManyToOne(() => Partner, (partner) => partner.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  partner: Partner;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  category: Category;

  @OneToMany(() => Feature, feature => feature.product)
  features: Feature[]
}
