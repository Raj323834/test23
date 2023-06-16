import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Team } from '../teams/team.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  CEO: string;

  @Column()
  address: string;

  @Column()
  inceptionDate: Date;

  @OneToMany(() => Team, (team) => team.company)
  teams: Team[];
}
