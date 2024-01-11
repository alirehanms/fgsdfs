import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGradeColoumn1701771583454 implements MigrationInterface {
    name = 'AddGradeColoumn1701771583454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "grade" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "grade"`);
    }

}
