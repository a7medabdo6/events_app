import { Docs } from 'src/Docs/entities/Docs.entity';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  admin = 'admin',
  seller = 'seller',
  buyer = 'buyer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  code: string;
  @Column()
  phone: string;
  @Column()
  photo: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.seller,
  })
  type: UserRole;
  @Column()
  password: string;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.seller,
  })
  role: UserRole;

  @Column({
    default: false,
  })
  active: boolean;

  @Column()
  createBy: number;

  @OneToMany(() => Docs, (Docs) => Docs.user) // specify inverse side as a second parameter
  @JoinColumn()
  Docs: Docs;

  @OneToMany(() => Meeting, (Meeting) => Meeting.user) // specify inverse side as a second parameter
  @JoinColumn()
  meetings: Meeting;
}
