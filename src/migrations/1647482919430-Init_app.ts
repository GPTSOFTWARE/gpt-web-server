import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitApp1647482919430 implements MigrationInterface {
  name = 'InitApp1647482919430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`about_us\` DROP COLUMN \`introduction\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`about_us\` ADD \`introduction\` text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`about_us\` DROP COLUMN \`goals\``);
    await queryRunner.query(
      `ALTER TABLE \`about_us\` ADD \`goals\` text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`about_us\` DROP COLUMN \`values\``);
    await queryRunner.query(
      `ALTER TABLE \`about_us\` ADD \`values\` text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`contact\` DROP COLUMN \`address\``);
    await queryRunner.query(
      `ALTER TABLE \`contact\` ADD \`address\` text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`contact\` DROP COLUMN \`address\``);
    await queryRunner.query(
      `ALTER TABLE \`contact\` ADD \`address\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`about_us\` DROP COLUMN \`values\``);
    await queryRunner.query(
      `ALTER TABLE \`about_us\` ADD \`values\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`about_us\` DROP COLUMN \`goals\``);
    await queryRunner.query(
      `ALTER TABLE \`about_us\` ADD \`goals\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`about_us\` DROP COLUMN \`introduction\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`about_us\` ADD \`introduction\` varchar(255) NOT NULL`,
    );
  }
}
