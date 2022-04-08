import {MigrationInterface, QueryRunner} from "typeorm";

export class InitApp1649391699897 implements MigrationInterface {
    name = 'InitApp1649391699897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_0fe00fa20632a4f1defc86d3a44\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`utility\` text NOT NULL, \`feature\` text NOT NULL, \`banner\` varchar(255) NOT NULL, \`partnerId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`partnerId\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`utility\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`feature\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_ce4e164d2f51ae51f2789d57c3c\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partner\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_80196d1caa44c39c19685a5a2c7\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_80196d1caa44c39c19685a5a2c7\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_ce4e164d2f51ae51f2789d57c3c\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`feature\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`utility\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`partnerId\` int NULL`);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_0fe00fa20632a4f1defc86d3a44\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partner\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
