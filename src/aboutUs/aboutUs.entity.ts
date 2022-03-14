import { BaseEntity } from 'src/common/entities/base.entity';
import { Personnel } from 'src/personnel/personnel.entity';
import { Product } from 'src/product/product.entity';
import { Department } from 'src/department/department.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class AboutUs extends BaseEntity {
  @Column()
  logo: string;

  @Column()
  introduction: string;

  @Column()
  goals: string;

  @Column()
  values: string;

  @OneToMany(() => Personnel, (personnel) => personnel.aboutUs)
  personnels: Personnel[];

  @OneToMany(() => Department, (department) => department.aboutUs)
  departments: Department[];

  @OneToMany(() => Product, (product) => product.aboutUs)
  products: Product[];
}
