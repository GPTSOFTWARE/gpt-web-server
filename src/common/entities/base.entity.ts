import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @UpdateDateColumn()
  updateAt: Date;

  @CreateDateColumn()
  createAt: Date;
}
