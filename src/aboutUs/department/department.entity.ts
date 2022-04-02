import { AboutUs } from 'src/aboutUs/aboutUs.entity';
import { Career } from 'src/career/career.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Department extends BaseEntity {
  @ManyToOne(() => AboutUs, (abouUs) => abouUs.departments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  aboutUs: AboutUs;

  @OneToMany(() => Career, (career) => career.department)
  careers: Career[];

  @Column()
  logo: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;
}