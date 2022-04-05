import {MigrationInterface, QueryRunner} from "typeorm";

export class InitApp1649121963722 implements MigrationInterface {
    name = 'InitApp1649121963722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`partner\` ADD \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`partner\` ADD CONSTRAINT \`FK_48b6a192180f963cdc438702e0e\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`partner\` DROP FOREIGN KEY \`FK_48b6a192180f963cdc438702e0e\``);
        await queryRunner.query(`ALTER TABLE \`partner\` DROP COLUMN \`customerId\``);
    }

}
