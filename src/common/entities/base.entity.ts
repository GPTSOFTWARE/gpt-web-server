import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @UpdateDateColumn()
    updateAt: Date

    @CreateDateColumn()
    createAt: Date
}