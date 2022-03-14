import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitApp1647165255903 implements MigrationInterface {
  name = 'InitApp1647165255903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`career\` DROP FOREIGN KEY \`FK_71da4bb33a02f433ca6da1015cd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`department\` DROP FOREIGN KEY \`FK_54ceaaf9d0cfdac10267e261249\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`career\` ADD CONSTRAINT \`FK_71da4bb33a02f433ca6da1015cd\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`department\` ADD CONSTRAINT \`FK_54ceaaf9d0cfdac10267e261249\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`department\` DROP FOREIGN KEY \`FK_54ceaaf9d0cfdac10267e261249\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`career\` DROP FOREIGN KEY \`FK_71da4bb33a02f433ca6da1015cd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`department\` ADD CONSTRAINT \`FK_54ceaaf9d0cfdac10267e261249\` FOREIGN KEY (\`aboutUsId\`) REFERENCES \`about_us\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`career\` ADD CONSTRAINT \`FK_71da4bb33a02f433ca6da1015cd\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
