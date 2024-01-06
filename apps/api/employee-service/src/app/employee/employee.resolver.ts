import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Employee, EmployeeInput } from '../graphql';
import { EmployeeService } from './employee.service';

@Resolver()
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query()
  async employees(): Promise<Employee[]> {
    return await this.employeeService.get();
  }
  @Mutation()
  async removeEmployee(@Args('id') id: string):Promise<boolean>{
    return await this.employeeService.delete(id);
  }
  @Mutation()
  async updateEmployee(@Args('employee')employee: EmployeeInput):  Promise<Employee>{
    return await this.employeeService.update(employee);
  }
}
