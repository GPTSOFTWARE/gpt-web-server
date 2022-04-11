import {MigrationInterface, QueryRunner} from "typeorm";

export class InitApp1649396548189 implements MigrationInterface {
    name = 'InitApp1649396548189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact\` ADD \`aboutUsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`contact\` ADD UNIQUE INDEX \`IDX_182261d9c8f13616e356a5ca35\` (\`aboutUsId\`)`);
        await queryRunner.query(`ALTER TABLE \`about_us\` ADD \`contactId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`about_us\` ADD UNIQUE INDEX \`IDX_c416b738f9e9888a3f9c6f81f9\` (\`contactId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_182261d9c8f13616e356a5ca35\` ON \`contact\` (\`aboutUsId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_c416b738f9e9888a3f9c6f81f9\` ON \`about_us\` (\`contactId\`)`);
        await queryRunner.query(`ALTER TABLE \`contact\` ADD CONSTRAINT \`FK_182261d9c8f13616e356a5ca353\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`about_us\` ADD CONSTRAINT \`FK_c416b738f9e9888a3f9c6f81f9b\` FOREIGN KEY (\`contactId\`) REFERENCES \`contact\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`about_us\` DROP FOREIGN KEY \`FK_c416b738f9e9888a3f9c6f81f9b\``);
        await queryRunner.query(`ALTER TABLE \`contact\` DROP FOREIGN KEY \`FK_182261d9c8f13616e356a5ca353\``);
        await queryRunner.query(`DROP INDEX \`REL_c416b738f9e9888a3f9c6f81f9\` ON \`about_us\``);
        await queryRunner.query(`DROP INDEX \`REL_182261d9c8f13616e356a5ca35\` ON \`contact\``);
        await queryRunner.query(`ALTER TABLE \`about_us\` DROP INDEX \`IDX_c416b738f9e9888a3f9c6f81f9\``);
        await queryRunner.query(`ALTER TABLE \`about_us\` DROP COLUMN \`contactId\``);
        await queryRunner.query(`ALTER TABLE \`contact\` DROP INDEX \`IDX_182261d9c8f13616e356a5ca35\``);
        await queryRunner.query(`ALTER TABLE \`contact\` DROP COLUMN \`aboutUsId\``);
    }

}
