import { AboutUs } from 'src/aboutUs/aboutUs.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @ManyToOne(() => AboutUs, (aboutUs) => aboutUs.products, {
    onDelete: 'CASCADE',
  })
  aboutUs: AboutUs;
}
