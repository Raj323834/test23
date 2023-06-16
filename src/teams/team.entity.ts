import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Company } from '../companies/company.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teamLeadName: string;

  @ManyToOne(() => Company, (company) => company.teams)
  company: Company;
}
