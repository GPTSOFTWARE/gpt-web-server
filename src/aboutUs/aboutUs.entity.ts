import { BaseEntity } from 'src/common/entities/base.entity';
import { Personnel } from 'src/aboutUs/personnel/personnel.entity';
import { Department } from 'src/aboutUs/department/department.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class AboutUs extends BaseEntity {
  @Column()
  logo: string;

  @Column({ type: 'text' })
  introduction: string;

  @Column({ type: 'text' })
  goals: string;

  @Column({ type: 'text' })
  values: string;

  @OneToMany(() => Personnel, (personnel) => personnel.aboutUs)
  personnels: Personnel[];

  @OneToMany(() => Department, (department) => department.aboutUs)
  departments: Department[];
}
