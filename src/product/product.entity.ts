import { BaseEntity } from 'src/common/entities/base.entity';
import { Project } from 'src/product/project/project.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  banner: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Project, (project) => project.product)
  projects: Project[];
}
