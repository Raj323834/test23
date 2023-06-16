import { Controller, Post, Get, Param, Body, Query, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Scopes } from '../auth/scopes.decorator';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(JwtAuthGuard)
  @Scopes('write')
  @Post()
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.createCompany(createCompanyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Scopes('read')
  @Get(':id')
  getCompanyById(@Param('id') id: string) {
    return this.companiesService.getCompanyById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Scopes('read')
  @Get()
  searchCompaniesByName(@Query('name') name: string) {
    return this.companiesService.searchCompaniesByName(name);
  }
}
