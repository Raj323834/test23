import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const company = new Company();
    company.name = createCompanyDto.name;
    company.ceo = createCompanyDto.ceo;
    company.address = createCompanyDto.address;
    company.inceptionDate = createCompanyDto.inceptionDate;
    return this.companiesRepository.save(company);
  }

  async getCompanyById(id: string) {
    const company = await this.companiesRepository.findOne(id);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async searchCompaniesByName(name: string) {
    const companies = await this.companiesRepository
      .createQueryBuilder('company')
      .where('company.name ILIKE :name', { name: `%${name}%` })
      .getMany();
    return companies;
  }
}
