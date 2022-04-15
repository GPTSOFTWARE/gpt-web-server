import { MigrationInterface, QueryRunner } from 'typeorm';

export class initApp1649916625412 implements MigrationInterface {
  name = 'initApp1649916625412';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`admin\` (\`id\` varchar(36) NOT NULL, \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`permission\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`banner\` \`banner\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`project\` CHANGE \`banner\` \`banner\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`admin\``);
  }
}
