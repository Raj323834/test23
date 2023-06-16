import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}

  async createTeam(companyId: string, createTeamDto: CreateTeamDto) {
    // Check if the company exists
    const team = new Team();
    team.teamLeadName = createTeamDto.teamLeadName;
    team.companyId = companyId;
    return this.teamsRepository.save(team);
  }

  async getAllTeams() {
    const teams = await this.teamsRepository.find();
    const teamsByCompany = teams.reduce((acc, team) => {
      if (!acc[team.companyId]) {
        acc[team.companyId] = [];
      }
      acc[team.companyId].push(team);
      return acc;
    }, {});
    return teamsByCompany;
  }
}
