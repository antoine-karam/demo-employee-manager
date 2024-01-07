import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Address, Employee, EmployeeInput, Position } from '../graphql';
import { EmployeeService } from './employee.service';

@Resolver()
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query()
  async employees(): Promise<Employee[]> {
    return await this.employeeService.get();
  }
  @Query()
  async positions(): Promise<Position[]> {
    return await this.employeeService.getPositions();
  }
  @Query()
  async address(@Args('id') id: string): Promise<Address> {
    return await this.employeeService.getAddress(id);
  }
  @Mutation()
  async removeEmployee(@Args('id') id: string):Promise<boolean>{
    return await this.employeeService.delete(id);
  }
  @Mutation()
  async updateEmployee(@Args('employee')employee: EmployeeInput):  Promise<Employee>{
    return await this.employeeService.update(employee);
  }
  @Mutation()
  async addEmployee(@Args('employee')employee: EmployeeInput):  Promise<Employee>{
    return await this.employeeService.add(employee);
  }
}
