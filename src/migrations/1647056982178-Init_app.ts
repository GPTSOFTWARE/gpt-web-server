import {MigrationInterface, QueryRunner} from "typeorm";

export class InitApp1647056982178 implements MigrationInterface {
    name = 'InitApp1647056982178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`about_us\` CHANGE \`whys\` \`why\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`about_us\` DROP COLUMN \`why\``);
        await queryRunner.query(`ALTER TABLE \`about_us\` ADD \`why\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`about_us\` DROP COLUMN \`why\``);
        await queryRunner.query(`ALTER TABLE \`about_us\` ADD \`why\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`about_us\` CHANGE \`why\` \`whys\` varchar(255) NOT NULL`);
    }

}
