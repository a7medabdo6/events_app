import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  notes: string;
  @Column()
  alarm_time: string;
  @Column()
  alarm_status: boolean;
  @ManyToOne(() => User, (user) => user.meetings) // specify inverse side as a second parameter
  user: User;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
