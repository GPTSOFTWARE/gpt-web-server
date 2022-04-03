import {MigrationInterface, QueryRunner} from "typeorm";

export class InitApp1648984714075 implements MigrationInterface {
    name = 'InitApp1648984714075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`home\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`introduction\` text NOT NULL, \`slogan\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`home\``);
    }

}
