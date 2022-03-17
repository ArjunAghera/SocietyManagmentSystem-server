import {
  Entity,
  OneToOne,
  JoinColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.model';

@Entity('complaints')
export class Complaint extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  complaint: string;

  @Column()
  resolved: boolean;

  @Column({ nullable: true })
  userId: string;

  @OneToOne(() => User, (user) => user.complaint, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
