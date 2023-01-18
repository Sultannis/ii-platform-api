import { Injectable } from '@nestjs/common';
import { WorkCompany } from 'src/common/entities/work-company';

@Injectable()
export class WorkCompanyResource {
  convert(workCompany: WorkCompany) {
    return {
      id: +workCompany.id,
      user_id: +workCompany.userId,
      company_name: workCompany.companyName,
      description: workCompany.description,
      position: workCompany.position,
      country: workCompany.country,
      start_date: workCompany.startDate,
      end_date: workCompany.endDate,
      created_at: workCompany.createdAt,
      updated_at: workCompany.updatedAt,
    };
  }
}
