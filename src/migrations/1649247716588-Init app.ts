import {MigrationInterface, QueryRunner} from "typeorm";

export class InitApp1649247716588 implements MigrationInterface {
    name = 'InitApp1649247716588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`partner\` ADD \`aboutUsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`partner\` ADD CONSTRAINT \`FK_2c4c95b66fc6eb937c9144087cb\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`partner\` DROP FOREIGN KEY \`FK_2c4c95b66fc6eb937c9144087cb\``);
        await queryRunner.query(`ALTER TABLE \`partner\` DROP COLUMN \`aboutUsId\``);
    }

}
