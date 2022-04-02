import {MigrationInterface, QueryRunner} from "typeorm";

export class InitApp1648910242835 implements MigrationInterface {
    name = 'InitApp1648910242835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_b3d8b3ae840efeba348544d2d04\``);
        await queryRunner.query(`CREATE TABLE \`feature\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`feature\` ADD CONSTRAINT \`FK_ebf00c6f613e1f08e91882062ab\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`feature\` DROP FOREIGN KEY \`FK_ebf00c6f613e1f08e91882062ab\``);
        await queryRunner.query(`DROP TABLE \`feature\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_b3d8b3ae840efeba348544d2d04\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
