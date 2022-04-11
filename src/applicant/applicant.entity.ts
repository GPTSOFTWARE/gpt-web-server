import { Career } from 'src/career/career.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Applicant extends BaseEntity {
  @ManyToOne(() => Career, (career) => career.applicants)
  @JoinColumn()
  carrer: Career;
}
