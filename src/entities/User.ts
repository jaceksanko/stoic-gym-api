import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exercise } from './Exercise';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EDITOR,
  })
  role: UserRole;

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];
}
