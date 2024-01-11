import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordColoumn1701771249880 implements MigrationInterface {
    name = 'AddPasswordColoumn1701771249880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
