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
  @Column({
    default: '00000000',
  })
  phone: string;
  @Column({
    default: '00000000',
  })
  photo: string;

  @Column({
   
    default: "seller",
  })
  type: string;
  @Column({
    default: '00000000',
  })
  password: string;

  @Column({
    default: '00000000',
  })
  username: string;

  @Column({
    
    default: "seller",
  })
  role: string;

  @Column({
    default: false,
  })
  active: boolean;

  @Column({
    default: '0',
  })
  createBy: number;

  @OneToMany(() => Docs, (Docs) => Docs.user) // specify inverse side as a second parameter
  @JoinColumn()
  Docs: Docs;

  @OneToMany(() => Meeting, (Meeting) => Meeting.user) // specify inverse side as a second parameter
  @JoinColumn()
  meetings: Meeting;
}
