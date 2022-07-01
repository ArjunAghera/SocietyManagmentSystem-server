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
import { Complaint } from './Complaint.model';

export enum workStatus {
  PENDING = 'pending',
  INPROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

@Entity('work_assigned')
export class WorkAssigned extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: workStatus,
  })
  status: string;

  @Column({ nullable: true })
  userId: string;

  @OneToOne(() => Complaint, (complaint) => complaint.workAssigned, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  complaint: Complaint;

  @ManyToOne(() => User, (user) => user.workAssigned)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
