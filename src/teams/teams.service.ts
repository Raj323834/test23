import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async createTeam(companyId: string, createTeamDto: CreateTeamDto): Promise<Team> {
    const { teamLeadName } = createTeamDto;
    const team = this.teamRepository.create({
      teamLeadName,
      companyId,
    });
    await this.teamRepository.save(team);
    return team;
  }

  async getAllTeams(): Promise<Team[]> {
    const teams = await this.teamRepository.find({ relations: ['company'] });
    return teams;
  }
}
