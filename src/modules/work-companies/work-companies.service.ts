import { Injectable } from '@nestjs/common';
import { CreateWorkCompanyDto } from './dto/create-work-company.dto';
import { UpdateWorkCompanyDto } from './dto/update-work-company.dto';

@Injectable()
export class WorkCompaniesService {
  create(createWorkCompanyDto: CreateWorkCompanyDto) {
    return 'This action adds a new workCompany';
  }

  findAll() {
    return `This action returns all workCompanies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workCompany`;
  }

  update(id: number, updateWorkCompanyDto: UpdateWorkCompanyDto) {
    return `This action updates a #${id} workCompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} workCompany`;
  }
}
