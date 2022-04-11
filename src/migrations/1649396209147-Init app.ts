import {MigrationInterface, QueryRunner} from "typeorm";

export class InitApp1649396209147 implements MigrationInterface {
    name = 'InitApp1649396209147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`personnel\` DROP FOREIGN KEY \`FK_8d3226a1f631ba5a28bc3b2e5c8\``);
        await queryRunner.query(`ALTER TABLE \`department\` DROP FOREIGN KEY \`FK_54ceaaf9d0cfdac10267e261249\``);
        await queryRunner.query(`ALTER TABLE \`partner\` DROP FOREIGN KEY \`FK_2c4c95b66fc6eb937c9144087cb\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`aboutUsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`personnel\` ADD CONSTRAINT \`FK_8d3226a1f631ba5a28bc3b2e5c8\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`department\` ADD CONSTRAINT \`FK_54ceaaf9d0cfdac10267e261249\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_f973a81f6ab5f0fa661b16341c9\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partner\` ADD CONSTRAINT \`FK_2c4c95b66fc6eb937c9144087cb\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`partner\` DROP FOREIGN KEY \`FK_2c4c95b66fc6eb937c9144087cb\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_f973a81f6ab5f0fa661b16341c9\``);
        await queryRunner.query(`ALTER TABLE \`department\` DROP FOREIGN KEY \`FK_54ceaaf9d0cfdac10267e261249\``);
        await queryRunner.query(`ALTER TABLE \`personnel\` DROP FOREIGN KEY \`FK_8d3226a1f631ba5a28bc3b2e5c8\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`aboutUsId\``);
        await queryRunner.query(`ALTER TABLE \`partner\` ADD CONSTRAINT \`FK_2c4c95b66fc6eb937c9144087cb\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`department\` ADD CONSTRAINT \`FK_54ceaaf9d0cfdac10267e261249\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`personnel\` ADD CONSTRAINT \`FK_8d3226a1f631ba5a28bc3b2e5c8\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
