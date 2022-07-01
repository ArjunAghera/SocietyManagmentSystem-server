import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('feedbacks')
export class Opinion extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  opinion: string;

  @Column()
  seen: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
