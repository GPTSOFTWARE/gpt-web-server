import { BaseEntity } from 'src/common/entities/base.entity';
import { Partner } from 'src/customer/partner/partner.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from '../product.entity';
@Entity()
export class Project extends BaseEntity {
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

  @ManyToOne(() => Partner, (partner) => partner.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  partner: Partner;

  @ManyToOne(() => Product, (product) => product.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;
}
