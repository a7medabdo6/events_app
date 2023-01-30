import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ServiceUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  initials: string;

  @Column()
  lcds: number;

  @Column()
  age_ate_refferal: string;

  @Column()
  home_address: string;

  @Column()
  school_address: string;

  @Column()
  sex: string;

  @Column()
  start_date: string;

  @Column()
  end_date: string;

  @Column()
  qurdian: string;

  @Column()
  qurdian_contact: number;

  @Column()
  relationship: string;

  @Column()
  support_worker: string;

  @Column()
  assesment_date: string;

  @Column()
  disability: string;

  @Column()
  ethnicity: string;

  @Column()
  religion: string;

  @Column()
  compliment_of_the_household: number;
}
