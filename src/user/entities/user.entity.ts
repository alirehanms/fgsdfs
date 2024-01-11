import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;
  @Column()
  first_name: string;
  @Column()
  last_name: string;

  @Column()
  age: string;
  @Column()
  email: string;
  @Column()
  gender: string;
  @Column()
  password: string;
  @Column()
  grade: string;
}
