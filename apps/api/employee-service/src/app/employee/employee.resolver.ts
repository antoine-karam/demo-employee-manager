import { Resolver, Query } from '@nestjs/graphql';
import { Employee } from '../graphql';
import { EmployeeService } from './employee.service';

@Resolver()
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query()
  async employees(): Promise<Employee[]> {
    return await this.employeeService.get();
  }
}
