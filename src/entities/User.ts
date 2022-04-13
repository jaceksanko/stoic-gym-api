import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from './Exercise';
import { Password } from './Password';
import { Role } from './Role';

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

  @OneToOne(() => Password)
  @JoinColumn()
  password: Password;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];
}
