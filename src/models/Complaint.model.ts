import {
  Entity,
  OneToOne,
  JoinColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User.model';
import { WorkAssigned } from './WorkAssigned.model';

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

  @Column({ nullable: true })
  workAssignedId: string;

  @ManyToOne(() => User, (user) => user.complaint, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => WorkAssigned, (workAssigned) => workAssigned.complaint)
  workAssigned: WorkAssigned;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
