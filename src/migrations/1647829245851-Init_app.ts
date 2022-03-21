import {MigrationInterface, QueryRunner} from "typeorm";

export class InitApp1647829245851 implements MigrationInterface {
    name = 'InitApp1647829245851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`personnel\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`personnel\` DROP COLUMN \`name\``);
    }

}
