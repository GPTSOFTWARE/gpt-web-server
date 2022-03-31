import { AboutUs } from 'src/aboutUs/aboutUs.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Personnel extends BaseEntity {
  @ManyToOne(() => AboutUs, (aboutUs) => aboutUs.personnels, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  aboutUs: AboutUs;

  @Column()
  name: string;

  @Column()
  img: string;

  @Column()
  position: string;

  @Column({ type: 'text' })
  bio: string;
}
