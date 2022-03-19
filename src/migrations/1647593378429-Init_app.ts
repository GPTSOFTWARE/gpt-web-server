import {MigrationInterface, QueryRunner} from "typeorm";

export class InitApp1647593378429 implements MigrationInterface {
    name = 'InitApp1647593378429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`logo\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customer\` ADD \`shortDes\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`shortDes\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`customer\` DROP COLUMN \`logo\``);
    }

}
