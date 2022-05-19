import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from '../Exercise';
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

  @Column({ unique: true })
  email: string;

  @OneToOne(() => Password, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  password: Password;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  role: Role;

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];
}
