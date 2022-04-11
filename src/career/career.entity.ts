import { Applicant } from '../applicant/applicant.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Department } from 'src/department/department.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Career extends BaseEntity {
  @OneToMany(() => Applicant, (applicant) => applicant.carrer)
  applicants: Applicant[];

  @ManyToOne(() => Department, (department) => department.careers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  department: Department;
}
