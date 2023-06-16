import { Controller, Post, Get } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Scopes } from '../auth/scopes.decorator';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @UseGuards(JwtAuthGuard)
  @Scopes('write')
  @Post(':companyId')
  createTeam(@Param('companyId') companyId: string, @Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.createTeam(companyId, createTeamDto);
  }

  @UseGuards(JwtAuthGuard)
  @Scopes('read')
  @Get()
  getAllTeams() {
    return this.teamsService.getAllTeams();
  }
}
