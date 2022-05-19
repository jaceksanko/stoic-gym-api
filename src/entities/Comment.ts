import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from './Exercise';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.comments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  exercise: Exercise;
}
