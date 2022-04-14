import { MigrationInterface, QueryRunner } from 'typeorm';

export class initApp1649903787539 implements MigrationInterface {
  name = 'initApp1649903787539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_182261d9c8f13616e356a5ca35\` ON \`contact\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c416b738f9e9888a3f9c6f81f9\` ON \`about_us\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`banner\` \`banner\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` CHANGE \`banner\` \`banner\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_c416b738f9e9888a3f9c6f81f9\` ON \`about_us\` (\`contactId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_182261d9c8f13616e356a5ca35\` ON \`contact\` (\`aboutUsId\`)`,
    );
  }
}
