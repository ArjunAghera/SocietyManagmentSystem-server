import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Complaint } from './Complaint.model';
import { ResidentDetails } from './ResidentDetails.model';

export enum userRole {
  RESIDENT = 'resident',
  WORKER = 'worker',
  ADMIN = 'admin',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  is_admin: boolean;

  @Column()
  is_verified: boolean;

  @Column({
    type: 'enum',
    enum: userRole,
  })
  role: string;

  @OneToOne(() => ResidentDetails, (resident) => resident.user)
  resident: ResidentDetails;

  @OneToOne(() => Complaint, (complaint) => complaint.user)
  complaint: Complaint;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
