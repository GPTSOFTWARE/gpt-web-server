import {MigrationInterface, QueryRunner} from "typeorm";

export class InitApp1649338081184 implements MigrationInterface {
    name = 'InitApp1649338081184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`personnel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`img\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`bio\` text NOT NULL, \`aboutUsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`applicant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`carrerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`career\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`departmentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`logo\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`aboutUsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`utility\` text NOT NULL, \`feature\` text NOT NULL, \`banner\` varchar(255) NOT NULL, \`partnerId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`banner\` varchar(255) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`logo\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`shortDes\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`partner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`logo\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`customerId\` int NULL, \`aboutUsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`about_us\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`logo\` varchar(255) NOT NULL, \`introduction\` text NOT NULL, \`goals\` text NOT NULL, \`values\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`address\` text NOT NULL, \`email\` varchar(255) NOT NULL, \`twitter\` varchar(255) NULL, \`instagram\` varchar(255) NULL, \`linkedin\` varchar(255) NULL, \`facebook\` varchar(255) NULL, \`phone\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`home\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`introduction\` text NOT NULL, \`slogan\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`personnel\` ADD CONSTRAINT \`FK_8d3226a1f631ba5a28bc3b2e5c8\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`applicant\` ADD CONSTRAINT \`FK_dd9d1d945014b5784564f4fff88\` FOREIGN KEY (\`carrerId\`) REFERENCES \`career\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`career\` ADD CONSTRAINT \`FK_71da4bb33a02f433ca6da1015cd\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`department\` ADD CONSTRAINT \`FK_54ceaaf9d0cfdac10267e261249\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_ce4e164d2f51ae51f2789d57c3c\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partner\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_80196d1caa44c39c19685a5a2c7\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partner\` ADD CONSTRAINT \`FK_48b6a192180f963cdc438702e0e\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`partner\` ADD CONSTRAINT \`FK_2c4c95b66fc6eb937c9144087cb\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`partner\` DROP FOREIGN KEY \`FK_2c4c95b66fc6eb937c9144087cb\``);
        await queryRunner.query(`ALTER TABLE \`partner\` DROP FOREIGN KEY \`FK_48b6a192180f963cdc438702e0e\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_80196d1caa44c39c19685a5a2c7\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_ce4e164d2f51ae51f2789d57c3c\``);
        await queryRunner.query(`ALTER TABLE \`department\` DROP FOREIGN KEY \`FK_54ceaaf9d0cfdac10267e261249\``);
        await queryRunner.query(`ALTER TABLE \`career\` DROP FOREIGN KEY \`FK_71da4bb33a02f433ca6da1015cd\``);
        await queryRunner.query(`ALTER TABLE \`applicant\` DROP FOREIGN KEY \`FK_dd9d1d945014b5784564f4fff88\``);
        await queryRunner.query(`ALTER TABLE \`personnel\` DROP FOREIGN KEY \`FK_8d3226a1f631ba5a28bc3b2e5c8\``);
        await queryRunner.query(`DROP TABLE \`home\``);
        await queryRunner.query(`DROP TABLE \`contact\``);
        await queryRunner.query(`DROP TABLE \`about_us\``);
        await queryRunner.query(`DROP TABLE \`partner\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`department\``);
        await queryRunner.query(`DROP TABLE \`career\``);
        await queryRunner.query(`DROP TABLE \`applicant\``);
        await queryRunner.query(`DROP TABLE \`personnel\``);
    }

}
