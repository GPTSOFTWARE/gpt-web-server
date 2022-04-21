import {MigrationInterface, QueryRunner} from "typeorm";

export class InitApp1650510575046 implements MigrationInterface {
    name = 'InitApp1650510575046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`about_us\` DROP COLUMN \`logo\``);
        await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`banner\` \`banner\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`banner\` \`banner\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`about_us\` ADD \`logo\` varchar(255) NOT NULL`);
    }

}
