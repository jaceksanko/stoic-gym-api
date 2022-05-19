import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EDITOR,
  })
  role: UserRole;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
