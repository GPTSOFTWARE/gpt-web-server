import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitApp1648086755320 implements MigrationInterface {
  name = 'InitApp1648086755320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_f973a81f6ab5f0fa661b16341c9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`aboutUsId\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`aboutUsId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_f973a81f6ab5f0fa661b16341c9\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
