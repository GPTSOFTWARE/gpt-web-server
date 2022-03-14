import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Contact extends BaseEntity {
  @Column()
  address: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  facebook: string;

  @Column()
  phone: string;
}
